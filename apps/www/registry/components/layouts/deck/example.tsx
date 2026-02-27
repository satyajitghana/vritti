"use client";

import { Deck, DeckCards, DeckEmpty, DeckItem } from "./component";

export default function DeckExample() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border p-8">
      <div className="relative h-64 w-72">
        <Deck className="h-full w-full">
          <DeckEmpty />
          <DeckCards>
            <DeckItem className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <p className="text-lg font-semibold">Card 1</p>
            </DeckItem>
            <DeckItem className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
              <p className="text-lg font-semibold">Card 2</p>
            </DeckItem>
            <DeckItem className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <p className="text-lg font-semibold">Card 3</p>
            </DeckItem>
          </DeckCards>
        </Deck>
      </div>
    </div>
  );
}
