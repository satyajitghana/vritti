"use client";

import {
  createContext,
  forwardRef,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

function useMousePositionRef(
  containerRef?: React.RefObject<HTMLElement | SVGElement | null>
) {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (x: number, y: number) => {
      if (containerRef && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      } else {
        positionRef.current = { x, y };
      }
    };

    const handleMouseMove = (ev: MouseEvent) => {
      updatePosition(ev.clientX, ev.clientY);
    };

    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [containerRef]);

  return positionRef;
}

function calculatePosition(
  value: number | string | undefined,
  containerSize: number,
  elementSize: number
): number {
  if (value === undefined) return containerSize / 2;
  if (typeof value === "string") {
    if (value.endsWith("%")) {
      return (parseFloat(value) / 100) * containerSize;
    }
    return parseFloat(value);
  }
  if (value >= 0 && value <= 1) {
    return value * containerSize;
  }
  return value;
}

type GravityProps = {
  children: ReactNode;
  debug?: boolean;
  attractorPoint?: { x: number | string; y: number | string };
  attractorStrength?: number;
  cursorStrength?: number;
  cursorFieldRadius?: number;
  resetOnResize?: boolean;
  addTopWall?: boolean;
  autoStart?: boolean;
  className?: string;
};

type MatterBodyProps = {
  children: ReactNode;
  matterBodyOptions?: Record<string, any>;
  isDraggable?: boolean;
  bodyType?: "rectangle" | "circle" | "svg";
  sampleLength?: number;
  x?: number | string;
  y?: number | string;
  angle?: number;
  className?: string;
};

export type GravityRef = {
  start: () => void;
  stop: () => void;
  reset: () => void;
};

const GravityContext = createContext<{
  registerElement: (
    id: string,
    element: HTMLElement,
    props: MatterBodyProps
  ) => void;
  unregisterElement: (id: string) => void;
} | null>(null);

export const MatterBody = ({
  children,
  className,
  matterBodyOptions = {
    friction: 0.1,
    restitution: 0.1,
    density: 0.001,
    isStatic: false,
  },
  bodyType = "rectangle",
  isDraggable = true,
  sampleLength = 15,
  x = 0,
  y = 0,
  angle = 0,
  ...props
}: MatterBodyProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(Math.random().toString(36).substring(7));
  const context = useContext(GravityContext);

  useEffect(() => {
    if (!elementRef.current || !context) return;
    context.registerElement(idRef.current, elementRef.current, {
      children,
      matterBodyOptions,
      bodyType,
      sampleLength,
      isDraggable,
      x,
      y,
      angle,
      ...props,
    });

    return () => context.unregisterElement(idRef.current);
  }, [props, children, matterBodyOptions, isDraggable]);

  return (
    <div ref={elementRef} className={cn("absolute", className)}>
      {children}
    </div>
  );
};

type PhysicsBody = {
  element: HTMLElement;
  body: {
    position: { x: number; y: number };
    velocity: { x: number; y: number };
    angle: number;
    mass: number;
    isStatic: boolean;
  };
  props: MatterBodyProps;
};

