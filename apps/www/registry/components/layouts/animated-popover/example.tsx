"use client"

import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverForm,
  PopoverLabel,
  PopoverTextarea,
  PopoverFooter,
  PopoverCloseButton,
  PopoverSubmitButton,
} from "@/registry/components/layouts/animated-popover/component"

export default function AnimatedPopoverExample() {
  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <PopoverRoot>
        <PopoverTrigger className="rounded-lg">
          Add Note
        </PopoverTrigger>
        <PopoverContent>
          <PopoverForm
            onSubmit={(note) => {
              console.log("Submitted:", note)
            }}
          >
            <PopoverLabel>Write a quick note...</PopoverLabel>
            <PopoverTextarea />
            <PopoverFooter>
              <PopoverCloseButton />
              <PopoverSubmitButton />
            </PopoverFooter>
          </PopoverForm>
        </PopoverContent>
      </PopoverRoot>
    </div>
  )
}
