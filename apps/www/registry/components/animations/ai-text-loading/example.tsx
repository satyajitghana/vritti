import AITextLoading from "./component"

export default function AITextLoadingExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <AITextLoading
        texts={["Thinking...", "Processing...", "Analyzing...", "Almost..."]}
        interval={1500}
      />
    </div>
  )
}
