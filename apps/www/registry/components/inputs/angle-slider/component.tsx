"use client";

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
    for (const r of refs) {
      if (typeof r === "function") r(node);
      else if (r && typeof r === "object") (r as React.MutableRefObject<T | null>).current = node;
    }
  }, refs);
}

// ---- Math utilities ----

function clamp(value: number, [min, max]: [number, number]) {
  return Math.min(max, Math.max(min, value));
}

function getDecimalCount(value: number) {
  return (String(value).split(".")[1] ?? "").length;
}

function roundValue(value: number, decimalCount: number) {
  const rounder = 10 ** decimalCount;
  return Math.round(value * rounder) / rounder;
}

function getNextSortedValues(prevValues: number[] = [], nextValue: number, atIndex: number) {
  const nextValues = [...prevValues];
  nextValues[atIndex] = nextValue;
  return nextValues.sort((a, b) => a - b);
}

function getClosestValueIndex(values: number[], nextValue: number) {
  if (values.length === 1) return 0;
  const distances = values.map((v) => Math.abs(v - nextValue));
  const closest = Math.min(...distances);
  return distances.indexOf(closest);
}

// ---- Store ----

const PAGE_KEYS = ["PageUp", "PageDown"];
const ARROW_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

interface StoreState {
  values: number[];
  valueIndexToChange: number;
  min: number;
  max: number;
  step: number;
  size: number;
  thickness: number;
  startAngle: number;
  endAngle: number;
  disabled: boolean;
  inverted: boolean;
}

interface Store {
  subscribe: (callback: () => void) => () => void;
  getState: () => StoreState;
  setState: <K extends keyof StoreState>(key: K, value: StoreState[K]) => void;
  notify: () => void;
  updateValue: (value: number, atIndex: number, options?: { commit?: boolean }) => void;
  getValueFromPointer: (clientX: number, clientY: number, rect: DOMRect) => number;
  getAngleFromValue: (value: number) => number;
  getPositionFromAngle: (angle: number) => { x: number; y: number };
}

const StoreContext = React.createContext<Store | null>(null);

function useStoreContext(name: string) {
  const context = React.useContext(StoreContext);
  if (!context) throw new Error(`\`${name}\` must be used within AngleSlider`);
  return context;
}

function useStore<T>(selector: (state: StoreState) => T): T {
  const store = useStoreContext("useStore");
  const getSnapshot = React.useCallback(() => selector(store.getState()), [store, selector]);
  return React.useSyncExternalStore(store.subscribe, getSnapshot, getSnapshot);
}

// ---- AngleSlider Root ----

interface AngleSliderProps extends Omit<React.ComponentProps<"div">, "defaultValue"> {
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  onValueCommit?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: number;
  thickness?: number;
  startAngle?: number;
  endAngle?: number;
  disabled?: boolean;
  inverted?: boolean;
}

