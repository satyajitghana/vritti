"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

// ---- Inlined hooks ----

function useIsomorphicLayoutEffect(
  fn: React.EffectCallback,
  deps: React.DependencyList,
) {
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional
  return (typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect)(fn, deps);
}

function useLazyRef<T>(init: () => T) {
  const ref = React.useRef<T | null>(null);
  if (ref.current === null) ref.current = init();
  return ref as React.MutableRefObject<T>;
}

function useAsRef<T>(value: T) {
  const ref = React.useRef(value);
  ref.current = value;
  return ref;
}

function useComposedRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional
  return React.useCallback((node: T) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node);
      else if (ref && typeof ref === "object") (ref as React.MutableRefObject<T | null>).current = node;
    }
  }, refs);
}

// ---- Constants ----

const DEFAULT_GAP = 8;
const DEFAULT_OFFSET = 8;
const DEFAULT_ITEM_DELAY = 50;
const DEFAULT_HOVER_CLOSE_DELAY = 100;
const DEFAULT_ANIMATION_DURATION = 200;

type Side = "top" | "right" | "bottom" | "left";
type ActivationMode = "click" | "hover";

function getDataState(open: boolean) {
  return open ? "open" : "closed";
}

function getTransformOrigin(side: Side) {
  switch (side) {
    case "top": return "bottom center";
    case "bottom": return "top center";
    case "left": return "right center";
    case "right": return "left center";
  }
}

// ---- Store ----

interface StoreState { open: boolean }

interface Store {
  subscribe: (callback: () => void) => () => void;
  getState: () => StoreState;
  setState: <K extends keyof StoreState>(key: K, value: StoreState[K]) => void;
  notify: () => void;
}

const StoreContext = React.createContext<Store | null>(null);

function useStoreContext(consumerName: string) {
  const context = React.useContext(StoreContext);
  if (!context) throw new Error(`\`${consumerName}\` must be used within SpeedDial`);
  return context;
}

function useStore<T>(selector: (state: StoreState) => T, ogStore?: Store | null): T {
  const contextStore = React.useContext(StoreContext);
  const store = ogStore ?? contextStore;
  if (!store) throw new Error("`useStore` must be used within SpeedDial");
  const getSnapshot = React.useCallback(() => selector(store.getState()), [store, selector]);
  return React.useSyncExternalStore(store.subscribe, getSnapshot, getSnapshot);
}

// ---- Context ----

interface NodeData {
  id: string;
  ref: React.RefObject<HTMLElement | null>;
  disabled: boolean;
}

interface SpeedDialContextValue {
  onNodeRegister: (node: NodeData) => void;
  onNodeUnregister: (id: string) => void;
  getNodes: () => NodeData[];
  contentId: string;
  rootRef: React.RefObject<HTMLDivElement | null>;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  isPointerInsideReactTreeRef: React.RefObject<boolean>;
  hoverCloseTimerRef: React.RefObject<number | null>;
  side: Side;
  activationMode: ActivationMode;
  delay: number;
  disabled: boolean;
}

const SpeedDialContext = React.createContext<SpeedDialContextValue | null>(null);

function useSpeedDialContext(consumerName: string) {
  const context = React.useContext(SpeedDialContext);
  if (!context) throw new Error(`\`${consumerName}\` must be used within SpeedDial`);
  return context;
}

// ---- SpeedDial Root ----

interface SpeedDialProps extends React.ComponentProps<"div"> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: Side;
  activationMode?: ActivationMode;
  delay?: number;
  disabled?: boolean;
}

