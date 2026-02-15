import { Hyperlink } from "./component";

export default function HyperlinkExample() {
  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <Hyperlink href="#">Default Hyperlink</Hyperlink>
      <Hyperlink href="#" underlineClassName="bg-blue-500">
        Custom Blue Underline
      </Hyperlink>
      <Hyperlink href="#" className="text-lg" underlineClassName="bg-gradient-to-r from-purple-500 to-pink-500">
        Gradient Underline
      </Hyperlink>
    </div>
  );
}
