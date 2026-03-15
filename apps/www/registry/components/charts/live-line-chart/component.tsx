"use client";

import {
  localPoint
} from "@visx/event";
import type { scaleBand } from "@visx/scale";
import {
  scaleLinear,
  scaleTime
} from "@visx/scale";
import type { Dispatch, ReactNode, RefObject, SetStateAction } from "react";
import {
  Children,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState
} from "react";
import {
  AnimatePresence,
  motion,
  useSpring
} from "motion/react";
import {
  curveMonotoneX
} from "@visx/curve";
import {
  AreaClosed,
  LinePath
} from "@visx/shape";
import {
  ParentSize
} from "@visx/responsive";
import {
  bisector
} from "d3-array";
import {
  cn
} from "@/lib/utils";

// ---- use-chart-interaction.ts ----
export interface ChartSelection {
  startX: number;
  endX: number;
  startIndex: number;
  endIndex: number;
  active: boolean;
}

interface UseChartInteractionParams {
  xScale: ScaleTime<number>;
  yScale: ScaleLinear<number>;
  data: Record<string, unknown>[];
  lines: LineConfig[];
  margin: Margin;
  xAccessor: (d: Record<string, unknown>) => Date;
  bisectDate: (
    data: Record<string, unknown>[],
    date: Date,
    lo: number
  ) => number;
  canInteract: boolean;
}

interface ChartInteractionResult {
  tooltipData: TooltipData | null;
  setTooltipData: React.Dispatch<React.SetStateAction<TooltipData | null>>;
  selection: ChartSelection | null;
  clearSelection: () => void;
  interactionHandlers: {
    onMouseMove?: (event: React.MouseEvent<SVGGElement>) => void;
    onMouseLeave?: () => void;
    onMouseDown?: (event: React.MouseEvent<SVGGElement>) => void;
    onMouseUp?: () => void;
    onTouchStart?: (event: React.TouchEvent<SVGGElement>) => void;
    onTouchMove?: (event: React.TouchEvent<SVGGElement>) => void;
    onTouchEnd?: () => void;
  };
  interactionStyle: React.CSSProperties;
}

export function useChartInteraction({
  xScale,
  yScale,
  data,
  lines,
  margin,
  xAccessor,
  bisectDate,
  canInteract,
}: UseChartInteractionParams): ChartInteractionResult {
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);
  const [selection, setSelection] = useState<ChartSelection | null>(null);

  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef<number>(0);

  const resolveTooltipFromX = useCallback(
    (pixelX: number): TooltipData | null => {
      const x0 = xScale.invert(pixelX);
      const index = bisectDate(data, x0, 1);
      const d0 = data[index - 1];
      const d1 = data[index];

      if (!d0) {
        return null;
      }

      let d = d0;
      let finalIndex = index - 1;
      if (d1) {
        const d0Time = xAccessor(d0).getTime();
        const d1Time = xAccessor(d1).getTime();
        if (x0.getTime() - d0Time > d1Time - x0.getTime()) {
          d = d1;
          finalIndex = index;
        }
      }

      const yPositions: Record<string, number> = {};
      for (const line of lines) {
        const value = d[line.dataKey];
        if (typeof value === "number") {
          yPositions[line.dataKey] = yScale(value) ?? 0;
        }
      }

      return {
        point: d,
        index: finalIndex,
        x: xScale(xAccessor(d)) ?? 0,
        yPositions,
      };
    },
    [xScale, yScale, data, lines, xAccessor, bisectDate]
  );

  const resolveIndexFromX = useCallback(
    (pixelX: number): number => {
      const x0 = xScale.invert(pixelX);
      const index = bisectDate(data, x0, 1);
      const d0 = data[index - 1];
      const d1 = data[index];
      if (!d0) {
        return 0;
      }
      if (d1) {
        const d0Time = xAccessor(d0).getTime();
        const d1Time = xAccessor(d1).getTime();
        if (x0.getTime() - d0Time > d1Time - x0.getTime()) {
          return index;
        }
      }
      return index - 1;
    },
    [xScale, data, xAccessor, bisectDate]
  );

  const getChartX = useCallback(
    (
      event: React.MouseEvent<SVGGElement> | React.TouchEvent<SVGGElement>,
      touchIndex = 0
    ): number | null => {
      let point: { x: number; y: number } | null = null;

      if ("touches" in event) {
        const touch = event.touches[touchIndex];
        if (!touch) {
          return null;
        }
        const svg = event.currentTarget.ownerSVGElement;
        if (!svg) {
          return null;
        }
        point = localPoint(svg, touch as unknown as MouseEvent);
      } else {
        point = localPoint(event);
      }

      if (!point) {
        return null;
      }
      return point.x - margin.left;
    },
    [margin.left]
  );

  // --- Mouse handlers ---

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<SVGGElement>) => {
      const chartX = getChartX(event);
      if (chartX === null) {
        return;
      }

      if (isDraggingRef.current) {
        const startX = Math.min(dragStartXRef.current, chartX);
        const endX = Math.max(dragStartXRef.current, chartX);
        setSelection({
          startX,
          endX,
          startIndex: resolveIndexFromX(startX),
          endIndex: resolveIndexFromX(endX),
          active: true,
        });
        return;
      }

      const tooltip = resolveTooltipFromX(chartX);
      if (tooltip) {
        setTooltipData(tooltip);
      }
    },
    [getChartX, resolveTooltipFromX, resolveIndexFromX]
  );

  const handleMouseLeave = useCallback(() => {
    setTooltipData(null);
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
    }
    setSelection(null);
  }, []);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<SVGGElement>) => {
      const chartX = getChartX(event);
      if (chartX === null) {
        return;
      }
      isDraggingRef.current = true;
      dragStartXRef.current = chartX;
      setTooltipData(null);
      setSelection(null);
    },
    [getChartX]
  );

  const handleMouseUp = useCallback(() => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
    }
    setSelection(null);
  }, []);

  // --- Touch handlers ---

  const handleTouchStart = useCallback(
    (event: React.TouchEvent<SVGGElement>) => {
      if (event.touches.length === 1) {
        event.preventDefault();
        const chartX = getChartX(event, 0);
        if (chartX === null) {
          return;
        }
        const tooltip = resolveTooltipFromX(chartX);
        if (tooltip) {
          setTooltipData(tooltip);
        }
      } else if (event.touches.length === 2) {
        event.preventDefault();
        setTooltipData(null);
        const x0 = getChartX(event, 0);
        const x1 = getChartX(event, 1);
        if (x0 === null || x1 === null) {
          return;
        }
        const startX = Math.min(x0, x1);
        const endX = Math.max(x0, x1);
        setSelection({
          startX,
          endX,
          startIndex: resolveIndexFromX(startX),
          endIndex: resolveIndexFromX(endX),
          active: true,
        });
      }
    },
    [getChartX, resolveTooltipFromX, resolveIndexFromX]
  );

  const handleTouchMove = useCallback(
    (event: React.TouchEvent<SVGGElement>) => {
      if (event.touches.length === 1) {
        event.preventDefault();
        const chartX = getChartX(event, 0);
        if (chartX === null) {
          return;
        }
        const tooltip = resolveTooltipFromX(chartX);
        if (tooltip) {
          setTooltipData(tooltip);
        }
      } else if (event.touches.length === 2) {
        event.preventDefault();
        const x0 = getChartX(event, 0);
        const x1 = getChartX(event, 1);
        if (x0 === null || x1 === null) {
          return;
        }
        const startX = Math.min(x0, x1);
        const endX = Math.max(x0, x1);
        setSelection({
          startX,
          endX,
          startIndex: resolveIndexFromX(startX),
          endIndex: resolveIndexFromX(endX),
          active: true,
        });
      }
    },
    [getChartX, resolveTooltipFromX, resolveIndexFromX]
  );

  const handleTouchEnd = useCallback(() => {
    setTooltipData(null);
    setSelection(null);
  }, []);

  const clearSelection = useCallback(() => {
    setSelection(null);
  }, []);

  const interactionHandlers = canInteract
    ? {
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        onMouseDown: handleMouseDown,
        onMouseUp: handleMouseUp,
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
      }
    : {};

  const interactionStyle: React.CSSProperties = {
    cursor: canInteract ? "crosshair" : "default",
    touchAction: "none",
  };

  return {
    tooltipData,
    setTooltipData,
    selection,
    clearSelection,
    interactionHandlers,
    interactionStyle,
  };
}

