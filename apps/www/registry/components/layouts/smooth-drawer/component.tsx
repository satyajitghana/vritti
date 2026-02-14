"use client"

import { Fingerprint } from "lucide-react"
import { motion } from "motion/react"
import type * as React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface PriceTagProps {
  price: number
  discountedPrice: number
}

function PriceTag({ price, discountedPrice }: PriceTagProps) {
  return (
    <div className="mx-auto flex max-w-fit items-center justify-around gap-4">
      <div className="flex items-baseline gap-2">
        <span className="bg-gradient-to-br from-zinc-900 to-zinc-700 bg-clip-text font-bold text-4xl text-transparent dark:from-white dark:to-zinc-300">
          ${discountedPrice}
        </span>
        <span className="text-lg text-zinc-400 line-through dark:text-zinc-500">
          ${price}
        </span>
      </div>
      <div className="flex flex-col items-center gap-0.5">
        <span className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
          Lifetime access
        </span>
        <span className="text-xs text-zinc-700 dark:text-zinc-300">
          One-time payment
        </span>
      </div>
    </div>
  )
}

interface SmoothDrawerProps {
  title?: string
  description?: string
  primaryButtonText?: string
  secondaryButtonText?: string
  onPrimaryAction?: () => void
  onSecondaryAction?: () => void
  price?: number
  discountedPrice?: number
}

const drawerVariants = {
  hidden: {
    y: "100%",
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 0.8,
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: {
    y: 20,
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 0.8,
    },
  },
}

export default function SmoothDrawer({
  title = "Premium Plan",
  description = "Get access to all premium features and components. Build faster with ready-made templates and UI elements.",
  primaryButtonText = "Buy Now",
  secondaryButtonText = "Maybe Later",
  onPrimaryAction,
  onSecondaryAction,
  price = 169,
  discountedPrice = 99,
}: SmoothDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
      >
        Open Drawer
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            animate="visible"
            initial="hidden"
            variants={drawerVariants}
            className="relative z-10 mx-auto w-full max-w-[400px] rounded-t-2xl bg-white p-6 shadow-xl dark:bg-zinc-900"
          >
            <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <div className="space-y-6">
              <motion.div variants={itemVariants}>
                <div className="space-y-2.5">
                  <h2 className="font-semibold text-2xl tracking-tighter text-zinc-900 dark:text-white">
                    {title}
                  </h2>
                  <p className="text-sm text-zinc-600 leading-relaxed tracking-tighter dark:text-zinc-400">
                    {description}
                  </p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <PriceTag
                  discountedPrice={discountedPrice}
                  price={price}
                />
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    onPrimaryAction?.()
                    setIsOpen(false)
                  }}
                  className="group relative inline-flex h-11 w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 font-semibold text-sm text-white tracking-wide shadow-lg transition-all duration-500 hover:from-rose-600 hover:to-pink-600"
                >
                  <span className="relative flex items-center gap-2 tracking-tighter">
                    {primaryButtonText}
                    <Fingerprint className="h-4 w-4" />
                  </span>
                </button>
                <button
                  onClick={() => {
                    onSecondaryAction?.()
                    setIsOpen(false)
                  }}
                  className="h-11 w-full rounded-xl border border-zinc-200 font-semibold text-sm tracking-tighter transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800/80"
                >
                  {secondaryButtonText}
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}
