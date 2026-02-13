"use client"

import { AnimatedList } from "./component"

interface Item {
  name: string
  description: string
}

const notifications: Item[] = [
  { name: "Payment received", description: "Magic UI - $2,000.00" },
  { name: "User signed up", description: "john@example.com" },
  { name: "New message", description: "How are you doing?" },
  { name: "Order completed", description: "Order #1234 has shipped" },
]

const Notification = ({ name, description }: Item) => {
  return (
    <figure className="relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4 transition-all duration-200 ease-in-out hover:scale-[103%] bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
      <div className="flex flex-row items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-2xl bg-gray-100">
          <span className="text-lg">💸</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white">
            <span className="text-sm sm:text-lg">{name}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  )
}

export default function AnimatedListExample() {
  return (
    <div className="relative flex h-[500px] w-full max-w-[400px] flex-col overflow-hidden p-6">
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  )
}
