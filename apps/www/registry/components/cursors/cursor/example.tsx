import { Cursor, CursorBody, CursorMessage, CursorName, CursorPointer } from "./component";

export default function CursorExample() {
  return (
    <div className="flex items-center justify-center gap-8 p-8">
      <Cursor>
        <CursorPointer className="text-blue-500" />
        <CursorBody className="bg-blue-500 text-white">
          <CursorName>Alice</CursorName>
        </CursorBody>
      </Cursor>
      <Cursor>
        <CursorPointer className="text-emerald-500" />
        <CursorBody className="bg-emerald-500 text-white">
          <CursorName>Bob</CursorName>
          <CursorMessage>Typing...</CursorMessage>
        </CursorBody>
      </Cursor>
    </div>
  );
}
