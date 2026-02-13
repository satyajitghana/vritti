import { CoolMode } from "./component"

export default function CoolModeExample() {
  return (
    <div className="relative justify-center">
      <CoolMode>
        <button className="rounded-md bg-black px-4 py-2 text-white dark:bg-white dark:text-black">
          Click Me!
        </button>
      </CoolMode>
    </div>
  )
}
