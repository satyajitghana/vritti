import TextType from "./component";

export default function TextTypeExample() {
  return (
    <div className="flex items-center justify-center p-8 text-2xl">
      <TextType text={["Hello World", "Welcome to Vritti", "React Bits"]} />
    </div>
  );
}
