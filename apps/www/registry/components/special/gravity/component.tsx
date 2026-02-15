"use client"

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
} from "react"
import { cn } from "@/lib/utils"

type GravityProps = {
  children: ReactNode
  debug?: boolean
  gravity?: { x: number; y: number }
  resetOnResize?: boolean
  grabCursor?: boolean
  addTopWall?: boolean
  autoStart?: boolean
  className?: string
}

type PhysicsBody = {
  element: HTMLElement
  body: any
  props: MatterBodyProps
}

type MatterBodyProps = {
  children: ReactNode
  matterBodyOptions?: Record<string, any>
  isDraggable?: boolean
  bodyType?: "rectangle" | "circle"
  x?: number | string
  y?: number | string
  angle?: number
  className?: string
}

export type GravityRef = {
  start: () => void
  stop: () => void
  reset: () => void
}

const GravityContext = createContext<{
  registerElement: (id: string, element: HTMLElement, props: MatterBodyProps) => void
  unregisterElement: (id: string) => void
} | null>(null)

function calculatePosition(
  value: number | string | undefined,
  containerSize: number,
  elementSize: number
): number {
  if (value === undefined) return elementSize / 2
  if (typeof value === "string") {
    if (value.endsWith("%")) {
      return (parseFloat(value) / 100) * containerSize
    }
    return parseFloat(value)
  }
  return value
}

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
  x = 0,
  y = 0,
  angle = 0,
  ...props
}: MatterBodyProps) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(Math.random().toString(36).substring(7))
  const context = useContext(GravityContext)

  useEffect(() => {
    if (!elementRef.current || !context) return
    context.registerElement(idRef.current, elementRef.current, {
      children,
      matterBodyOptions,
      bodyType,
      isDraggable,
      x,
      y,
      angle,
      ...props,
    })

    return () => context.unregisterElement(idRef.current)
  }, [])

  return (
    <div
      ref={elementRef}
      className={cn(
        "absolute",
        className,
        isDraggable && "pointer-events-none"
      )}
    >
      {children}
    </div>
  )
}