// ---- chart-context.tsx ----
type ScaleLinear<Output, _Input = number> = ReturnType<
  typeof scaleLinear<Output>
>;
type ScaleTime<Output, _Input = Date | number> = ReturnType<
  typeof scaleTime<Output>
>;
type ScaleBand<Domain extends { toString(): string }> = ReturnType<
  typeof scaleBand<Domain>
>;


// CSS variable references for theming
export const chartCssVars = {
  background: "var(--chart-background)",
  foreground: "var(--chart-foreground)",
  foregroundMuted: "var(--chart-foreground-muted)",
  label: "var(--chart-label)",
  linePrimary: "var(--chart-line-primary)",
  lineSecondary: "var(--chart-line-secondary)",
  crosshair: "var(--chart-crosshair)",
  grid: "var(--chart-grid)",
  indicatorColor: "var(--chart-indicator-color)",
  indicatorSecondaryColor: "var(--chart-indicator-secondary-color)",
  markerBackground: "var(--chart-marker-background)",
  markerBorder: "var(--chart-marker-border)",
  markerForeground: "var(--chart-marker-foreground)",
  badgeBackground: "var(--chart-marker-badge-background)",
  badgeForeground: "var(--chart-marker-badge-foreground)",
  segmentBackground: "var(--chart-segment-background)",
  segmentLine: "var(--chart-segment-line)",
};

export interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface TooltipData {
  /** The data point being hovered */
  point: Record<string, unknown>;
  /** Index in the data array */
  index: number;
  /** X position in pixels (relative to chart area) */
  x: number;
  /** Y positions for each line, keyed by dataKey */
  yPositions: Record<string, number>;
  /** X positions for each series (for grouped bars), keyed by dataKey */
  xPositions?: Record<string, number>;
}

export interface LineConfig {
  dataKey: string;
  stroke: string;
  strokeWidth: number;
}

export interface ChartContextValue {
  // Data
  data: Record<string, unknown>[];

  // Scales
  xScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;

  // Dimensions
  width: number;
  height: number;
  innerWidth: number;
  innerHeight: number;
  margin: Margin;

  // Column width for spacing calculations
  columnWidth: number;

  // Tooltip state
  tooltipData: TooltipData | null;
  setTooltipData: Dispatch<SetStateAction<TooltipData | null>>;

  // Container ref for portals
  containerRef: RefObject<HTMLDivElement | null>;

  // Line configurations (extracted from children)
  lines: LineConfig[];

  // Animation state
  isLoaded: boolean;
  animationDuration: number;

  // X accessor - how to get the x value from data points
  xAccessor: (d: Record<string, unknown>) => Date;

  // Pre-computed date labels for ticker animation
  dateLabels: string[];