function SpeedDial(props: SpeedDialProps) {
  const {
    open: openProp,
    defaultOpen,
    onOpenChange,
    onPointerDownCapture: onPointerDownCaptureProp,
    side = "top",
    activationMode = "click",
    delay = 250,
    disabled = false,
    className,
    ref,
    ...rootProps
  } = props;

  const contentId = React.useId();
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const composedRefs = useComposedRefs(ref, rootRef);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const nodesRef = React.useRef<Map<string, NodeData>>(new Map());
  const isPointerInsideReactTreeRef = React.useRef(false);
  const hoverCloseTimerRef = React.useRef<number | null>(null);

  const listenersRef = useLazyRef(() => new Set<() => void>());
  const stateRef = useLazyRef<StoreState>(() => ({ open: openProp ?? defaultOpen ?? false }));
  const propsRef = useAsRef({ onOpenChange, onPointerDownCapture: onPointerDownCaptureProp });

  const store = React.useMemo<Store>(() => ({
    subscribe: (cb) => { listenersRef.current.add(cb); return () => listenersRef.current.delete(cb); },
    getState: () => stateRef.current,
    setState: (key, value) => {
      if (Object.is(stateRef.current[key], value)) return;
      if (key === "open" && typeof value === "boolean") {
        stateRef.current.open = value;
        propsRef.current.onOpenChange?.(value);
      } else {
        stateRef.current[key] = value;
      }
      store.notify();
    },
    notify: () => { for (const cb of listenersRef.current) cb(); },
  }), [listenersRef, stateRef, propsRef]);

  const getNodes = React.useCallback(() => {
    return Array.from(nodesRef.current.values())
      .filter((node) => node.ref.current)
      .sort((a, b) => {
        const ea = a.ref.current;
        const eb = b.ref.current;
        if (!ea || !eb) return 0;
        const pos = ea.compareDocumentPosition(eb);
        if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
        if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
        return 0;
      });
  }, []);

  const onNodeRegister = React.useCallback((node: NodeData) => { nodesRef.current.set(node.id, node); }, []);
  const onNodeUnregister = React.useCallback((id: string) => { nodesRef.current.delete(id); }, []);

  useIsomorphicLayoutEffect(() => {
    if (openProp !== undefined) store.setState("open", openProp);
  }, [openProp]);

  const open = useStore((state) => state.open, store);

  const contextValue = React.useMemo<SpeedDialContextValue>(
    () => ({
      getNodes, onNodeRegister, onNodeUnregister, contentId, rootRef, triggerRef,
      isPointerInsideReactTreeRef, hoverCloseTimerRef, side, activationMode, delay, disabled,
    }),
    [getNodes, onNodeRegister, onNodeUnregister, contentId, side, activationMode, delay, disabled],
  );

  return (
    <StoreContext.Provider value={store}>
      <SpeedDialContext.Provider value={contextValue}>
        <div
          data-slot="speed-dial"
          data-state={getDataState(open)}
          data-disabled={disabled}
          {...rootProps}
          ref={composedRefs}
          className={cn("relative flex flex-col items-end", className)}
        />
      </SpeedDialContext.Provider>
    </StoreContext.Provider>
  );
}

// ---- SpeedDial Trigger ----

interface SpeedDialTriggerProps extends React.ComponentProps<"button"> {}

