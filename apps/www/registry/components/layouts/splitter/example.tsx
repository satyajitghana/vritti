import { Splitter, SplitterPanel } from "./component";

export default function SplitterExample() {
  return (
    <div className="h-[300px] w-full rounded-lg overflow-hidden border">
      <Splitter defaultSize={50} allowFullCollapse>
        <SplitterPanel className="bg-muted flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Left Panel</p>
        </SplitterPanel>
        <SplitterPanel className="bg-background flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Right Panel</p>
        </SplitterPanel>
      </Splitter>
    </div>
  );
}
