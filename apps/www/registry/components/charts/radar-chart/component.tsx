"use client";

import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import {
  scaleLinear
} from "@visx/scale";
import {
  LineRadial
} from "@visx/shape";
import {
  motion
} from "motion/react";
import {
  Group
} from "@visx/group";
import {
  ParentSize
} from "@visx/responsive";
import {
  cn
} from "@/lib/utils";

// ---- radar-context.tsx ----
// CSS variable references for radar chart theming
export const radarCssVars = {
  background: "var(--chart-background)",
  foreground: "var(--chart-foreground)",
  foregroundMuted: "var(--chart-foreground-muted)",
  label: "var(--chart-label, oklch(0.65 0.01 260))",
  grid: "var(--chart-grid)",
  border: "var(--border)",
  // Default radar colors from chart palette
  area1: "var(--chart-1)",
  area2: "var(--chart-2)",
  area3: "var(--chart-3)",
  area4: "var(--chart-4)",
  area5: "var(--chart-5)",
};

// Default radar color palette
export const defaultRadarColors = [
  radarCssVars.area1,
  radarCssVars.area2,
  radarCssVars.area3,
  radarCssVars.area4,
  radarCssVars.area5,
];

export interface RadarMetric {
  /** Unique key for the metric */
  key: string;
  /** Display label for the metric */
  label: string;
}

export interface RadarData {
  /** Display label for this data series */
  label: string;
  /** Color for this data series (defaults to chart-1 through chart-5) */
  color?: string;
  /** Metric values (key -> value, normalized 0-100) */
  values: Record<string, number>;
}

export interface RadarContextValue {
  // Data
  data: RadarData[];
  metrics: RadarMetric[];

  // Dimensions
  size: number;
  radius: number;
  levels: number;

  // Hover state
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;

  // Animation
  animate: boolean;

  // Computed helpers
  getColor: (index: number) => string;
  getAngle: (metricIndex: number) => number;
  getPointPosition: (
    metricIndex: number,
    value: number
  ) => { x: number; y: number };
  yScale: (value: number) => number;
}

const RadarContext = createContext<RadarContextValue | null>(null);

export function RadarProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: RadarContextValue;
}) {
  return (
    <RadarContext.Provider value={value}>{children}</RadarContext.Provider>
  );
}

export function useRadar(): RadarContextValue {
  const context = useContext(RadarContext);
  if (!context) {
    throw new Error(
      "useRadar must be used within a RadarProvider. " +
        "Make sure your component is wrapped in <RadarChart>."
    );
  }
  return context;
}

// ---- radar-grid.tsx ----
export interface RadarGridProps {
  /** Show level value labels. Default: true */
  showLabels?: boolean;
  /** Additional class name */
  className?: string;
}

// Spring config for animations
const springConfig = {
  type: "spring" as const,
  stiffness: 100,
  damping: 15,
  mass: 1,
};

export function RadarGrid({
  showLabels = true,
  className = "",
}: RadarGridProps) {
  const { metrics, radius, levels, animate } = useRadar();

  // Generate angles for the radial lines (one per metric)
  const degrees = 360;
  const angles = [...new Array(metrics.length + 1)].map((_, i) => ({
    angle: i * (degrees / metrics.length) + degrees / metrics.length / 2,
  }));

  // Radial scale for converting degrees to radians
  const radialScale = scaleLinear<number>({
    range: [0, Math.PI * 2],
    domain: [degrees, 0],
  });

  // Grid animation delays (staggered from inside out)
  const gridBaseDelay = 0;
  const gridStagger = 0.08;

  // Label fade-in delay
  const labelDelay = gridBaseDelay + levels * gridStagger * 0.5;

  return (
    <g className={className}>
      {/* Concentric grid circles */}
      {[...new Array(levels)].map((_, i) => {
        const targetRadius = ((i + 1) * radius) / levels;
        return (
          <motion.g
            animate={{ scale: 1, opacity: 1 }}
            initial={
              animate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }
            }
            // biome-ignore lint/suspicious/noArrayIndexKey: Static grid levels
            key={`grid-${i}`}
            style={{ transformOrigin: "0px 0px" }}
            transition={{
              ...springConfig,
              delay: animate ? gridBaseDelay + i * gridStagger : 0,
            }}
          >
            <LineRadial
              angle={(d) => radialScale(d.angle) ?? 0}
              data={angles}
              fill="none"
              radius={targetRadius}
              stroke={radarCssVars.border}
              strokeLinecap="round"
              strokeOpacity={0.6}
              strokeWidth={1}
            />
          </motion.g>
        );
      })}

      {/* Grid level labels */}
      {showLabels &&
        [...new Array(levels)].map((_, i) => (
          <motion.g
            animate={{ opacity: 1 }}
            initial={animate ? { opacity: 0 } : { opacity: 1 }}
            // biome-ignore lint/suspicious/noArrayIndexKey: Static grid levels
            key={`level-label-${i}`}
            transition={{
              duration: 0.4,
              delay: animate ? labelDelay + i * 0.06 : 0,
              ease: "easeOut",
            }}
          >
            <text
              dominantBaseline="middle"
              fill={radarCssVars.foregroundMuted}
              fontSize={9}
              textAnchor="start"
              x={4}
              y={-((i + 1) * radius) / levels}
            >
              {((i + 1) * 100) / levels}
            </text>
          </motion.g>
        ))}
    </g>
  );
}

