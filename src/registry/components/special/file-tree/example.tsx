import { File, Folder, Tree } from "./component";

const ELEMENTS = [
  {
    id: "1",
    isSelectable: true,
    name: "src",
    children: [
      { id: "2", isSelectable: true, name: "app", children: [
        { id: "3", isSelectable: true, name: "page.tsx" },
        { id: "4", isSelectable: true, name: "layout.tsx" },
      ]},
      { id: "5", isSelectable: true, name: "components", children: [
        { id: "6", isSelectable: true, name: "header.tsx" },
        { id: "7", isSelectable: true, name: "footer.tsx" },
      ]},
    ],
  },
];

export default function FileTreeExample() {
  return (
    <div className="flex h-[300px] w-1/2 flex-col items-center justify-center overflow-hidden rounded-lg border">
      <Tree
        className="overflow-hidden rounded-md p-2"
        initialSelectedId="3"
        initialExpandedItems={["1", "2", "3", "4", "5", "6", "7"]}
        elements={ELEMENTS}
      >
        <Folder element="src" value="1">
          <Folder value="2" element="app">
            <File value="3"><p>page.tsx</p></File>
            <File value="4"><p>layout.tsx</p></File>
          </Folder>
          <Folder value="5" element="components">
            <File value="6"><p>header.tsx</p></File>
            <File value="7"><p>footer.tsx</p></File>
          </Folder>
        </Folder>
      </Tree>
    </div>
  );
}
