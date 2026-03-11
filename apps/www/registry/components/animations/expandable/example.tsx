"use client"

import {
  Expandable,
  ExpandableCard,
  ExpandableCardContent,
  ExpandableCardFooter,
  ExpandableCardHeader,
  ExpandableContent,
  ExpandableTrigger,
} from "./component"

export default function ExpandableExample() {
  return (
    <div className="relative flex min-h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-8">
      <Expandable expandDirection="vertical" expandBehavior="replace">
        <ExpandableCard
          collapsedSize={{ width: 340, height: 200 }}
          expandedSize={{ width: 340, height: undefined }}
        >
          <ExpandableTrigger>
            <ExpandableCardHeader>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Expandable Card
                </h3>
                <p className="text-sm text-muted-foreground">
                  Click to expand and see more content
                </p>
              </div>
            </ExpandableCardHeader>
          </ExpandableTrigger>

          <ExpandableCardContent>
            <p className="text-sm text-muted-foreground">
              This is the always-visible content of the card. Click the header
              to reveal more details below.
            </p>
          </ExpandableCardContent>

          <ExpandableContent preset="slide-up">
            <div className="px-4 pb-4">
              <div className="space-y-3">
                <div className="rounded-lg bg-muted p-3">
                  <h4 className="text-sm font-medium text-foreground">
                    Detail Section
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    This content is revealed when the card expands. You can put
                    any content here, including lists, images, or other
                    components.
                  </p>
                </div>
                <div className="rounded-lg bg-muted p-3">
                  <h4 className="text-sm font-medium text-foreground">
                    Another Section
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    The expandable system supports multiple animation presets
                    like fade, slide-up, slide-down, scale, rotate, and blur
                    variants.
                  </p>
                </div>
              </div>
            </div>
          </ExpandableContent>

          <ExpandableCardFooter>
            <ExpandableTrigger>
              <span className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Click to toggle
              </span>
            </ExpandableTrigger>
          </ExpandableCardFooter>
        </ExpandableCard>
      </Expandable>
    </div>
  )
}
