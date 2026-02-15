"use client";

import TypewriterTitle from "./component";

export default function TypeWriterExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <TypewriterTitle
        sequences={[
          { text: "Hello World", deleteAfter: true },
          { text: "Typewriter Effect", deleteAfter: true },
          { text: "Built with React", deleteAfter: false },
        ]}
      />
    </div>
  );
}
