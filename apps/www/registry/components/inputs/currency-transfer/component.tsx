"use client"

import {
  ArrowDownIcon,
  ArrowUpDown,
  ArrowUpIcon,
  Check,
  InfoIcon,
} from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface CurrencyTransferProps {
  fromAmount?: string
  fromCurrency?: string
  fromBank?: string
  toAmount?: string
  toCurrency?: string
  toBank?: string
  completionDelay?: number
}

export default function CurrencyTransfer({
  fromAmount = "500.00 USD",
  fromCurrency = "$",
  fromBank = "Chase Bank ****4589",
  toAmount = "460.00 EUR",
  toCurrency = "\u20AC",
  toBank = "Deutsche Bank ****7823",
  completionDelay = 1500,
}: CurrencyTransferProps) {
  const [isCompleted, setIsCompleted] = useState(false)
  const transactionId = "TXN-DAB3UL494"

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCompleted(true)
    }, completionDelay)
    return () => clearTimeout(timer)
  }, [completionDelay])

  return (
    <div className="mx-auto flex h-[420px] w-full max-w-sm flex-col rounded-xl border border-zinc-200/60 bg-white p-6 shadow-sm transition-all duration-500 hover:border-emerald-500/20 dark:border-zinc-800/60 dark:bg-zinc-900 dark:hover:border-emerald-500/20">
      <div className="flex flex-1 flex-col justify-center space-y-4">
        <div className="flex h-[80px] items-center justify-center">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center"
            initial={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative flex h-[100px] w-[100px] items-center justify-center">
              <AnimatePresence mode="wait">
                {isCompleted ? (
                  <motion.div
                    animate={{ opacity: 1, rotate: 0 }}
                    className="flex h-[100px] w-[100px] items-center justify-center"
                    initial={{ opacity: 0, rotate: -180 }}
                    key="completed"
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <div className="relative z-10 rounded-full border border-emerald-500 bg-white p-5 dark:bg-zinc-900">
                      <Check className="h-10 w-10 text-emerald-500" strokeWidth={3.5} />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    animate={{ opacity: 1 }}
                    className="flex h-[100px] w-[100px] items-center justify-center"
                    exit={{ opacity: 0, rotate: 360 }}
                    initial={{ opacity: 0 }}
                    key="progress"
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <div className="relative z-10">
                      <motion.div
                        animate={{ rotate: 360 }}
                        className="absolute inset-0 rounded-full border-2 border-transparent"
                        style={{
                          borderLeftColor: "rgb(16 185 129)",
                          borderTopColor: "rgb(16 185 129 / 0.2)",
                        }}
                        transition={{
                          rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                        }}
                      />
                      <div className="relative z-10 rounded-full bg-white p-5 shadow-[0_0_15px_rgba(16,185,129,0.1)] dark:bg-zinc-900">
                        <ArrowUpDown className="h-10 w-10 text-emerald-500" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 w-full space-y-2 text-center"
            initial={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <AnimatePresence mode="wait">
              <motion.h2
                animate={{ opacity: 1, y: 0 }}
                className="font-semibold text-lg text-zinc-900 uppercase tracking-tighter dark:text-zinc-100"
                exit={{ opacity: 0, y: -20 }}
                initial={{ opacity: 0, y: 20 }}
                key={isCompleted ? "completed" : "progress"}
                transition={{ duration: 0.5 }}
              >
                {isCompleted ? "Transfer Completed" : "Transfer in Progress"}
              </motion.h2>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="font-medium text-emerald-600 text-xs dark:text-emerald-400"
                exit={{ opacity: 0, y: -10 }}
                initial={{ opacity: 0, y: 10 }}
                key={isCompleted ? "id" : "processing"}
                transition={{ duration: 0.4 }}
              >
                {isCompleted
                  ? `Transaction ID: ${transactionId}`
                  : "Processing Transaction..."}
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 flex items-center gap-4">
              <motion.div
                animate={{ opacity: 1 }}
                className="relative flex-1"
                initial={{ opacity: 0 }}
              >
                <motion.div
                  animate={{ gap: isCompleted ? "0px" : "12px" }}
                  className="relative flex flex-col items-start"
                  initial={{ gap: "12px" }}
                  transition={{ duration: 0.6 }}
                >
                  {/* From */}
                  <div
                    className={cn(
                      "w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 dark:border-zinc-700/50 dark:bg-zinc-800/50",
                      isCompleted ? "rounded-b-none border-b-0" : ""
                    )}
                  >
                    <div className="w-full space-y-1">
                      <span className="flex items-center gap-1.5 font-medium text-xs text-zinc-500 dark:text-zinc-400">
                        <ArrowUpIcon className="h-3 w-3" />
                        From
                      </span>
                      <div className="flex items-center gap-2.5">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-300 bg-white font-medium text-sm text-zinc-900 shadow-lg dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
                          {fromCurrency}
                        </span>
                        <div className="flex flex-col items-start">
                          <span className={cn("font-medium text-zinc-900 tracking-tight dark:text-zinc-100", !isCompleted && "opacity-50")}>
                            {fromAmount}
                          </span>
                          <span className="text-xs text-zinc-500 dark:text-zinc-400">
                            {fromBank}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* To */}
                  <div
                    className={cn(
                      "w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 dark:border-zinc-700/50 dark:bg-zinc-800/50",
                      isCompleted ? "rounded-t-none border-t-0" : ""
                    )}
                  >
                    <div className="w-full space-y-1">
                      <span className="flex items-center gap-1.5 font-medium text-xs text-zinc-500 dark:text-zinc-400">
                        <ArrowDownIcon className="h-3 w-3" />
                        To
                      </span>
                      <div className="flex items-center gap-2.5">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-300 bg-white font-medium text-sm text-zinc-900 shadow-lg dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
                          {toCurrency}
                        </span>
                        <div className="flex flex-col items-start">
                          <span className={cn("font-medium text-zinc-900 tracking-tight dark:text-zinc-100", !isCompleted && "opacity-50")}>
                            {toAmount}
                          </span>
                          <span className="text-xs text-zinc-500 dark:text-zinc-400">
                            {toBank}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              animate={{ opacity: 1 }}
              className="mt-2 flex items-center justify-center gap-2 text-xs text-zinc-500 dark:text-zinc-400"
              initial={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  initial={{ opacity: 0, y: 10 }}
                  key={isCompleted ? "rate" : "calc"}
                  transition={{ duration: 0.4 }}
                >
                  {isCompleted
                    ? "Exchange Rate: 1 USD = 0.92 EUR"
                    : "Calculating exchange rate..."}
                </motion.span>
              </AnimatePresence>
              <InfoIcon className="h-3 w-3 text-zinc-400" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
