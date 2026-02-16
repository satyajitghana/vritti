import { AnimatedShinyText } from "./component";

export default function AnimatedShinyTextExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800">
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span>Introducing Vritti UI</span>
        </AnimatedShinyText>
      </div>
    </div>
  );
}