RadarGrid.displayName = "RadarGrid";

// ---- radar-axis.tsx ----
export interface RadarAxisProps {
  /** Additional class name */
  className?: string;
}

export function RadarAxis({ className = "" }: RadarAxisProps) {
  const { metrics, radius, getAngle, animate } = useRadar();

  // Animation delay base
  const axisBaseDelay = 0;

  return (
    <g className={className}>
      {metrics.map((metric, i) => {
        const angle = getAngle(i);
        const targetX = radius * Math.cos(angle);
        const targetY = radius * Math.sin(angle);

        return (
          <motion.line
            animate={{ x2: targetX, y2: targetY }}
            initial={animate ? { x2: 0, y2: 0 } : { x2: targetX, y2: targetY }}
            key={`axis-${metric.key}`}
            stroke={radarCssVars.border}
            strokeOpacity={0.6}
            strokeWidth={1}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 15,
              mass: 1,
              delay: animate ? axisBaseDelay + i * 0.05 : 0,
            }}
            x1={0}
            y1={0}
          />
        );
      })}
    </g>
  );
}

RadarAxis.displayName = "RadarAxis";

// ---- radar-labels.tsx ----
export interface RadarLabelsProps {
  /** Distance from the chart edge. Default: 24 */
  offset?: number;
  /** Font size for labels. Default: 11 */
  fontSize?: number;
  /** Enable interactive hover on labels. Default: false */
  interactive?: boolean;
  /** Additional class name */
  className?: string;
}

export function RadarLabels({
  offset = 24,
  fontSize = 11,
  interactive = false,
  className = "",
}: RadarLabelsProps) {
  const { metrics, radius, levels, getAngle, animate } = useRadar();

  // Label animation delay (starts after grid begins)
  const gridStagger = 0.08;
  const labelDelay = levels * gridStagger * 0.5;

  const labelRadius = radius + offset;

  return (
    <g className={className}>
      {metrics.map((metric, i) => {
        const angle = getAngle(i);
        const x = labelRadius * Math.cos(angle);
        const y = labelRadius * Math.sin(angle);

        return (
          <motion.g
            animate={{ opacity: 1, x, y }}
            initial={
              animate ? { opacity: 0, x: 0, y: 0 } : { opacity: 1, x, y }
            }
            key={`label-${metric.key}`}
            transition={{
              opacity: {
                duration: 0.5,
                delay: animate ? labelDelay + i * 0.08 : 0,
              },
              x: { type: "spring", stiffness: 80, damping: 15 },
              y: { type: "spring", stiffness: 80, damping: 15 },
            }}
          >
            <text
              className={
                interactive
                  ? "cursor-pointer transition-opacity duration-150 hover:opacity-100"
                  : ""
              }
              dominantBaseline="middle"
              fontSize={fontSize}
              fontWeight={500}
              opacity={interactive ? 0.8 : 1}
              style={{ fill: radarCssVars.label }}
              textAnchor="middle"
              x={0}
              y={0}
            >
              {metric.label}
            </text>
          </motion.g>
        );
      })}
    </g>
  );
}

RadarLabels.displayName = "RadarLabels";

// ---- radar-area.tsx ----
export interface RadarAreaProps {
  /** Index of this area in the data array */
  index: number;
  /** Optional color override */
  color?: string;
  /** Show data point circles. Default: true */
  showPoints?: boolean;
  /** Show stroke outline on the polygon. Default: true */
  showStroke?: boolean;
  /** Show glow effect on hover. Default: true */
  showGlow?: boolean;
  /** Additional class name */
  className?: string;
}

function getStrokeWidth(isHovered: boolean): number {
  return isHovered ? 3 : 2;
}

