import { AnimatedSpan, Terminal, TypingAnimation } from "./component";

export default function TerminalExample() {
  return (
    <Terminal>
      <TypingAnimation>&gt; npm install</TypingAnimation>
      <AnimatedSpan className="text-green-500">
        added 120 packages in 3s
      </AnimatedSpan>
      <TypingAnimation className="text-muted-foreground">
        Done.
      </TypingAnimation>
    </Terminal>
  );
}
