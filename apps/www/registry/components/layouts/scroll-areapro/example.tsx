import { ScrollAreaPro } from "./component";

export default function ScrollAreaProExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <ScrollAreaPro className="h-72 w-48 rounded-md border" autoHide>
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="text-sm py-1">
              Tag {i + 1}
            </div>
          ))}
        </div>
      </ScrollAreaPro>
    </div>
  );
}
