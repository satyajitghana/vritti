"use client"

import { useCallback, useSyncExternalStore } from "react"

export type PackageManager = "pnpm" | "npm" | "yarn" | "bun"

interface Config {
  packageManager: PackageManager
}

const STORAGE_KEY = "vritti-config"

const defaultConfig: Config = {
  packageManager: "pnpm",
}

function getSnapshot(): Config {
  if (typeof window === "undefined") return defaultConfig
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? { ...defaultConfig, ...JSON.parse(stored) } : defaultConfig
  } catch {
    return defaultConfig
  }
}

function getServerSnapshot(): Config {
  return defaultConfig
}

const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function setConfig(config: Config) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
  } catch {
    // ignore
  }
  listeners.forEach((l) => l())
}

export function useConfig(): [Config, (config: Config) => void] {
  const config = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const update = useCallback((newConfig: Config) => {
    setConfig(newConfig)
  }, [])
  return [config, update]
}