  // Selection state (optional - only present when useChartInteraction is used)
  /** Current drag/pinch selection range */
  selection?: ChartSelection | null;
  /** Clear the current selection */
  clearSelection?: () => void;

  // Bar chart specific (optional - only present in BarChart)
  /** Band scale for categorical x-axis (bar charts) */
  barScale?: ScaleBand<string>;
  /** Width of each bar band */
  bandWidth?: number;
  /** Index of currently hovered bar */
  hoveredBarIndex?: number | null;
  /** Setter for hovered bar index */
  setHoveredBarIndex?: (index: number | null) => void;
  /** X accessor for bar charts (returns string instead of Date) */
  barXAccessor?: (d: Record<string, unknown>) => string;
  /** Bar chart orientation */
  orientation?: "vertical" | "horizontal";
  /** Whether bars are stacked */
  stacked?: boolean;
  /** Stack offsets: Map of data index -> Map of dataKey -> cumulative offset */
  stackOffsets?: Map<number, Map<string, number>>;

  // Candlestick chart specific (optional)
  /** Index of currently hovered candle */
  hoveredCandleIndex?: number | null;
  /** Setter for hovered candle index */
  setHoveredCandleIndex?: (index: number | null) => void;
}

const ChartContext = createContext<ChartContextValue | null>(null);

export function ChartProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: ChartContextValue;
}) {
  return (
    <ChartContext.Provider value={value}>{children}</ChartContext.Provider>
  );
}

export function useChart(): ChartContextValue {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error(
      "useChart must be used within a ChartProvider. " +
        "Make sure your component is wrapped in <LineChart>, <AreaChart>, or <BarChart>."
    );
  }
  return context;
}

// ---- live-x-axis.tsx ----
const TICKER_HALF_WIDTH = 50;
const FADE_BUFFER = 20;

const crosshairSpringConfig = { stiffness: 300, damping: 30 };

function labelFadeOpacity(
  labelX: number,
  crosshairX: number | null,
  isHovering: boolean
): number {
  if (!isHovering || crosshairX === null) {
    return 1;
  }
  const distance = Math.abs(labelX - crosshairX);
  if (distance < TICKER_HALF_WIDTH) {
    return 0;
  }
  if (distance < TICKER_HALF_WIDTH + FADE_BUFFER) {
    return (distance - TICKER_HALF_WIDTH) / FADE_BUFFER;
  }
  return 1;
}

export interface LiveXAxisProps {
  /** Number of time labels. Default: 5 */
  numTicks?: number;
  /** Time formatter. Default: HH:MM:SS */
  formatTime?: (t: number) => string;
}

