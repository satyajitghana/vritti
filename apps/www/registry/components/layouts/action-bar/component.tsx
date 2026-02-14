"use client";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { cn } from "@/lib/utils";

// ---- Inlined hooks ----

function useIsomorphicLayoutEffect(
  fn: React.EffectCallback,
  deps: React.DependencyList,
) {
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional
  return (typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect)(fn, deps);
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

// ---- Utility ----

type Orientation = "horizontal" | "vertical";

function focusFirst(
  candidates: React.RefObject<HTMLElement | null>[],
  preventScroll = false,
) {
  const prev = document.activeElement;
  for (const candidateRef of candidates) {
    const c = candidateRef.current;
    if (!c) continue;
    if (c === prev) return;
    c.focus({ preventScroll });
    if (document.activeElement !== prev) return;
  }
}

function wrapArray<T>(array: T[], startIndex: number) {
  return array.map<T>((_, index) => array[(startIndex + index) % array.length] as T);
}

// ---- Types ----

interface ItemData {
  id: string;
  ref: React.RefObject<HTMLButtonElement | null>;
  disabled: boolean;
}

// ---- ActionBar Context ----

interface ActionBarContextValue {
  onOpenChange?: (open: boolean) => void;
  orientation: Orientation;
  loop: boolean;
}

const ActionBarContext = React.createContext<ActionBarContextValue | null>(null);

function useActionBarContext(name: string) {
  const context = React.useContext(ActionBarContext);
  if (!context) throw new Error(`\`${name}\` must be used within ActionBar`);
  return context;
}

// ---- Focus Context ----

interface FocusContextValue {
  tabStopId: string | null;
  onItemFocus: (id: string) => void;
  onItemShiftTab: () => void;
  onFocusableItemAdd: () => void;
  onFocusableItemRemove: () => void;
  onItemRegister: (item: ItemData) => void;
  onItemUnregister: (id: string) => void;
  getItems: () => ItemData[];
}

const FocusContext = React.createContext<FocusContextValue | null>(null);

function useFocusContext(name: string) {
  const context = React.useContext(FocusContext);
  if (!context) throw new Error(`\`${name}\` must be used within ActionBarGroup`);
  return context;
}

// ---- ActionBar Root ----

interface ActionBarProps extends React.ComponentProps<"div"> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  align?: "start" | "center" | "end";
  alignOffset?: number;
  side?: "top" | "bottom";
  sideOffset?: number;
  portalContainer?: Element | DocumentFragment | null;
  orientation?: Orientation;
  loop?: boolean;
}

function ActionBar(props: ActionBarProps) {
  const {
    open = false,
    onOpenChange,
    onEscapeKeyDown,
    side = "bottom",
    alignOffset = 0,
    align = "center",
    sideOffset = 16,
    portalContainer: portalContainerProp,
    orientation = "horizontal",
    loop = true,
    className,
    style,
    ref,
    ...rootProps
  } = props;

  const [mounted, setMounted] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const composedRef = useComposedRefs(ref, rootRef);
  const propsRef = useAsRef({ onEscapeKeyDown, onOpenChange });

  React.useLayoutEffect(() => { setMounted(true); }, []);

  React.useEffect(() => {
    if (!open) return;
    const doc = rootRef.current?.ownerDocument ?? document;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        propsRef.current.onEscapeKeyDown?.(event);
        if (!event.defaultPrevented) propsRef.current.onOpenChange?.(false);
      }
    }
    doc.addEventListener("keydown", onKeyDown);
    return () => doc.removeEventListener("keydown", onKeyDown);
  }, [open, propsRef]);

  const contextValue = React.useMemo<ActionBarContextValue>(
    () => ({ onOpenChange, orientation, loop }),
    [onOpenChange, orientation, loop],
  );

  const portalContainer = portalContainerProp ?? (mounted ? globalThis.document?.body : null);
  if (!portalContainer || !open) return null;

  return (
    <ActionBarContext.Provider value={contextValue}>
      {ReactDOM.createPortal(
        <div
          role="toolbar"
          aria-orientation={orientation}
          data-slot="action-bar"
          data-side={side}
          data-align={align}
          data-orientation={orientation}
          {...rootProps}
          ref={composedRef}
          className={cn(
            "fixed z-50 rounded-lg border bg-card shadow-lg outline-none",
            "fade-in-0 zoom-in-95 animate-in duration-250 [animation-timing-function:cubic-bezier(0.16,1,0.3,1)]",
            "data-[side=bottom]:slide-in-from-bottom-4 data-[side=top]:slide-in-from-top-4",
            "motion-reduce:animate-none motion-reduce:transition-none",
            orientation === "horizontal"
              ? "flex flex-row items-center gap-2 px-2 py-1.5"
              : "flex flex-col items-start gap-2 px-1.5 py-2",
            className,
          )}
          style={{
            [side]: `${sideOffset}px`,
            ...(align === "center" && { left: "50%", translate: "-50% 0" }),
            ...(align === "start" && { left: `${alignOffset}px` }),
            ...(align === "end" && { right: `${alignOffset}px` }),
            ...style,
          }}
        />,
        portalContainer,
      )}
    </ActionBarContext.Provider>
  );
}

