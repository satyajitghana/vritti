import { TextHighlighter } from "./component";

export default function ScrollxTextHighlighterExample() {
  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <h2 className="text-3xl font-bold">
        This is{" "}
        <TextHighlighter highlightColor="#ff6b9d" type="wavy">
          highlighted text
        </TextHighlighter>{" "}
        with a wavy line
      </h2>
      <h2 className="text-3xl font-bold">
        And this uses{" "}
        <TextHighlighter highlightColor="#4f46e5" type="zigzag">
          zigzag style
        </TextHighlighter>{" "}
        highlighting
      </h2>
    </div>
  );
}
