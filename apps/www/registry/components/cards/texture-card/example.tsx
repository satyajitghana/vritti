"use client"

import { ArrowRight, Merge } from "lucide-react"

import {
  TextureCardContent,
  TextureCardFooter,
  TextureCardHeader,
  TextureCardStyled,
  TextureCardTitle,
  TextureSeparator,
} from "./component"

export default function TextureCardExample() {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="dark:bg-stone-950 h-full rounded-md">
        <div className="items-start justify-center gap-6 rounded-lg p-2 md:p-8 grid grid-cols-1">
          <div className="col-span-1 grid items-start gap-6 lg:col-span-1">
            <TextureCardStyled>
              <TextureCardHeader className="flex flex-col gap-1 items-center justify-center p-4">
                <div className="p-3 bg-neutral-950 rounded-full mb-3">
                  <Merge className="h-7 w-7 stroke-neutral-200" />
                </div>
                <TextureCardTitle>Create your account</TextureCardTitle>
                <p className="text-center">
                  Welcome! Please fill in the details to get started.
                </p>
              </TextureCardHeader>
              <TextureSeparator />
              <TextureCardContent>
                <form className="flex flex-col gap-4">
                  <div className="flex justify-between gap-2">
                    <div className="flex-1">
                      <label
                        htmlFor="first"
                        className="text-sm font-medium leading-none mb-1.5 block"
                      >
                        First name
                      </label>
                      <input
                        id="first"
                        type="text"
                        required
                        className="flex h-10 w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-800/80 px-3 py-2 text-sm placeholder:text-neutral-400"
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor="last"
                        className="text-sm font-medium leading-none mb-1.5 block"
                      >
                        Last Name
                      </label>
                      <input
                        id="last"
                        type="text"
                        required
                        className="flex h-10 w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-800/80 px-3 py-2 text-sm placeholder:text-neutral-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-sm font-medium leading-none mb-1.5 block"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      className="flex h-10 w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-800/80 px-3 py-2 text-sm placeholder:text-neutral-400"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="text-sm font-medium leading-none mb-1.5 block"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      required
                      className="flex h-10 w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-800/80 px-3 py-2 text-sm placeholder:text-neutral-400"
                    />
                  </div>
                </form>
              </TextureCardContent>
              <TextureSeparator />
              <TextureCardFooter className="border-b rounded-b-sm">
                <button className="w-full inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-10 px-4 py-2 text-sm font-medium">
                  <div className="flex gap-1 items-center justify-center">
                    Continue
                    <ArrowRight className="h-4 w-4 mt-[1px]" />
                  </div>
                </button>
              </TextureCardFooter>

              <div className="dark:bg-neutral-800 bg-stone-100 pt-px rounded-b-[20px] overflow-hidden">
                <div className="flex flex-col items-center justify-center">
                  <div className="py-2 px-2">
                    <div className="text-center text-sm">
                      Already have an account?{" "}
                      <span className="text-primary">Sign in</span>
                    </div>
                  </div>
                </div>
              </div>
            </TextureCardStyled>
          </div>
        </div>
      </div>
    </div>
  )
}
