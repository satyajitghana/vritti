"use client";

import { cva } from "class-variance-authority";
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

// ---- Timeline types ----

type Orientation = "vertical" | "horizontal";
type Variant = "default" | "alternate";
type Status = "completed" | "active" | "pending";

interface DivProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
}

type ItemElement = HTMLDivElement;

function getItemStatus(itemIndex: number, activeIndex?: number): Status {
  if (activeIndex === undefined) return "pending";
  if (itemIndex < activeIndex) return "completed";
  if (itemIndex === activeIndex) return "active";
  return "pending";
}

function getSortedEntries(
  entries: [string, React.RefObject<ItemElement | null>][],
) {
  return entries.sort((a, b) => {
    const elementA = a[1].current;
    const elementB = b[1].current;
    if (!elementA || !elementB) return 0;
    const position = elementA.compareDocumentPosition(elementB);
    if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
    if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
    return 0;
  });
}

// ---- Store ----

interface StoreState {
  items: Map<string, React.RefObject<ItemElement | null>>;
}

interface Store {
  subscribe: (callback: () => void) => () => void;
  getState: () => StoreState;
  notify: () => void;
  onItemRegister: (id: string, ref: React.RefObject<ItemElement | null>) => void;
  onItemUnregister: (id: string) => void;
  getNextItemStatus: (id: string, activeIndex?: number) => Status | undefined;
  getItemIndex: (id: string) => number;
}

const StoreContext = React.createContext<Store | null>(null);

function useStoreContext(consumerName: string) {
  const context = React.useContext(StoreContext);
  if (!context) {
    throw new Error(`\`${consumerName}\` must be used within Timeline`);
  }
  return context;
}

function useStore<T>(selector: (store: Store) => T): T {
  const store = React.useContext(StoreContext);
  if (!store) {
    throw new Error("`useStore` must be used within Timeline");
  }
  const getSnapshot = React.useCallback(
    () => selector(store),
    [store, selector],
  );
  return React.useSyncExternalStore(store.subscribe, getSnapshot, getSnapshot);
}

// ---- Context ----

interface TimelineContextValue {
  orientation: Orientation;
  variant: Variant;
  activeIndex?: number;
}

const TimelineContext = React.createContext<TimelineContextValue | null>(null);

function useTimelineContext(consumerName: string) {
  const context = React.useContext(TimelineContext);
  if (!context) {
    throw new Error(`\`${consumerName}\` must be used within Timeline`);
  }
  return context;
}

// ---- Timeline Root ----

const timelineVariants = cva(
  "relative flex [--timeline-connector-thickness:0.125rem] [--timeline-dot-size:0.875rem]",
  {
    variants: {
      orientation: {
        vertical: "flex-col",
        horizontal: "flex-row items-start",
      },
      variant: {
        default: "",
        alternate: "",
      },
    },
    compoundVariants: [
      { orientation: "vertical", variant: "default", class: "gap-6" },
      { orientation: "horizontal", variant: "default", class: "gap-8" },
      { orientation: "vertical", variant: "alternate", class: "relative w-full gap-3" },
      { orientation: "horizontal", variant: "alternate", class: "items-center gap-4" },
    ],
    defaultVariants: { orientation: "vertical", variant: "default" },
  },
);

interface TimelineProps extends React.ComponentProps<"div"> {
  orientation?: Orientation;
  variant?: Variant;
  activeIndex?: number;
}

function Timeline(props: TimelineProps) {
  const {
    orientation = "vertical",
    variant = "default",
    activeIndex,
    className,
    ...rootProps
  } = props;

  const listenersRef = useLazyRef(() => new Set<() => void>());
  const stateRef = useLazyRef<StoreState>(() => ({ items: new Map() }));

  const store = React.useMemo<Store>(() => ({
    subscribe: (cb) => {
      listenersRef.current.add(cb);
      return () => listenersRef.current.delete(cb);
    },
    getState: () => stateRef.current,
    notify: () => {
      for (const cb of listenersRef.current) cb();
    },
    onItemRegister: (id, ref) => {
      stateRef.current.items.set(id, ref);
      store.notify();
    },
    onItemUnregister: (id) => {
      stateRef.current.items.delete(id);
      store.notify();
    },
    getNextItemStatus: (id, activeIndex) => {
      const entries = Array.from(stateRef.current.items.entries());
      const sorted = getSortedEntries(entries);
      const idx = sorted.findIndex(([key]) => key === id);
      if (idx === -1 || idx === sorted.length - 1) return undefined;
      return getItemStatus(idx + 1, activeIndex);
    },
    getItemIndex: (id) => {
      const entries = Array.from(stateRef.current.items.entries());
      const sorted = getSortedEntries(entries);
      return sorted.findIndex(([key]) => key === id);
    },
  }), [listenersRef, stateRef]);

  const contextValue = React.useMemo<TimelineContextValue>(
    () => ({ orientation, variant, activeIndex }),
    [orientation, variant, activeIndex],
  );

  return (
    <StoreContext.Provider value={store}>
      <TimelineContext.Provider value={contextValue}>
        <div
          role="list"
          aria-orientation={orientation}
          data-slot="timeline"
          data-orientation={orientation}
          data-variant={variant}
          {...rootProps}
          className={cn(timelineVariants({ orientation, variant, className }))}
        />
      </TimelineContext.Provider>
    </StoreContext.Provider>
  );
}

