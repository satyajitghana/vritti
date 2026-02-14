"use client"

import { useCallback, useState } from "react"
import { Plus, RepeatIcon, Settings2Icon, XIcon } from "lucide-react"
import { AnimatePresence, LayoutGroup, motion } from "motion/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import SortableList, { type Item, SortableListItem } from "./component"

const initialState: Item[] = [
  {
    text: "Gather Data",
    checked: false,
    id: 1,
    description:
      "Collect relevant marketing copy from the user's website and competitor sites.",
  },
  {
    text: "Analyze Copy",
    checked: false,
    id: 2,
    description:
      "Analyze the collected marketing copy for clarity and persuasiveness.",
  },
  {
    text: "Create Suggestions",
    checked: false,
    id: 3,
    description:
      "Create alternative versions of the marketing copy that address weaknesses.",
  },
  {
    text: "Recommendations",
    checked: false,
    id: 5,
    description:
      "Present the AI-generated marketing copy suggestions to the user.",
  },
]

function SortableListDemo() {
  const [items, setItems] = useState<Item[]>(initialState)
  const [openItemId, setOpenItemId] = useState<number | null>(null)

  const handleCompleteItem = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    )
  }

  const handleAddItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      {
        text: `Item ${prevItems.length + 1}`,
        checked: false,
        id: Date.now(),
        description: "",
      },
    ])
  }

  const handleResetItems = () => {
    setItems(initialState)
  }

  const handleCloseOnDrag = useCallback(() => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.checked ? { ...item, checked: false } : item
      )
      return updatedItems.some(
        (item, index) => item.checked !== prevItems[index].checked
      )
        ? updatedItems
        : prevItems
    })
  }, [])

  const renderListItem = (
    item: Item,
    order: number,
    onCompleteItem: (id: number) => void,
    onRemoveItem: (id: number) => void
  ) => {
    const isOpen = item.id === openItemId

    return (
      <SortableListItem
        item={item}
        order={order}
        key={item.id}
        isExpanded={isOpen}
        onCompleteItem={onCompleteItem}
        onRemoveItem={onRemoveItem}
        handleDrag={handleCloseOnDrag}
        className="my-2"
        renderExtra={(item) => (
          <div
            key={`${isOpen}`}
            className={cn(
              "flex h-full w-full flex-col items-center justify-center gap-2",
              isOpen ? "py-1 px-1" : "py-3"
            )}
          >
            <motion.button
              layout
              onClick={() => setOpenItemId(!isOpen ? item.id : null)}
              key="collapse"
              className={cn(
                isOpen
                  ? "absolute right-3 top-3 z-10"
                  : "relative z-10 ml-auto mr-3"
              )}
            >
              {isOpen ? (
                <XIcon className="h-5 w-5 text-neutral-500" />
              ) : (
                <Settings2Icon className="stroke-1 h-5 w-5 text-white/80" />
              )}
            </motion.button>

            <LayoutGroup id={`${item.id}`}>
              <AnimatePresence mode="popLayout">
                {isOpen ? (
                  <motion.div className="flex w-full flex-col">
                    <div className="w-full px-3 py-2">
                      <label className="text-xs text-neutral-400">Title</label>
                      <input
                        type="text"
                        value={item.text}
                        className="w-full rounded-lg border border-black/10 bg-neutral-800 px-2 py-1 text-sm text-white"
                        readOnly
                      />
                    </div>
                    <div className="w-full px-3 py-2">
                      <label className="text-xs text-neutral-400">
                        Description
                      </label>
                      <p className="text-xs text-neutral-300">
                        {item.description}
                      </p>
                    </div>
                    <motion.div className="mb-2 flex w-full items-center justify-end px-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setOpenItemId(null)}
                        className="h-7 rounded-lg bg-[#13EEE3]/80 hover:bg-[#13EEE3] hover:text-black text-black"
                      >
                        Close
                      </Button>
                    </motion.div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </LayoutGroup>
          </div>
        )}
      />
    )
  }

  return (
    <div className="md:px-4 w-full max-w-xl">
      <div className="mb-9 rounded-2xl p-2 shadow-sm md:p-6 bg-black">
        <div className="overflow-auto p-1 md:p-4">
          <div className="flex flex-col space-y-2">
            <h3 className="text-neutral-200">Agent workflow</h3>
            <div className="flex items-center justify-between gap-4 py-2">
              <button disabled={items?.length > 5} onClick={handleAddItem}>
                <Plus className="h-5 w-5 text-neutral-500/80 hover:text-white/80" />
              </button>
              <button onClick={handleResetItems}>
                <RepeatIcon className="h-4 w-4 text-neutral-500/80 hover:text-white/80" />
              </button>
            </div>
            <SortableList
              items={items}
              setItems={setItems}
              onCompleteItem={handleCompleteItem}
              renderItem={renderListItem}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortableListDemo
