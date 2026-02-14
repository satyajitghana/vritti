"use client"

import { useState, useEffect, useCallback } from "react"

export type PackageManager = "pnpm" | "npm" | "yarn" | "bun"

interface Config {
  packageManager: PackageManager
}

const STORAGE_KEY = "vritti-config"

const defaultConfig: Config = {
  packageManager: "pnpm",
}

function readConfig(): Config {
  if (typeof window === "undefined") return defaultConfig
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return defaultConfig
    const parsed = JSON.parse(stored) as Partial<Config>
    return { packageManager: parsed.packageManager ?? defaultConfig.packageManager }
  } catch {
    return defaultConfig
  }
}

function writeConfig(config: Config) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
  } catch {
    // ignore
  }
  window.dispatchEvent(new Event("vritti-config-change"))
}

export function useConfig(): [Config, (config: Config) => void] {
  const [config, setConfig] = useState<Config>(defaultConfig)

  useEffect(() => {
    setConfig(readConfig())
    const handleChange = () => setConfig(readConfig())
    window.addEventListener("vritti-config-change", handleChange)
    window.addEventListener("storage", handleChange)
    return () => {
      window.removeEventListener("vritti-config-change", handleChange)
      window.removeEventListener("storage", handleChange)
    }
  }, [])

  const update = useCallback((newConfig: Config) => {
    setConfig(newConfig)
    writeConfig(newConfig)
  }, [])

  return [config, update]
}
