"use client"

import { VoteTally } from "./component"

export default function VoteTallyExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <VoteTally.Root className="w-full max-w-md space-y-2">
        <VoteTally.Item value="typescript">
          <VoteTally.Trigger />
          <VoteTally.Group>
            <VoteTally.Title>TypeScript</VoteTally.Title>
            <VoteTally.Description>Typed JavaScript</VoteTally.Description>
          </VoteTally.Group>
          <VoteTally.Count />
        </VoteTally.Item>
        <VoteTally.Item value="rust">
          <VoteTally.Trigger />
          <VoteTally.Group>
            <VoteTally.Title>Rust</VoteTally.Title>
            <VoteTally.Description>Memory safe systems lang</VoteTally.Description>
          </VoteTally.Group>
          <VoteTally.Count />
        </VoteTally.Item>
        <VoteTally.Item value="go">
          <VoteTally.Trigger />
          <VoteTally.Group>
            <VoteTally.Title>Go</VoteTally.Title>
            <VoteTally.Description>Simple and fast</VoteTally.Description>
          </VoteTally.Group>
          <VoteTally.Count />
        </VoteTally.Item>
      </VoteTally.Root>
    </div>
  )
}
