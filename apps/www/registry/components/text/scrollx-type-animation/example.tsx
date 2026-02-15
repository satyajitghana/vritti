import { ScrollxTypeAnimation } from "./component";

export default function ScrollxTypeAnimationExample() {
  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <h2 className="text-3xl font-bold">
        Welcome to
        <ScrollxTypeAnimation
          words={[" the future", " innovation", " the Internet"]}
          typingSpeed={60}
          deletingSpeed={40}
          pauseDuration={1500}
          className="ml-1"
        />
      </h2>
    </div>
  );
}
