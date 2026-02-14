"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ---- Inlined hooks ----

function useLazyRef<T>(init: () => T) {
  const ref = React.useRef<T | null>(null);
  if (ref.current === null) {
    ref.current = init();
  }
  return ref as React.MutableRefObject<T>;
}

function useComposedRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional
  return React.useCallback((node: T) => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref && typeof ref === "object") {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    }
  }, refs);
}

// ---- Types ----

type QRCodeLevel = "L" | "M" | "Q" | "H";

interface QRCodeCanvasOpts {
  errorCorrectionLevel: QRCodeLevel;
  type?: "image/png" | "image/jpeg" | "image/webp";
  quality?: number;
  margin?: number;
  color?: { dark: string; light: string };
  width?: number;
}

// ---- Store ----

interface StoreState {
  dataUrl: string | null;
  svgString: string | null;
  isGenerating: boolean;
  error: Error | null;
  generationKey: string;
}

interface Store {
  subscribe: (callback: () => void) => () => void;
  getState: () => StoreState;
  setState: <K extends keyof StoreState>(key: K, value: StoreState[K]) => void;
  setStates: (updates: Partial<StoreState>) => void;
  notify: () => void;
}

interface QRCodeContextValue {
  value: string;
  size: number;
  margin: number;
  level: QRCodeLevel;
  backgroundColor: string;
  foregroundColor: string;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

const StoreContext = React.createContext<Store | null>(null);

function useStore<T>(selector: (state: StoreState) => T): T {
  const store = React.useContext(StoreContext);
  if (!store) {
    throw new Error("`useQRCode` must be used within QRCode");
  }
  const getSnapshot = React.useCallback(
    () => selector(store.getState()),
    [store, selector],
  );
  return React.useSyncExternalStore(store.subscribe, getSnapshot, getSnapshot);
}

const QRCodeContext = React.createContext<QRCodeContextValue | null>(null);

function useQRCodeContext(consumerName: string) {
  const context = React.useContext(QRCodeContext);
  if (!context) {
    throw new Error(`\`${consumerName}\` must be used within QRCode`);
  }
  return context;
}

// ---- QRCode Root ----

interface QRCodeProps extends Omit<React.ComponentProps<"div">, "onError"> {
  value: string;
  size?: number;
  level?: QRCodeLevel;
  margin?: number;
  quality?: number;
  backgroundColor?: string;
  foregroundColor?: string;
  onError?: (error: Error) => void;
  onGenerated?: () => void;
}

function QRCode(props: QRCodeProps) {
  const {
    value,
    size = 200,
    level = "M",
    margin = 1,
    quality = 0.92,
    backgroundColor = "#ffffff",
    foregroundColor = "#000000",
    onError,
    onGenerated,
    className,
    style,
    ...rootProps
  } = props;

  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const listenersRef = useLazyRef(() => new Set<() => void>());
  const stateRef = useLazyRef<StoreState>(() => ({
    dataUrl: null,
    svgString: null,
    isGenerating: false,
    error: null,
    generationKey: "",
  }));

  const store = React.useMemo<Store>(() => ({
    subscribe: (cb) => {
      listenersRef.current.add(cb);
      return () => listenersRef.current.delete(cb);
    },
    getState: () => stateRef.current,
    setState: (key, value) => {
      if (Object.is(stateRef.current[key], value)) return;
      stateRef.current[key] = value;
      store.notify();
    },
    setStates: (updates) => {
      let hasChanged = false;
      for (const key of Object.keys(updates) as Array<keyof StoreState>) {
        const val = updates[key];
        if (val !== undefined && !Object.is(stateRef.current[key], val)) {
          Object.assign(stateRef.current, { [key]: val });
          hasChanged = true;
        }
      }
      if (hasChanged) store.notify();
    },
    notify: () => {
      for (const cb of listenersRef.current) cb();
    },
  }), [listenersRef, stateRef]);

  const canvasOpts = React.useMemo<QRCodeCanvasOpts>(
    () => ({
      errorCorrectionLevel: level,
      type: "image/png",
      quality,
      margin,
      color: { dark: foregroundColor, light: backgroundColor },
      width: size,
    }),
    [level, margin, foregroundColor, backgroundColor, size, quality],
  );

  const generationKey = React.useMemo(() => {
    if (!value) return "";
    return JSON.stringify({ value, size, level, margin, quality, foregroundColor, backgroundColor });
  }, [value, level, margin, foregroundColor, backgroundColor, size, quality]);

  const onQRCodeGenerate = React.useCallback(
    async (targetGenerationKey: string) => {
      if (!value || !targetGenerationKey) return;
      const currentState = store.getState();
      if (currentState.isGenerating || currentState.generationKey === targetGenerationKey) return;

      store.setStates({ isGenerating: true, error: null });

      try {
        const QRCodeLib = (await import("qrcode")).default;
        let dataUrl: string | null = null;
        try {
          dataUrl = await QRCodeLib.toDataURL(value, canvasOpts);
        } catch {
          dataUrl = null;
        }

        if (canvasRef.current) {
          await QRCodeLib.toCanvas(canvasRef.current, value, canvasOpts);
        }

        const svgString = await QRCodeLib.toString(value, {
          errorCorrectionLevel: canvasOpts.errorCorrectionLevel,
          margin: canvasOpts.margin,
          color: canvasOpts.color,
          width: canvasOpts.width,
          type: "svg",
        });

        store.setStates({ dataUrl, svgString, isGenerating: false, generationKey: targetGenerationKey });
        onGenerated?.();
      } catch (error) {
        const parsedError = error instanceof Error ? error : new Error("Failed to generate QR code");
        store.setStates({ error: parsedError, isGenerating: false });
        onError?.(parsedError);
      }
    },
    [value, canvasOpts, store, onError, onGenerated],
  );

  const contextValue = React.useMemo<QRCodeContextValue>(
    () => ({ value, size, level, margin, backgroundColor, foregroundColor, canvasRef }),
    [value, size, backgroundColor, foregroundColor, level, margin],
  );

  React.useLayoutEffect(() => {
    if (generationKey) {
      const rafId = requestAnimationFrame(() => {
        onQRCodeGenerate(generationKey);
      });
      return () => cancelAnimationFrame(rafId);
    }
  }, [generationKey, onQRCodeGenerate]);

  return (
    <StoreContext.Provider value={store}>
      <QRCodeContext.Provider value={contextValue}>
        <div
          data-slot="qr-code"
          {...rootProps}
          className={cn("relative flex flex-col items-center gap-2", className)}
          style={{ "--qr-code-size": `${size}px`, ...style } as React.CSSProperties}
        />
      </QRCodeContext.Provider>
    </StoreContext.Provider>
  );
}

// ---- QRCode Canvas ----

function QRCodeCanvas(props: React.ComponentProps<"canvas">) {
  const { className, ref, ...canvasProps } = props;
  const context = useQRCodeContext("QRCodeCanvas");
  const generationKey = useStore((state) => state.generationKey);
  const composedRef = useComposedRefs(ref, context.canvasRef);

  return (
    <canvas
      data-slot="qr-code-canvas"
      {...canvasProps}
      ref={composedRef}
      width={context.size}
      height={context.size}
      className={cn("relative", !generationKey && "invisible", className)}
      style={{ maxWidth: context.size, maxHeight: context.size }}
    />
  );
}

// ---- QRCode SVG ----

function QRCodeSvg(props: React.ComponentProps<"div">) {
  const { className, style, ...svgProps } = props;
  const context = useQRCodeContext("QRCodeSvg");
  const svgString = useStore((state) => state.svgString);

  if (!svgString) return null;

  return (
    <div
      data-slot="qr-code-svg"
      {...svgProps}
      className={cn("relative", className)}
      style={{ width: context.size, height: context.size, maxWidth: context.size, maxHeight: context.size, ...style }}
      dangerouslySetInnerHTML={{ __html: svgString }}
    />
  );
}

// ---- QRCode Image ----

function QRCodeImage(props: React.ComponentProps<"img">) {
  const { alt = "QR Code", className, ...imageProps } = props;
  const context = useQRCodeContext("QRCodeImage");
  const dataUrl = useStore((state) => state.dataUrl);

  if (!dataUrl) return null;

  return (
    <img
      data-slot="qr-code-image"
      {...imageProps}
      src={dataUrl}
      alt={alt}
      width={context.size}
      height={context.size}
      className={cn("relative", className)}
      style={{ maxWidth: context.size, maxHeight: context.size }}
    />
  );
}

// ---- QRCode Download ----

interface QRCodeDownloadProps extends React.ComponentProps<"button"> {
  filename?: string;
  format?: "png" | "svg";
}

function QRCodeDownload(props: QRCodeDownloadProps) {
  const { filename = "qrcode", format = "png", className, children, ...buttonProps } = props;
  const dataUrl = useStore((state) => state.dataUrl);
  const svgString = useStore((state) => state.svgString);

  const onClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      buttonProps.onClick?.(event);
      if (event.defaultPrevented) return;

      const link = document.createElement("a");
      if (format === "png" && dataUrl) {
        link.href = dataUrl;
        link.download = `${filename}.png`;
      } else if (format === "svg" && svgString) {
        const blob = new Blob([svgString], { type: "image/svg+xml" });
        link.href = URL.createObjectURL(blob);
        link.download = `${filename}.svg`;
      } else {
        return;
      }

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      if (format === "svg" && svgString) URL.revokeObjectURL(link.href);
    },
    [dataUrl, svgString, filename, format, buttonProps.onClick],
  );

  return (
    <button
      type="button"
      data-slot="qr-code-download"
      {...buttonProps}
      className={cn(className)}
      onClick={onClick}
    >
      {children ?? `Download ${format.toUpperCase()}`}
    </button>
  );
}

