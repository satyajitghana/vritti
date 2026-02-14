"use client";

import {
  Snippet,
  SnippetCopyButton,
  SnippetHeader,
  SnippetTabsContent,
  SnippetTabsList,
  SnippetTabsTrigger,
} from "./component";

const npmCommand = "npm install @acme/ui";
const yarnCommand = "yarn add @acme/ui";

export default function SnippetExample() {
  return (
    <div className="flex w-full max-w-md items-center justify-center p-8">
      <Snippet defaultValue="npm">
        <SnippetHeader>
          <SnippetTabsList>
            <SnippetTabsTrigger value="npm">npm</SnippetTabsTrigger>
            <SnippetTabsTrigger value="yarn">yarn</SnippetTabsTrigger>
          </SnippetTabsList>
          <SnippetCopyButton value={npmCommand} />
        </SnippetHeader>
        <SnippetTabsContent value="npm">{npmCommand}</SnippetTabsContent>
        <SnippetTabsContent value="yarn">{yarnCommand}</SnippetTabsContent>
      </Snippet>
    </div>
  );
}
