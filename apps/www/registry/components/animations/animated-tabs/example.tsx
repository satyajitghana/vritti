"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "./component";

export default function AnimatedTabsExample() {
  return (
    <div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-lg border p-4">
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Overview</TabsTrigger>
          <TabsTrigger value="tab2">Features</TabsTrigger>
          <TabsTrigger value="tab3">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <p className="text-muted-foreground">Overview content goes here.</p>
        </TabsContent>
        <TabsContent value="tab2">
          <p className="text-muted-foreground">Features content goes here.</p>
        </TabsContent>
        <TabsContent value="tab3">
          <p className="text-muted-foreground">Settings content goes here.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
