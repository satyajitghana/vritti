import FlipStack from "./component";

export default function FlipStackExample() {
  const cards = [
    { id: 1, content: <div className="text-center"><h3 className="text-lg font-bold">Card 1</h3><p className="text-sm text-muted-foreground">First card</p></div> },
    { id: 2, content: <div className="text-center"><h3 className="text-lg font-bold">Card 2</h3><p className="text-sm text-muted-foreground">Second card</p></div> },
    { id: 3, content: <div className="text-center"><h3 className="text-lg font-bold">Card 3</h3><p className="text-sm text-muted-foreground">Third card</p></div> },
    { id: 4, content: <div className="text-center"><h3 className="text-lg font-bold">Card 4</h3><p className="text-sm text-muted-foreground">Fourth card</p></div> },
    { id: 5, content: <div className="text-center"><h3 className="text-lg font-bold">Card 5</h3><p className="text-sm text-muted-foreground">Fifth card</p></div> },
  ];

  return (
    <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-lg border">
      <FlipStack cards={cards} />
    </div>
  );
}
