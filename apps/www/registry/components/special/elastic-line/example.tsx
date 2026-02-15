import ElasticLine from "./component"

export default function ElasticLineExample() {
  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="w-full h-24 text-foreground">
        <ElasticLine
          strokeWidth={2}
          grabThreshold={8}
          releaseThreshold={80}
          transition={{ type: "spring", stiffness: 300, damping: 5 }}
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Hover near the line and drag to bend it
      </p>
    </div>
  )
}
