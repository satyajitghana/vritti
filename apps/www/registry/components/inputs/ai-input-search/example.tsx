"use client"

import AIInputSearch from "./component"

export default function AIInputSearchExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <AIInputSearch
        placeholder="Search the web..."
        onSubmit={(value) => console.log("Search:", value)}
      />
    </div>
  )
}
