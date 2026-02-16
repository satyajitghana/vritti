import { Index } from "@/registry/__index__"
import { notFound } from "next/navigation"

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params
  const item = Index[name]

  if (!item?.component) {
    notFound()
  }

  const Component = item.component

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Component />
    </div>
  )
}
