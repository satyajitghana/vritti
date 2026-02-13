import DecryptedText from "./component";

export default function DecryptedTextExample() {
  return (
    <div className="flex items-center justify-center p-8 text-2xl">
      <DecryptedText text="Hello World" animateOn="view" />
    </div>
  );
}
