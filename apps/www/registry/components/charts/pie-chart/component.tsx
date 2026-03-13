"use client";

import type { ReactElement, ReactNode, RefObject } from "react";
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
import {
  pie as d3Pie
} from "d3-shape";

// ---- pie-context.tsx ----
// CSS variable references for pie chart theming
export const pieCssVars = {
  background: "var(--chart-background)",
  foreground: "var(--chart-foreground)",
  foregroundMuted: "var(--chart-foreground-muted)",
  label: "var(--chart-label)",
  // Default slice colors from chart palette
  slice1: "var(--chart-1)",
  slice2: "var(--chart-2)",
  slice3: "var(--chart-3)",
  slice4: "var(--chart-4)",
  slice5: "var(--chart-5)",
};

// Default slice color palette
export const defaultPieColors = [
  pieCssVars.slice1,
  pieCssVars.slice2,
  pieCssVars.slice3,
  pieCssVars.slice4,
  pieCssVars.slice5,
];

export interface PieData {
  /** Display label for the slice */
  label: string;
  /** Value for the slice (determines slice size relative to total) */
  value: number;
  /** Optional color override - falls back to palette */
  color?: string;
  /** Optional fill override for patterns/gradients (e.g., "url(#patternId)") */
  fill?: string;
}

/** Arc data computed by visx Pie */
export interface PieArcData {
  data: PieData;
  index: number;
  startAngle: number;
  endAngle: number;
  padAngle: number;
  value: number;
}

export interface PieContextValue {
  // Data
  data: PieData[];
  arcs: PieArcData[];

  // Dimensions
  size: number;
  center: number;
  outerRadius: number;
  innerRadius: number;
  padAngle: number;
  cornerRadius: number;

  // Hover effect
  hoverOffset: number;

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

  // Get color for a slice index
  getColor: (index: number) => string;

  // Get fill for a slice index (supports patterns/gradients)
  getFill: (index: number) => string;
}

const PieContext = createContext<PieContextValue | null>(null);

export function PieProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: PieContextValue;
}) {
  return <PieContext.Provider value={value}>{children}</PieContext.Provider>;
}

export function usePie(): PieContextValue {
  const context = useContext(PieContext);
  if (!context) {
    throw new Error(
      "usePie must be used within a PieProvider. " +
        "Make sure your component is wrapped in <PieChart>."
    );
  }
  return context;
}

// ---- pie-center.tsx ----
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