function AngleSlider(props: AngleSliderProps) {
  const {
    value,
    defaultValue = [0],
    onValueChange,
    onValueCommit,
    min = 0,
    max = 360,
    step = 1,
    size = 60,
    thickness = 8,
    startAngle = -90,
    endAngle = 270,
    disabled = false,
    inverted = false,
    className,
    ref,
    onPointerMove: onPointerMoveProp,
    onPointerUp: onPointerUpProp,
    onPointerDown: onPointerDownProp,
    onKeyDown: onKeyDownProp,
    ...rootProps
  } = props;

  const listenersRef = useLazyRef(() => new Set<() => void>());
  const stateRef = useLazyRef<StoreState>(() => ({
    values: value ?? defaultValue,
    valueIndexToChange: 0,
    min, max, step, disabled, inverted, size, thickness, startAngle, endAngle,
  }));

  const propsRef = useAsRef({ onValueChange, onValueCommit, onPointerMove: onPointerMoveProp, onPointerUp: onPointerUpProp, onPointerDown: onPointerDownProp, onKeyDown: onKeyDownProp });

  const store = React.useMemo<Store>(() => ({
    subscribe: (cb) => { listenersRef.current.add(cb); return () => listenersRef.current.delete(cb); },
    getState: () => stateRef.current,
    setState: (key, val) => {
      if (Object.is(stateRef.current[key], val)) return;
      if (key === "values" && Array.isArray(val)) {
        const hasChanged = String(stateRef.current.values) !== String(val);
        stateRef.current.values = val;
        if (hasChanged) propsRef.current.onValueChange?.(val);
      } else {
        stateRef.current[key] = val;
      }
      store.notify();
    },
    updateValue: (val, atIndex, { commit = false } = {}) => {
      const { min, max, step } = stateRef.current;
      const decimalCount = getDecimalCount(step);
      const snapToStep = roundValue(Math.round((val - min) / step) * step + min, decimalCount);
      const nextValue = clamp(snapToStep, [min, max]);
      const nextValues = getNextSortedValues(stateRef.current.values, nextValue, atIndex);
      stateRef.current.valueIndexToChange = nextValues.indexOf(nextValue);
      const hasChanged = String(nextValues) !== String(stateRef.current.values);
      if (hasChanged) {
        stateRef.current.values = nextValues;
        propsRef.current.onValueChange?.(nextValues);
        if (commit) propsRef.current.onValueCommit?.(nextValues);
        store.notify();
      }
    },
    getValueFromPointer: (clientX, clientY, rect) => {
      const { min, max, inverted, startAngle, endAngle } = stateRef.current;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      let angle = (Math.atan2(clientY - centerY, clientX - centerX) * 180) / Math.PI;
      if (angle < 0) angle += 360;
      angle = (angle - startAngle + 360) % 360;
      const totalAngle = (endAngle - startAngle + 360) % 360 || 360;
      let percent = angle / totalAngle;
      if (inverted) percent = 1 - percent;
      return min + percent * (max - min);
    },
    getAngleFromValue: (val) => {
      const { min, max, inverted, startAngle, endAngle } = stateRef.current;
      let percent = (val - min) / (max - min);
      if (inverted) percent = 1 - percent;
      const totalAngle = (endAngle - startAngle + 360) % 360 || 360;
      return startAngle + percent * totalAngle;
    },
    getPositionFromAngle: (angle) => {
      const radians = (angle * Math.PI) / 180;
      return { x: stateRef.current.size * Math.cos(radians), y: stateRef.current.size * Math.sin(radians) };
    },
    notify: () => { for (const cb of listenersRef.current) cb(); },
  }), [listenersRef, stateRef, propsRef]);

  useIsomorphicLayoutEffect(() => { if (value !== undefined) store.setState("values", value); }, [value, store]);

  useIsomorphicLayoutEffect(() => {
    const s = store.getState();
    if (s.min !== min) store.setState("min", min);
    if (s.max !== max) store.setState("max", max);
    if (s.step !== step) store.setState("step", step);
    if (s.size !== size) store.setState("size", size);
    if (s.thickness !== thickness) store.setState("thickness", thickness);
    if (s.startAngle !== startAngle) store.setState("startAngle", startAngle);
    if (s.endAngle !== endAngle) store.setState("endAngle", endAngle);
    if (s.disabled !== disabled) store.setState("disabled", disabled);
    if (s.inverted !== inverted) store.setState("inverted", inverted);
  }, [store, min, max, step, size, thickness, startAngle, endAngle, disabled, inverted]);

  const [sliderElement, setSliderElement] = React.useState<HTMLDivElement | null>(null);
  const composedRef = useComposedRefs(ref, setSliderElement);
  const valuesBeforeSlideRef = React.useRef(value ?? defaultValue);

  const onSliderStart = React.useCallback((pointerValue: number) => {
    if (disabled) return;
    const values = store.getState().values;
    const closestIndex = getClosestValueIndex(values, pointerValue);
    store.setState("valueIndexToChange", closestIndex);
    store.updateValue(pointerValue, closestIndex);
  }, [store, disabled]);

  const onSliderMove = React.useCallback((pointerValue: number) => {
    if (disabled) return;
    store.updateValue(pointerValue, store.getState().valueIndexToChange);
  }, [store, disabled]);

  const onSliderEnd = React.useCallback(() => {
    if (disabled) return;
    const state = store.getState();
    const prev = valuesBeforeSlideRef.current[state.valueIndexToChange];
    const next = state.values[state.valueIndexToChange];
    if (next !== prev) onValueCommit?.(state.values);
  }, [store, disabled, onValueCommit]);

  const onKeyDown = React.useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    propsRef.current.onKeyDown?.(event);
    if (event.defaultPrevented || disabled) return;
    const state = store.getState();
    const { values, valueIndexToChange, min, max, step } = state;
    const currentValue = values[valueIndexToChange] ?? min;

    if (event.key === "Home") { event.preventDefault(); store.updateValue(min, 0, { commit: true }); }
    else if (event.key === "End") { event.preventDefault(); store.updateValue(max, values.length - 1, { commit: true }); }
    else if (PAGE_KEYS.concat(ARROW_KEYS).includes(event.key)) {
      event.preventDefault();
      const isPageKey = PAGE_KEYS.includes(event.key);
      const isSkipKey = isPageKey || (event.shiftKey && ARROW_KEYS.includes(event.key));
      const multiplier = isSkipKey ? 10 : 1;
      let direction = ["ArrowLeft", "ArrowUp", "PageUp"].includes(event.key) ? -1 : 1;
      if (inverted) direction *= -1;
      store.updateValue(currentValue + step * multiplier * direction, valueIndexToChange, { commit: true });
    }
  }, [store, propsRef, disabled, inverted]);

  const onPointerDown = React.useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    propsRef.current.onPointerDown?.(event);
    if (event.defaultPrevented || disabled) return;
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
    event.preventDefault();
    valuesBeforeSlideRef.current = store.getState().values;
    if (sliderElement) {
      const rect = sliderElement.getBoundingClientRect();
      onSliderStart(store.getValueFromPointer(event.clientX, event.clientY, rect));
    }
  }, [store, propsRef, disabled, sliderElement, onSliderStart]);

  const onPointerMove = React.useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    propsRef.current.onPointerMove?.(event);
    if (event.defaultPrevented || disabled) return;
    if ((event.target as HTMLElement).hasPointerCapture(event.pointerId) && sliderElement) {
      const rect = sliderElement.getBoundingClientRect();
      onSliderMove(store.getValueFromPointer(event.clientX, event.clientY, rect));
    }
  }, [store, propsRef, disabled, sliderElement, onSliderMove]);

  const onPointerUp = React.useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    propsRef.current.onPointerUp?.(event);
    if (event.defaultPrevented) return;
    const target = event.target as HTMLDivElement;
    if (target.hasPointerCapture(event.pointerId)) {
      target.releasePointerCapture(event.pointerId);
      onSliderEnd();
    }
  }, [propsRef, onSliderEnd]);

  return (
    <StoreContext.Provider value={store}>
      <div
        data-disabled={disabled ? "" : undefined}
        data-slot="angle-slider"
        {...rootProps}
        ref={composedRef}
        className={cn("relative touch-none select-none", disabled && "opacity-50", className)}
        style={{ width: `${size * 2 + 40}px`, height: `${size * 2 + 40}px` }}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      />
    </StoreContext.Provider>
  );
}