// ---- Timeline Item ----

interface TimelineItemContextValue {
  id: string;
  status: Status;
  isAlternateRight: boolean;
}

const TimelineItemContext = React.createContext<TimelineItemContextValue | null>(null);

function useTimelineItemContext(consumerName: string) {
  const context = React.useContext(TimelineItemContext);
  if (!context) {
    throw new Error(`\`${consumerName}\` must be used within TimelineItem`);
  }
  return context;
}

const timelineItemVariants = cva("relative flex", {
  variants: {
    orientation: { vertical: "", horizontal: "" },
    variant: { default: "", alternate: "" },
    isAlternateRight: { true: "", false: "" },
  },
  compoundVariants: [
    { orientation: "vertical", variant: "default", class: "gap-3 pb-8 last:pb-0" },
    { orientation: "horizontal", variant: "default", class: "flex-col gap-3" },
    { orientation: "vertical", variant: "alternate", isAlternateRight: false, class: "w-1/2 gap-3 pr-6 pb-12 last:pb-0" },
    { orientation: "vertical", variant: "alternate", isAlternateRight: true, class: "ml-auto w-1/2 flex-row-reverse gap-3 pb-12 pl-6 last:pb-0" },
    { orientation: "horizontal", variant: "alternate", class: "grid min-w-0 grid-rows-[1fr_auto_1fr] gap-3" },
  ],
  defaultVariants: { orientation: "vertical", variant: "default", isAlternateRight: false },
});

function TimelineItem(props: React.ComponentProps<"div">) {
  const { className, id, ref, ...itemProps } = props;

  const { orientation, variant, activeIndex } = useTimelineContext("TimelineItem");
  const store = useStoreContext("TimelineItem");

  const instanceId = React.useId();
  const itemId = id ?? instanceId;
  const itemRef = React.useRef<ItemElement | null>(null);
  const composedRef = useComposedRefs(ref, itemRef);

  const itemIndex = useStore((state) => state.getItemIndex(itemId));

  const status = React.useMemo<Status>(
    () => getItemStatus(itemIndex, activeIndex),
    [activeIndex, itemIndex],
  );

  useIsomorphicLayoutEffect(() => {
    store.onItemRegister(itemId, itemRef);
    return () => { store.onItemUnregister(itemId); };
  }, [id, store]);

  const isAlternateRight = variant === "alternate" && itemIndex % 2 === 1;

  const itemContextValue = React.useMemo<TimelineItemContextValue>(
    () => ({ id: itemId, status, isAlternateRight }),
    [itemId, status, isAlternateRight],
  );

  return (
    <TimelineItemContext.Provider value={itemContextValue}>
      <div
        role="listitem"
        aria-current={status === "active" ? "step" : undefined}
        data-slot="timeline-item"
        data-status={status}
        data-orientation={orientation}
        data-alternate-right={isAlternateRight ? "" : undefined}
        id={itemId}
        {...itemProps}
        ref={composedRef}
        className={cn(timelineItemVariants({ orientation, variant, isAlternateRight, className }))}
      />
    </TimelineItemContext.Provider>
  );
}

// ---- Timeline Content ----

const timelineContentVariants = cva("flex-1", {
  variants: {
    orientation: { vertical: "", horizontal: "" },
    variant: { default: "", alternate: "" },
    isAlternateRight: { true: "", false: "" },
  },
  compoundVariants: [
    { variant: "alternate", orientation: "vertical", isAlternateRight: false, class: "text-right" },
    { variant: "alternate", orientation: "horizontal", isAlternateRight: false, class: "row-start-3 pt-2" },
    { variant: "alternate", orientation: "horizontal", isAlternateRight: true, class: "row-start-1 pb-2" },
  ],
  defaultVariants: { orientation: "vertical", variant: "default", isAlternateRight: false },
});

function TimelineContent(props: React.ComponentProps<"div">) {
  const { className, ...contentProps } = props;
  const { variant, orientation } = useTimelineContext("TimelineContent");
  const { status, isAlternateRight } = useTimelineItemContext("TimelineContent");

  return (
    <div
      data-slot="timeline-content"
      data-status={status}
      {...contentProps}
      className={cn(timelineContentVariants({ orientation, variant, isAlternateRight, className }))}
    />
  );
}

// ---- Timeline Dot ----

