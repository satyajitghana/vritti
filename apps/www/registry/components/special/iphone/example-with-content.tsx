import { Iphone } from "./component";

export default function IphoneWithContentExample() {
  return (
    <div className="w-full max-w-[434px]">
      <Iphone>
        <div className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-violet-500 to-purple-700 p-8 text-white">
          <h2 className="text-2xl font-bold">Welcome</h2>
          <p className="mt-2 text-center text-sm opacity-80">
            Your app content goes here
          </p>
        </div>
      </Iphone>
    </div>
  );
}