export interface PieCenterProps {
  /** Label shown below the value. Default: "Total" when not hovering */
  defaultLabel?: string;
  /** Format options for NumberFlow. Default: standard notation */
  formatOptions?: NumberFlowFormat;
  /** Custom render function for complete control over center content */
  children?: (props: {
    value: number;
    label: string;
    isHovered: boolean;
    data: { label: string; value: number; color?: string; fill?: string };
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
 * PieCenter displays content in the center of a donut/pie chart.
 *
 * This component renders as pure HTML (not inside SVG foreignObject) to avoid
 * Safari's WebKit bug #23113 where HTML content with CSS transforms/opacity
 * inside foreignObject renders at incorrect positions.
 *
 * The parent PieChart uses CSS Grid stacking to overlay this HTML content
 * on top of the SVG slices.
 */
export function PieCenter({
  defaultLabel = "Total",
  formatOptions = defaultFormatOptions,
  children,
  className = "",
  valueClassName = "text-2xl font-bold",
  labelClassName = "text-xs",
  prefix,
  suffix,
}: PieCenterProps) {
  const { data, hoveredIndex, totalValue, innerRadius } = usePie();

  const hoveredData = hoveredIndex !== null ? data[hoveredIndex] : null;
  const displayValue = hoveredData ? hoveredData.value : totalValue;
  const displayLabel = hoveredData ? hoveredData.label : defaultLabel;
  const isHovered = hoveredIndex !== null;

  // Calculate center area size based on inner radius
  // Leave some padding so text doesn't touch the inner edge
  const centerSize = innerRadius * 2 - 16;

  // Don't render if there's no inner radius (solid pie, not donut)
  if (innerRadius <= 0) {
    return null;
  }

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

PieCenter.displayName = "PieCenter";

// ---- pie-slice.tsx ----
// Helper to generate arc path using d3 arc generator
function generateArcPath(
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number,
  cornerRadius: number,
  padAngle: number
): string {
  const generator = arcGenerator<unknown>({
    innerRadius,
    outerRadius,
    cornerRadius,
    padAngle,
  });
  return generator({ startAngle, endAngle } as unknown as null) || "";
}

// Calculate the translation offset for a slice to "pop out" along its radial axis
function getSliceOffset(
  startAngle: number,
  endAngle: number,
  distance: number
): { x: number; y: number } {
  // Calculate the midpoint angle of the slice
  const midAngle = (startAngle + endAngle) / 2;
  // In d3-shape, 0 radians is at 12 o'clock, angles increase clockwise
  // So the outward direction is: x = sin(angle), y = -cos(angle)
  return {
    x: Math.sin(midAngle) * distance,
    y: -Math.cos(midAngle) * distance,
  };
}

/** Hover effect types */
export type PieSliceHoverEffect = "translate" | "grow" | "none";

export interface PieSliceProps {
  /** Index of the slice in the data array */
  index: number;
  /** Optional color override - falls back to data color or palette */
  color?: string;
  /** Optional fill override for patterns/gradients (e.g., "url(#patternId)") */
  fill?: string;
  /** Animate the slice on mount. Default: true */
  animate?: boolean;
  /** Show glow effect on hover. Default: true */
  showGlow?: boolean;
  /**
   * Hover effect type. Default: "translate"
   * - "translate": Slice moves outward along its radial axis
   * - "grow": Slice extends its outer radius (gets longer)
   * - "none": No hover animation
   */
  hoverEffect?: PieSliceHoverEffect;
  /** Distance in pixels for hover effect (translate distance or grow amount). Defaults to PieChart's hoverOffset */
  hoverOffset?: number;
  /** Additional CSS class */
  className?: string;
}

interface AnimatedSliceTranslateProps {
  index: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  cornerRadius: number;
  padAngle: number;
  fill: string;
  color: string;
  isHovered: boolean;
  isFaded: boolean;
  animationKey: number;
  showGlow: boolean;
  hoverOffset: number;
}

function AnimatedSliceTranslate({
  index,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  cornerRadius,
  padAngle,
  fill,
  color,
  isHovered,
  isFaded,
  animationKey,
  showGlow,
  hoverOffset,
}: AnimatedSliceTranslateProps) {
  const animationDelay = 0.1 + index * 0.08;

  const mountSpring = useSpring(0, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  useEffect(() => {
    mountSpring.jump(0);
    const timeout = setTimeout(() => {
      mountSpring.set(1);
    }, animationDelay * 1000);
    return () => clearTimeout(timeout);
  }, [animationDelay, mountSpring]);

  const animatedPath = useTransform(mountSpring, (mount) => {
    const currentEndAngle = startAngle + (endAngle - startAngle) * mount;
    if (currentEndAngle <= startAngle + 0.01) {
      return "";
    }
    return generateArcPath(
      innerRadius,
      outerRadius,
      startAngle,
      currentEndAngle,
      cornerRadius,
      padAngle
    );
  });

  const offset = getSliceOffset(startAngle, endAngle, hoverOffset);
  const glowColor = color;

  return (
    <motion.path
      animate={{
        opacity: isFaded ? 0.4 : 1,
        x: isHovered ? offset.x : 0,
        y: isHovered ? offset.y : 0,
      }}
      d={animatedPath}
      fill={fill}
      key={`slice-${animationKey}-${index}`}
      pointerEvents="none"
      style={{
        filter:
          showGlow && isHovered ? `drop-shadow(0 0 12px ${glowColor})` : "none",
      }}
      transition={{
        opacity: { duration: 0.15 },
        x: { type: "spring", stiffness: 400, damping: 25 },
        y: { type: "spring", stiffness: 400, damping: 25 },
      }}
    />
  );
}

interface AnimatedSliceGrowProps {
  index: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  cornerRadius: number;
  padAngle: number;
  fill: string;
  color: string;
  isHovered: boolean;
  isFaded: boolean;
  animationKey: number;
  showGlow: boolean;
  hoverOffset: number;
}

function AnimatedSliceGrow({
  index,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  cornerRadius,
  padAngle,
  fill,
  color,
  isHovered,
  isFaded,
  animationKey,
  showGlow,
  hoverOffset,
}: AnimatedSliceGrowProps) {
  const animationDelay = 0.1 + index * 0.08;

  const mountSpring = useSpring(0, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  const growSpring = useSpring(outerRadius, {
    stiffness: 400,
    damping: 25,
  });

  useEffect(() => {
    mountSpring.jump(0);
    const timeout = setTimeout(() => {
      mountSpring.set(1);
    }, animationDelay * 1000);
    return () => clearTimeout(timeout);
  }, [animationDelay, mountSpring]);

  useEffect(() => {
    growSpring.set(isHovered ? outerRadius + hoverOffset : outerRadius);
  }, [isHovered, hoverOffset, outerRadius, growSpring]);

  const animatedPath = useTransform(
    [mountSpring, growSpring],
    ([mount, currentOuterRadius]) => {
      const currentEndAngle =
        startAngle + (endAngle - startAngle) * (mount as number);
      if (currentEndAngle <= startAngle + 0.01) {
        return "";
      }
      return generateArcPath(
        innerRadius,
        currentOuterRadius as number,
        startAngle,
        currentEndAngle,
        cornerRadius,
        padAngle
      );
    }
  );

  const glowColor = color;

  return (
    <motion.path
      animate={{
        opacity: isFaded ? 0.4 : 1,
      }}
      d={animatedPath}
      fill={fill}
      key={`slice-${animationKey}-${index}`}
      pointerEvents="none"
      style={{
        filter:
          showGlow && isHovered ? `drop-shadow(0 0 12px ${glowColor})` : "none",
      }}
      transition={{
        opacity: { duration: 0.15 },
      }}
    />
  );
}

export function PieSlice({
  index,
  color: colorProp,
  fill: fillProp,
  animate = true,
  showGlow = true,
  hoverEffect = "translate",
  hoverOffset: hoverOffsetProp,
}: PieSliceProps) {
  const {
    arcs,
    innerRadius,
    outerRadius,
    cornerRadius,
    hoverOffset: contextHoverOffset,
    hoveredIndex,
    setHoveredIndex,
    animationKey,
    getColor,
    getFill,
  } = usePie();

  // Use prop if provided, otherwise use context value
  const hoverOffset = hoverOffsetProp ?? contextHoverOffset;

  // Track if initial mount animation is complete
  const hasAnimated = useRef(false);
  const sliceExpandDelay = index * 0.08;

  useEffect(() => {
    if (animate && !hasAnimated.current) {
      const timeout = setTimeout(
        () => {
          hasAnimated.current = true;
        },
        (sliceExpandDelay + 0.5) * 1000
      );
      return () => clearTimeout(timeout);
    }
  }, [animate, sliceExpandDelay]);

  const arcData = arcs[index];
  if (!arcData) {
    return null;
  }

  const color = colorProp || getColor(index);
  const fill = fillProp || getFill(index);

  const isHovered = hoveredIndex === index;
  const isFaded = hoveredIndex !== null && hoveredIndex !== index;

  // Calculate values for non-animated/static paths
  const offset = getSliceOffset(
    arcData.startAngle,
    arcData.endAngle,
    hoverOffset
  );

  // Generate the static hitbox path (always uses base outer radius)
  const hitboxPath = generateArcPath(
    innerRadius,
    outerRadius,
    arcData.startAngle,
    arcData.endAngle,
    cornerRadius,
    arcData.padAngle
  );

  // Generate the visible path for grow effect
  const grownOuterRadius = isHovered ? outerRadius + hoverOffset : outerRadius;
  const grownPath = generateArcPath(
    innerRadius,
    grownOuterRadius,
    arcData.startAngle,
    arcData.endAngle,
    cornerRadius,
    arcData.padAngle
  );

  // Render animated slice based on effect type
  const renderAnimatedSlice = () => {
    if (hoverEffect === "grow") {
      return (
        <AnimatedSliceGrow
          animationKey={animationKey}
          color={color}
          cornerRadius={cornerRadius}
          endAngle={arcData.endAngle}
          fill={fill}
          hoverOffset={hoverOffset}
          index={index}
          innerRadius={innerRadius}
          isFaded={isFaded}
          isHovered={isHovered}
          outerRadius={outerRadius}
          padAngle={arcData.padAngle}
          showGlow={showGlow}
          startAngle={arcData.startAngle}
        />
      );
    }

    // Default: translate effect (also covers "none" with hoverOffset=0)
    return (
      <AnimatedSliceTranslate
        animationKey={animationKey}
        color={color}
        cornerRadius={cornerRadius}
        endAngle={arcData.endAngle}
        fill={fill}
        hoverOffset={hoverEffect === "none" ? 0 : hoverOffset}
        index={index}
        innerRadius={innerRadius}
        isFaded={isFaded}
        isHovered={isHovered}
        outerRadius={outerRadius}
        padAngle={arcData.padAngle}
        showGlow={showGlow}
        startAngle={arcData.startAngle}
      />
    );
  };

  // Render static (non-animated) slice
  const renderStaticSlice = () => {
    if (hoverEffect === "grow") {
      return (
        <motion.path
          animate={{
            opacity: isFaded ? 0.4 : 1,
            d: grownPath,
          }}
          d={hitboxPath}
          fill={fill}
          pointerEvents="none"
          style={{
            filter:
              showGlow && isHovered ? `drop-shadow(0 0 12px ${color})` : "none",
          }}
          transition={{
            opacity: { duration: 0.15 },
            d: { type: "spring", stiffness: 400, damping: 25 },
          }}
        />
      );
    }

    // Default: translate effect
    const shouldTranslate = hoverEffect !== "none" && isHovered;
    const translateX = shouldTranslate ? offset.x : 0;
    const translateY = shouldTranslate ? offset.y : 0;

    return (
      <motion.path
        animate={{
          opacity: isFaded ? 0.4 : 1,
          x: translateX,
          y: translateY,
        }}
        d={hitboxPath}
        fill={fill}
        pointerEvents="none"
        style={{
          filter:
            showGlow && isHovered ? `drop-shadow(0 0 12px ${color})` : "none",
        }}
        transition={{
          opacity: { duration: 0.15 },
          x: { type: "spring", stiffness: 400, damping: 25 },
          y: { type: "spring", stiffness: 400, damping: 25 },
        }}
      />
    );
  };

  return (
    <g style={{ cursor: "pointer" }}>
      {/* Invisible hitbox - stays in place, handles hover events */}
      {/* biome-ignore lint/a11y/noStaticElementInteractions: SVG path used as hover hitbox for visualization */}
      <path
        d={hitboxPath}
        fill="transparent"
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
      />

      {/* Visible slice - animates based on hover effect, no pointer events */}
      {animate ? renderAnimatedSlice() : renderStaticSlice()}
    </g>
  );
}

PieSlice.displayName = "PieSlice";

// ---- pie-chart.tsx ----
/** Default hover offset in pixels */
export const DEFAULT_HOVER_OFFSET = 10;

export interface PieChartProps {
  /** Data array - each item represents a slice */
  data: PieData[];
  /** Chart size in pixels. If not provided, uses parent container size */
  size?: number;
  /** Inner radius for donut charts. Default: 0 (solid pie) */
  innerRadius?: number;
  /** Padding angle between slices in radians. Default: 0 */
  padAngle?: number;
  /** Corner radius for rounded slice edges. Default: 0 */
  cornerRadius?: number;
  /** Start angle in radians. Default: -PI/2 (top) */
  startAngle?: number;
  /** End angle in radians. Default: 3*PI/2 (full circle from top) */
  endAngle?: number;
  /** Additional class name for the container */
  className?: string;
  /** Controlled hover state - index of hovered slice */
  hoveredIndex?: number | null;
  /** Callback when hover state changes */
  onHoverChange?: (index: number | null) => void;
  /**
   * Hover offset in pixels for slice hover effects.
   * This also determines the padding around the chart to prevent clipping.
   * Default: 10
   */
  hoverOffset?: number;
  /** Child components (PieSlice, PieCenter, patterns, gradients, etc.) */
  children: ReactNode;
}

interface PieChartInnerProps {
  width: number;
  height: number;
  data: PieData[];
  innerRadius: number;
  padAngle: number;
  cornerRadius: number;
  startAngle: number;
  endAngle: number;
  hoverOffset: number;
  children: ReactNode;
  containerRef: React.RefObject<HTMLDivElement | null>;
  hoveredIndexProp?: number | null;
  onHoverChange?: (index: number | null) => void;
}

// Helper to check if a child is a PieCenter component
function isPieCenter(child: ReactNode): boolean {
  return (
    isValidElement(child) &&
    typeof child.type === "function" &&
    ((child.type as { displayName?: string }).displayName === "PieCenter" ||
      (child.type as { name?: string }).name === "PieCenter")
  );
}

// Helper to check if a component is a gradient or pattern definition
function isDefsComponent(child: ReactElement): boolean {
  const displayName =
    (child.type as { displayName?: string })?.displayName ||
    (child.type as { name?: string })?.name ||
    "";
  return (
    displayName.includes("Gradient") ||
    displayName.includes("Pattern") ||
    displayName === "LinearGradient" ||
    displayName === "RadialGradient"
  );
}

function PieChartInner({
  width,
  height,
  data,
  innerRadius: innerRadiusProp,
  padAngle,
  cornerRadius,
  startAngle,
  endAngle,
  hoverOffset,
  children,
  containerRef,
  hoveredIndexProp,
  onHoverChange,
}: PieChartInnerProps) {
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

  // Calculate radii with padding based on hover offset to prevent clipping
  const padding = hoverOffset;
  const outerRadius = center - padding;
  const innerRadius = innerRadiusProp;

  // Calculate total value
  const totalValue = useMemo(
    () => data.reduce((sum, d) => sum + d.value, 0),
    [data]
  );

  // Get color for a slice index
  const getColor = useCallback(
    (index: number) => {
      const item = data[index];
      if (item?.color) {
        return item.color;
      }
      return defaultPieColors[index % defaultPieColors.length] as string;
    },
    [data]
  );

  // Get fill for a slice index (supports patterns/gradients)
  const getFill = useCallback(
    (index: number) => {
      const item = data[index];
      // Check for explicit fill (pattern/gradient URL)
      if (item?.fill) {
        return item.fill;
      }
      // Fall back to color
      return getColor(index);
    },
    [data, getColor]
  );

  // Compute arcs using d3-shape pie
  const arcs = useMemo(() => {
    const pieGenerator = d3Pie<PieData>()
      .value((d) => d.value)
      .startAngle(startAngle)
      .endAngle(endAngle)
      .padAngle(padAngle)
      .sort(null); // Maintain data order

    const computed = pieGenerator(data);

    return computed.map((arc, index) => ({
      data: arc.data,
      index,
      startAngle: arc.startAngle,
      endAngle: arc.endAngle,
      padAngle: arc.padAngle,
      value: arc.value,
    })) as PieArcData[];
  }, [data, startAngle, endAngle, padAngle]);

  // Mark as loaded after initial render
  useState(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  });

  // Separate children into categories
  const { svgChildren, centerChildren, defsChildren } = useMemo(() => {
    const svgNodes: ReactNode[] = [];
    const centerNodes: ReactNode[] = [];
    const defsNodes: ReactElement[] = [];

    Children.forEach(children, (child) => {
      if (!isValidElement(child)) {
        svgNodes.push(child);
        return;
      }

      if (isPieCenter(child)) {
        centerNodes.push(child);
      } else if (isDefsComponent(child)) {
        defsNodes.push(child);
      } else {
        svgNodes.push(child);
      }
    });

    return {
      svgChildren: svgNodes,
      centerChildren: centerNodes,
      defsChildren: defsNodes,
    };
  }, [children]);

  // Early return if dimensions not ready
  if (size < 10) {
    return null;
  }

  const contextValue: PieContextValue = {
    data,
    arcs,
    size,
    center,
    outerRadius,
    innerRadius,
    padAngle,
    cornerRadius,
    hoverOffset,
    hoveredIndex,
    setHoveredIndex,
    animationKey,
    isLoaded,
    containerRef,
    totalValue,
    getColor,
    getFill,
  };

  // Use CSS Grid stacking to layer SVG and HTML content
  // This avoids Safari's foreignObject rendering bugs
  return (
    <PieProvider value={contextValue}>
      <div
        className="grid"
        style={{
          gridTemplateColumns: "1fr",
          gridTemplateRows: "1fr",
          width: size,
          height: size,
        }}
      >
        {/* SVG layer with pie slices */}
        <svg
          aria-hidden="true"
          height={size}
          style={{ gridArea: "1 / 1" }}
          width={size}
        >
          {/* Defs for patterns and gradients */}
          {defsChildren.length > 0 && <defs>{defsChildren}</defs>}

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
    </PieProvider>
  );
}

export function PieChart({
  data,
  size: fixedSize,
  innerRadius = 0,
  padAngle = 0,
  cornerRadius = 0,
  startAngle = -Math.PI / 2,
  endAngle = (3 * Math.PI) / 2,
  className = "",
  hoveredIndex,
  onHoverChange,
  hoverOffset = DEFAULT_HOVER_OFFSET,
  children,
}: PieChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // If fixed size is provided, use it directly
  if (fixedSize) {
    return (
      <div
        className={cn("relative flex items-center justify-center", className)}
        ref={containerRef}
        style={{ width: fixedSize, height: fixedSize }}
      >
        <PieChartInner
          containerRef={containerRef}
          cornerRadius={cornerRadius}
          data={data}
          endAngle={endAngle}
          height={fixedSize}
          hoveredIndexProp={hoveredIndex}
          hoverOffset={hoverOffset}
          innerRadius={innerRadius}
          onHoverChange={onHoverChange}
          padAngle={padAngle}
          startAngle={startAngle}
          width={fixedSize}
        >
          {children}
        </PieChartInner>
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
          <PieChartInner
            containerRef={containerRef}
            cornerRadius={cornerRadius}
            data={data}
            endAngle={endAngle}
            height={height}
            hoveredIndexProp={hoveredIndex}
            hoverOffset={hoverOffset}
            innerRadius={innerRadius}
            onHoverChange={onHoverChange}
            padAngle={padAngle}
            startAngle={startAngle}
            width={width}
          >
            {children}
          </PieChartInner>
        )}
      </ParentSize>
    </div>
  );
}

PieChart.displayName = "PieChart";

export default PieChart;
