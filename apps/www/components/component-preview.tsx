import * as React from "react"

import { getRegistryComponent, getRegistryMeta } from "@/lib/registry"
import { ComponentPreviewTabs } from "@/components/component-preview-tabs"
import { ComponentSource } from "@/components/component-source"

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  align?: "center" | "start" | "end"
  preview?: boolean
  hideCode?: boolean
}

export function ComponentPreview({
  name,
  className,
  align = "center",
  hideCode = false,
  ...props
}: ComponentPreviewProps) {
  const Component = getRegistryComponent(name)
  const meta = getRegistryMeta(name)

  if (!Component) {
    return (
      <p className="text-muted-foreground text-sm">
        Component{" "}
        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {name}
        </code>{" "}
        not found in registry.
      </p>
    )
  }

  const isBlock = meta?.type === "registry:block"
  const previewSize = meta?.previewSize || (isBlock ? "lg" : undefined)

  return (
    <ComponentPreviewTabs
      name={name}
      className={className}
      align={isBlock ? "start" : align}
      hideCode={hideCode}
      previewSize={previewSize}
      component={<Component />}
      source={<ComponentSource name={name} collapsible={false} />}
      {...props}
    />
  )
}
