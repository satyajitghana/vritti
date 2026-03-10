import StackingCards, { StackingCardItem } from "./component"

export default function StackingCardsExample() {
  const cards = [
    { title: "First Card", color: "bg-blue-500" },
    { title: "Second Card", color: "bg-green-500" },
    { title: "Third Card", color: "bg-purple-500" },
    { title: "Fourth Card", color: "bg-orange-500" },
  ]

  return (
    <StackingCards totalCards={cards.length} className="h-[300vh]">
      {cards.map((card, i) => (
        <StackingCardItem key={i} index={i} className="h-screen">
          <div
            className={`${card.color} rounded-2xl p-8 h-[80vh] flex items-center justify-center`}
          >
            <h2 className="text-4xl font-bold text-white">{card.title}</h2>
          </div>
        </StackingCardItem>
      ))}
    </StackingCards>
  )
}
