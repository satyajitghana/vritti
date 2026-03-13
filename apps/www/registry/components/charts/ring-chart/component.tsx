"use client";

import type { ReactNode, RefObject } from "react";
import {
  Children,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import NumberFlow from "@number-flow/react";
import {
  cn
} from "@/lib/utils";
import {
  Arc,
  arc as arcGenerator
} from "@visx/shape";
import {
  motion,
  useSpring,
  useTransform
} from "motion/react";
import {
  Group
} from "@visx/group";
import {
  ParentSize
} from "@visx/responsive";

// ---- ring-context.tsx ----
// CSS variable references for ring chart theming
export const ringCssVars = {
  background: "var(--chart-background)",
  foreground: "var(--chart-foreground)",
  foregroundMuted: "var(--chart-foreground-muted)",
  label: "var(--chart-label)",
  ringBackground: "var(--chart-ring-background)",
  // Default ring colors from chart palette
  ring1: "var(--chart-1)",
  ring2: "var(--chart-2)",
  ring3: "var(--chart-3)",
  ring4: "var(--chart-4)",
  ring5: "var(--chart-5)",
};

// Default ring color palette
export const defaultRingColors = [
  ringCssVars.ring1,
  ringCssVars.ring2,
  ringCssVars.ring3,
  ringCssVars.ring4,
  ringCssVars.ring5,
];

export interface RingData {
  /** Display label for the ring */
  label: string;
  /** Current value */
  value: number;
  /** Maximum value (determines progress percentage) */
  maxValue: number;
  /** Optional color override - falls back to palette */
  color?: string;
}

export interface RingContextValue {
  // Data
  data: RingData[];

  // Dimensions
  size: number;
  center: number;
  strokeWidth: number;
  ringGap: number;
  baseInnerRadius: number;

  // Hover state
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;

  // Animation state
  animationKey: number;
  isLoaded: boolean;

  // Container ref for portals
  containerRef: RefObject<HTMLDivElement | null>;

  // Computed values
  totalValue: number;

  // Get color for a ring index
  getColor: (index: number) => string;

  // Get ring radii for an index
  getRingRadii: (index: number) => { innerRadius: number; outerRadius: number };

  // Arc angle range
  startAngle: number;
  endAngle: number;
}

const RingContext = createContext<RingContextValue | null>(null);

export function RingProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: RingContextValue;
}) {
  return <RingContext.Provider value={value}>{children}</RingContext.Provider>;
}

export function useRing(): RingContextValue {
  const context = useContext(RingContext);
  if (!context) {
    throw new Error(
      "useRing must be used within a RingProvider. " +
        "Make sure your component is wrapped in <RingChart>."
    );
  }
  return context;
}

// ---- ring-center.tsx ----
// NumberFlow format - subset of Intl.NumberFormatOptions
interface NumberFlowFormat {
  notation?: "standard" | "compact";
  compactDisplay?: "short" | "long";
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  minimumIntegerDigits?: number;
  minimumSignificantDigits?: number;
  maximumSignificantDigits?: number;
  style?: "decimal" | "percent" | "currency";
  currency?: string;
  currencyDisplay?: "symbol" | "narrowSymbol" | "code" | "name";
  unit?: string;
  unitDisplay?: "short" | "long" | "narrow";
}

export interface RingCenterProps {
  /** Label shown below the value. Default: "Total" when not hovering */
  defaultLabel?: string;
  /** Format options for NumberFlow. Default: standard notation */
  formatOptions?: NumberFlowFormat;
  /** Custom render function for complete control over center content */
  children?: (props: {
    value: number;
    label: string;
    isHovered: boolean;
    data: { label: string; value: number; maxValue: number; color?: string };
  }) => ReactNode;
  /** Additional class name for the container */
  className?: string;
  /** Class name for the value text. Default: "text-2xl font-bold" */
  valueClassName?: string;
  /** Class name for the label text. Default: "text-xs" */
  labelClassName?: string;
  /** Prefix to show before the number (e.g., "$") */
  prefix?: string;
  /** Suffix to show after the number (e.g., "%") */
  suffix?: string;
}

// Default format options
const defaultFormatOptions: NumberFlowFormat = {
  notation: "standard",
  maximumFractionDigits: 0,
};