// ---- QRCode Overlay ----

function QRCodeOverlay(props: React.ComponentProps<"div">) {
  const { className, ...overlayProps } = props;
  return (
    <div
      data-slot="qr-code-overlay"
      {...overlayProps}
      className={cn(
        "absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-sm bg-background",
        className,
      )}
    />
  );
}

// ---- QRCode Skeleton ----

function QRCodeSkeleton(props: React.ComponentProps<"div">) {
  const { className, style, ...skeletonProps } = props;
  const context = useQRCodeContext("QRCodeSkeleton");
  const dataUrl = useStore((state) => state.dataUrl);
  const svgString = useStore((state) => state.svgString);
  const generationKey = useStore((state) => state.generationKey);

  if (dataUrl || svgString || generationKey) return null;

  return (
    <div
      data-slot="qr-code-skeleton"
      {...skeletonProps}
      className={cn("absolute animate-pulse bg-accent", className)}
      style={{ width: context.size, height: context.size, maxWidth: context.size, maxHeight: context.size, ...style }}
    />
  );
}

export {
  QRCode,
  QRCodeCanvas,
  QRCodeSvg,
  QRCodeImage,
  QRCodeOverlay,
  QRCodeSkeleton,
  QRCodeDownload,
  useStore as useQRCode,
  type QRCodeProps,
};