// ---- ActionBar Selection ----

function ActionBarSelection({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="action-bar-selection"
      {...props}
      className={cn(
        "flex items-center gap-1 rounded-sm border px-2 py-1 font-medium text-sm tabular-nums",
        className,
      )}
    />
  );
}

// ---- ActionBar Group ----

function ActionBarGroup(props: React.ComponentProps<"div">) {
  const {
    onBlur: onBlurProp,
    onFocus: onFocusProp,
    onMouseDown: onMouseDownProp,
    className,
    ref,
    ...groupProps
  } = props;

  const [tabStopId, setTabStopId] = React.useState<string | null>(null);
  const [isTabbingBackOut, setIsTabbingBackOut] = React.useState(false);
  const [focusableItemCount, setFocusableItemCount] = React.useState(0);
  const groupRef = React.useRef<HTMLDivElement>(null);
  const composedRef = useComposedRefs(ref, groupRef);
  const isClickFocusRef = React.useRef(false);
  const itemsRef = React.useRef<Map<string, ItemData>>(new Map());

  const { orientation } = useActionBarContext("ActionBarGroup");

  const getItems = React.useCallback(() => {
    return Array.from(itemsRef.current.values())
      .filter((item) => item.ref.current)
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

  const focusContextValue = React.useMemo<FocusContextValue>(
    () => ({
      tabStopId,
      onItemFocus: (id) => setTabStopId(id),
      onItemShiftTab: () => setIsTabbingBackOut(true),
      onFocusableItemAdd: () => setFocusableItemCount((c) => c + 1),
      onFocusableItemRemove: () => setFocusableItemCount((c) => c - 1),
      onItemRegister: (item) => { itemsRef.current.set(item.id, item); },
      onItemUnregister: (id) => { itemsRef.current.delete(id); },
      getItems,
    }),
    [tabStopId, getItems],
  );

  const onBlur = React.useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    onBlurProp?.(event);
    if (!event.defaultPrevented) setIsTabbingBackOut(false);
  }, [onBlurProp]);

  const onFocus = React.useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    onFocusProp?.(event);
    if (event.defaultPrevented) return;
    const isKeyboard = !isClickFocusRef.current;
    if (event.target === event.currentTarget && isKeyboard && !isTabbingBackOut) {
      const items = Array.from(itemsRef.current.values()).filter((i) => !i.disabled);
      const current = items.find((i) => i.id === tabStopId);
      const candidates = [current, ...items].filter(Boolean) as ItemData[];
      focusFirst(candidates.map((i) => i.ref), false);
    }
    isClickFocusRef.current = false;
  }, [onFocusProp, isTabbingBackOut, tabStopId]);

  const onMouseDown = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    onMouseDownProp?.(event);
    if (!event.defaultPrevented) isClickFocusRef.current = true;
  }, [onMouseDownProp]);

  return (
    <FocusContext.Provider value={focusContextValue}>
      <div
        role="group"
        data-slot="action-bar-group"
        data-orientation={orientation}
        tabIndex={isTabbingBackOut || focusableItemCount === 0 ? -1 : 0}
        {...groupProps}
        ref={composedRef}
        className={cn(
          "flex gap-2 outline-none",
          orientation === "horizontal" ? "items-center" : "w-full flex-col items-start",
          className,
        )}
        onBlur={onBlur}
        onFocus={onFocus}
        onMouseDown={onMouseDown}
      />
    </FocusContext.Provider>
  );
}

// ---- ActionBar Item ----

interface ActionBarItemProps extends Omit<React.ComponentProps<"button">, "onSelect"> {
  onSelect?: (event: Event) => void;
}

