import { TextAnimate } from "./component";

export default function TextAnimateExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <TextAnimate animation="blurInUp" by="character" once>
        Blur in by character
      </TextAnimate>
    </div>
  );
}
