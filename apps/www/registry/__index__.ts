import { lazy } from "react"

// This file maps component names to their implementations and metadata
// TODO: Populate with all 184+ components

export const Index: Record<
  string,
  {
    component: React.LazyExoticComponent<React.ComponentType<any>>
    files: Array<{ path: string; type: string; target?: string }>
  }
> = {
  // Example entry - add more components here
  // "button-demo": {
  //   component: lazy(() => import("@/registry/components/button-demo")),
  //   files: [
  //     {
  //       path: "registry/components/button-demo.tsx",
  //       type: "registry:example",
  //     },
  //   ],
  // },
}
