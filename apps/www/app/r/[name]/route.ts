import { NextResponse } from "next/server"

import { getRegistryItem } from "@/lib/registry"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params
  const registryName = name.replace(/\.json$/, "")

  const item = await getRegistryItem(registryName)

  if (!item) {
    return NextResponse.json(
      { error: "Component not found" },
      { status: 404 }
    )
  }

  return NextResponse.json(item)
}