// ---- AngleSlider Track ----

function AngleSliderTrack(props: React.ComponentProps<"svg">) {
  const { className, children, ...trackProps } = props;
  const disabled = useStore((s) => s.disabled);
  const size = useStore((s) => s.size);
  const thickness = useStore((s) => s.thickness);
  const startAngle = useStore((s) => s.startAngle);
  const endAngle = useStore((s) => s.endAngle);

  const center = size + 20;
  const totalAngle = (endAngle - startAngle + 360) % 360 || 360;
  const isFullCircle = totalAngle >= 359;
  const startRadians = (startAngle * Math.PI) / 180;
  const endRadians = (endAngle * Math.PI) / 180;
  const startX = center + size * Math.cos(startRadians);
  const startY = center + size * Math.sin(startRadians);
  const endX = center + size * Math.cos(endRadians);
  const endY = center + size * Math.sin(endRadians);
  const largeArcFlag = totalAngle > 180 ? 1 : 0;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      data-disabled={disabled ? "" : undefined}
      data-slot="angle-slider-track"
      width={center * 2}
      height={center * 2}
      {...trackProps}
      className={cn("absolute inset-0", className)}
    >
      {isFullCircle ? (
        <circle data-slot="angle-slider-track-rail" cx={center} cy={center} r={size}
          fill="none" stroke="currentColor" strokeWidth={thickness} strokeLinecap="round"
          vectorEffect="non-scaling-stroke" className="stroke-muted" />
      ) : (
        <path data-slot="angle-slider-track-rail"
          d={`M ${startX} ${startY} A ${size} ${size} 0 ${largeArcFlag} 1 ${endX} ${endY}`}
          fill="none" stroke="currentColor" strokeWidth={thickness} strokeLinecap="round"
          vectorEffect="non-scaling-stroke" className="stroke-muted" />
      )}
      {children}
    </svg>
  );
}

// ---- AngleSlider Range ----