const Gravity = forwardRef<GravityRef, GravityProps>(
  (
    {
      children,
      debug = false,
      gravity = { x: 0, y: 1 },
      grabCursor = true,
      resetOnResize = true,
      addTopWall = true,
      autoStart = true,
      className,
      ...props
    },
    ref
  ) => {
    const canvas = useRef<HTMLDivElement>(null)
    const engineRef = useRef<any>(null)
    const renderRef = useRef<any>(null)
    const runnerRef = useRef<any>(null)
    const bodiesMap = useRef(new Map<string, PhysicsBody>())
    const frameId = useRef<number>(undefined)
    const isRunning = useRef(false)
    const [matterLoaded, setMatterLoaded] = useState(false)
    const MatterRef = useRef<any>(null)

    // Dynamically import matter-js
    useEffect(() => {
      let cancelled = false
      import("matter-js").then((Matter) => {
        if (cancelled) return
        MatterRef.current = Matter
        setMatterLoaded(true)
      }).catch(() => {
        console.warn("matter-js not installed. Install it with: npm install matter-js")
      })
      return () => { cancelled = true }
    }, [])

    const registerElement = useCallback(
      (id: string, element: HTMLElement, matterProps: MatterBodyProps) => {
        if (!canvas.current || !MatterRef.current || !engineRef.current) return
        const Matter = MatterRef.current
        const width = element.offsetWidth
        const height = element.offsetHeight
        const canvasRect = canvas.current.getBoundingClientRect()
        const angleRad = ((matterProps.angle || 0) * Math.PI) / 180
        const posX = calculatePosition(matterProps.x, canvasRect.width, width)
        const posY = calculatePosition(matterProps.y, canvasRect.height, height)

        let body
        if (matterProps.bodyType === "circle") {
          const radius = Math.max(width, height) / 2
          body = Matter.Bodies.circle(posX, posY, radius, {
            ...matterProps.matterBodyOptions,
            angle: angleRad,
            render: { fillStyle: debug ? "#888" : "transparent", strokeStyle: debug ? "#333" : "transparent" },
          })
        } else {
          body = Matter.Bodies.rectangle(posX, posY, width, height, {
            ...matterProps.matterBodyOptions,
            angle: angleRad,
            render: { fillStyle: debug ? "#888" : "transparent", strokeStyle: debug ? "#333" : "transparent" },
          })
        }

        if (body) {
          Matter.World.add(engineRef.current.world, [body])
          bodiesMap.current.set(id, { element, body, props: matterProps })
        }
      },
      [debug]
    )

    const unregisterElement = useCallback((id: string) => {
      if (!MatterRef.current || !engineRef.current) return
      const body = bodiesMap.current.get(id)
      if (body) {
        MatterRef.current.World.remove(engineRef.current.world, body.body)
        bodiesMap.current.delete(id)
      }
    }, [])

    const updateElements = useCallback(() => {
      bodiesMap.current.forEach(({ element, body }) => {
        const { x, y } = body.position
        const rotation = body.angle * (180 / Math.PI)
        element.style.transform = `translate(${x - element.offsetWidth / 2}px, ${y - element.offsetHeight / 2}px) rotate(${rotation}deg)`
      })
      frameId.current = requestAnimationFrame(updateElements)
    }, [])

    const initializeRenderer = useCallback(() => {
      if (!canvas.current || !MatterRef.current) return
      const Matter = MatterRef.current
      const height = canvas.current.offsetHeight
      const width = canvas.current.offsetWidth

      engineRef.current = Matter.Engine.create()
      engineRef.current.gravity.x = gravity.x
      engineRef.current.gravity.y = gravity.y

      renderRef.current = Matter.Render.create({
        element: canvas.current,
        engine: engineRef.current,
        options: { width, height, wireframes: false, background: "transparent" },
      })

      const mouse = Matter.Mouse.create(renderRef.current.canvas)
      const mouseConstraint = Matter.MouseConstraint.create(engineRef.current, {
        mouse,
        constraint: { stiffness: 0.2, render: { visible: debug } },
      })

      const walls = [
        Matter.Bodies.rectangle(width / 2, height + 10, width, 20, { isStatic: true, render: { visible: debug } }),
        Matter.Bodies.rectangle(width + 10, height / 2, 20, height, { isStatic: true, render: { visible: debug } }),
        Matter.Bodies.rectangle(-10, height / 2, 20, height, { isStatic: true, render: { visible: debug } }),
      ]

      if (addTopWall) {
        walls.push(
          Matter.Bodies.rectangle(width / 2, -10, width, 20, { isStatic: true, render: { visible: debug } })
        )
      }

      Matter.World.add(engineRef.current.world, [mouseConstraint, ...walls])
      renderRef.current.mouse = mouse

      runnerRef.current = Matter.Runner.create()
      Matter.Render.run(renderRef.current)
      updateElements()
      runnerRef.current.enabled = false

      if (autoStart) {
        runnerRef.current.enabled = true
        Matter.Runner.run(runnerRef.current, engineRef.current)
        isRunning.current = true
      }
    }, [updateElements, debug, autoStart, gravity, addTopWall])

    const clearRenderer = useCallback(() => {
      if (!MatterRef.current) return
      const Matter = MatterRef.current
      if (frameId.current) cancelAnimationFrame(frameId.current)
      if (renderRef.current) {
        Matter.Mouse.clearSourceEvents(renderRef.current.mouse)
        Matter.Render.stop(renderRef.current)
        renderRef.current.canvas.remove()
      }
      if (runnerRef.current) Matter.Runner.stop(runnerRef.current)
      if (engineRef.current) {
        Matter.World.clear(engineRef.current.world, false)
        Matter.Engine.clear(engineRef.current)
      }
      bodiesMap.current.clear()
    }, [])

    const startEngine = useCallback(() => {
      if (!MatterRef.current || !runnerRef.current || !engineRef.current) return
      const Matter = MatterRef.current
      runnerRef.current.enabled = true
      Matter.Runner.run(runnerRef.current, engineRef.current)
      if (renderRef.current) Matter.Render.run(renderRef.current)
      frameId.current = requestAnimationFrame(updateElements)
      isRunning.current = true
    }, [updateElements])

    const stopEngine = useCallback(() => {
      if (!isRunning.current || !MatterRef.current) return
      const Matter = MatterRef.current
      if (runnerRef.current) Matter.Runner.stop(runnerRef.current)
      if (renderRef.current) Matter.Render.stop(renderRef.current)
      if (frameId.current) cancelAnimationFrame(frameId.current)
      isRunning.current = false
    }, [])

    useImperativeHandle(ref, () => ({
      start: startEngine,
      stop: stopEngine,
      reset: () => {
        clearRenderer()
        initializeRenderer()
      },
    }), [startEngine, stopEngine, clearRenderer, initializeRenderer])

    useEffect(() => {
      if (!matterLoaded) return
      initializeRenderer()
      return clearRenderer
    }, [matterLoaded, initializeRenderer, clearRenderer])

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
    )
  }
)

Gravity.displayName = "Gravity"
export default Gravity
