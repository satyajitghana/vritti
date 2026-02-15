"use client";

import {
  createContext,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  motion,
  MotionValue,
  useMotionValue,
  useScroll,
  UseScrollOptions,
  useSpring,
  useTime,
  useTransform,
} from "motion/react";

import { cn } from "@/lib/utils";

type PreserveAspectRatioAlign =
  | "none"
  | "xMinYMin"
  | "xMidYMin"
  | "xMaxYMin"
  | "xMinYMid"
  | "xMidYMid"
  | "xMaxYMid"
  | "xMinYMax"
  | "xMidYMax"
  | "xMaxYMax";

type PreserveAspectRatioMeetOrSlice = "meet" | "slice";

type PreserveAspectRatio =
  | PreserveAspectRatioAlign
  | `${Exclude<PreserveAspectRatioAlign, "none">} ${PreserveAspectRatioMeetOrSlice}`;

interface ElementAlongPathProps {
  path: string;
  pathId?: string;
  className?: string;
  preserveAspectRatio?: PreserveAspectRatio;
  showPath?: boolean;
  direction?: "normal" | "reverse";
  width?: string | number;
  height?: string | number;
  viewBox?: string;
  animationType?: "auto" | "scroll";
  duration?: number;
  transition?: any;
  scrollContainer?: RefObject<HTMLElement | null>;
  scrollOffset?: UseScrollOptions["offset"];
  scrollTransformValues?: [number, number];
  children?: React.ReactNode;
}

interface ElementAlongPathItemProps {
  children: React.ReactNode;
  className?: string;
  startOffset?: number;
  transition?: any;
}

const ElementAlongPathContext = createContext<{
  path: string;
  animationType: "auto" | "scroll";
  direction: "normal" | "reverse";
  progress: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
  scrollTransformValues: [number, number];
  transition: any;
  setHovered: (isHovered: boolean) => void;
} | null>(null);

export const useElementAlongPathContext = () => {
  const context = useContext(ElementAlongPathContext);
  if (!context) {
    throw new Error("ElementAlongPathItem must be used within ElementAlongPath");
  }
  return context;
};

export const ElementAlongPathItem = ({
  children,
  className,
  startOffset = 0,
  transition: itemTransition,
}: ElementAlongPathItemProps) => {
  const {
    path,
    animationType,
    progress,
    scrollYProgress,
    scrollTransformValues,
    direction,
    transition: parentTransition,
    setHovered,
  } = useElementAlongPathContext();

  const transition = itemTransition || parentTransition;

  const initialOffset =
    direction === "normal" ? `${startOffset}%` : `${100 - startOffset}%`;
  const animateOffset = direction === "normal" ? "100%" : "0%";

  const scp = useTransform(
    scrollYProgress,
    [0, 1],
    [scrollTransformValues[0], scrollTransformValues[1]]
  );

  return (
    <motion.div
      className={cn("absolute top-0 left-0", className)}
      initial={{ offsetDistance: initialOffset }}
      animate={{
        offsetDistance: animationType === "auto" ? animateOffset : undefined,
      }}
      style={{
        offsetPath: `path('${path}')`,
        offsetDistance: animationType === "scroll" ? scp : undefined,
      }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

const ElementAlongPath = ({
  children,
  path,
  pathId,
  preserveAspectRatio = "xMidYMid meet",
  showPath = false,
  className,
  width = "100%",
  height = "100%",
  viewBox = "0 0 100 100",
  animationType = "auto",
  direction = "normal",
  duration = 4,
  transition = { duration: 4, repeat: Infinity, ease: "linear" },
  scrollContainer,
  scrollOffset = ["start end", "end end"],
  scrollTransformValues = [0, 100],
}: ElementAlongPathProps) => {
  const container = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const timeScale = useMotionValue(1);

  useEffect(() => {
    timeScale.set(isHovered ? 0.3 : 1);
  }, [isHovered, timeScale]);

  const smoothTimeScale = useSpring(timeScale, {
    stiffness: 100,
    damping: 30,
  });

  const t = useTime();
  const scaledTime = useTransform(t, (time) => time * smoothTimeScale.get());

  const progress = useTransform(
    scaledTime,
    [0, duration],
    direction === "normal" ? [0, 100] : [100, 0]
  );

  const id =
    pathId || `animated-path-${Math.random().toString(36).substring(7)}`;

  const { scrollYProgress } = useScroll({
    container: scrollContainer || container,
    offset: scrollOffset,
  });

  const scrollProgressValues =
    direction === "normal"
      ? [scrollTransformValues[0], scrollTransformValues[1]]
      : [scrollTransformValues[1], scrollTransformValues[0]];

  const scrollProgress = useTransform(
    scrollYProgress,
    [0, 1],
    scrollProgressValues
  );

  const finalProgress = animationType === "auto" ? progress : scrollProgress;

  return (
    <ElementAlongPathContext.Provider
      value={{
        path,
        animationType,
        direction,
        progress: finalProgress,
        scrollYProgress,
        scrollTransformValues,
        transition: {
          ...transition,
        },
        setHovered: setIsHovered,
      }}
    >
      <div ref={container} className={cn("relative", className)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={viewBox}
          width={width}
          height={height}
          preserveAspectRatio={preserveAspectRatio}
          className="w-full h-full"
        >
          <motion.path
            id={id}
            d={path}
            stroke={showPath ? "currentColor" : "none"}
            fill="none"
            transition={transition}
          />
        </svg>
        {children}
      </div>
    </ElementAlongPathContext.Provider>
  );
};

export default ElementAlongPath;