const defaultFormatTime = (t: number) => {
  const d = new Date(t);
  return d.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export function LiveXAxis({
  numTicks = 5,
  formatTime = defaultFormatTime,
}: LiveXAxisProps) {
  const { xScale, margin, tooltipData, containerRef } = useChart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const domain = xScale.domain();
  const startMs = domain[0]?.getTime() ?? 0;
  const endMs = domain[1]?.getTime() ?? 0;

  const labels = useMemo(() => {
    const step = (endMs - startMs) / (numTicks - 1);
    return Array.from({ length: numTicks }, (_, i) => {
      const t = startMs + i * step;
      const x = (xScale(new Date(t)) ?? 0) + margin.left;
      return { x, label: formatTime(t), stableKey: i };
    });
  }, [startMs, endMs, numTicks, xScale, margin.left, formatTime]);

  const isHovering = tooltipData !== null;
  const crosshairX = tooltipData ? tooltipData.x + margin.left : null;

  // Time pill label
  const pillLabel = useMemo(() => {
    if (!tooltipData) {
      return null;
    }
    const timeMs = xScale.invert(tooltipData.x).getTime();
    return formatTime(timeMs);
  }, [tooltipData, xScale, formatTime]);

  // Spring-animated pill position — matches TooltipIndicator's spring config
  // so the pill and crosshair line move in lockstep
  const pillX = tooltipData ? tooltipData.x + margin.left : 0;
  const animatedPillX = useSpring(pillX, crosshairSpringConfig);
  const springRef = useRef(animatedPillX);
  springRef.current = animatedPillX;

  useEffect(() => {
    springRef.current.set(pillX);
  }, [pillX]);

  const container = containerRef.current;
  if (!(mounted && container)) {
    return null;
  }

  const { createPortal } = require("react-dom") as typeof import("react-dom");

  return createPortal(
    <div className="pointer-events-none absolute inset-0">
      {/* Time labels */}
      {labels.map((l) => (
        <div
          className="absolute"
          key={l.stableKey}
          style={{
            left: l.x,
            bottom: 12,
            width: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <motion.span
            animate={{
              opacity: labelFadeOpacity(l.x, crosshairX, isHovering),
            }}
            className="whitespace-nowrap text-chart-label text-xs"
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {l.label}
          </motion.span>
        </div>
      ))}

      {/* Time pill at crosshair — spring-animated to match crosshair line */}
      {isHovering && pillLabel && (
        <motion.div
          className="absolute z-50"
          style={{
            left: animatedPillX,
            x: "-50%",
            bottom: 4,
          }}
        >
          <div className="overflow-hidden rounded-full bg-zinc-900 px-4 py-1 text-white shadow-lg dark:bg-zinc-100 dark:text-zinc-900">
            <span className="whitespace-nowrap font-medium text-sm">
              {pillLabel}
            </span>
          </div>
        </motion.div>
      )}
    </div>,
    container
  );
}

LiveXAxis.displayName = "LiveXAxis";

// ---- live-y-axis.tsx ----
// ---------------------------------------------------------------------------
// Interval picker (inspired by liveline's pickInterval)
// Finds a "nice" step size that keeps labels ~minGap pixels apart.
// Uses hysteresis: keeps the previous interval if it still fits, preventing
// jittery step changes when the range oscillates near a boundary.
// ---------------------------------------------------------------------------

function pickNiceInterval(
  valRange: number,
  chartHeight: number,
  minGap: number,
  prevInterval: number
): number {
  if (valRange <= 0 || chartHeight <= 0) {
    return 1;
  }
  const pxPerUnit = chartHeight / valRange;

  // Keep previous interval if it still produces reasonable spacing
  if (prevInterval > 0) {
    const px = prevInterval * pxPerUnit;
    if (px >= minGap * 0.5 && px <= minGap * 3) {
      return prevInterval;
    }
  }

  // Try multiple divisor sequences to find the best nice step
  const divisorSets = [
    [2, 2.5, 2],
    [2, 2, 2.5],
    [2.5, 2, 2],
  ];
  let best = Number.POSITIVE_INFINITY;
  for (const divs of divisorSets) {
    let span = 10 ** Math.ceil(Math.log10(valRange));
    let i = 0;
    let d = divs[i % 3] ?? 2;
    while ((span / d) * pxPerUnit >= minGap) {
      span /= d;
      i++;
      d = divs[i % 3] ?? 2;
    }
    if (span < best) {
      best = span;
    }
  }
  return best === Number.POSITIVE_INFINITY ? valRange / 5 : best;
}

// ---------------------------------------------------------------------------
// Edge fade: labels near the top/bottom of the chart area fade out
// ---------------------------------------------------------------------------

const EDGE_FADE_PX = 28;

function edgeOpacity(y: number, chartHeight: number): number {
  const fromEdge = Math.min(y, chartHeight - y);
  if (fromEdge >= EDGE_FADE_PX) {
    return 1;
  }
  if (fromEdge <= 0) {
    return 0;
  }
  return fromEdge / EDGE_FADE_PX;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export interface LiveYAxisProps {
  /** Minimum pixel gap between labels. Default: 36 */
  minGap?: number;
  /** Position. Default: "left" */
  position?: "left" | "right";
  /** Value formatter */
  formatValue?: (v: number) => string;
  /** Allow decimal tick values. Default: true */
  allowDecimals?: boolean;
}

const tickSpring = { type: "spring" as const, stiffness: 180, damping: 24 };

export function LiveYAxis({
  minGap = 36,
  position = "left",
  formatValue = (v: number) => v.toFixed(2),
  allowDecimals = true,
}: LiveYAxisProps) {
  const { yScale, margin, innerHeight, containerRef } = useChart();
  const [mounted, setMounted] = useState(false);
  const intervalRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const domain = yScale.domain() as [number, number];
  const minVal = domain[0];
  const maxVal = domain[1];
  const valRange = maxVal - minVal;

  // Pick a nice interval with hysteresis
  const interval = useMemo(() => {
    const next = pickNiceInterval(
      valRange,
      innerHeight,
      minGap,
      intervalRef.current
    );
    intervalRef.current = next;
    return next;
  }, [valRange, innerHeight, minGap]);

  // Stabilize the tick VALUE set: only recompute which ticks exist when the
  // domain crosses an interval boundary. We quantize min/max to interval
  // boundaries so the set doesn't change on every sub-pixel lerp frame.
  const quantizedMin = interval > 0 ? Math.floor(minVal / interval) : 0;
  const quantizedMax = interval > 0 ? Math.ceil(maxVal / interval) : 0;

  // biome-ignore lint/correctness/useExhaustiveDependencies: quantized values are intentional coarse-grained deps for stability
  const stableTickValues = useMemo(() => {
    if (interval <= 0 || valRange <= 0) {
      return [];
    }
    const expandedMin = minVal - interval * 0.5;
    const expandedMax = maxVal + interval * 0.5;
    const first = Math.ceil(expandedMin / interval) * interval;
    const values: number[] = [];
    for (let v = first; v <= expandedMax; v += interval) {
      const rounded = Math.round(v * 1e10) / 1e10;
      const isDecimal = !Number.isInteger(rounded);
      if (isDecimal && !allowDecimals) {
        continue;
      }
      values.push(rounded);
    }
    return values;
  }, [
    quantizedMin,
    quantizedMax,
    interval,
    minVal,
    maxVal,
    valRange,
    allowDecimals,
  ]);

  // Pixel positions update every frame for smooth movement
  const tickData = useMemo(
    () =>
      stableTickValues
        .map((value) => {
          const y = yScale(value) ?? 0;
          return {
            value,
            y,
            label: formatValue(value),
            key: value.toPrecision(10),
            edgeAlpha: edgeOpacity(y, innerHeight),
          };
        })
        .filter((t) => t.y >= -10 && t.y <= innerHeight + 10),
    [stableTickValues, yScale, innerHeight, formatValue]
  );

  const isLeft = position === "left";

  const container = containerRef.current;
  if (!(mounted && container)) {
    return null;
  }

  const { createPortal } = require("react-dom") as typeof import("react-dom");

  return createPortal(
    <div className="pointer-events-none absolute inset-0">
      <div
        className="absolute overflow-hidden"
        style={{
          top: margin.top,
          height: innerHeight,
          ...(isLeft
            ? { left: 0, width: margin.left }
            : { right: 0, width: margin.right }),
        }}
      >
        <AnimatePresence initial={false}>
          {tickData.map((tick) => (
            <motion.div
              animate={{ opacity: tick.edgeAlpha, y: tick.y }}
              className="absolute w-full"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0, y: tick.y }}
              key={tick.key}
              style={{
                ...(isLeft
                  ? { right: 0, paddingRight: 8, textAlign: "right" }
                  : { left: 0, paddingLeft: 8, textAlign: "left" }),
              }}
              transition={tickSpring}
            >
              <span className="whitespace-nowrap font-mono text-chart-label text-xs">
                {tick.label}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>,
    container
  );
}

LiveYAxis.displayName = "LiveYAxis";

// ---- live-line.tsx ----
export type Momentum = "up" | "down" | "flat";

export interface MomentumColors {
  up: string;
  down: string;
  flat: string;
}

export function detectMomentum(
  data: Record<string, unknown>[],
  dataKey: string,
  lookback = 20
): Momentum {
  if (data.length < 5) {
    return "flat";
  }
  const start = Math.max(0, data.length - lookback);
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;
  for (let i = start; i < data.length; i++) {
    const v = data[i]?.[dataKey];
    if (typeof v === "number") {
      if (v < min) {
        min = v;
      }
      if (v > max) {
        max = v;
      }
    }
  }
  const range = max - min;
  if (range === 0) {
    return "flat";
  }
  const tailStart = Math.max(start, data.length - 5);
  const first = (data[tailStart]?.[dataKey] as number) ?? 0;
  const last = (data.at(-1)?.[dataKey] as number) ?? 0;
  const delta = last - first;
  const threshold = range * 0.12;
  if (delta > threshold) {
    return "up";
  }
  if (delta < -threshold) {
    return "down";
  }
  return "flat";
}

export interface LiveLineProps {
  /** Key in data to use for y values */
  dataKey: string;
  /** Stroke color. Default: var(--chart-line-primary) */
  stroke?: string;
  /** Stroke width. Default: 2 */
  strokeWidth?: number;
  /** Show gradient fill under the curve. Default: true */
  fill?: boolean;
  /** Show pulsing live dot at the right edge. Default: true */
  pulse?: boolean;
  /** Radius of the live dot. Default: 4 */
  dotSize?: number;
  /** Show value badge pill at the live tip. Default: true */
  badge?: boolean;
  /** Value label formatter for the badge */
  formatValue?: (v: number) => string;
  /**
   * When set, the line/fill color changes based on momentum direction.
   * Overrides `stroke` for the line and fill (dot always uses momentum colors).
   */
  momentumColors?: MomentumColors;
}

LiveLine.displayName = "LiveLine";

export function LiveLine({
  dataKey,
  stroke = chartCssVars.linePrimary,
  strokeWidth = 2,
  fill = true,
  pulse = true,
  dotSize = 4,
  badge = true,
  formatValue = (v: number) => v.toFixed(2),
  momentumColors,
}: LiveLineProps) {
  const {
    data,
    xScale,
    yScale,
    innerWidth,
    innerHeight,
    xAccessor,
    lines,
    tooltipData,
  } = useChart();

  const isScrubbing = tooltipData !== null;

  const uid = useId();
  const gradientId = `live-line-grad-${uid}`;
  const areaGradientId = `live-area-grad-${uid}`;
  const fadeId = `live-fade-${uid}`;
  const fadeMaskId = `live-fade-mask-${uid}`;

  const getX = useCallback(
    (d: Record<string, unknown>) => xScale(xAccessor(d)) ?? 0,
    [xScale, xAccessor]
  );

  const getY = useCallback(
    (d: Record<string, unknown>) => {
      const v = d[dataKey];
      return typeof v === "number" ? (yScale(v) ?? 0) : 0;
    },
    [dataKey, yScale]
  );

  // The second-to-last point is the "now" position (live tip).
  // The last point is the queued future point for the fade-out zone.
  const nowPoint = data.length >= 2 ? data.at(-2) : data.at(-1);
  const liveValue =
    nowPoint && typeof nowPoint[dataKey] === "number"
      ? (nowPoint[dataKey] as number)
      : 0;

  const liveDotX = nowPoint ? (xScale(xAccessor(nowPoint)) ?? 0) : innerWidth;
  const liveDotY = yScale(liveValue) ?? 0;

  const momentum = useMemo(
    () => detectMomentum(data, dataKey),
    [data, dataKey]
  );

  const defaultMomentumColors: MomentumColors = {
    up: "var(--color-emerald-500)",
    down: "var(--color-red-500)",
    flat: stroke,
  };
  const dotMomentumColors = momentumColors ?? defaultMomentumColors;
  const dotColor = dotMomentumColors[momentum];

  // Find the line config for this dataKey to get the resolved stroke
  const lineConfig = lines.find((l) => l.dataKey === dataKey);
  const baseStroke = lineConfig?.stroke ?? stroke;
  const resolvedStroke = momentumColors ? momentumColors[momentum] : baseStroke;

  return (
    <>
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={resolvedStroke} stopOpacity={1} />
          <stop offset="100%" stopColor={resolvedStroke} stopOpacity={0.6} />
        </linearGradient>
        <linearGradient id={areaGradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={resolvedStroke} stopOpacity={0.1} />
          <stop offset="100%" stopColor={resolvedStroke} stopOpacity={0} />
        </linearGradient>
        <linearGradient id={fadeId} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="white" stopOpacity={0} />
          <stop offset="4%" stopColor="white" stopOpacity={1} />
          {liveDotX < innerWidth - 1 ? (
            <>
              <stop
                offset={`${(liveDotX / innerWidth) * 100}%`}
                stopColor="white"
                stopOpacity={1}
              />
              <stop offset="100%" stopColor="white" stopOpacity={0} />
            </>
          ) : (
            <stop offset="100%" stopColor="white" stopOpacity={1} />
          )}
        </linearGradient>
        <mask id={fadeMaskId}>
          <rect
            fill={`url(#${fadeId})`}
            height={innerHeight + 40}
            width={innerWidth}
            x={0}
            y={-20}
          />
        </mask>
      </defs>

      {/* Area fill */}
      {fill && data.length > 1 && (
        <g mask={`url(#${fadeMaskId})`}>
          <AreaClosed
            curve={curveMonotoneX}
            data={data}
            fill={`url(#${areaGradientId})`}
            strokeWidth={0}
            x={getX}
            y={getY}
            yScale={yScale}
          />
        </g>
      )}

      {/* Line */}
      {data.length > 1 && (
        <g mask={`url(#${fadeMaskId})`}>
          <LinePath
            curve={curveMonotoneX}
            data={data}
            stroke={`url(#${gradientId})`}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
            x={getX}
            y={getY}
          />
        </g>
      )}

      {/* Dashed horizontal line at current value */}
      <line
        opacity={0.25}
        stroke={resolvedStroke}
        strokeDasharray="4,4"
        strokeWidth={1}
        x1={0}
        x2={innerWidth}
        y1={liveDotY}
        y2={liveDotY}
      />

      {/* Live indicator (dot + badge) — dims when crosshair is active */}
      <motion.g
        animate={{ opacity: isScrubbing ? 0.25 : 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Pulsing dot */}
        <g>
          {pulse && (
            <circle
              cx={liveDotX}
              cy={liveDotY}
              fill="none"
              opacity={0.4}
              r={dotSize * 2}
              stroke={dotColor}
              strokeWidth={1.5}
            >
              <animate
                attributeName="r"
                dur="1.5s"
                from={String(dotSize)}
                repeatCount="indefinite"
                to={String(dotSize * 3.5)}
              />
              <animate
                attributeName="opacity"
                dur="1.5s"
                from="0.5"
                repeatCount="indefinite"
                to="0"
              />
            </circle>
          )}
          <circle
            cx={liveDotX}
            cy={liveDotY}
            fill={dotColor}
            opacity={0.1}
            r={dotSize + 2}
          />
          <circle
            cx={liveDotX}
            cy={liveDotY}
            fill={dotColor}
            r={dotSize}
            stroke={chartCssVars.background}
            strokeWidth={2}
          />
        </g>

        {/* Badge — use popover vars so text is never white-on-white */}
        {badge && (
          <g transform={`translate(${liveDotX + 12},${liveDotY})`}>
            <rect
              fill="var(--popover)"
              height={24}
              opacity={0.95}
              rx={6}
              width={formatValue(liveValue).length * 7.5 + 16}
              x={0}
              y={-12}
            />
            <text
              fill="var(--popover-foreground)"
              fontFamily="SF Mono, Menlo, Monaco, monospace"
              fontSize={11}
              fontWeight={500}
              x={8}
              y={4}
            >
              {formatValue(liveValue)}
            </text>
          </g>
        )}
      </motion.g>
    </>
  );
}

// ---- live-line-chart.tsx ----
// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface LiveLinePoint {
  time: number;
  value: number;
}

export interface LiveLineChartProps {
  /** Streaming data — array of { time: unixSeconds, value } */
  data: LiveLinePoint[];
  /** Latest value (smoothly interpolated to) */
  value: number;
  /** Key used for the value field in context data. Default: "value" */
  dataKey?: string;
  /** Visible time window in seconds. Default: 30 */
  window?: number;
  /** Number of X-axis ticks (used to compute leading offset). Default: 5 */
  numXTicks?: number;
  /** Leading offset in X-tick units (0 = now at right edge). Default: 0 */
  nowOffsetUnits?: number;
  /** Tight Y-axis. Default: false */
  exaggerate?: boolean;
  /** Interpolation speed (0–1). Default: 0.08 */
  lerpSpeed?: number;
  /** Chart margins */
  margin?: Partial<Margin>;
  /** Freeze chart scrolling. Default: false */
  paused?: boolean;
  /** Child components (LiveLine, Grid, ChartTooltip, LiveXAxis, LiveYAxis, etc.) */
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const LERP_SPEED = 0.08;
const DEFAULT_MARGIN: Margin = { top: 24, right: 16, bottom: 32, left: 16 };

interface AnimFrame {
  now: number;
  yMin: number;
  yMax: number;
  displayValue: number;
}

function computeTargetRange(
  data: LiveLinePoint[],
  value: number,
  exaggerate: boolean
) {
  if (data.length === 0) {
    return { yMin: 0, yMax: 100 };
  }
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;
  for (const d of data) {
    if (d.value < min) {
      min = d.value;
    }
    if (d.value > max) {
      max = d.value;
    }
  }
  if (value < min) {
    min = value;
  }
  if (value > max) {
    max = value;
  }
  const rawRange = max - min;
  const paddingFactor = exaggerate ? 0.03 : 0.15;
  const rangePad = rawRange * paddingFactor || (exaggerate ? 0.04 : 10);
  return { yMin: min - rangePad, yMax: max + rangePad };
}

function nextAnimFrame(
  prev: AnimFrame,
  targetRange: { yMin: number; yMax: number },
  targetValue: number,
  speed: number,
  isPaused: boolean
): AnimFrame {
  const nextNow = isPaused ? prev.now : Date.now();
  const nextYMin =
    targetRange.yMin < prev.yMin
      ? targetRange.yMin
      : prev.yMin + (targetRange.yMin - prev.yMin) * speed;
  const nextYMax =
    targetRange.yMax > prev.yMax
      ? targetRange.yMax
      : prev.yMax + (targetRange.yMax - prev.yMax) * speed;
  const nextValue =
    prev.displayValue + (targetValue - prev.displayValue) * speed;
  return {
    now: nextNow,
    yMin: nextYMin,
    yMax: nextYMax,
    displayValue: nextValue,
  };
}

function interpolateAtTime(
  points: LiveLinePoint[],
  timeSec: number
): number | null {
  if (points.length === 0) {
    return null;
  }
  const firstPt = points[0] as LiveLinePoint;
  const lastPt = points.at(-1) as LiveLinePoint;
  if (timeSec <= firstPt.time) {
    return firstPt.value;
  }
  if (timeSec >= lastPt.time) {
    return lastPt.value;
  }
  let lo = 0;
  let hi = points.length - 1;
  while (hi - lo > 1) {
    const mid = Math.floor((lo + hi) / 2);
    const midPt = points[mid];
    if (midPt && midPt.time <= timeSec) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  const p1 = points[lo];
  if (!p1) {
    return null;
  }
  const p2 = points[hi];
  if (!p2) {
    return null;
  }
  const dt = p2.time - p1.time;
  if (dt === 0) {
    return p1.value;
  }
  const t = (timeSec - p1.time) / dt;
  return p1.value + (p2.value - p1.value) * t;
}

const bisectTime = bisector<LiveLinePoint, number>((d) => d.time).left;

function extractLiveLineConfigs(children: ReactNode): LineConfig[] {
  const configs: LineConfig[] = [];
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      return;
    }
    const childType = child.type as { displayName?: string; name?: string };
    const name =
      typeof child.type === "function"
        ? childType.displayName || childType.name || ""
        : "";
    const props = child.props as LiveLineProps | undefined;
    if (
      (name === "LiveLine" || (props && "dataKey" in props)) &&
      props?.dataKey
    ) {
      configs.push({
        dataKey: props.dataKey,
        stroke: props.stroke || "var(--chart-line-primary)",
        strokeWidth: props.strokeWidth || 2,
      });
    }
  });
  return configs;
}

// ---------------------------------------------------------------------------
// Inner chart
// ---------------------------------------------------------------------------

interface InnerProps {
  data: LiveLinePoint[];
  value: number;
  dataKey: string;
  windowSecs: number;
  numXTicks: number;
  nowOffsetUnits: number;
  exaggerate: boolean;
  lerpSpeed: number;
  margin: Margin;
  paused: boolean;
  width: number;
  height: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  children: ReactNode;
}

function LiveLineChartInner({
  data,
  value,
  dataKey,
  windowSecs,
  numXTicks,
  nowOffsetUnits,
  exaggerate,
  lerpSpeed,
  margin,
  paused,
  width,
  height,
  containerRef,
  children,
}: InnerProps) {
  const windowMs = windowSecs * 1000;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // ---- Animation state ----
  const animRef = useRef<AnimFrame>({
    now: Date.now(),
    yMin: 0,
    yMax: 100,
    displayValue: value,
  });
  const [frame, setFrame] = useState<AnimFrame>({
    now: Date.now(),
    yMin: 0,
    yMax: 100,
    displayValue: value,
  });

  const pausedRef = useRef(paused);
  const dataRef = useRef(data);
  const dataKeyRef = useRef(dataKey);
  dataRef.current = data;
  dataKeyRef.current = dataKey;

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const targetRange = useMemo(
    () => computeTargetRange(data, value, exaggerate),
    [data, value, exaggerate]
  );

  const lines = useMemo(() => extractLiveLineConfigs(children), [children]);

  // Leading offset (used in rAF for tooltip)
  const xTickUnitMs = windowMs / (numXTicks - 1);
  const leadingMs = nowOffsetUnits * xTickUnitMs;

  // ---- rAF loop: update frame and tooltip in one place to avoid effect→setState loops ----
  const cursorXRef = useRef<number | null>(null);
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);

  useEffect(() => {
    let raf: number;
    const tick = () => {
      const next = nextAnimFrame(
        animRef.current,
        targetRange,
        value,
        lerpSpeed,
        pausedRef.current
      );
      animRef.current = next;

      const domainEndMsNext = next.now + leadingMs;
      const cursorX = cursorXRef.current;
      if (cursorX !== null && innerWidth > 0 && innerHeight > 0) {
        const xScaleNext = scaleTime({
          domain: [
            new Date(domainEndMsNext - windowMs),
            new Date(domainEndMsNext),
          ],
          range: [0, innerWidth],
        });
        const yScaleNext = scaleLinear({
          domain: [next.yMin, next.yMax],
          range: [innerHeight, 0],
          nice: true,
        });
        const timeMs = xScaleNext.invert(cursorX).getTime();
        const timeSec = timeMs / 1000;
        const currentData = dataRef.current;
        const visible = currentData.filter(
          (p) => p.time >= (domainEndMsNext - windowMs) / 1000
        );
        visible.push({ time: next.now / 1000, value: next.displayValue });
        visible.push({
          time: (next.now + xTickUnitMs) / 1000,
          value: next.displayValue,
        });
        const val = interpolateAtTime(visible, timeSec);
        const key = dataKeyRef.current;
        if (val !== null) {
          setTooltipData({
            point: { date: new Date(timeMs), [key]: val },
            index: 0,
            x: cursorX,
            yPositions: { [key]: yScaleNext(val) ?? 0 },
          });
        } else {
          setTooltipData(null);
        }
      } else {
        setTooltipData(null);
      }

      setFrame(next);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [
    targetRange,
    value,
    lerpSpeed,
    leadingMs,
    windowMs,
    xTickUnitMs,
    innerWidth,
    innerHeight,
  ]);

  const domainEndMs = frame.now + leadingMs;

  // ---- Scales ----
  const xScale = useMemo(
    () =>
      scaleTime({
        domain: [new Date(domainEndMs - windowMs), new Date(domainEndMs)],
        range: [0, innerWidth],
      }),
    [domainEndMs, windowMs, innerWidth]
  );

  const yScale = useMemo(
    () =>
      scaleLinear({
        domain: [frame.yMin, frame.yMax],
        range: [innerHeight, 0],
        nice: true,
      }),
    [frame.yMin, frame.yMax, innerHeight]
  );

  // ---- Build context-compatible data ----
  // Convert LiveLinePoint[] to Record<string, unknown>[] with 2 virtual points:
  // 1. At "now" — the live tip where the dot sits
  // 2. At "now + 1 unit" — a queued point that the line fades into
  const contextData = useMemo(() => {
    const windowStart = domainEndMs - windowMs;
    let startIdx = bisectTime(data, windowStart / 1000, 0);
    if (startIdx > 0) {
      startIdx--;
    }
    const sliced = data.slice(startIdx);
    const records: Record<string, unknown>[] = sliced.map((p) => ({
      date: new Date(p.time * 1000),
      [dataKey]: p.value,
    }));
    // Virtual point 1: the "now" position (where the live dot sits)
    records.push({
      date: new Date(frame.now),
      [dataKey]: frame.displayValue,
    });
    // Virtual point 2: queued ahead (the line extends and fades into this)
    records.push({
      date: new Date(frame.now + xTickUnitMs),
      [dataKey]: frame.displayValue,
    });
    return records;
  }, [
    data,
    frame.now,
    frame.displayValue,
    domainEndMs,
    windowMs,
    dataKey,
    xTickUnitMs,
  ]);

  // ---- X accessor ----
  const xAccessor = useCallback(
    (d: Record<string, unknown>): Date =>
      d.date instanceof Date ? d.date : new Date(d.date as number),
    []
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<SVGGElement>) => {
      const coords = localPoint(event);
      if (!coords) {
        return;
      }
      const x = coords.x - margin.left;
      cursorXRef.current = x >= 0 && x <= innerWidth ? x : null;
    },
    [margin.left, innerWidth]
  );

  const handleMouseLeave = useCallback(() => {
    cursorXRef.current = null;
    setTooltipData(null);
  }, []);

  // Date labels (for ChartTooltip's DateTicker — not used in live but needed for context)
  const dateLabels = useMemo(
    () =>
      contextData.map((d) =>
        xAccessor(d).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      ),
    [contextData, xAccessor]
  );

  const columnWidth = useMemo(() => {
    if (contextData.length < 2) {
      return 0;
    }
    return innerWidth / (contextData.length - 1);
  }, [innerWidth, contextData.length]);

  const contextValue = useMemo(
    () => ({
      data: contextData,
      xScale,
      yScale,
      width,
      height,
      innerWidth,
      innerHeight,
      margin,
      columnWidth,
      tooltipData,
      setTooltipData,
      containerRef,
      lines,
      isLoaded: true,
      animationDuration: 0,
      xAccessor,
      dateLabels,
    }),
    [
      contextData,
      xScale,
      yScale,
      width,
      height,
      innerWidth,
      innerHeight,
      margin,
      columnWidth,
      tooltipData,
      containerRef,
      lines,
      xAccessor,
      dateLabels,
    ]
  );

  if (innerWidth <= 0 || innerHeight <= 0) {
    return null;
  }

  return (
    <ChartProvider value={contextValue}>
      <svg
        aria-hidden="true"
        className="overflow-visible"
        height={height}
        width={width}
      >
        {/* biome-ignore lint/a11y/noStaticElementInteractions: SVG group for mouse tracking */}
        <g
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          style={{ cursor: "crosshair" }}
          transform={`translate(${margin.left},${margin.top})`}
        >
          <rect
            fill="transparent"
            height={innerHeight}
            width={innerWidth}
            x={0}
            y={0}
          />
          {children}
        </g>
      </svg>
    </ChartProvider>
  );
}

// ---------------------------------------------------------------------------
// Public component
// ---------------------------------------------------------------------------

export function LiveLineChart({
  data,
  value,
  dataKey = "value",
  window: windowSecs = 30,
  numXTicks = 5,
  nowOffsetUnits = 0,
  exaggerate = false,
  lerpSpeed = LERP_SPEED,
  margin: marginProp,
  paused = false,
  children,
  className,
  style,
}: LiveLineChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const margin = { ...DEFAULT_MARGIN, ...marginProp };

  return (
    <div
      className={cn("relative w-full", className)}
      ref={containerRef}
      style={{ height: 300, touchAction: "none", ...style }}
    >
      <ParentSize debounceTime={10}>
        {({ width, height }) => (
          <LiveLineChartInner
            containerRef={containerRef}
            data={data}
            dataKey={dataKey}
            exaggerate={exaggerate}
            height={height}
            lerpSpeed={lerpSpeed}
            margin={margin}
            nowOffsetUnits={nowOffsetUnits}
            numXTicks={numXTicks}
            paused={paused}
            value={value}
            width={width}
            windowSecs={windowSecs}
          >
            {children}
          </LiveLineChartInner>
        )}
      </ParentSize>
    </div>
  );
}

export default LiveLineChart;