function AngleSliderRange(props: React.ComponentProps<"path">) {
  const { className, ...rangeProps } = props;
  const values = useStore((s) => s.values);
  const min = useStore((s) => s.min);
  const max = useStore((s) => s.max);
  const disabled = useStore((s) => s.disabled);
  const size = useStore((s) => s.size);
  const thickness = useStore((s) => s.thickness);
  const startAngle = useStore((s) => s.startAngle);
  const endAngle = useStore((s) => s.endAngle);

  const center = size + 20;
  const sorted = [...values].sort((a, b) => a - b);
  const rangeStart = values.length <= 1 ? min : (sorted[0] ?? min);
  const rangeEnd = values.length <= 1 ? (sorted[0] ?? min) : (sorted[sorted.length - 1] ?? max);
  const totalAngle = (endAngle - startAngle + 360) % 360 || 360;
  const rStartAngle = startAngle + ((rangeStart - min) / (max - min)) * totalAngle;
  const rEndAngle = startAngle + ((rangeEnd - min) / (max - min)) * totalAngle;
  const rStartRad = (rStartAngle * Math.PI) / 180;
  const rEndRad = (rEndAngle * Math.PI) / 180;
  const sX = center + size * Math.cos(rStartRad);
  const sY = center + size * Math.sin(rStartRad);
  const eX = center + size * Math.cos(rEndRad);
  const eY = center + size * Math.sin(rEndRad);
  const rangeAngle = (rEndAngle - rStartAngle + 360) % 360;
  const largeArc = rangeAngle > 180 ? 1 : 0;

  if (rangeStart === rangeEnd) return null;

  return (
    <path
      data-disabled={disabled ? "" : undefined}
      data-slot="angle-slider-range"
      d={`M ${sX} ${sY} A ${size} ${size} 0 ${largeArc} 1 ${eX} ${eY}`}
      fill="none" stroke="currentColor" strokeWidth={thickness} strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
      {...rangeProps}
      className={cn("stroke-primary", className)}
    />
  );
}

// ---- AngleSlider Thumb ----

interface AngleSliderThumbProps extends React.ComponentProps<"div"> {
  index?: number;
}

function AngleSliderThumb(props: AngleSliderThumbProps) {
  const { index: indexProp, className, ref, ...thumbProps } = props;
  const store = useStoreContext("AngleSliderThumb");
  const values = useStore((s) => s.values);
  const min = useStore((s) => s.min);
  const max = useStore((s) => s.max);
  const disabled = useStore((s) => s.disabled);
  const size = useStore((s) => s.size);

  const index = indexProp ?? 0;
  const value = values[index];

  const thumbStyle = React.useMemo<React.CSSProperties>(() => {
    if (value === undefined) return {};
    const angle = store.getAngleFromValue(value);
    const pos = store.getPositionFromAngle(angle);
    const center = size + 20;
    return { position: "absolute", left: `${center + pos.x}px`, top: `${center + pos.y}px`, transform: "translate(-50%, -50%)" };
  }, [value, store, size]);

  const onFocus = React.useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    thumbProps.onFocus?.(event);
    if (!event.defaultPrevented) store.setState("valueIndexToChange", index);
  }, [thumbProps.onFocus, store, index]);

  if (value === undefined) return null;

  return (
    <span style={thumbStyle}>
      <div
        role="slider"
        aria-valuemin={min}
        aria-valuenow={value}
        aria-valuemax={max}
        aria-orientation="vertical"
        data-disabled={disabled ? "" : undefined}
        data-slot="angle-slider-thumb"
        tabIndex={disabled ? undefined : 0}
        {...thumbProps}
        ref={ref}
        className={cn(
          "block size-4 shrink-0 rounded-full border border-primary bg-background shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:outline-hidden focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        onFocus={onFocus}
      />
    </span>
  );
}

// ---- AngleSlider Value ----

interface AngleSliderValueProps extends React.ComponentProps<"div"> {
  unit?: string;
  formatValue?: (value: number | number[]) => string;
}

function AngleSliderValue(props: AngleSliderValueProps) {
  const { unit = "\u00B0", formatValue, className, style, children, ...valueProps } = props;
  const values = useStore((s) => s.values);
  const size = useStore((s) => s.size);
  const disabled = useStore((s) => s.disabled);
  const center = size + 20;

  const displayValue = React.useMemo(() => {
    if (formatValue) return formatValue(values.length === 1 ? (values[0] ?? 0) : values);
    if (values.length === 1) return `${values[0] ?? 0}${unit}`;
    const sorted = [...values].sort((a, b) => a - b);
    return `${sorted[0]}${unit} - ${sorted[sorted.length - 1]}${unit}`;
  }, [values, formatValue, unit]);

  return (
    <div
      data-disabled={disabled ? "" : undefined}
      data-slot="angle-slider-value"
      {...valueProps}
      className={cn("pointer-events-none flex select-none items-center justify-center font-medium text-foreground text-sm", className)}
      style={{ position: "absolute", left: `${center}px`, top: `${center}px`, transform: "translate(-50%, -50%)", ...style }}
    >
      {children ?? displayValue}
    </div>
  );
}

export {
  AngleSlider,
  AngleSliderTrack,
  AngleSliderRange,
  AngleSliderThumb,
  AngleSliderValue,
  useStore as useAngleSlider,
  type AngleSliderProps,
};