const timelineDotVariants = cva(
  "relative z-10 flex size-[var(--timeline-dot-size)] shrink-0 items-center justify-center rounded-full border-2 bg-background",
  {
    variants: {
      status: {
        completed: "border-primary",
        active: "border-primary",
        pending: "border-border",
      },
      orientation: { vertical: "", horizontal: "" },
      variant: { default: "", alternate: "" },
      isAlternateRight: { true: "", false: "" },
    },
    compoundVariants: [
      { variant: "alternate", orientation: "vertical", isAlternateRight: false, class: "absolute -right-[calc(var(--timeline-dot-size)/2-var(--timeline-connector-thickness)/2)] bg-background" },
      { variant: "alternate", orientation: "vertical", isAlternateRight: true, class: "absolute -left-[calc(var(--timeline-dot-size)/2-var(--timeline-connector-thickness)/2)] bg-background" },
      { variant: "alternate", orientation: "horizontal", class: "row-start-2 bg-background" },
    ],
    defaultVariants: { status: "pending", orientation: "vertical", variant: "default", isAlternateRight: false },
  },
);

function TimelineDot(props: React.ComponentProps<"div">) {
  const { className, ...dotProps } = props;
  const { orientation, variant } = useTimelineContext("TimelineDot");
  const { status, isAlternateRight } = useTimelineItemContext("TimelineDot");

  return (
    <div
      data-slot="timeline-dot"
      data-status={status}
      data-orientation={orientation}
      {...dotProps}
      className={cn(timelineDotVariants({ status, orientation, variant, isAlternateRight, className }))}
    />
  );
}

// ---- Timeline Connector ----

const timelineConnectorVariants = cva("absolute z-0", {
  variants: {
    isCompleted: { true: "bg-primary", false: "bg-border" },
    orientation: { vertical: "", horizontal: "" },
    variant: { default: "", alternate: "" },
    isAlternateRight: { true: "", false: "" },
  },
  compoundVariants: [
    { orientation: "vertical", variant: "default", class: "start-[calc(var(--timeline-dot-size)/2-var(--timeline-connector-thickness)/2)] top-3 h-[calc(100%+0.5rem)] w-[var(--timeline-connector-thickness)]" },
    { orientation: "horizontal", variant: "default", class: "start-3 top-[calc(var(--timeline-dot-size)/2-var(--timeline-connector-thickness)/2)] h-[var(--timeline-connector-thickness)] w-[calc(100%+0.5rem)]" },
    { orientation: "vertical", variant: "alternate", isAlternateRight: false, class: "top-2 -right-[calc(var(--timeline-connector-thickness)/2)] h-full w-[var(--timeline-connector-thickness)]" },
    { orientation: "vertical", variant: "alternate", isAlternateRight: true, class: "top-2 -left-[calc(var(--timeline-connector-thickness)/2)] h-full w-[var(--timeline-connector-thickness)]" },
    { orientation: "horizontal", variant: "alternate", class: "top-[calc(var(--timeline-dot-size)/2-var(--timeline-connector-thickness)/2)] left-3 row-start-2 h-[var(--timeline-connector-thickness)] w-[calc(100%+0.5rem)]" },
  ],
  defaultVariants: { isCompleted: false, orientation: "vertical", variant: "default", isAlternateRight: false },
});

interface TimelineConnectorProps extends React.ComponentProps<"div"> {
  forceMount?: boolean;
}

function TimelineConnector(props: TimelineConnectorProps) {
  const { forceMount, className, ...connectorProps } = props;
  const { orientation, variant, activeIndex } = useTimelineContext("TimelineConnector");
  const { id, status, isAlternateRight } = useTimelineItemContext("TimelineConnector");

  const nextItemStatus = useStore((state) => state.getNextItemStatus(id, activeIndex));
  const isLastItem = nextItemStatus === undefined;

  if (!forceMount && isLastItem) return null;

  const isConnectorCompleted = nextItemStatus === "completed" || nextItemStatus === "active";

  return (
    <div
      aria-hidden="true"
      data-slot="timeline-connector"
      data-completed={isConnectorCompleted ? "" : undefined}
      data-status={status}
      data-orientation={orientation}
      {...connectorProps}
      className={cn(timelineConnectorVariants({ isCompleted: isConnectorCompleted, orientation, variant, isAlternateRight, className }))}
    />
  );
}

// ---- Timeline Header, Title, Description, Time ----

function TimelineHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="timeline-header" {...props} className={cn("flex flex-col gap-1", className)} />;
}

function TimelineTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="timeline-title" {...props} className={cn("font-semibold leading-none", className)} />;
}

function TimelineDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="timeline-description" {...props} className={cn("text-muted-foreground text-sm", className)} />;
}

function TimelineTime({ className, ...props }: React.ComponentProps<"time">) {
  return <time data-slot="timeline-time" {...props} className={cn("text-muted-foreground text-xs", className)} />;
}

export {
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  TimelineHeader,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
  type TimelineProps,
};
