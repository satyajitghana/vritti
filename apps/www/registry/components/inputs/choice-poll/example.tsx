"use client"

import { useState } from "react"
import { ChoicePoll } from "./component"

export default function ChoicePollExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <ChoicePoll.Root className="w-full max-w-md">
        <ChoicePoll.Header>
          <ChoicePoll.Title>What framework do you prefer?</ChoicePoll.Title>
          <ChoicePoll.Description>Pick your favorite</ChoicePoll.Description>
        </ChoicePoll.Header>
        <ChoicePoll.Options>
          <ChoicePoll.Option value="react">
            <ChoicePoll.Label>React</ChoicePoll.Label>
          </ChoicePoll.Option>
          <ChoicePoll.Option value="vue">
            <ChoicePoll.Label>Vue</ChoicePoll.Label>
          </ChoicePoll.Option>
          <ChoicePoll.Option value="svelte">
            <ChoicePoll.Label>Svelte</ChoicePoll.Label>
          </ChoicePoll.Option>
          <ChoicePoll.Option value="angular">
            <ChoicePoll.Label>Angular</ChoicePoll.Label>
          </ChoicePoll.Option>
        </ChoicePoll.Options>
      </ChoicePoll.Root>
    </div>
  )
}
