import { Kbd, KbdKey, KbdSeparator } from "./component";

export default function KbdExample() {
  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <div className="flex items-center gap-2">
        <Kbd>
          <KbdKey aria-label="Command">Cmd</KbdKey>
          <KbdSeparator />
          <KbdKey>K</KbdKey>
        </Kbd>
        <span className="text-sm text-muted-foreground">Open command palette</span>
      </div>
      <div className="flex items-center gap-2">
        <Kbd>
          <KbdKey aria-label="Control">Ctrl</KbdKey>
          <KbdSeparator />
          <KbdKey>C</KbdKey>
        </Kbd>
        <span className="text-sm text-muted-foreground">Copy</span>
      </div>
      <div className="flex items-center gap-2">
        <Kbd>Esc</Kbd>
        <span className="text-sm text-muted-foreground">Close</span>
      </div>
    </div>
  );
}