const Gravity = forwardRef<GravityRef, GravityProps>(
  (
    {
      children,
      debug = false,
      attractorPoint = { x: 0.5, y: 0.5 },
      attractorStrength = 0.001,
      cursorStrength = 0.0005,
      cursorFieldRadius = 100,
      resetOnResize = true,
      addTopWall = true,
      autoStart = true,
      className,
      ...props
    },
    ref
  ) => {
    const canvas = useRef<HTMLDivElement>(null);
    const bodiesMap = useRef(new Map<string, PhysicsBody>());
    const frameId = useRef<number>(undefined);
    const isRunning = useRef(false);
    const mouseRef = useMousePositionRef(canvas);

    const registerElement = useCallback(
      (id: string, element: HTMLElement, bodyProps: MatterBodyProps) => {
        if (!canvas.current) return;
        const canvasRect = canvas.current.getBoundingClientRect();
        const width = element.offsetWidth;
        const height = element.offsetHeight;

        const xPos = calculatePosition(bodyProps.x, canvasRect.width, width);
        const yPos = calculatePosition(bodyProps.y, canvasRect.height, height);

        const body = {
          position: { x: xPos, y: yPos },
          velocity: { x: 0, y: 0 },
          angle: (bodyProps.angle || 0) * (Math.PI / 180),
          mass: 1,
          isStatic: bodyProps.matterBodyOptions?.isStatic || false,
        };

        bodiesMap.current.set(id, { element, body, props: bodyProps });
      },
      [debug]
    );

    const unregisterElement = useCallback((id: string) => {
      bodiesMap.current.delete(id);
    }, []);

    const updateElements = useCallback(() => {
      if (!canvas.current) return;
      const canvasRect = canvas.current.getBoundingClientRect();
      const width = canvasRect.width;
      const height = canvasRect.height;

      const attractorX =
        typeof attractorPoint.x === "string"
          ? (width * parseFloat(String(attractorPoint.x))) / 100
          : width * (attractorPoint.x as number);
      const attractorY =
        typeof attractorPoint.y === "string"
          ? (height * parseFloat(String(attractorPoint.y))) / 100
          : height * (attractorPoint.y as number);

      bodiesMap.current.forEach(({ element, body }) => {
        if (body.isStatic) return;

        // Attractor force
        const dx = attractorX - body.position.x;
        const dy = attractorY - body.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
          body.velocity.x += (dx / distance) * attractorStrength * body.mass * 60;
          body.velocity.y += (dy / distance) * attractorStrength * body.mass * 60;
        }

        // Cursor force
        if (mouseRef.current.x > 0 && mouseRef.current.y > 0) {
          const mdx = mouseRef.current.x - body.position.x;
          const mdy = mouseRef.current.y - body.position.y;
          const mouseDistance = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mouseDistance > 0 && mouseDistance < cursorFieldRadius) {
            body.velocity.x +=
              (mdx / mouseDistance) * cursorStrength * body.mass * 60;
            body.velocity.y +=
              (mdy / mouseDistance) * cursorStrength * body.mass * 60;
          }
        }

        // Apply damping
        body.velocity.x *= 0.98;
        body.velocity.y *= 0.98;

        body.position.x += body.velocity.x;
        body.position.y += body.velocity.y;

        // Walls
        const w = element.offsetWidth;
        const h = element.offsetHeight;

        if (body.position.x - w / 2 < 0) {
          body.position.x = w / 2;
          body.velocity.x *= -0.5;
        }
        if (body.position.x + w / 2 > width) {
          body.position.x = width - w / 2;
          body.velocity.x *= -0.5;
        }
        if (addTopWall && body.position.y - h / 2 < 0) {
          body.position.y = h / 2;
          body.velocity.y *= -0.5;
        }
        if (body.position.y + h / 2 > height) {
          body.position.y = height - h / 2;
          body.velocity.y *= -0.5;
        }

        const rotation = body.angle * (180 / Math.PI);
        element.style.transform = `translate(${body.position.x - w / 2}px, ${body.position.y - h / 2}px) rotate(${rotation}deg)`;
      });

      if (isRunning.current) {
        frameId.current = requestAnimationFrame(updateElements);
      }
    }, [attractorPoint, attractorStrength, cursorStrength, cursorFieldRadius, addTopWall]);

    const startEngine = useCallback(() => {
      isRunning.current = true;
      frameId.current = requestAnimationFrame(updateElements);
    }, [updateElements]);

    const stopEngine = useCallback(() => {
      isRunning.current = false;
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
    }, []);

    const reset = useCallback(() => {
      stopEngine();
      bodiesMap.current.forEach(({ element, body, props: bodyProps }) => {
        if (!canvas.current) return;
        const canvasRect = canvas.current.getBoundingClientRect();
        body.position.x = calculatePosition(
          bodyProps.x,
          canvasRect.width,
          element.offsetWidth
        );
        body.position.y = calculatePosition(
          bodyProps.y,
          canvasRect.height,
          element.offsetHeight
        );
        body.velocity = { x: 0, y: 0 };
      });
      if (autoStart) startEngine();
    }, [stopEngine, startEngine, autoStart]);

    useImperativeHandle(
      ref,
      () => ({
        start: startEngine,
        stop: stopEngine,
        reset,
      }),
      [startEngine, stopEngine, reset]
    );

    useEffect(() => {
      if (autoStart) {
        startEngine();
      }
      return () => stopEngine();
    }, [autoStart, startEngine, stopEngine]);

    return (
      <GravityContext.Provider value={{ registerElement, unregisterElement }}>
        <div
          ref={canvas}
          className={cn(className, "absolute top-0 left-0 w-full h-full")}
          {...props}
        >
          {children}
        </div>
      </GravityContext.Provider>
    );
  }
);

Gravity.displayName = "Gravity";
export default Gravity;