/**
 * RingCenter displays content in the center of the ring chart.
 *
 * This component renders as pure HTML (not inside SVG foreignObject) to avoid
 * Safari's WebKit bug #23113 where HTML content with CSS transforms/opacity
 * inside foreignObject renders at incorrect positions.
 *
 * The parent RingChart uses CSS Grid stacking to overlay this HTML content
 * on top of the SVG rings.
 */
export function RingCenter({
  defaultLabel = "Total",
  formatOptions = defaultFormatOptions,
  children,
  className = "",
  valueClassName = "text-2xl font-bold",
  labelClassName = "text-xs",
  prefix,
  suffix,
}: RingCenterProps) {
  const { data, hoveredIndex, totalValue, baseInnerRadius } = useRing();

  const hoveredData = hoveredIndex !== null ? data[hoveredIndex] : null;
  const displayValue = hoveredData ? hoveredData.value : totalValue;
  const displayLabel = hoveredData ? hoveredData.label : defaultLabel;
  const isHovered = hoveredIndex !== null;

  // Calculate center area size based on scaled baseInnerRadius
  // Leave some padding so text doesn't touch the inner ring
  const centerSize = baseInnerRadius * 2 - 16;

  // If custom render function is provided, use it
  if (children && hoveredData) {
    return (
      <div
        className={cn("flex items-center justify-center", className)}
        style={{ width: centerSize, height: centerSize }}
      >
        {children({
          value: displayValue,
          label: displayLabel,
          isHovered,
          data: hoveredData,
        })}
      </div>
    );
  }

  // Default center content with NumberFlow animations
  // Now renders as pure HTML, avoiding Safari's foreignObject bugs
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        className
      )}
      style={{ width: centerSize, height: centerSize }}
    >
      <span className={cn("text-foreground tabular-nums", valueClassName)}>
        <NumberFlow
          format={formatOptions}
          prefix={prefix}
          suffix={suffix}
          value={displayValue}
          willChange
        />
      </span>
      <span className={cn("mt-0.5 text-chart-label", labelClassName)}>
        {displayLabel}
      </span>
    </div>
  );
}

RingCenter.displayName = "RingCenter";

// ---- ring.tsx ----
// Helper to generate arc path using d3 arc generator
function generateArcPath(
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number,
  cornerRadius: number
): string {
  const generator = arcGenerator<unknown>({
    innerRadius,
    outerRadius,
    cornerRadius,
  });
  return generator({ startAngle, endAngle } as unknown as null) || "";
}

export type RingLineCap = "round" | "butt";

export interface RingProps {
  /** Index of the ring in the data array */
  index: number;
  /** Optional color override - falls back to data color or palette */
  color?: string;
  /** Animate the progress arc. Default: true */
  animate?: boolean;
  /** Show glow effect on hover. Default: true */
  showGlow?: boolean;
  /** Line cap style for ring ends. Default: "round" */
  lineCap?: RingLineCap;
}

interface AnimatedProgressArcProps {
  index: number;
  innerRadius: number;
  outerRadius: number;
  progress: number;
  color: string;
  isHovered: boolean;
  isFaded: boolean;
  isPushedOut: boolean;
  animationKey: number;
  showGlow: boolean;
  lineCap: RingLineCap;
  startAngle: number;
  arcRange: number;
}

