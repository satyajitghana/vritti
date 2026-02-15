import { FlashyCard, FlashyCardDefault, FlashyCardActive } from "./component";

export default function FlashyCardExample() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border p-8">
      <FlashyCard className="w-80">
        <FlashyCardDefault>
          <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
            <p className="text-lg font-medium text-muted-foreground">Default State</p>
          </div>
        </FlashyCardDefault>
        <FlashyCardActive>
          <div className="aspect-video bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <p className="text-lg font-medium text-white">Active State</p>
          </div>
        </FlashyCardActive>
      </FlashyCard>
    </div>
  );
}
