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
} from "./component"

export default function AnimatedPopoverExample() {
  return (
    <div className="flex items-center justify-center p-8 min-h-[300px]">
      <PopoverRoot>
        <PopoverTrigger>Add Note</PopoverTrigger>
        <PopoverContent>
          <PopoverForm onSubmit={(note) => console.log("Submitted:", note)}>
            <PopoverLabel>Write a note...</PopoverLabel>
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
