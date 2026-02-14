"use client"

import { useState } from "react"
import {
  Calendar,
  Clock,
  MapPin,
  ShoppingCart,
  Star,
  Users,
  Video,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Expandable,
  ExpandableCard,
  ExpandableCardContent,
  ExpandableCardFooter,
  ExpandableCardHeader,
  ExpandableContent,
  ExpandableTrigger,
} from "./component"

function DesignSyncExample() {
  return (
    <Expandable
      expandDirection="both"
      expandBehavior="replace"
      initialDelay={0.2}
    >
      {({ isExpanded }) => (
        <ExpandableTrigger>
          <ExpandableCard
            className="w-full relative"
            collapsedSize={{ width: 320, height: 240 }}
            expandedSize={{ width: 420, height: 480 }}
            hoverToExpand={false}
          >
            <ExpandableCardHeader>
              <div className="flex justify-between items-start w-full">
                <div className="flex items-start flex-col">
                  <span className="inline-flex items-center rounded-full bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-100 px-2.5 py-0.5 text-xs font-semibold mb-2">
                    In 15 mins
                  </span>
                  <h3 className="font-semibold text-xl text-gray-800 dark:text-white">
                    Design Sync
                  </h3>
                </div>
                <button className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-border">
                  <Calendar className="h-4 w-4" />
                </button>
              </div>
            </ExpandableCardHeader>

            <ExpandableCardContent>
              <div className="flex flex-col items-start justify-between mb-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>1:30PM - 2:30PM</span>
                </div>
                <ExpandableContent preset="blur-md">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>Conference Room A</span>
                  </div>
                </ExpandableContent>
              </div>
              <ExpandableContent preset="blur-md" stagger staggerChildren={0.2}>
                <p className="text-sm text-gray-700 dark:text-gray-200 mb-4">
                  Weekly design sync to discuss ongoing projects.
                </p>
                <div className="mb-4">
                  <h4 className="font-medium text-sm mb-2 flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Attendees:
                  </h4>
                  <div className="flex -space-x-2">
                    {["A", "B", "C", "D"].map((initial, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded-full bg-muted border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium"
                      >
                        {initial}
                      </div>
                    ))}
                  </div>
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                  <Video className="h-4 w-4 mr-2" />
                  Join Meeting
                </Button>
              </ExpandableContent>
            </ExpandableCardContent>
            <ExpandableContent preset="slide-up">
              <ExpandableCardFooter>
                <div className="flex items-center justify-between w-full text-sm text-gray-600 dark:text-gray-300">
                  <span>Weekly</span>
                  <span>Next: Mon, 10:00 AM</span>
                </div>
              </ExpandableCardFooter>
            </ExpandableContent>
          </ExpandableCard>
        </ExpandableTrigger>
      )}
    </Expandable>
  )
}

function ProductShowcaseCard() {
  return (
    <Expandable expandDirection="both" expandBehavior="replace">
      {({ isExpanded }) => (
        <ExpandableTrigger>
          <ExpandableCard
            className="w-full relative"
            collapsedSize={{ width: 330, height: 220 }}
            expandedSize={{ width: 500, height: 480 }}
            hoverToExpand={false}
          >
            <ExpandableCardHeader>
              <div className="flex justify-between items-center">
                <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-800 px-2.5 py-0.5 text-xs font-semibold">
                  New Arrival
                </span>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ml-2">
                  $129.99
                </span>
              </div>
            </ExpandableCardHeader>

            <ExpandableCardContent>
              <div className="flex items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 dark:text-white tracking-tight text-lg">
                    Sony Headphones
                  </h3>
                  <div className="flex items-center mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      (128 reviews)
                    </span>
                  </div>
                </div>
              </div>
              <ExpandableContent preset="fade" keepMounted={false}>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-xs">
                  Experience crystal-clear audio with our latest noise-cancelling
                  technology.
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </ExpandableContent>
            </ExpandableCardContent>
            <ExpandableContent preset="slide-up">
              <ExpandableCardFooter>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 w-full">
                  <span>Free shipping</span>
                  <span>30-day return</span>
                </div>
              </ExpandableCardFooter>
            </ExpandableContent>
          </ExpandableCard>
        </ExpandableTrigger>
      )}
    </Expandable>
  )
}

export default function ExpandableCardExamples() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-12">
      <div className="flex flex-col items-center space-y-24 p-8">
        <DesignSyncExample />
        <ProductShowcaseCard />
      </div>
    </div>
  )
}