export function RadarArea({
  index,
  color: colorProp,
  showPoints = true,
  showStroke = true,
  showGlow = true,
  className = "",
}: RadarAreaProps) {
  const {
    data,
    metrics,
    levels,
    hoveredIndex,
    setHoveredIndex,
    animate,
    getColor,
    getPointPosition,
  } = useRadar();

  const areaData = data[index];

  // Track if initial animation is complete (must be before early return)
  const hasAnimated = useRef(false);
  const [animatedPositions, setAnimatedPositions] = useState<
    { x: number; y: number }[]
  >(() => metrics.map(() => ({ x: 0, y: 0 })));

  // Calculate target positions for all metrics
  const targetPositions = useMemo(() => {
    if (!areaData) {
      return metrics.map(() => ({ x: 0, y: 0 }));
    }
    return metrics.map((metric, i) => {
      const value = areaData.values[metric.key] ?? 0;
      return getPointPosition(i, value);
    });
  }, [metrics, areaData, getPointPosition]);

  // Animation delays
  const gridStagger = 0.08;
  const campaignBaseDelay = levels * gridStagger + 0.2;
  const campaignStagger = 0.15;
  const animationDelay = campaignBaseDelay + index * campaignStagger;

  // Initial expand animation (runs once on mount)
  useEffect(() => {
    if (!animate || hasAnimated.current) {
      setAnimatedPositions(targetPositions);
      return;
    }

    const metricStagger = 0.06;
    const timeouts: NodeJS.Timeout[] = [];

    // Animate each metric from center to its position with stagger
    for (let i = 0; i < metrics.length; i++) {
      const target = targetPositions[i];
      if (!target) {
        continue;
      }
      const timeout = setTimeout(
        () => {
          setAnimatedPositions((prev) => {
            const newPositions = [...prev];
            newPositions[i] = { x: target.x, y: target.y };
            return newPositions;
          });
        },
        (animationDelay + i * metricStagger) * 1000
      );
      timeouts.push(timeout);
    }

    // Mark animation complete
    const completeTimeout = setTimeout(
      () => {
        hasAnimated.current = true;
      },
      (animationDelay + metrics.length * metricStagger) * 1000 + 500
    );
    timeouts.push(completeTimeout);

    return () => timeouts.forEach(clearTimeout);
  }, [animate, animationDelay, metrics.length, targetPositions]);

  // After initialization, update positions immediately when data changes
  useEffect(() => {
    if (hasAnimated.current) {
      setAnimatedPositions(targetPositions);
    }
  }, [targetPositions]);

  // Early return after all hooks
  if (!areaData) {
    return null;
  }

  const color = colorProp || getColor(index);
  const isHovered = hoveredIndex === index;
  const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

  // Create path from positions
  const pathD = `M ${animatedPositions.map((p) => `${p.x},${p.y}`).join(" L ")} Z`;

  return (
    <motion.g
      animate={{
        opacity: isOtherHovered ? 0.3 : 1,
        scale: isHovered ? 1.05 : 1,
      }}
      className={className}
      initial={{ opacity: 0 }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      style={{ transformOrigin: "0px 0px", cursor: "pointer" }}
      transition={{
        opacity: {
          duration: 0.15,
          delay: hasAnimated.current ? 0 : animationDelay * 0.5,
        },
        scale: { type: "spring", stiffness: 400, damping: 25 },
      }}
    >
      {/* Area polygon */}
      <motion.path
        animate={{
          d: pathD,
          fillOpacity: isHovered ? 0.35 : 0.15,
          strokeWidth: showStroke ? getStrokeWidth(isHovered) : 0,
        }}
        fill={color}
        stroke={showStroke ? color : "none"}
        strokeLinejoin="round"
        style={{
          filter:
            showGlow && isHovered ? `drop-shadow(0 0 12px ${color})` : "none",
        }}
        transition={{
          d: { type: "spring", stiffness: 80, damping: 15, mass: 1 },
          fillOpacity: { duration: 0.2 },
          strokeWidth: { duration: 0.2 },
        }}
      />

      {/* Data point circles */}
      {showPoints &&
        metrics.map((metric, i) => {
          const point = animatedPositions[i];
          if (!point) {
            return null;
          }
          return (
            <motion.circle
              animate={{
                cx: point.x,
                cy: point.y,
                r: isHovered ? 6 : 4,
              }}
              fill={color}
              key={metric.key}
              stroke={radarCssVars.background}
              strokeWidth={2}
              transition={{
                cx: { type: "spring", stiffness: 80, damping: 15, mass: 1 },
                cy: { type: "spring", stiffness: 80, damping: 15, mass: 1 },
                r: { type: "spring", stiffness: 300, damping: 20 },
              }}
            />
          );
        })}
    </motion.g>
  );
}

RadarArea.displayName = "RadarArea";

// ---- radar-chart.tsx ----
export interface RadarChartProps {
  /** Data array - each item represents a data series (polygon) */
  data: RadarData[];
  /** Metrics to display on the radar */
  metrics: RadarMetric[];
  /** Chart size in pixels. If not provided, uses parent container size */
  size?: number;
  /** Number of concentric grid circles. Default: 5 */
  levels?: number;
  /** Margin around the chart. Default: 60 */
  margin?: number;
  /** Enable animations. Default: true */
  animate?: boolean;
  /** Controlled hover state - index of hovered area */
  hoveredIndex?: number | null;
  /** Callback when hover state changes */
  onHoverChange?: (index: number | null) => void;
  /** Additional class name for the container */
  className?: string;
  /** Child components (RadarGrid, RadarAxis, RadarLabels, RadarArea) */
  children: ReactNode;
}

interface RadarChartInnerProps {
  width: number;
  height: number;
  data: RadarData[];
  metrics: RadarMetric[];
  levels: number;
  margin: number;
  animate: boolean;
  children: ReactNode;
  hoveredIndexProp?: number | null;
  onHoverChange?: (index: number | null) => void;
}

function RadarChartInner({
  width,
  height,
  data,
  metrics,
  levels,
  margin,
  animate,
  children,
  hoveredIndexProp,
  onHoverChange,
}: RadarChartInnerProps) {
  const [internalHoveredIndex, setInternalHoveredIndex] = useState<
    number | null
  >(null);

  // Use controlled or uncontrolled hover state
  const isControlled = hoveredIndexProp !== undefined;
  const hoveredIndex = isControlled ? hoveredIndexProp : internalHoveredIndex;
  const setHoveredIndex = useCallback(
    (index: number | null) => {
      if (isControlled) {
        onHoverChange?.(index);
      } else {
        setInternalHoveredIndex(index);
      }
    },
    [isControlled, onHoverChange]
  );

  // Use the smaller dimension
  const size = Math.min(width, height);
  const radius = (size - margin * 2) / 2;

  // Scale for converting values (0-100) to radius
  const yScale = useCallback(
    (value: number) => {
      const scale = scaleLinear<number>({
        range: [0, radius],
        domain: [0, 100],
      });
      return scale(value) ?? 0;
    },
    [radius]
  );

  // Get angle for a metric index (rotated so first metric is at top)
  const getAngle = useCallback(
    (metricIndex: number) => {
      const step = (Math.PI * 2) / metrics.length;
      const angleOffset = -Math.PI / 2; // Rotate so first axis is at top
      return metricIndex * step + angleOffset;
    },
    [metrics.length]
  );

  // Get x,y position for a metric at a given value
  const getPointPosition = useCallback(
    (metricIndex: number, value: number) => {
      const angle = getAngle(metricIndex);
      const r = yScale(value);
      return {
        x: r * Math.cos(angle),
        y: r * Math.sin(angle),
      };
    },
    [getAngle, yScale]
  );

  // Get color for a data index
  const getColor = useCallback(
    (index: number) => {
      const item = data[index];
      if (item?.color) {
        return item.color;
      }
      return defaultRadarColors[index % defaultRadarColors.length] as string;
    },
    [data]
  );

  // Early return if dimensions not ready
  if (size < 10) {
    return null;
  }

  const contextValue: RadarContextValue = {
    data,
    metrics,
    size,
    radius,
    levels,
    hoveredIndex,
    setHoveredIndex,
    animate,
    getColor,
    getAngle,
    getPointPosition,
    yScale,
  };

  return (
    <RadarProvider value={contextValue}>
      <svg
        aria-hidden="true"
        height={size}
        style={{ overflow: "visible" }}
        width={size}
      >
        <Group left={size / 2} top={size / 2}>
          {children}
        </Group>
      </svg>
    </RadarProvider>
  );
}

export function RadarChart({
  data,
  metrics,
  size: fixedSize,
  levels = 5,
  margin = 60,
  animate = true,
  className = "",
  hoveredIndex,
  onHoverChange,
  children,
}: RadarChartProps) {
  // If fixed size is provided, use it directly
  if (fixedSize) {
    return (
      <div
        className={cn("relative flex items-center justify-center", className)}
        style={{ width: fixedSize, height: fixedSize }}
      >
        <RadarChartInner
          animate={animate}
          data={data}
          height={fixedSize}
          hoveredIndexProp={hoveredIndex}
          levels={levels}
          margin={margin}
          metrics={metrics}
          onHoverChange={onHoverChange}
          width={fixedSize}
        >
          {children}
        </RadarChartInner>
      </div>
    );
  }

  // Otherwise use ParentSize for responsive sizing
  return (
    <div className={cn("relative aspect-square w-full", className)}>
      <ParentSize debounceTime={10}>
        {({ width, height }) => (
          <RadarChartInner
            animate={animate}
            data={data}
            height={height}
            hoveredIndexProp={hoveredIndex}
            levels={levels}
            margin={margin}
            metrics={metrics}
            onHoverChange={onHoverChange}
            width={width}
          >
            {children}
          </RadarChartInner>
        )}
      </ParentSize>
    </div>
  );
}

export default RadarChart;