function SpeedDialTrigger(props: SpeedDialTriggerProps) {
  const {
    onClick: onClickProp,
    onMouseEnter: onMouseEnterProp,
    onMouseLeave: onMouseLeaveProp,
    className,
    disabled: disabledProp,
    id,
    ref,
    ...triggerProps
  } = props;

  const store = useStoreContext("SpeedDialTrigger");
  const { onNodeRegister, onNodeUnregister, contentId, hoverCloseTimerRef, triggerRef, activationMode, delay, disabled } =
    useSpeedDialContext("SpeedDialTrigger");

  const open = useStore((state) => state.open);
  const isDisabled = disabledProp || disabled;

  const instanceId = React.useId();
  const triggerId = id ?? instanceId;
  const composedRef = useComposedRefs(ref, triggerRef);
  const hoverOpenTimerRef = React.useRef<number | null>(null);

  useIsomorphicLayoutEffect(() => {
    onNodeRegister({ id: triggerId, ref: triggerRef, disabled: !!isDisabled });
    return () => { onNodeUnregister(triggerId); };
  }, [onNodeRegister, onNodeUnregister, triggerId, isDisabled]);

  React.useEffect(() => {
    return () => {
      if (hoverOpenTimerRef.current) window.clearTimeout(hoverOpenTimerRef.current);
      if (hoverCloseTimerRef.current) window.clearTimeout(hoverCloseTimerRef.current);
    };
  }, [hoverCloseTimerRef]);

  const onClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    onClickProp?.(event);
    if (event.defaultPrevented) return;
    if (hoverOpenTimerRef.current) { window.clearTimeout(hoverOpenTimerRef.current); hoverOpenTimerRef.current = null; }
    if (hoverCloseTimerRef.current) { window.clearTimeout(hoverCloseTimerRef.current); hoverCloseTimerRef.current = null; }
    store.setState("open", !open);
  }, [onClickProp, store, open, hoverCloseTimerRef]);

  const onMouseEnter = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    onMouseEnterProp?.(event);
    if (event.defaultPrevented || activationMode !== "hover" || isDisabled) return;
    if (hoverCloseTimerRef.current) { window.clearTimeout(hoverCloseTimerRef.current); hoverCloseTimerRef.current = null; }
    if (hoverOpenTimerRef.current) window.clearTimeout(hoverOpenTimerRef.current);
    hoverOpenTimerRef.current = window.setTimeout(() => { store.setState("open", true); }, delay);
  }, [onMouseEnterProp, activationMode, isDisabled, store, delay, hoverCloseTimerRef]);

  const onMouseLeave = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    onMouseLeaveProp?.(event);
    if (event.defaultPrevented || activationMode !== "hover" || isDisabled) return;
    if (hoverOpenTimerRef.current) { window.clearTimeout(hoverOpenTimerRef.current); hoverOpenTimerRef.current = null; }
    hoverCloseTimerRef.current = window.setTimeout(() => { store.setState("open", false); }, DEFAULT_HOVER_CLOSE_DELAY);
  }, [onMouseLeaveProp, activationMode, isDisabled, store, hoverCloseTimerRef]);

  return (
    <button
      type="button"
      id={triggerId}
      aria-controls={contentId}
      aria-expanded={open}
      aria-haspopup="menu"
      data-slot="speed-dial-trigger"
      data-state={getDataState(open)}
      disabled={isDisabled}
      {...triggerProps}
      ref={composedRef}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
}

// ---- SpeedDial Item Context ----

interface SpeedDialItemImplContextValue {
  delay: number;
  open: boolean;
}

const SpeedDialItemImplContext = React.createContext<SpeedDialItemImplContextValue | null>(null);

function useSpeedDialItemImplContext() {
  return React.useContext(SpeedDialItemImplContext);
}

// ---- SpeedDial Content ----

const speedDialContentVariants = cva(
  "absolute z-50 flex gap-[var(--speed-dial-gap)] data-[state=closed]:pointer-events-none",
  {
    variants: {
      side: {
        top: "flex-col-reverse items-end",
        bottom: "flex-col items-end",
        left: "flex-row-reverse items-center",
        right: "flex-row items-center",
      },
    },
    defaultVariants: { side: "top" },
  },
);

interface SpeedDialContentProps extends React.ComponentProps<"div">, VariantProps<typeof speedDialContentVariants> {
  offset?: number;
  gap?: number;
  forceMount?: boolean;
}