function AnimatedProgressArc({
  index,
  innerRadius,
  outerRadius,
  progress,
  color,
  isHovered,
  isFaded,
  isPushedOut,
  animationKey,
  showGlow,
  lineCap,
  startAngle,
  arcRange,
}: AnimatedProgressArcProps) {
  const targetEndAngle = startAngle + arcRange * progress;
  const cornerRadius =
    lineCap === "round" ? (outerRadius - innerRadius) / 2 : 0;

  // Progress arc delay - starts after background rings expand
  const progressDelay = 0.6 + index * 0.1;

  // Animate the end angle with spring
  const springValue = useSpring(0, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  // Reset and start animation on mount
  useEffect(() => {
    springValue.jump(0);
    const timeout = setTimeout(() => {
      springValue.set(1);
    }, progressDelay * 1000);
    return () => clearTimeout(timeout);
  }, [progressDelay, springValue]);

  // Transform spring value to arc path
  const animatedPath = useTransform(springValue, (v) => {
    const currentEndAngle = startAngle + (targetEndAngle - startAngle) * v;
    if (currentEndAngle <= startAngle + 0.01) {
      return "";
    }
    return generateArcPath(
      innerRadius,
      outerRadius,
      startAngle,
      currentEndAngle,
      cornerRadius
    );
  });

  // Calculate scale: hovered ring scales up, outer rings pushed out
  const getScale = () => {
    if (isHovered) {
      return 1.03;
    }
    if (isPushedOut) {
      return 1.02;
    }
    return 1;
  };

  return (
    <motion.path
      animate={{
        opacity: isFaded ? 0.4 : 1,
        scale: getScale(),
      }}
      d={animatedPath}
      fill={color}
      key={`progress-${animationKey}`}
      style={{
        transformOrigin: "center",
        filter:
          showGlow && isHovered ? `drop-shadow(0 0 12px ${color})` : "none",
      }}
      transition={{
        opacity: { duration: 0.15 },
        scale: { type: "spring", stiffness: 400, damping: 25 },
      }}
    />
  );
}

export function Ring({
  index,
  color: colorProp,
  animate = true,
  showGlow = true,
  lineCap = "round",
}: RingProps) {
  const {
    data,
    hoveredIndex,
    setHoveredIndex,
    animationKey,
    getColor,
    getRingRadii,
    startAngle: ctxStartAngle,
    endAngle: ctxEndAngle,
  } = useRing();

  const arcRange = ctxEndAngle - ctxStartAngle;

  // Track if initial mount animation is complete (must be before early return)
  const hasAnimated = useRef(false);
  const ringExpandDelay = index * 0.08;

  useEffect(() => {
    if (animate && !hasAnimated.current) {
      const timeout = setTimeout(
        () => {
          hasAnimated.current = true;
        },
        (ringExpandDelay + 0.3) * 1000
      );
      return () => clearTimeout(timeout);
    }
  }, [animate, ringExpandDelay]);

  const ringData = data[index];
  if (!ringData) {
    return null;
  }

  const { innerRadius, outerRadius } = getRingRadii(index);
  const color = colorProp || getColor(index);
  const progress = ringData.value / ringData.maxValue;

  const isHovered = hoveredIndex === index;
  const isFaded = hoveredIndex !== null && hoveredIndex !== index;
  // Ring is pushed out when a ring with lower index (inner ring) is hovered
  const isPushedOut = hoveredIndex !== null && hoveredIndex < index;

  // Only apply delay on initial mount, not on hover changes
  const shouldDelay = animate && !hasAnimated.current;

  // Calculate scale for background and progress arcs
  const getScale = () => {
    if (isHovered) {
      return 1.03;
    }
    if (isPushedOut) {
      return 1.02;
    }
    return 1;
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: SVG group for hover interaction
    <g
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      style={{ cursor: "pointer" }}
    >
      {/* Background track */}
      <Arc
        cornerRadius={lineCap === "round" ? (outerRadius - innerRadius) / 2 : 0}
        endAngle={ctxEndAngle}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={ctxStartAngle}
      >
        {({ path }) => (
          <motion.path
            animate={{
              scale: animate ? getScale() : 1,
              opacity: isFaded ? 0.3 : 1,
            }}
            d={path(null) || ""}
            fill={ringCssVars.ringBackground}
            initial={animate ? { scale: 0 } : { scale: 1 }}
            key={`bg-${animationKey}`}
            style={{ transformOrigin: "center" }}
            transition={{
              scale: {
                type: "spring",
                stiffness: 400,
                damping: 25,
                delay: shouldDelay ? ringExpandDelay : 0,
              },
              opacity: { duration: 0.15 },
            }}
          />
        )}
      </Arc>

      {/* Animated Progress arc */}
      {animate ? (
        <AnimatedProgressArc
          animationKey={animationKey}
          arcRange={arcRange}
          color={color}
          index={index}
          innerRadius={innerRadius}
          isFaded={isFaded}
          isHovered={isHovered}
          isPushedOut={isPushedOut}
          lineCap={lineCap}
          outerRadius={outerRadius}
          progress={progress}
          showGlow={showGlow}
          startAngle={ctxStartAngle}
        />
      ) : (
        <motion.path
          animate={{
            opacity: isFaded ? 0.4 : 1,
            scale: getScale(),
          }}
          d={generateArcPath(
            innerRadius,
            outerRadius,
            ctxStartAngle,
            ctxStartAngle + arcRange * progress,
            lineCap === "round" ? (outerRadius - innerRadius) / 2 : 0
          )}
          fill={color}
          style={{
            transformOrigin: "center",
            filter:
              showGlow && isHovered ? `drop-shadow(0 0 12px ${color})` : "none",
          }}
          transition={{
            opacity: { duration: 0.15 },
            scale: { type: "spring", stiffness: 400, damping: 25 },
          }}
        />
      )}
    </g>
  );
}

Ring.displayName = "Ring";

// ---- ring-chart.tsx ----
export interface RingChartProps {
  /** Data array - each item represents a ring */
  data: RingData[];
  /** Chart size in pixels. If not provided, uses parent container size */
  size?: number;
  /** Stroke width of each ring. Default: 12 */
  strokeWidth?: number;
  /** Gap between rings. Default: 6 */
  ringGap?: number;
  /** Inner radius of the innermost ring. Default: 60 */
  baseInnerRadius?: number;
  /** Animation duration in milliseconds. Default: 1100 */
  animationDuration?: number;
  /** Additional class name for the container */
  className?: string;
  /** Controlled hover state - index of hovered ring */
  hoveredIndex?: number | null;
  /** Callback when hover state changes */
  onHoverChange?: (index: number | null) => void;
  /** Start angle in radians. Default: -PI/2 (top) */
  startAngle?: number;
  /** End angle in radians. Default: 3*PI/2 (full circle) */
  endAngle?: number;
  /** Child components (Ring, RingCenter, etc.) */
  children: ReactNode;
}

interface RingChartInnerProps {
  width: number;
  height: number;
  data: RingData[];
  strokeWidth: number;
  ringGap: number;
  baseInnerRadius: number;
  children: ReactNode;
  containerRef: React.RefObject<HTMLDivElement | null>;
  hoveredIndexProp?: number | null;
  onHoverChange?: (index: number | null) => void;
  startAngle: number;
  endAngle: number;
}

// Helper to check if a child is a RingCenter component
function isRingCenter(child: ReactNode): boolean {
  return (
    isValidElement(child) &&
    typeof child.type === "function" &&
    ((child.type as { displayName?: string }).displayName === "RingCenter" ||
      child.type.name === "RingCenter")
  );
}

function RingChartInner({
  width,
  height,
  data,
  strokeWidth: strokeWidthProp,
  ringGap: ringGapProp,
  baseInnerRadius: baseInnerRadiusProp,
  children,
  containerRef,
  hoveredIndexProp,
  onHoverChange,
  startAngle,
  endAngle,
}: RingChartInnerProps) {
  const [internalHoveredIndex, setInternalHoveredIndex] = useState<
    number | null
  >(null);
  const [animationKey] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

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

  // Use the smaller dimension to ensure the chart fits
  const size = Math.min(width, height);
  const center = size / 2;

  // Calculate scaled dimensions to fit within the available space
  // The outermost ring needs to fit within the chart with some padding
  const ringCount = data.length;
  const padding = 8; // Padding from edge
  const availableRadius = center - padding;

  // Calculate the "design" outer radius (what we'd need at 1:1 scale)
  const designOuterRadius =
    baseInnerRadiusProp +
    (ringCount - 1) * (strokeWidthProp + ringGapProp) +
    strokeWidthProp;

  // Scale factor to fit within available space
  const scale = Math.min(1, availableRadius / designOuterRadius);

  // Apply scaling to all dimensions
  const strokeWidth = strokeWidthProp * scale;
  const ringGap = ringGapProp * scale;
  const baseInnerRadius = baseInnerRadiusProp * scale;

  // Calculate total value
  const totalValue = useMemo(
    () => data.reduce((sum, d) => sum + d.value, 0),
    [data]
  );

  // Get color for a ring index
  const getColor = useCallback(
    (index: number) => {
      const item = data[index];
      if (item?.color) {
        return item.color;
      }
      return defaultRingColors[index % defaultRingColors.length] as string;
    },
    [data]
  );

  // Get ring radii for an index
  const getRingRadii = useCallback(
    (index: number) => {
      const innerRadius = baseInnerRadius + index * (strokeWidth + ringGap);
      const outerRadius = innerRadius + strokeWidth;
      return { innerRadius, outerRadius };
    },
    [baseInnerRadius, strokeWidth, ringGap]
  );

  // Mark as loaded after initial render
  useState(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  });

  // Separate SVG children (rings) from HTML children (RingCenter)
  // This avoids Safari's foreignObject positioning bugs (WebKit #23113)
  const { svgChildren, centerChildren } = useMemo(() => {
    const svgNodes: ReactNode[] = [];
    const centerNodes: ReactNode[] = [];

    Children.forEach(children, (child) => {
      if (isRingCenter(child)) {
        centerNodes.push(child);
      } else {
        svgNodes.push(child);
      }
    });

    return { svgChildren: svgNodes, centerChildren: centerNodes };
  }, [children]);

  // Early return if dimensions not ready
  if (size < 10) {
    return null;
  }

  const contextValue: RingContextValue = {
    data,
    size,
    center,
    strokeWidth,
    ringGap,
    baseInnerRadius,
    hoveredIndex,
    setHoveredIndex,
    animationKey,
    isLoaded,
    containerRef,
    totalValue,
    getColor,
    getRingRadii,
    startAngle,
    endAngle,
  };

  // Use CSS Grid stacking to layer SVG and HTML content
  // This avoids Safari's foreignObject rendering bugs where HTML content
  // inside SVG foreignObject renders at wrong positions when it has a RenderLayer
  return (
    <RingProvider value={contextValue}>
      <div
        className="grid"
        style={{
          gridTemplateColumns: "1fr",
          gridTemplateRows: "1fr",
          width: size,
          height: size,
        }}
      >
        {/* SVG layer with rings */}
        <svg
          aria-hidden="true"
          height={size}
          style={{ gridArea: "1 / 1" }}
          width={size}
        >
          <Group left={center} top={center}>
            {svgChildren}
          </Group>
        </svg>

        {/* HTML layer with center content - stacked on top via grid */}
        {centerChildren.length > 0 && (
          <div
            className="pointer-events-none flex items-center justify-center"
            style={{ gridArea: "1 / 1" }}
          >
            {centerChildren}
          </div>
        )}
      </div>
    </RingProvider>
  );
}

