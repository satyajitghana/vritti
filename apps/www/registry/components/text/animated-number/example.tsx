"use client"

import { useState } from "react"
import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AnimatedNumber } from "./component"

function PrecisionExample() {
  const [value, setValue] = useState(14.5678)

  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
        Precision
      </h3>
      <div className="flex items-center gap-2">
        <div
          className="text-2xl font-bold"
          style={{ minWidth: "80px", textAlign: "left" }}
        >
          <AnimatedNumber value={value} precision={2} />
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="border border-primary/10 rounded-full ml-auto"
          onClick={() => setValue(value + 13.456)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

function FormatExample() {
  const [value, setValue] = useState(10)

  const customFormat = (num: number) => `$${num.toFixed(2)}`

  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
        Format
      </h3>
      <div className="flex items-center gap-2">
        <div
          className="text-2xl font-bold"
          style={{ minWidth: "120px", textAlign: "left" }}
        >
          <AnimatedNumber value={value} format={customFormat} />
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="border border-primary/10 rounded-full ml-auto"
          onClick={() => setValue(value + 50)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

function CustomSpringExample() {
  const [value, setValue] = useState(1000)
  const [mass, setMass] = useState(1)
  const [stiffness, setStiffness] = useState(100)
  const [damping, setDamping] = useState(40)

  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm w-full">
      <h3 className="text-sm font-semibold mb-3 text-muted-foreground">
        Custom Spring Properties
      </h3>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
        <div
          className="text-5xl font-bold"
          style={{ minWidth: "150px", textAlign: "right" }}
        >
          <AnimatedNumber
            value={value}
            mass={mass}
            stiffness={stiffness}
            damping={damping}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Button
            className="border border-primary/10 rounded-full"
            onClick={() => setValue(value + 500)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Increase
          </Button>
          <Button
            className="border border-primary/10 rounded-full"
            disabled={value <= 500}
            onClick={() => setValue(value - 300)}
          >
            <Minus className="h-4 w-4 mr-2" />
            Decrease
          </Button>
        </div>
        <div className="w-full space-y-3">
          <div>
            <label className="text-sm">Mass: {mass}</label>
            <input
              type="range"
              className="w-full accent-primary"
              min={0.1}
              max={5}
              step={0.1}
              value={mass}
              onChange={(e) => setMass(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="text-sm">Stiffness: {stiffness}</label>
            <input
              type="range"
              className="w-full accent-primary"
              min={1}
              max={200}
              step={1}
              value={stiffness}
              onChange={(e) => setStiffness(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="text-sm">Damping: {damping}</label>
            <input
              type="range"
              className="w-full accent-primary"
              min={1}
              max={50}
              step={1}
              value={damping}
              onChange={(e) => setDamping(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AnimatedNumberExample() {
  return (
    <div className="max-w-xl gap-4 py-6 mx-auto">
      <div className="w-full flex flex-col gap-2 justify-between">
        <CustomSpringExample />
        <div className="flex flex-col sm:flex-row gap-2">
          <PrecisionExample />
          <FormatExample />
        </div>
      </div>
    </div>
  )
}