function SpeedDialContent(props: SpeedDialContentProps) {
  const {
    offset = DEFAULT_OFFSET,
    gap = DEFAULT_GAP,
    forceMount = false,
    onMouseEnter: onMouseEnterProp,
    onMouseLeave: onMouseLeaveProp,
    className,
    children,
    style,
    ref,
    ...contentProps
  } = props;

  const store = useStoreContext("SpeedDialContent");
  const open = useStore((state) => state.open);
  const { contentId, side, triggerRef, hoverCloseTimerRef, activationMode } = useSpeedDialContext("SpeedDialContent");

  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const composedRef = useComposedRefs(ref, contentRef);
  const transformOrigin = React.useMemo(() => getTransformOrigin(side), [side]);
  const orientation = side === "top" || side === "bottom" ? "vertical" : "horizontal";

  const [renderState, setRenderState] = React.useState({ shouldRender: false, animating: false });
  const [position, setPosition] = React.useState<React.CSSProperties>({});

  React.useEffect(() => {
    if (open) {
      setRenderState((prev) => ({ ...prev, shouldRender: true }));
      const raf = requestAnimationFrame(() => { setRenderState((prev) => ({ ...prev, animating: true })); });
      return () => cancelAnimationFrame(raf);
    } else {
      setRenderState((prev) => ({ ...prev, animating: false }));
      if (!forceMount) {
        const childCount = React.Children.count(children);
        const totalDuration = (childCount - 1) * DEFAULT_ITEM_DELAY + DEFAULT_ANIMATION_DURATION;
        const timer = window.setTimeout(() => {
          setRenderState((prev) => ({ ...prev, shouldRender: false }));
        }, totalDuration);
        return () => clearTimeout(timer);
      }
    }
  }, [open, forceMount, children]);

  useIsomorphicLayoutEffect(() => {
    if (!triggerRef.current || !open) return;
    const newPosition: React.CSSProperties = {};
    switch (side) {
      case "top": newPosition.bottom = `calc(100% + ${offset}px)`; newPosition.right = "0"; break;
      case "bottom": newPosition.top = `calc(100% + ${offset}px)`; newPosition.right = "0"; break;
      case "left": newPosition.right = `calc(100% + ${offset}px)`; newPosition.top = "0"; break;
      case "right": newPosition.left = `calc(100% + ${offset}px)`; newPosition.top = "0"; break;
    }
    setPosition(newPosition);
  }, [open, side, offset]);

  React.useEffect(() => {
    if (!open) return;
    const ownerDocument = contentRef.current?.ownerDocument ?? document;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") store.setState("open", false);
    };
    ownerDocument.addEventListener("keydown", onKeyDown);
    return () => ownerDocument.removeEventListener("keydown", onKeyDown);
  }, [open, store]);

  const onMouseEnter = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    onMouseEnterProp?.(event);
    if (event.defaultPrevented || activationMode !== "hover") return;
    if (hoverCloseTimerRef.current) { window.clearTimeout(hoverCloseTimerRef.current); hoverCloseTimerRef.current = null; }
  }, [onMouseEnterProp, hoverCloseTimerRef, activationMode]);

  const onMouseLeave = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    onMouseLeaveProp?.(event);
    if (event.defaultPrevented || activationMode !== "hover") return;
    hoverCloseTimerRef.current = window.setTimeout(() => { store.setState("open", false); }, DEFAULT_HOVER_CLOSE_DELAY);
  }, [onMouseLeaveProp, hoverCloseTimerRef, store, activationMode]);

  const shouldMount = forceMount || renderState.shouldRender;
  if (!shouldMount) return null;

  return (
    <div
      id={contentId}
      role="menu"
      aria-orientation={orientation}
      data-slot="speed-dial-content"
      data-state={getDataState(renderState.animating)}
      data-orientation={orientation}
      data-side={side}
      {...contentProps}
      ref={composedRef}
      className={cn(speedDialContentVariants({ side, className }))}
      style={{
        "--speed-dial-gap": `${gap}px`,
        "--speed-dial-offset": `${offset}px`,
        "--speed-dial-transform-origin": transformOrigin,
        ...position,
        ...style,
      } as React.CSSProperties}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {(() => {
        const totalChildren = React.Children.count(children);
        return React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return child;
          const itemDelay = renderState.animating
            ? index * DEFAULT_ITEM_DELAY
            : (totalChildren - index - 1) * DEFAULT_ITEM_DELAY;
          return (
            <SpeedDialItemImplContext.Provider key={child.key ?? index} value={{ delay: itemDelay, open: renderState.animating }}>
              {child}
            </SpeedDialItemImplContext.Provider>
          );
        });
      })()}
    </div>
  );
}

// ---- SpeedDial Item ----

const speedDialItemVariants = cva(
  "flex items-center gap-2 transition-all [transition-delay:var(--speed-dial-delay)] [transition-duration:var(--speed-dial-animation-duration)] data-[state=open]:translate-x-0 data-[state=open]:translate-y-0 data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
  {
    variants: {
      side: {
        top: "justify-end",
        bottom: "justify-end",
        left: "flex-row-reverse justify-start",
        right: "justify-start",
      },
    },
    compoundVariants: [
      { side: "top", className: "data-[state=closed]:translate-y-2" },
      { side: "bottom", className: "data-[state=closed]:-translate-y-2" },
      { side: "left", className: "data-[state=closed]:translate-x-2" },
      { side: "right", className: "data-[state=closed]:-translate-x-2" },
    ],
    defaultVariants: { side: "top" },
  },
);

