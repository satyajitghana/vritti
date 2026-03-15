"use client";

import {
  localPoint
} from "@visx/event";
import type { scaleBand } from "@visx/scale";
import {
  scaleLinear,
  scaleTime
} from "@visx/scale";
import type { Dispatch, ReactElement, ReactNode, RefObject, SetStateAction } from "react";
import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from "react";
import {
  GridColumns,
  GridRows
} from "@visx/grid";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useSpring
} from "motion/react";
import {
  cn
} from "@/lib/utils";
import useMeasure from "react-use-measure";
import {
  Progress
} from "@base-ui/react/progress";
import {
  curveNatural
} from "@visx/curve";
import {
  LinePath
} from "@visx/shape";
import {
  ParentSize
} from "@visx/responsive";
import {
  bisector
} from "d3-array";

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

// ---- grid.tsx ----
export interface GridProps {
  /** Show horizontal grid lines. Default: true */
  horizontal?: boolean;
  /** Show vertical grid lines. Default: false */
  vertical?: boolean;
  /** Number of horizontal grid lines. Default: 5 */
  numTicksRows?: number;
  /** Number of vertical grid lines. Default: 10 */
  numTicksColumns?: number;
  /** Explicit tick values for horizontal grid lines. Overrides numTicksRows. */
  rowTickValues?: number[];
  /** Grid line stroke color. Default: var(--chart-grid) */
  stroke?: string;
  /** Grid line stroke opacity. Default: 1 */
  strokeOpacity?: number;
  /** Grid line stroke width. Default: 1 */
  strokeWidth?: number;
  /** Grid line dash array. Default: "4,4" for dashed lines */
  strokeDasharray?: string;
  /** Enable horizontal fade effect on grid rows (fades at left/right). Default: true */
  fadeHorizontal?: boolean;
  /** Enable vertical fade effect on grid columns (fades at top/bottom). Default: false */
  fadeVertical?: boolean;
}

export function Grid({
  horizontal = true,
  vertical = false,
  numTicksRows = 5,
  numTicksColumns = 10,
  rowTickValues,
  stroke = chartCssVars.grid,
  strokeOpacity = 1,
  strokeWidth = 1,
  strokeDasharray = "4,4",
  fadeHorizontal = true,
  fadeVertical = false,
}: GridProps) {
  const { xScale, yScale, innerWidth, innerHeight, orientation, barScale } =
    useChart();

  // For bar charts, determine which scale to use for grid lines
  // Horizontal bar charts: vertical grid should use yScale (value scale)
  // Vertical bar charts: horizontal grid uses yScale (value scale)
  const isHorizontalBarChart = orientation === "horizontal" && barScale;

  // For vertical grid lines in horizontal bar charts, use yScale (the value scale)
  // For time-based charts, use xScale
  const columnScale = isHorizontalBarChart ? yScale : xScale;
  const uniqueId = useId();

  // Horizontal fade mask (for grid rows - fades left/right)
  const hMaskId = `grid-rows-fade-${uniqueId}`;
  const hGradientId = `${hMaskId}-gradient`;

  // Vertical fade mask (for grid columns - fades top/bottom)
  const vMaskId = `grid-cols-fade-${uniqueId}`;
  const vGradientId = `${vMaskId}-gradient`;

  return (
    <g className="chart-grid">
      {/* Gradient mask for horizontal grid lines - fades at left/right */}
      {horizontal && fadeHorizontal && (
        <defs>
          <linearGradient id={hGradientId} x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" style={{ stopColor: "white", stopOpacity: 0 }} />
            <stop offset="10%" style={{ stopColor: "white", stopOpacity: 1 }} />
            <stop offset="90%" style={{ stopColor: "white", stopOpacity: 1 }} />
            <stop
              offset="100%"
              style={{ stopColor: "white", stopOpacity: 0 }}
            />
          </linearGradient>
          <mask id={hMaskId}>
            <rect
              fill={`url(#${hGradientId})`}
              height={innerHeight}
              width={innerWidth}
              x="0"
              y="0"
            />
          </mask>
        </defs>
      )}

      {/* Gradient mask for vertical grid lines - fades at top/bottom */}
      {vertical && fadeVertical && (
        <defs>
          <linearGradient id={vGradientId} x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "white", stopOpacity: 0 }} />
            <stop offset="10%" style={{ stopColor: "white", stopOpacity: 1 }} />
            <stop offset="90%" style={{ stopColor: "white", stopOpacity: 1 }} />
            <stop
              offset="100%"
              style={{ stopColor: "white", stopOpacity: 0 }}
            />
          </linearGradient>
          <mask id={vMaskId}>
            <rect
              fill={`url(#${vGradientId})`}
              height={innerHeight}
              width={innerWidth}
              x="0"
              y="0"
            />
          </mask>
        </defs>
      )}

      {horizontal && (
        <g mask={fadeHorizontal ? `url(#${hMaskId})` : undefined}>
          <GridRows
            numTicks={rowTickValues ? undefined : numTicksRows}
            scale={yScale}
            stroke={stroke}
            strokeDasharray={strokeDasharray}
            strokeOpacity={strokeOpacity}
            strokeWidth={strokeWidth}
            tickValues={rowTickValues}
            width={innerWidth}
          />
        </g>
      )}
      {vertical && columnScale && typeof columnScale === "function" && (
        <g mask={fadeVertical ? `url(#${vMaskId})` : undefined}>
          <GridColumns
            height={innerHeight}
            numTicks={numTicksColumns}
            scale={columnScale}
            stroke={stroke}
            strokeDasharray={strokeDasharray}
            strokeOpacity={strokeOpacity}
            strokeWidth={strokeWidth}
          />
        </g>
      )}
    </g>
  );
}

Grid.displayName = "Grid";

// ---- x-axis.tsx ----
export interface XAxisProps {
  /** Number of ticks to show (including first and last). Default: 5 */
  numTicks?: number;
  /** Width of the date ticker box for fade calculation. Default: 50 */
  tickerHalfWidth?: number;
}

interface XAxisLabelProps {
  label: string;
  x: number;
  crosshairX: number | null;
  isHovering: boolean;
  tickerHalfWidth: number;
}

