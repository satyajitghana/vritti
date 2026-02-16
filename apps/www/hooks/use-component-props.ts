"use client"

import { useCallback, useMemo, useState } from "react"
import type { PropDefinition } from "@/registry/schema"

function parseValue(value: string, type: PropDefinition["type"]): string | number | boolean {
  switch (type) {
    case "number":
      return Number(value)
    case "boolean":
      return value === "true"
    default:
      return value
  }
}

function serializeValue(value: string | number | boolean): string {
  return String(value)
}

export function useComponentProps(definitions: PropDefinition[]) {
  const defaults = useMemo(() => {
    const d: Record<string, string | number | boolean> = {}
    for (const def of definitions) {
      d[def.name] = def.default
    }
    return d
  }, [definitions])

  const [props, setProps] = useState<Record<string, string | number | boolean>>(defaults)

  const updateProp = useCallback(
    (name: string, value: string | number | boolean) => {
      setProps((prev) => ({ ...prev, [name]: value }))
    },
    []
  )

  const resetProps = useCallback(() => {
    setProps(defaults)
  }, [defaults])

  const hasChanges = useMemo(() => {
    return definitions.some((def) => props[def.name] !== def.default)
  }, [definitions, props])

  const getShareUrl = useCallback(() => {
    const params = new URLSearchParams()
    for (const def of definitions) {
      if (props[def.name] !== def.default) {
        params.set(def.name, serializeValue(props[def.name]))
      }
    }
    const qs = params.toString()
    return qs ? `${window.location.pathname}?${qs}` : window.location.pathname
  }, [definitions, props])

  return { props, updateProp, resetProps, hasChanges, getShareUrl }
}