interface SpeedDialItemContextValue {
  actionId: string;
  labelId: string;
}

const SpeedDialItemContext = React.createContext<SpeedDialItemContextValue | null>(null);

function useSpeedDialItemContext(consumerName: string) {
  const context = React.useContext(SpeedDialItemContext);
  if (!context) throw new Error(`\`${consumerName}\` must be used within SpeedDialItem`);
  return context;
}

function SpeedDialItem(props: React.ComponentProps<"div">) {
  const { className, style, children, ...itemProps } = props;
  const { side } = useSpeedDialContext("SpeedDialItem");
  const implContext = useSpeedDialItemImplContext();
  const delay = implContext?.delay ?? 0;
  const open = implContext?.open ?? false;

  const actionId = React.useId();
  const labelId = React.useId();
  const contextValue = React.useMemo(() => ({ actionId, labelId }), [actionId, labelId]);

  return (
    <SpeedDialItemContext.Provider value={contextValue}>
      <div
        role="none"
        data-slot="speed-dial-item"
        data-state={getDataState(open)}
        data-side={side}
        {...itemProps}
        className={cn(speedDialItemVariants({ side, className }))}
        style={{
          "--speed-dial-animation-duration": `${DEFAULT_ANIMATION_DURATION}ms`,
          "--speed-dial-delay": `${delay}ms`,
          ...style,
        } as React.CSSProperties}
      >
        {children}
      </div>
    </SpeedDialItemContext.Provider>
  );
}

// ---- SpeedDial Action ----

interface SpeedDialActionProps extends Omit<React.ComponentProps<"button">, "onSelect"> {
  onSelect?: (event: Event) => void;
}

function SpeedDialAction(props: SpeedDialActionProps) {
  const { onSelect, onClick: onClickProp, className, disabled, id, ref, ...actionProps } = props;
  const store = useStoreContext("SpeedDialAction");
  const { onNodeRegister, onNodeUnregister } = useSpeedDialContext("SpeedDialAction");
  const { actionId: itemActionId, labelId } = useSpeedDialItemContext("SpeedDialAction");

  const actionId = id ?? itemActionId;
  const actionRef = React.useRef<HTMLButtonElement | null>(null);
  const composedRefs = useComposedRefs(ref, actionRef);

  useIsomorphicLayoutEffect(() => {
    onNodeRegister({ id: actionId, ref: actionRef, disabled: !!disabled });
    return () => { onNodeUnregister(actionId); };
  }, [onNodeRegister, onNodeUnregister, actionId, disabled]);

  const onClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    onClickProp?.(event);
    if (event.defaultPrevented) return;
    onSelect?.(event.nativeEvent);
    store.setState("open", false);
  }, [onClickProp, onSelect, store]);

  return (
    <button
      type="button"
      role="menuitem"
      id={actionId}
      aria-labelledby={labelId}
      data-slot="speed-dial-action"
      disabled={disabled}
      ref={composedRefs}
      {...actionProps}
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-full border bg-accent shadow-md hover:bg-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      onClick={onClick}
    />
  );
}

// ---- SpeedDial Label ----

function SpeedDialLabel({ className, ...props }: React.ComponentProps<"div">) {
  const { labelId } = useSpeedDialItemContext("SpeedDialLabel");

  return (
    <div
      id={labelId}
      data-slot="speed-dial-label"
      {...props}
      className={cn(
        "pointer-events-none whitespace-nowrap rounded-md bg-popover px-2 py-1 text-popover-foreground text-sm shadow-md",
        className,
      )}
    />
  );
}

export {
  SpeedDial,
  SpeedDialTrigger,
  SpeedDialContent,
  SpeedDialItem,
  SpeedDialAction,
  SpeedDialLabel,
  type SpeedDialProps,
};