function XAxisLabel({
  label,
  x,
  crosshairX,
  isHovering,
  tickerHalfWidth,
}: XAxisLabelProps) {
  const fadeBuffer = 20;
  const fadeRadius = tickerHalfWidth + fadeBuffer;

  let opacity = 1;
  if (isHovering && crosshairX !== null) {
    const distance = Math.abs(x - crosshairX);
    if (distance < tickerHalfWidth) {
      opacity = 0;
    } else if (distance < fadeRadius) {
      opacity = (distance - tickerHalfWidth) / fadeBuffer;
    }
  }

  // Zero-width container approach for perfect centering
  // The wrapper is positioned exactly at x with width:0
  // The inner span overflows and is centered via text-align
  return (
    <div
      className="absolute"
      style={{
        left: x,
        bottom: 12,
        width: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <motion.span
        animate={{ opacity }}
        className={cn("whitespace-nowrap text-chart-label text-xs")}
        initial={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {label}
      </motion.span>
    </div>
  );
}

export function XAxis({ numTicks = 5, tickerHalfWidth = 50 }: XAxisProps) {
  const { xScale, margin, tooltipData, containerRef } = useChart();
  const [mounted, setMounted] = useState(false);

  // Only render on client side after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate evenly spaced tick values, always including first and last dates
  const labelsToShow = useMemo(() => {
    const domain = xScale.domain();
    const startDate = domain[0];
    const endDate = domain[1];

    if (!(startDate && endDate)) {
      return [];
    }

    const startTime = startDate.getTime();
    const endTime = endDate.getTime();
    const timeRange = endTime - startTime;

    // Create evenly spaced dates from start to end
    const tickCount = Math.max(2, numTicks); // At least first and last
    const dates: Date[] = [];

    for (let i = 0; i < tickCount; i++) {
      const t = i / (tickCount - 1); // 0 to 1
      const time = startTime + t * timeRange;
      dates.push(new Date(time));
    }

    return dates.map((date) => ({
      date,
      x: (xScale(date) ?? 0) + margin.left,
      label: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    }));
  }, [xScale, margin.left, numTicks]);

  const isHovering = tooltipData !== null;
  const crosshairX = tooltipData ? tooltipData.x + margin.left : null;

  // Use portal to render into the chart container
  // Only render after mount on client side
  const container = containerRef.current;
  if (!(mounted && container)) {
    return null;
  }

  // Dynamic import to avoid SSR issues
  const { createPortal } = require("react-dom") as typeof import("react-dom");

  return createPortal(
    <div className="pointer-events-none absolute inset-0">
      {labelsToShow.map((item) => (
        <XAxisLabel
          crosshairX={crosshairX}
          isHovering={isHovering}
          key={`${item.label}-${item.x}`}
          label={item.label}
          tickerHalfWidth={tickerHalfWidth}
          x={item.x}
        />
      ))}
    </div>,
    container
  );
}

XAxis.displayName = "XAxis";

// ---- y-axis.tsx ----
export interface YAxisProps {
  /** Number of ticks to show. Default: 5 */
  numTicks?: number;
  /** Format large numbers (e.g. 1000 as "1k"). Default: true */
  formatLargeNumbers?: boolean;
  /** Custom formatter for tick labels (e.g. USD). Overrides formatLargeNumbers when set. */
  formatValue?: (value: number) => string;
}

function formatLabel(
  value: number,
  formatLargeNumbers: boolean,
  formatValue?: (value: number) => string
): string {
  if (formatValue) {
    return formatValue(value);
  }
  if (formatLargeNumbers && value >= 1000) {
    return `${(value / 1000).toFixed(0)}k`;
  }
  return String(value);
}

export function YAxis({
  numTicks = 5,
  formatLargeNumbers = true,
  formatValue,
}: YAxisProps) {
  const { yScale, margin, containerRef } = useChart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const ticks = useMemo(() => {
    const tickValues = yScale.ticks(numTicks);
    return tickValues.map((value) => ({
      value,
      y: (yScale(value) ?? 0) + margin.top,
      label: formatLabel(value, formatLargeNumbers, formatValue),
    }));
  }, [yScale, margin.top, numTicks, formatLargeNumbers, formatValue]);

  const container = containerRef.current;
  if (!(mounted && container)) {
    return null;
  }

  const { createPortal } = require("react-dom") as typeof import("react-dom");

  return createPortal(
    <div
      className="pointer-events-none absolute top-0 bottom-0"
      style={{ left: 0, width: margin.left }}
    >
      {ticks.map((tick) => (
        <div
          className="absolute right-0 flex items-center justify-end pr-2"
          key={tick.value}
          style={{ top: tick.y, transform: "translateY(-50%)" }}
        >
          <span className="text-chart-label text-xs">{tick.label}</span>
        </div>
      ))}
    </div>,
    container
  );
}

YAxis.displayName = "YAxis";

// ---- tooltip-dot.tsx ----
// Faster spring to stay in sync with indicator
const crosshairSpringConfig = { stiffness: 300, damping: 30 };

export interface TooltipDotProps {
  x: number;
  y: number;
  visible: boolean;
  color: string;
  size?: number;
  strokeColor?: string;
  strokeWidth?: number;
}

export function TooltipDot({
  x,
  y,
  visible,
  color,
  size = 5,
  strokeColor = chartCssVars.background,
  strokeWidth = 2,
}: TooltipDotProps) {
  const animatedX = useSpring(x, crosshairSpringConfig);
  const animatedY = useSpring(y, crosshairSpringConfig);

  useEffect(() => {
    animatedX.set(x);
    animatedY.set(y);
  }, [x, y, animatedX, animatedY]);

  if (!visible) {
    return null;
  }

  return (
    <motion.circle
      cx={animatedX}
      cy={animatedY}
      fill={color}
      r={size}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
    />
  );
}

TooltipDot.displayName = "TooltipDot";

// ---- tooltip-indicator.tsx ----
// Faster spring for crosshair - responsive to mouse movement

export type IndicatorWidth =
  | number // Pixel width
  | "line" // 1px line (default)
  | "thin" // 2px
  | "medium" // 4px
  | "thick"; // 8px

export interface TooltipIndicatorProps {
  /** X position in pixels (center of the indicator) */
  x: number;
  /** Height of the indicator */
  height: number;
  /** Whether the indicator is visible */
  visible: boolean;
  /**
   * Width of the indicator - number (pixels) or preset.
   * Ignored if `span` is provided.
   */
  width?: IndicatorWidth;
  /**
   * Number of columns/days to span, with current point centered.
   * Requires `columnWidth` to be set.
   */
  span?: number;
  /** Width of a single column/day in pixels. Required when using `span`. */
  columnWidth?: number;
  /** Primary color at edges (10% and 90%) */
  colorEdge?: string;
  /** Secondary color at center (50%) */
  colorMid?: string;
  /** Whether to fade to transparent at 0% and 100% */
  fadeEdges?: boolean;
  /** Unique ID for the gradient */
  gradientId?: string;
}

function resolveWidth(width: IndicatorWidth): number {
  if (typeof width === "number") {
    return width;
  }
  switch (width) {
    case "line":
      return 1;
    case "thin":
      return 2;
    case "medium":
      return 4;
    case "thick":
      return 8;
    default:
      return 1;
  }
}

export function TooltipIndicator({
  x,
  height,
  visible,
  width = "line",
  span,
  columnWidth,
  colorEdge = chartCssVars.crosshair,
  colorMid = chartCssVars.crosshair,
  fadeEdges = true,
  gradientId = "tooltip-indicator-gradient",
}: TooltipIndicatorProps) {
  const pixelWidth =
    span !== undefined && columnWidth !== undefined
      ? span * columnWidth
      : resolveWidth(width);

  const animatedX = useSpring(x - pixelWidth / 2, crosshairSpringConfig);

  useEffect(() => {
    animatedX.set(x - pixelWidth / 2);
  }, [x, animatedX, pixelWidth]);

  if (!visible) {
    return null;
  }

  const edgeOpacity = fadeEdges ? 0 : 1;

  return (
    <g>
      <defs>
        <linearGradient id={gradientId} x1="0%" x2="0%" y1="0%" y2="100%">
          <stop
            offset="0%"
            style={{ stopColor: colorEdge, stopOpacity: edgeOpacity }}
          />
          <stop offset="10%" style={{ stopColor: colorEdge, stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: colorMid, stopOpacity: 1 }} />
          <stop offset="90%" style={{ stopColor: colorEdge, stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: colorEdge, stopOpacity: edgeOpacity }}
          />
        </linearGradient>
      </defs>
      <motion.rect
        fill={`url(#${gradientId})`}
        height={height}
        width={pixelWidth}
        x={animatedX}
        y={0}
      />
    </g>
  );
}

TooltipIndicator.displayName = "TooltipIndicator";

// ---- tooltip-box.tsx ----
// Spring config for smooth tooltip movement
const springConfig = { stiffness: 100, damping: 20 };

export interface TooltipBoxProps {
  /** X position in pixels (relative to container) */
  x: number;
  /** Y position in pixels (relative to container) */
  y: number;
  /** Whether the tooltip is visible */
  visible: boolean;
  /** Container ref for portal rendering */
  containerRef: RefObject<HTMLDivElement | null>;
  /** Container width for flip detection */
  containerWidth: number;
  /** Container height for bounds clamping */
  containerHeight: number;
  /** Offset from the target position */
  offset?: number;
  /** Custom class name */
  className?: string;
  /** Tooltip content */
  children: React.ReactNode;
  /** Override left position (bypasses internal calculation) */
  left?: number | ReturnType<typeof useSpring>;
  /** Override top position (bypasses internal calculation) */
  top?: number | ReturnType<typeof useSpring>;
  /** Force flip direction (for custom positioning) */
  flipped?: boolean;
}

export function TooltipBox({
  x,
  y,
  visible,
  containerRef,
  containerWidth,
  containerHeight,
  offset = 16,
  className = "",
  children,
  left: leftOverride,
  top: topOverride,
  flipped: flippedOverride,
}: TooltipBoxProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipWidth, setTooltipWidth] = useState(180);
  const [tooltipHeight, setTooltipHeight] = useState(80);
  const [mounted, setMounted] = useState(false);

  // Only render portals on client side after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Measure tooltip dimensions
  useLayoutEffect(() => {
    if (tooltipRef.current) {
      const w = tooltipRef.current.offsetWidth;
      const h = tooltipRef.current.offsetHeight;
      if (w > 0 && w !== tooltipWidth) {
        setTooltipWidth(w);
      }
      if (h > 0 && h !== tooltipHeight) {
        setTooltipHeight(h);
      }
    }
  }, [tooltipWidth, tooltipHeight]);

  // Calculate positions with flip detection
  const shouldFlipX = x + tooltipWidth + offset > containerWidth;
  const targetX = shouldFlipX ? x - offset - tooltipWidth : x + offset;

  // Vertical positioning with bounds clamping
  const targetY = Math.max(
    offset,
    Math.min(y - tooltipHeight / 2, containerHeight - tooltipHeight - offset)
  );

  // Track flip state for animation
  const prevFlipRef = useRef(shouldFlipX);
  const [flipKey, setFlipKey] = useState(0);

  useEffect(() => {
    if (prevFlipRef.current !== shouldFlipX) {
      setFlipKey((k) => k + 1);
      prevFlipRef.current = shouldFlipX;
    }
  }, [shouldFlipX]);

  // Animated positions
  const animatedLeft = useSpring(targetX, springConfig);
  const animatedTop = useSpring(targetY, springConfig);

  useEffect(() => {
    animatedLeft.set(targetX);
  }, [targetX, animatedLeft]);

  useEffect(() => {
    animatedTop.set(targetY);
  }, [targetY, animatedTop]);

  // Use overrides when provided
  const finalLeft = leftOverride ?? animatedLeft;
  const finalTop = topOverride ?? animatedTop;
  const isFlipped = flippedOverride ?? shouldFlipX;
  const transformOrigin = isFlipped ? "right top" : "left top";

  // Use portal to render into the container
  const container = containerRef.current;
  if (!(mounted && container)) {
    return null;
  }

  // Dynamic import to avoid SSR issues
  const { createPortal } = require("react-dom") as typeof import("react-dom");

  if (!visible) {
    return null;
  }

  return createPortal(
    <motion.div
      animate={{ opacity: 1 }}
      className={cn("pointer-events-none absolute z-50", className)}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      ref={tooltipRef}
      style={{ left: finalLeft, top: finalTop }}
      transition={{ duration: 0.1 }}
    >
      <motion.div
        animate={{ scale: 1, opacity: 1, x: 0 }}
        className="min-w-[140px] overflow-hidden rounded-lg bg-popover text-popover-foreground shadow-lg backdrop-blur-md"
        initial={{ scale: 0.85, opacity: 0, x: isFlipped ? 20 : -20 }}
        key={flipKey}
        style={{ transformOrigin }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {children}
      </motion.div>
    </motion.div>,
    container
  );
}

TooltipBox.displayName = "TooltipBox";

// ---- tooltip-content.tsx ----
export interface TooltipRow {
  color: string;
  label: string;
  value: string | number;
}

export interface TooltipContentProps {
  title?: string;
  rows: TooltipRow[];
  /** Optional additional content (e.g., markers) */
  children?: ReactNode;
}

export function TooltipContent({ title, rows, children }: TooltipContentProps) {
  const [measureRef, bounds] = useMeasure({ debounce: 0, scroll: false });
  const [committedHeight, setCommittedHeight] = useState<number | null>(null);
  // Track the children state that we've committed to (not the current one)
  const committedChildrenStateRef = useRef<boolean | null>(null);
  const frameRef = useRef<number | null>(null);

  const hasChildren = !!children;
  const markerKey = hasChildren ? "has-marker" : "no-marker";

  // Check if we're waiting for a structural change to settle
  // This is true when children state differs from our last committed state
  const isWaitingForSettlement =
    committedChildrenStateRef.current !== null &&
    committedChildrenStateRef.current !== hasChildren;

  // Commit height changes with a frame delay when structure changes
  useEffect(() => {
    if (bounds.height <= 0) {
      return;
    }

    // Cancel any pending frame
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    if (isWaitingForSettlement) {
      // Structure changed - wait for layout to settle before committing
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = requestAnimationFrame(() => {
          setCommittedHeight(bounds.height);
          committedChildrenStateRef.current = hasChildren;
        });
      });
    } else {
      // No structural change, commit immediately
      setCommittedHeight(bounds.height);
      committedChildrenStateRef.current = hasChildren;
    }

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [bounds.height, hasChildren, isWaitingForSettlement]);

  // Animate if we have a committed height
  const shouldAnimate = committedHeight !== null;

  return (
    <motion.div
      // Only animate if we have a committed height, otherwise use auto
      animate={
        committedHeight !== null ? { height: committedHeight } : undefined
      }
      className="overflow-hidden"
      // Skip initial animation
      initial={false}
      // Apply spring transition when we have a committed height
      transition={
        shouldAnimate
          ? {
              type: "spring",
              stiffness: 500,
              damping: 35,
              mass: 0.8,
            }
          : { duration: 0 }
      }
    >
      <div className="px-3 py-2.5" ref={measureRef}>
        {title && (
          <div className="mb-2 font-medium text-chart-tooltip-foreground text-xs">
            {title}
          </div>
        )}
        <div className="space-y-1.5">
          {rows.map((row) => (
            <div
              className="flex items-center justify-between gap-4"
              key={`${row.label}-${row.color}`}
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: row.color }}
                />
                <span className="text-chart-tooltip-muted text-sm">
                  {row.label}
                </span>
              </div>
              <span className="font-medium text-chart-tooltip-foreground text-sm tabular-nums">
                {typeof row.value === "number"
                  ? row.value.toLocaleString()
                  : row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Animated additional content */}
        <AnimatePresence mode="wait">
          {children && (
            <motion.div
              animate={{ opacity: 1, filter: "blur(0px)" }}
              className="mt-2"
              exit={{ opacity: 0, filter: "blur(4px)" }}
              initial={{ opacity: 0, filter: "blur(4px)" }}
              key={markerKey}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

TooltipContent.displayName = "TooltipContent";

// ---- date-ticker.tsx ----
const TICKER_ITEM_HEIGHT = 24;

export interface DateTickerProps {
  currentIndex: number;
  labels: string[];
  visible: boolean;
}

export function DateTicker({ currentIndex, labels, visible }: DateTickerProps) {
  // Parse labels into month and day parts
  const parsedLabels = useMemo(() => {
    return labels.map((label) => {
      const parts = label.split(" ");
      const month = parts[0] || "";
      const day = parts[1] || "";
      return { month, day, full: label };
    });
  }, [labels]);

  // Get unique months and their indices
  const monthIndices = useMemo(() => {
    const uniqueMonths: string[] = [];
    const indices: number[] = [];

    parsedLabels.forEach((label, index) => {
      if (uniqueMonths.length === 0 || uniqueMonths.at(-1) !== label.month) {
        uniqueMonths.push(label.month);
        indices.push(index);
      }
    });

    return { uniqueMonths, indices };
  }, [parsedLabels]);

  // Find current month index
  const currentMonthIndex = useMemo(() => {
    if (currentIndex < 0 || currentIndex >= parsedLabels.length) {
      return 0;
    }
    const currentMonth = parsedLabels[currentIndex]?.month;
    return monthIndices.uniqueMonths.indexOf(currentMonth || "");
  }, [currentIndex, parsedLabels, monthIndices]);

  // Track previous month index
  const prevMonthIndexRef = useRef(-1);

  // Animated Y offsets
  const dayY = useSpring(0, { stiffness: 400, damping: 35 });
  const monthY = useSpring(0, { stiffness: 400, damping: 35 });

  // Update day scroll position
  useEffect(() => {
    dayY.set(-currentIndex * TICKER_ITEM_HEIGHT);
  }, [currentIndex, dayY]);

  // Update month scroll position only when month changes
  useEffect(() => {
    if (currentMonthIndex >= 0) {
      const isFirstRender = prevMonthIndexRef.current === -1;
      const monthChanged = prevMonthIndexRef.current !== currentMonthIndex;

      if (isFirstRender || monthChanged) {
        monthY.set(-currentMonthIndex * TICKER_ITEM_HEIGHT);
        prevMonthIndexRef.current = currentMonthIndex;
      }
    }
  }, [currentMonthIndex, monthY]);

  if (!visible || labels.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="overflow-hidden rounded-full bg-zinc-900 px-4 py-1 text-white shadow-lg dark:bg-zinc-100 dark:text-zinc-900"
      layout
      transition={{
        layout: { type: "spring", stiffness: 400, damping: 35 },
      }}
    >
      <div className="relative h-6 overflow-hidden">
        <div className="flex items-center justify-center gap-1">
          {/* Month stack */}
          <div className="relative h-6 overflow-hidden">
            <motion.div className="flex flex-col" style={{ y: monthY }}>
              {monthIndices.uniqueMonths.map((month) => (
                <div
                  className="flex h-6 shrink-0 items-center justify-center"
                  key={month}
                >
                  <span className="whitespace-nowrap font-medium text-sm">
                    {month}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Day stack */}
          <div className="relative h-6 overflow-hidden">
            <motion.div className="flex flex-col" style={{ y: dayY }}>
              {parsedLabels.map((label) => (
                <div
                  className="flex h-6 shrink-0 items-center justify-center"
                  key={label.full}
                >
                  <span className="whitespace-nowrap font-medium text-sm">
                    {label.day}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

DateTicker.displayName = "DateTicker";

// ---- chart-tooltip.tsx ----
// Spring config for crosshair

export interface ChartTooltipProps {
  /** Whether to show the date pill at bottom. Default: true */
  showDatePill?: boolean;
  /** Whether to show the vertical crosshair line. Default: true */
  showCrosshair?: boolean;
  /** Whether to show dots on the lines. Default: true */
  showDots?: boolean;
  /**
   * Color for the crosshair/indicator line. When a function, receives the hovered point
   * (e.g. for candlestick: match candle color from close vs open). Default: --chart-crosshair.
   */
  indicatorColor?: string | ((point: Record<string, unknown>) => string);
  /** Custom content renderer for the tooltip box */
  content?: (props: {
    point: Record<string, unknown>;
    index: number;
  }) => React.ReactNode;
  /** Custom row renderer - return array of TooltipRow */
  rows?: (point: Record<string, unknown>) => TooltipRow[];
  /** Additional content to show below rows (e.g., markers) */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
}

export function ChartTooltip({
  showDatePill = true,
  showCrosshair = true,
  showDots = true,
  indicatorColor: indicatorColorProp,
  content,
  rows: rowsRenderer,
  children,
  className = "",
}: ChartTooltipProps) {
  const {
    tooltipData,
    width,
    height,
    innerHeight,
    margin,
    columnWidth,
    lines,
    xAccessor,
    dateLabels,
    containerRef,
    orientation,
    barXAccessor,
  } = useChart();

  const isHorizontal = orientation === "horizontal";

  const [mounted, setMounted] = useState(false);

  // Only render portals on client side after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const visible = tooltipData !== null;
  const x = tooltipData?.x ?? 0;
  const xWithMargin = x + margin.left;

  // For horizontal charts, get the y position from the first line's yPosition (center of bar)
  const firstLineDataKey = lines[0]?.dataKey;
  const firstLineY = firstLineDataKey
    ? (tooltipData?.yPositions[firstLineDataKey] ?? 0)
    : 0;
  const yWithMargin = firstLineY + margin.top;

  // Animated crosshair position
  const animatedX = useSpring(xWithMargin, crosshairSpringConfig);

  useEffect(() => {
    animatedX.set(xWithMargin);
  }, [xWithMargin, animatedX]);

  // Generate rows from lines
  const tooltipRows = useMemo(() => {
    if (!tooltipData) {
      return [];
    }

    if (rowsRenderer) {
      return rowsRenderer(tooltipData.point);
    }

    // Default: generate rows from registered lines
    return lines.map((line) => ({
      color: line.stroke,
      label: line.dataKey,
      value: (tooltipData.point[line.dataKey] as number) ?? 0,
    }));
  }, [tooltipData, lines, rowsRenderer]);

  // Resolve indicator color (static or from hovered point)
  const indicatorColor = useMemo(() => {
    if (indicatorColorProp == null) {
      return chartCssVars.crosshair;
    }
    if (typeof indicatorColorProp === "function") {
      return tooltipData
        ? indicatorColorProp(tooltipData.point)
        : chartCssVars.crosshair;
    }
    return indicatorColorProp;
  }, [indicatorColorProp, tooltipData]);

  // Title from date or category
  const title = useMemo(() => {
    if (!tooltipData) {
      return undefined;
    }
    // For bar charts (horizontal or vertical), use the category name
    if (barXAccessor) {
      return barXAccessor(tooltipData.point);
    }
    // For line/area charts, use the date
    return xAccessor(tooltipData.point).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }, [tooltipData, barXAccessor, xAccessor]);

  // Use portal to render into the chart container
  // Only render after mount on client side
  const container = containerRef.current;
  if (!(mounted && container)) {
    return null;
  }

  // Dynamic import to avoid SSR issues
  const { createPortal } = require("react-dom") as typeof import("react-dom");

  const tooltipContent = (
    <>
      {/* Crosshair indicator - rendered as SVG overlay */}
      {showCrosshair && (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          height="100%"
          width="100%"
        >
          <g transform={`translate(${margin.left},${margin.top})`}>
            <TooltipIndicator
              colorEdge={indicatorColor}
              colorMid={indicatorColor}
              columnWidth={columnWidth}
              fadeEdges
              height={innerHeight}
              visible={visible}
              width="line"
              x={x}
            />
          </g>
        </svg>
      )}

      {/* Dots on bars/lines - show for vertical charts only */}
      {showDots && visible && !isHorizontal && (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          height="100%"
          width="100%"
        >
          <g transform={`translate(${margin.left},${margin.top})`}>
            {lines.map((line) => (
              <TooltipDot
                color={line.stroke}
                key={line.dataKey}
                strokeColor={chartCssVars.background}
                visible={visible}
                x={tooltipData?.xPositions?.[line.dataKey] ?? x}
                y={tooltipData?.yPositions[line.dataKey] ?? 0}
              />
            ))}
          </g>
        </svg>
      )}

      {/* Tooltip Box */}
      <TooltipBox
        className={className}
        containerHeight={height}
        containerRef={containerRef}
        containerWidth={width}
        top={isHorizontal ? undefined : margin.top}
        visible={visible}
        x={xWithMargin}
        y={isHorizontal ? yWithMargin : margin.top}
      >
        {content && tooltipData
          ? content({
              point: tooltipData.point,
              index: tooltipData.index,
            })
          : !content && (
              <TooltipContent rows={tooltipRows} title={title}>
                {children}
              </TooltipContent>
            )}
      </TooltipBox>

      {/* Date/Category Ticker - only show for vertical charts */}
      {showDatePill && dateLabels.length > 0 && visible && !isHorizontal && (
        <motion.div
          className="pointer-events-none absolute z-50"
          style={{
            left: animatedX,
            transform: "translateX(-50%)",
            bottom: 4,
          }}
        >
          <DateTicker
            currentIndex={tooltipData?.index ?? 0}
            labels={dateLabels}
            visible={visible}
          />
        </motion.div>
      )}
    </>
  );

  return createPortal(tooltipContent, container);
}

ChartTooltip.displayName = "ChartTooltip";

// ---- legend-context.tsx ----
// CSS variable references for legend theming
export const legendCssVars = {
  background: "var(--legend)",
  foreground: "var(--legend-foreground)",
  muted: "var(--legend-muted)",
  mutedForeground: "var(--legend-muted-foreground)",
  track: "var(--legend-track)",
};

export interface LegendItemData {
  /** Display label */
  label: string;
  /** Current value */
  value: number;
  /** Maximum value (for progress/percentage calculation) */
  maxValue?: number;
  /** Item color */
  color: string;
}

export interface LegendContextValue {
  /** All legend items */
  items: LegendItemData[];
  /** Currently hovered index */
  hoveredIndex: number | null;
  /** Set hovered index */
  setHoveredIndex: (index: number | null) => void;
}

export interface LegendItemContextValue {
  /** The current item data */
  item: LegendItemData;
  /** Index of this item */
  index: number;
  /** Whether this item is hovered */
  isHovered: boolean;
  /** Whether this item is faded (another item is hovered) */
  isFaded: boolean;
  /** Percentage value (value / maxValue * 100) */
  percentage: number;
}

const LegendContext = createContext<LegendContextValue | null>(null);
const LegendItemContext = createContext<LegendItemContextValue | null>(null);

export function LegendProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: LegendContextValue;
}) {
  return (
    <LegendContext.Provider value={value}>{children}</LegendContext.Provider>
  );
}

export function LegendItemProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: LegendItemContextValue;
}) {
  return (
    <LegendItemContext.Provider value={value}>
      {children}
    </LegendItemContext.Provider>
  );
}

export function useLegend(): LegendContextValue {
  const context = useContext(LegendContext);
  if (!context) {
    throw new Error("useLegend must be used within a <Legend> component.");
  }
  return context;
}

export function useLegendItem(): LegendItemContextValue {
  const context = useContext(LegendItemContext);
  if (!context) {
    throw new Error(
      "useLegendItem must be used within a <LegendItem> component."
    );
  }
  return context;
}

// ---- legend-marker.tsx ----
export interface LegendMarkerProps {
  /** Marker size class. Default: "h-2.5 w-2.5" */
  className?: string;
}

export function LegendMarker({ className = "h-2.5 w-2.5" }: LegendMarkerProps) {
  const { item } = useLegendItem();

  // Note: backgroundColor must remain inline style as item.color is dynamic data
  return (
    <div
      className={cn("shrink-0 rounded-full", className)}
      style={{ backgroundColor: item.color }}
    />
  );
}

LegendMarker.displayName = "LegendMarker";

// ---- legend-label.tsx ----
export interface LegendLabelProps {
  /** Label class name. Default: "text-sm font-medium" */
  className?: string;
}

export function LegendLabel({
  className = "text-sm font-medium",
}: LegendLabelProps) {
  const { item } = useLegendItem();

  return (
    <span className={cn("text-legend-foreground", className)}>
      {item.label}
    </span>
  );
}

LegendLabel.displayName = "LegendLabel";

// ---- legend-value.tsx ----
export interface LegendValueProps {
  /** Value class name. Default: "text-sm tabular-nums" */
  className?: string;
  /** Show percentage alongside value. Default: false */
  showPercentage?: boolean;
  /** Percentage class name. Default: "text-xs tabular-nums" */
  percentageClassName?: string;
  /** Format function for the value. Default: toLocaleString() */
  formatValue?: (value: number) => string;
  /** Format function for percentage. Default: (p) => `${p.toFixed(0)}%` */
  formatPercentage?: (percentage: number) => string;
}

export function LegendValue({
  className = "text-sm tabular-nums",
  showPercentage = false,
  percentageClassName = "text-xs tabular-nums",
  formatValue = (v) => v.toLocaleString(),
  formatPercentage = (p) => `${p.toFixed(0)}%`,
}: LegendValueProps) {
  const { item, percentage } = useLegendItem();

  return (
    <span
      className={cn(
        "flex items-center gap-2 text-legend-muted-foreground",
        className
      )}
    >
      <span>{formatValue(item.value)}</span>
      {showPercentage && item.maxValue && (
        <span className={percentageClassName}>
          {formatPercentage(percentage)}
        </span>
      )}
    </span>
  );
}

LegendValue.displayName = "LegendValue";

// ---- legend-progress.tsx ----
export interface LegendProgressProps {
  /** Track class name */
  trackClassName?: string;
  /** Indicator class name */
  indicatorClassName?: string;
  /** Track height. Default: "h-1.5" */
  height?: string;
}

export function LegendProgress({
  trackClassName = "",
  indicatorClassName = "",
  height = "h-1.5",
}: LegendProgressProps) {
  const { item } = useLegendItem();

  if (!item.maxValue) {
    return null;
  }

  // Note: item.color must remain inline style as it's dynamic data
  return (
    <Progress.Root max={item.maxValue} value={item.value}>
      <Progress.Track
        className={cn(
          "w-full overflow-hidden rounded-full bg-legend-track",
          height,
          trackClassName
        )}
      >
        <Progress.Indicator
          className={cn(
            "h-full rounded-full transition-all duration-500",
            indicatorClassName
          )}
          style={{ backgroundColor: item.color }}
        />
      </Progress.Track>
    </Progress.Root>
  );
}

LegendProgress.displayName = "LegendProgress";

// ---- legend-item.tsx ----
export interface LegendItemProps {
  /** Container class name */
  className?: string;
  /** Children components (LegendMarker, LegendLabel, LegendValue, LegendProgress) */
  children: ReactNode;
}

export function LegendItem({ className = "", children }: LegendItemProps) {
  const { setHoveredIndex } = useLegend();
  const { index, isHovered } = useLegendItem();

  return (
    // biome-ignore lint/a11y/noNoninteractiveElementInteractions: Legend item hover interaction
    // biome-ignore lint/a11y/noStaticElementInteractions: Legend item hover interaction
    <div
      className={cn(
        "cursor-pointer rounded-lg px-2 py-1.5 transition-all duration-150 ease-out",
        isHovered && "bg-legend-muted",
        className
      )}
      data-hovered={isHovered ? "" : undefined}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {children}
    </div>
  );
}

LegendItem.displayName = "LegendItem";

// ---- legend.tsx ----
export interface LegendProps {
  /** Legend items data */
  items: LegendItemData[];
  /** Controlled hover state */
  hoveredIndex?: number | null;
  /** Hover state change callback */
  onHoverChange?: (index: number | null) => void;
  /** Title shown above the legend */
  title?: string;
  /** Title class name */
  titleClassName?: string;
  /** Container class name */
  className?: string;
  /** Children - should contain a single LegendItem that will be mapped for each item */
  children: ReactElement;
}

export function Legend({
  items,
  hoveredIndex: controlledHoveredIndex,
  onHoverChange,
  title,
  titleClassName = "text-sm font-semibold",
  className = "",
  children,
}: LegendProps) {
  const [internalHoveredIndex, setInternalHoveredIndex] = useState<
    number | null
  >(null);

  // Controlled or uncontrolled hover state
  const isControlled = controlledHoveredIndex !== undefined;
  const hoveredIndex = isControlled
    ? controlledHoveredIndex
    : internalHoveredIndex;
  const setHoveredIndex = (index: number | null) => {
    if (isControlled) {
      onHoverChange?.(index);
    } else {
      setInternalHoveredIndex(index);
    }
  };

  const contextValue = {
    items,
    hoveredIndex,
    setHoveredIndex,
  };

  return (
    <LegendProvider value={contextValue}>
      <div className={cn("legend-container flex flex-col gap-2", className)}>
        {title && (
          <h3 className={cn("mb-1 text-legend-foreground", titleClassName)}>
            {title}
          </h3>
        )}
        {items.map((item, index) => {
          const isHovered = hoveredIndex === index;
          const isFaded = hoveredIndex !== null && hoveredIndex !== index;
          const percentage = item.maxValue
            ? (item.value / item.maxValue) * 100
            : 0;

          const itemContext = {
            item,
            index,
            isHovered,
            isFaded,
            percentage,
          };

          // Clone the child element for each item
          if (isValidElement(children)) {
            return (
              <LegendItemProvider key={item.label} value={itemContext}>
                {cloneElement(children)}
              </LegendItemProvider>
            );
          }

          return null;
        })}
      </div>
    </LegendProvider>
  );
}

Legend.displayName = "Legend";

// ---- line.tsx ----
// CurveFactory type - simplified version compatible with visx
// biome-ignore lint/suspicious/noExplicitAny: d3 curve factory type
type CurveFactory = any;


export interface LineProps {
  /** Key in data to use for y values */
  dataKey: string;
  /** Stroke color. Default: var(--chart-line-primary) */
  stroke?: string;
  /** Stroke width. Default: 2.5 */
  strokeWidth?: number;
  /** Curve function. Default: curveNatural */
  curve?: CurveFactory;
  /** Whether to animate the line. Default: true */
  animate?: boolean;
  /** Whether to fade edges with gradient. Default: true */
  fadeEdges?: boolean;
  /** Whether to show highlight segment on hover. Default: true */
  showHighlight?: boolean;
}

export function Line({
  dataKey,
  stroke = chartCssVars.linePrimary,
  strokeWidth = 2.5,
  curve = curveNatural,
  animate = true,
  fadeEdges = true,
  showHighlight = true,
}: LineProps) {
  const {
    data,
    xScale,
    yScale,
    innerHeight,
    innerWidth,
    tooltipData,
    selection,
    isLoaded,
    animationDuration,
    xAccessor,
  } = useChart();

  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const [clipWidth, setClipWidth] = useState(0);

  // Unique gradient ID for this line
  const gradientId = useMemo(
    () => `line-gradient-${dataKey}-${Math.random().toString(36).slice(2, 9)}`,
    [dataKey]
  );

  // Measure path length and trigger animation
  useEffect(() => {
    if (pathRef.current && animate) {
      const len = pathRef.current.getTotalLength();
      if (len > 0) {
        setPathLength(len);
        if (!isLoaded) {
          requestAnimationFrame(() => {
            setClipWidth(innerWidth);
          });
        }
      }
    }
  }, [animate, innerWidth, isLoaded]);

  // Binary search to find path length at a given X coordinate
  const findLengthAtX = useCallback(
    (targetX: number): number => {
      const path = pathRef.current;
      if (!path || pathLength === 0) {
        return 0;
      }
      let low = 0;
      let high = pathLength;
      const tolerance = 0.5;

      while (high - low > tolerance) {
        const mid = (low + high) / 2;
        const point = path.getPointAtLength(mid);
        if (point.x < targetX) {
          low = mid;
        } else {
          high = mid;
        }
      }
      return (low + high) / 2;
    },
    [pathLength]
  );

  // Calculate segment bounds for highlight from either selection or hover
  const segmentBounds = useMemo(() => {
    if (!pathRef.current || pathLength === 0) {
      return { startLength: 0, segmentLength: 0, isActive: false };
    }

    // Selection takes priority over hover
    if (selection?.active) {
      const startLength = findLengthAtX(selection.startX);
      const endLength = findLengthAtX(selection.endX);
      return {
        startLength,
        segmentLength: endLength - startLength,
        isActive: true,
      };
    }

    if (!tooltipData) {
      return { startLength: 0, segmentLength: 0, isActive: false };
    }

    const idx = tooltipData.index;
    const startIdx = Math.max(0, idx - 1);
    const endIdx = Math.min(data.length - 1, idx + 1);

    const startPoint = data[startIdx];
    const endPoint = data[endIdx];
    if (!(startPoint && endPoint)) {
      return { startLength: 0, segmentLength: 0, isActive: false };
    }

    const startX = xScale(xAccessor(startPoint)) ?? 0;
    const endX = xScale(xAccessor(endPoint)) ?? 0;

    const startLength = findLengthAtX(startX);
    const endLength = findLengthAtX(endX);

    return {
      startLength,
      segmentLength: endLength - startLength,
      isActive: true,
    };
  }, [
    tooltipData,
    selection,
    data,
    xScale,
    pathLength,
    xAccessor,
    findLengthAtX,
  ]);

  // Springs for smooth highlight animation (both offset AND segment length)
  const springConfig = { stiffness: 180, damping: 28 };
  const offsetSpring = useSpring(0, springConfig);
  const segmentLengthSpring = useSpring(0, springConfig);

  // Update springs when segment bounds change
  useEffect(() => {
    offsetSpring.set(-segmentBounds.startLength);
    segmentLengthSpring.set(segmentBounds.segmentLength);
  }, [
    segmentBounds.startLength,
    segmentBounds.segmentLength,
    offsetSpring,
    segmentLengthSpring,
  ]);

  // Create animated strokeDasharray using motion template
  const animatedDasharray = useMotionTemplate`${segmentLengthSpring} ${pathLength}`;

  // Get y value for a data point
  const getY = useCallback(
    (d: Record<string, unknown>) => {
      const value = d[dataKey];
      return typeof value === "number" ? (yScale(value) ?? 0) : 0;
    },
    [dataKey, yScale]
  );

  const isHovering = tooltipData !== null || selection?.active === true;
  const easing = "cubic-bezier(0.85, 0, 0.15, 1)";

  return (
    <>
      {/* Gradient definition for fading edges */}
      {fadeEdges && (
        <defs>
          <linearGradient id={gradientId} x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" style={{ stopColor: stroke, stopOpacity: 0 }} />
            <stop offset="15%" style={{ stopColor: stroke, stopOpacity: 1 }} />
            <stop offset="85%" style={{ stopColor: stroke, stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: stroke, stopOpacity: 0 }} />
          </linearGradient>
        </defs>
      )}

      {/* Clip path for grow animation - unique per line */}
      {animate && (
        <defs>
          <clipPath id={`grow-clip-${dataKey}`}>
            <rect
              height={innerHeight + 20}
              style={{
                transition:
                  !isLoaded && clipWidth > 0
                    ? `width ${animationDuration}ms ${easing}`
                    : "none",
              }}
              width={isLoaded ? innerWidth : clipWidth}
              x={0}
              y={0}
            />
          </clipPath>
        </defs>
      )}

      {/* Main line with clip path */}
      <g clipPath={animate ? `url(#grow-clip-${dataKey})` : undefined}>
        <motion.g
          animate={{ opacity: isHovering && showHighlight ? 0.3 : 1 }}
          initial={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <LinePath
            curve={curve}
            data={data}
            innerRef={pathRef}
            stroke={fadeEdges ? `url(#${gradientId})` : stroke}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
            x={(d) => xScale(xAccessor(d)) ?? 0}
            y={getY}
          />
        </motion.g>
      </g>

      {/* Highlight segment on hover */}
      {showHighlight && isHovering && isLoaded && pathRef.current && (
        <motion.path
          animate={{ opacity: 1 }}
          d={pathRef.current.getAttribute("d") || ""}
          exit={{ opacity: 0 }}
          fill="none"
          initial={{ opacity: 0 }}
          stroke={stroke}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          style={{
            strokeDasharray: animatedDasharray,
            strokeDashoffset: offsetSpring,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      )}
    </>
  );
}

Line.displayName = "Line";

// ---- line-chart.tsx ----
// Check if a component should render after the mouse overlay (markers need to be on top for interaction)
function isPostOverlayComponent(child: ReactElement): boolean {
  const childType = child.type as {
    displayName?: string;
    name?: string;
    __isChartMarkers?: boolean;
  };

  // Check for static marker property (more reliable than displayName)
  if (childType.__isChartMarkers) {
    return true;
  }

  // Fallback to displayName check
  const componentName =
    typeof child.type === "function"
      ? childType.displayName || childType.name || ""
      : "";

  return componentName === "ChartMarkers" || componentName === "MarkerGroup";
}

export interface LineChartProps {
  /** Data array - each item should have a date field and numeric values */
  data: Record<string, unknown>[];
  /** Key in data for the x-axis (date). Default: "date" */
  xDataKey?: string;
  /** Chart margins */
  margin?: Partial<Margin>;
  /** Animation duration in milliseconds. Default: 1100 */
  animationDuration?: number;
  /** Aspect ratio as "width / height". Default: "2 / 1" */
  aspectRatio?: string;
  /** Additional class name for the container */
  className?: string;
  /** Child components (Line, Grid, ChartTooltip, etc.) */
  children: ReactNode;
}

const DEFAULT_MARGIN: Margin = { top: 40, right: 40, bottom: 40, left: 40 };

// Extract line configs from children synchronously to avoid render timing issues
function extractLineConfigs(children: ReactNode): LineConfig[] {
  const configs: LineConfig[] = [];

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      return;
    }

    // Check if it's a Line component by displayName, function reference, or props structure
    const childType = child.type as {
      displayName?: string;
      name?: string;
    };
    const componentName =
      typeof child.type === "function"
        ? childType.displayName || childType.name || ""
        : "";

    // Check by displayName, or by props having dataKey (duck typing)
    const props = child.props as LineProps | undefined;
    const isLineComponent =
      componentName === "Line" ||
      child.type === Line ||
      (props && typeof props.dataKey === "string" && props.dataKey.length > 0);

    if (isLineComponent && props?.dataKey) {
      configs.push({
        dataKey: props.dataKey,
        stroke: props.stroke || "var(--chart-line-primary)",
        strokeWidth: props.strokeWidth || 2.5,
      });
    }
  });

  return configs;
}

interface ChartInnerProps {
  width: number;
  height: number;
  data: Record<string, unknown>[];
  xDataKey: string;
  margin: Margin;
  animationDuration: number;
  children: ReactNode;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

function ChartInner({
  width,
  height,
  data,
  xDataKey,
  margin,
  animationDuration,
  children,
  containerRef,
}: ChartInnerProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Extract line configs synchronously from children
  const lines = useMemo(() => extractLineConfigs(children), [children]);

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // X accessor function
  const xAccessor = useCallback(
    (d: Record<string, unknown>): Date => {
      const value = d[xDataKey];
      return value instanceof Date ? value : new Date(value as string | number);
    },
    [xDataKey]
  );

  // Create bisector for finding nearest data point
  const bisectDate = useMemo(
    () => bisector<Record<string, unknown>, Date>((d) => xAccessor(d)).left,
    [xAccessor]
  );

  // X scale (time) - use exact data domain for tight fit
  const xScale = useMemo(() => {
    const dates = data.map((d) => xAccessor(d));
    const minTime = Math.min(...dates.map((d) => d.getTime()));
    const maxTime = Math.max(...dates.map((d) => d.getTime()));

    return scaleTime({
      range: [0, innerWidth],
      domain: [minTime, maxTime],
    });
  }, [innerWidth, data, xAccessor]);

  // Calculate column width (spacing between data points)
  const columnWidth = useMemo(() => {
    if (data.length < 2) {
      return 0;
    }
    return innerWidth / (data.length - 1);
  }, [innerWidth, data.length]);

  // Y scale - computed from extracted line configs (available immediately)
  const yScale = useMemo(() => {
    let maxValue = 0;
    for (const line of lines) {
      for (const d of data) {
        const value = d[line.dataKey];
        if (typeof value === "number" && value > maxValue) {
          maxValue = value;
        }
      }
    }

    if (maxValue === 0) {
      maxValue = 100;
    }

    return scaleLinear({
      range: [innerHeight, 0],
      domain: [0, maxValue * 1.1],
      nice: true,
    });
  }, [innerHeight, data, lines]);

  // Pre-compute date labels for ticker animation
  const dateLabels = useMemo(
    () =>
      data.map((d) =>
        xAccessor(d).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      ),
    [data, xAccessor]
  );

  // Animation timing
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, animationDuration);
    return () => clearTimeout(timer);
  }, [animationDuration]);

  const canInteract = isLoaded;

  const {
    tooltipData,
    setTooltipData,
    selection,
    clearSelection,
    interactionHandlers,
    interactionStyle,
  } = useChartInteraction({
    xScale,
    yScale,
    data,
    lines,
    margin,
    xAccessor,
    bisectDate,
    canInteract,
  });

  // Early return if dimensions not ready
  if (width < 10 || height < 10) {
    return null;
  }

  // Separate children into pre-overlay (Grid, Line) and post-overlay (ChartMarkers)
  const preOverlayChildren: ReactElement[] = [];
  const postOverlayChildren: ReactElement[] = [];

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      return;
    }

    if (isPostOverlayComponent(child)) {
      postOverlayChildren.push(child);
    } else {
      preOverlayChildren.push(child);
    }
  });

  const contextValue = {
    data,
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
    isLoaded,
    animationDuration,
    xAccessor,
    dateLabels,
    selection,
    clearSelection,
  };

  return (
    <ChartProvider value={contextValue}>
      <svg aria-hidden="true" height={height} width={width}>
        <defs>
          <clipPath id="chart-grow-clip">
            <rect
              height={innerHeight + 20}
              style={{
                transition: isLoaded
                  ? "none"
                  : `width ${animationDuration}ms cubic-bezier(0.85, 0, 0.15, 1)`,
              }}
              width={isLoaded ? innerWidth : 0}
              x={0}
              y={0}
            />
          </clipPath>
        </defs>

        <rect fill="transparent" height={height} width={width} x={0} y={0} />

        <g
          {...interactionHandlers}
          style={interactionStyle}
          transform={`translate(${margin.left},${margin.top})`}
        >
          <rect
            fill="transparent"
            height={innerHeight}
            width={innerWidth}
            x={0}
            y={0}
          />

          {preOverlayChildren}
          {postOverlayChildren}
        </g>
      </svg>
    </ChartProvider>
  );
}

export function LineChart({
  data,
  xDataKey = "date",
  margin: marginProp,
  animationDuration = 1100,
  aspectRatio = "2 / 1",
  className = "",
  children,
}: LineChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const margin = { ...DEFAULT_MARGIN, ...marginProp };

  return (
    <div
      className={cn("relative w-full", className)}
      ref={containerRef}
      style={{ aspectRatio, touchAction: "none" }}
    >
      <ParentSize debounceTime={10}>
        {({ width, height }) => (
          <ChartInner
            animationDuration={animationDuration}
            containerRef={containerRef}
            data={data}
            height={height}
            margin={margin}
            width={width}
            xDataKey={xDataKey}
          >
            {children}
          </ChartInner>
        )}
      </ParentSize>
    </div>
  );
}

// ---- segment.tsx ----

function useSegmentVisibility() {
  const { selection, innerHeight } = useChart();
  const isVisible =
    selection?.active === true &&
    Math.abs(selection.endX - selection.startX) > 5;
  return { selection, innerHeight, isVisible };
}

export interface SegmentBackgroundProps {
  /** Fill color for the selected region. Default: var(--chart-segment-background) */
  fill?: string;
}

export function SegmentBackground({
  fill = chartCssVars.segmentBackground,
}: SegmentBackgroundProps) {
  const { selection, innerHeight, isVisible } = useSegmentVisibility();

  return (
    <AnimatePresence>
      {isVisible && selection && (
        <motion.rect
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          fill={fill}
          height={innerHeight}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          width={selection.endX - selection.startX}
          x={selection.startX}
          y={0}
        />
      )}
    </AnimatePresence>
  );
}

SegmentBackground.displayName = "SegmentBackground";

export type SegmentLineVariant = "dashed" | "solid" | "gradient";

export interface SegmentLineProps {
  /** Stroke color. Default: var(--chart-segment-line) */
  stroke?: string;
  /** Stroke width. Default: 1 */
  strokeWidth?: number;
  /** Line style. Default: "dashed" */
  variant?: SegmentLineVariant;
}

const segmentGradientIdCounter = { current: 0 };

function SegmentLine({
  x,
  stroke = chartCssVars.segmentLine,
  strokeWidth = 1,
  variant = "dashed",
  visible,
  innerHeight,
}: SegmentLineProps & {
  x: number;
  visible: boolean;
  innerHeight: number;
}) {
  const gradientId = useMemo(() => {
    segmentGradientIdCounter.current += 1;
    return `segment-line-grad-${segmentGradientIdCounter.current}`;
  }, []);

  if (!visible) {
    return null;
  }

  if (variant === "gradient") {
    return (
      <g>
        <defs>
          <linearGradient id={gradientId} x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: stroke, stopOpacity: 0 }} />
            <stop offset="10%" style={{ stopColor: stroke, stopOpacity: 1 }} />
            <stop offset="90%" style={{ stopColor: stroke, stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: stroke, stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        <line
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          x1={x}
          x2={x}
          y1={0}
          y2={innerHeight}
        />
      </g>
    );
  }

  return (
    <line
      stroke={stroke}
      strokeDasharray={variant === "dashed" ? "4,4" : undefined}
      strokeWidth={strokeWidth}
      x1={x}
      x2={x}
      y1={0}
      y2={innerHeight}
    />
  );
}

export function SegmentLineFrom(props: SegmentLineProps) {
  const { selection, innerHeight, isVisible } = useSegmentVisibility();

  return (
    <SegmentLine
      {...props}
      innerHeight={innerHeight}
      visible={isVisible}
      x={selection?.startX ?? 0}
    />
  );
}

SegmentLineFrom.displayName = "SegmentLineFrom";

export function SegmentLineTo(props: SegmentLineProps) {
  const { selection, innerHeight, isVisible } = useSegmentVisibility();

  return (
    <SegmentLine
      {...props}
      innerHeight={innerHeight}
      visible={isVisible}
      x={selection?.endX ?? 0}
    />
  );
}

SegmentLineTo.displayName = "SegmentLineTo";

export default LineChart;