function ActionBarItem(props: ActionBarItemProps) {
  const {
    onSelect,
    onClick: onClickProp,
    onFocus: onFocusProp,
    onKeyDown: onKeyDownProp,
    onMouseDown: onMouseDownProp,
    className,
    disabled,
    ref,
    ...itemProps
  } = props;

  const itemRef = React.useRef<HTMLButtonElement>(null);
  const composedRef = useComposedRefs(ref, itemRef);
  const { onOpenChange, orientation, loop } = useActionBarContext("ActionBarItem");
  const focusContext = useFocusContext("ActionBarItem");
  const itemId = React.useId();
  const isTabStop = focusContext.tabStopId === itemId;

  useIsomorphicLayoutEffect(() => {
    focusContext.onItemRegister({ id: itemId, ref: itemRef, disabled: !!disabled });
    if (!disabled) focusContext.onFocusableItemAdd();
    return () => {
      focusContext.onItemUnregister(itemId);
      if (!disabled) focusContext.onFocusableItemRemove();
    };
  }, [focusContext, itemId, disabled]);

  const onClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    onClickProp?.(event);
    if (event.defaultPrevented) return;
    onSelect?.(event.nativeEvent);
    onOpenChange?.(false);
  }, [onClickProp, onOpenChange, onSelect]);

  const onFocus = React.useCallback((event: React.FocusEvent<HTMLButtonElement>) => {
    onFocusProp?.(event);
    if (!event.defaultPrevented) focusContext.onItemFocus(itemId);
  }, [onFocusProp, focusContext, itemId]);

  const onKeyDown = React.useCallback((event: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDownProp?.(event);
    if (event.defaultPrevented) return;
    if (event.key === "Tab" && event.shiftKey) { focusContext.onItemShiftTab(); return; }
    if (event.target !== event.currentTarget) return;
    let focusIntent: "first" | "last" | "prev" | "next" | undefined;
    if (orientation === "horizontal") {
      if (event.key === "ArrowLeft") focusIntent = "prev";
      else if (event.key === "ArrowRight") focusIntent = "next";
      else if (event.key === "Home") focusIntent = "first";
      else if (event.key === "End") focusIntent = "last";
    } else {
      if (event.key === "ArrowUp") focusIntent = "prev";
      else if (event.key === "ArrowDown") focusIntent = "next";
      else if (event.key === "Home") focusIntent = "first";
      else if (event.key === "End") focusIntent = "last";
    }
    if (focusIntent !== undefined) {
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      event.preventDefault();
      const items = focusContext.getItems().filter((i) => !i.disabled);
      let candidateRefs = items.map((i) => i.ref);
      if (focusIntent === "last") candidateRefs.reverse();
      else if (focusIntent === "prev" || focusIntent === "next") {
        if (focusIntent === "prev") candidateRefs.reverse();
        const currentIndex = candidateRefs.findIndex((r) => r.current === event.currentTarget);
        candidateRefs = loop ? wrapArray(candidateRefs, currentIndex + 1) : candidateRefs.slice(currentIndex + 1);
      }
      queueMicrotask(() => focusFirst(candidateRefs));
    }
  }, [onKeyDownProp, focusContext, orientation, loop]);

  const onMouseDown = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    onMouseDownProp?.(event);
    if (event.defaultPrevented) return;
    if (disabled) event.preventDefault();
    else focusContext.onItemFocus(itemId);
  }, [onMouseDownProp, focusContext, itemId, disabled]);

  return (
    <button
      type="button"
      data-slot="action-bar-item"
      disabled={disabled}
      tabIndex={isTabStop ? 0 : -1}
      {...itemProps}
      className={cn(
        "inline-flex h-8 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-secondary px-3 text-secondary-foreground text-sm font-medium shadow-sm transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        orientation === "vertical" && "w-full",
        className,
      )}
      ref={composedRef}
      onClick={onClick}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      onMouseDown={onMouseDown}
    />
  );
}

// ---- ActionBar Close ----

function ActionBarClose({ className, onClick, ...props }: React.ComponentProps<"button">) {
  const { onOpenChange } = useActionBarContext("ActionBarClose");
  const onCloseClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (!event.defaultPrevented) onOpenChange?.(false);
    },
    [onOpenChange, onClick],
  );

  return (
    <button
      type="button"
      data-slot="action-bar-close"
      {...props}
      className={cn(
        "rounded-xs opacity-70 outline-none hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      onClick={onCloseClick}
    />
  );
}

// ---- ActionBar Separator ----

interface ActionBarSeparatorProps extends React.ComponentProps<"div"> {
  orientation?: Orientation;
}

function ActionBarSeparator({ orientation: orientationProp, className, ...props }: ActionBarSeparatorProps) {
  const context = useActionBarContext("ActionBarSeparator");
  const orientation = orientationProp ?? context.orientation;

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      aria-hidden="true"
      data-slot="action-bar-separator"
      {...props}
      className={cn(
        "bg-border",
        orientation === "horizontal" ? "h-6 w-px" : "h-px w-full",
        className,
      )}
    />
  );
}

export {
  ActionBar,
  ActionBarSelection,
  ActionBarGroup,
  ActionBarItem,
  ActionBarClose,
  ActionBarSeparator,
  type ActionBarProps,
};