export function RingChart({
  data,
  size: fixedSize,
  strokeWidth = 12,
  ringGap = 6,
  baseInnerRadius = 60,
  className = "",
  hoveredIndex,
  onHoverChange,
  startAngle = -Math.PI / 2,
  endAngle = (3 * Math.PI) / 2,
  children,
}: RingChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // If fixed size is provided, use it directly
  if (fixedSize) {
    return (
      <div
        className={cn("relative flex items-center justify-center", className)}
        ref={containerRef}
        style={{ width: fixedSize, height: fixedSize }}
      >
        <RingChartInner
          baseInnerRadius={baseInnerRadius}
          containerRef={containerRef}
          data={data}
          endAngle={endAngle}
          height={fixedSize}
          hoveredIndexProp={hoveredIndex}
          onHoverChange={onHoverChange}
          ringGap={ringGap}
          startAngle={startAngle}
          strokeWidth={strokeWidth}
          width={fixedSize}
        >
          {children}
        </RingChartInner>
      </div>
    );
  }

  // Otherwise use ParentSize for responsive sizing
  return (
    <div
      className={cn("relative aspect-square w-full", className)}
      ref={containerRef}
    >
      <ParentSize debounceTime={10}>
        {({ width, height }) => (
          <RingChartInner
            baseInnerRadius={baseInnerRadius}
            containerRef={containerRef}
            data={data}
            endAngle={endAngle}
            height={height}
            hoveredIndexProp={hoveredIndex}
            onHoverChange={onHoverChange}
            ringGap={ringGap}
            startAngle={startAngle}
            strokeWidth={strokeWidth}
            width={width}
          >
            {children}
          </RingChartInner>
        )}
      </ParentSize>
    </div>
  );
}

export default RingChart;
