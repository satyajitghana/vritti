"use client"

import { motion } from "motion/react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface Specification {
  label: string
  value: string
}

interface Product {
  id: string
  title: string
  subtitle: string
  image: string
  specs: Specification[]
}

const defaultProducts: Product[] = [
  {
    id: "instant-pay",
    title: "Quick Pay",
    subtitle: "Instant Transfers",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80",
    specs: [
      { label: "Speed", value: "Instant" },
      { label: "Security", value: "256-bit" },
      { label: "Limit", value: "$50,000" },
      { label: "Fee", value: "0.5%" },
    ],
  },
  {
    id: "crypto-pay",
    title: "Crypto Pay",
    subtitle: "Web3 Payments",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80",
    specs: [
      { label: "Network", value: "Multi-chain" },
      { label: "Gas", value: "Optimized" },
      { label: "Support", value: "24/7" },
      { label: "Security", value: "Top-tier" },
    ],
  },
  {
    id: "business-pay",
    title: "Business Pay",
    subtitle: "Enterprise Solutions",
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80",
    specs: [
      { label: "Volume", value: "Unlimited" },
      { label: "API", value: "REST/SDK" },
      { label: "Support", value: "Premium" },
      { label: "Features", value: "Custom" },
    ],
  },
  {
    id: "global-pay",
    title: "Global Pay",
    subtitle: "International Transfers",
    image:
      "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=800&auto=format&fit=crop&q=80",
    specs: [
      { label: "Countries", value: "180+" },
      { label: "FX Rate", value: "Real-time" },
      { label: "Speed", value: "Same-day" },
      { label: "Support", value: "Local" },
    ],
  },
]

interface CardProps {
  product: Product
  index: number
  totalCards: number
  isExpanded: boolean
}

const Card = ({ product, index, totalCards, isExpanded }: CardProps) => {
  const centerOffset = (totalCards - 1) * 5
  const defaultX = index * 10 - centerOffset
  const defaultY = index * 2
  const defaultRotate = index * 1.5

  const cardWidth = 320
  const cardOverlap = 240
  const totalExpandedWidth =
    cardWidth + (totalCards - 1) * (cardWidth - cardOverlap)
  const expandedCenterOffset = totalExpandedWidth / 2

  const spreadX =
    index * (cardWidth - cardOverlap) - expandedCenterOffset + cardWidth / 2
  const spreadRotate = index * 5 - (totalCards - 1) * 2.5

  return (
    <motion.div
      animate={{
        x: isExpanded ? spreadX : defaultX,
        y: isExpanded ? 0 : defaultY,
        rotate: isExpanded ? spreadRotate : defaultRotate,
        scale: 1,
        zIndex: totalCards - index,
      }}
      className={cn(
        "absolute inset-0 w-full rounded-2xl p-6",
        "bg-gradient-to-br from-white/40 via-neutral-50/30 to-neutral-100/20",
        "dark:from-neutral-800/40 dark:via-neutral-900/30 dark:to-black/20",
        "border border-white/20 dark:border-neutral-800/20",
        "backdrop-blur-xl backdrop-saturate-150",
        "shadow-[0_8px_20px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_20px_rgb(0,0,0,0.3)]",
        "transition-all duration-500 ease-out",
        "transform-gpu overflow-hidden"
      )}
      initial={{
        x: defaultX,
        y: defaultY,
        rotate: defaultRotate,
        scale: 1,
      }}
      style={{
        maxWidth: "320px",
        transformStyle: "preserve-3d",
        left: "50%",
        marginLeft: "-160px",
        zIndex: totalCards - index,
      }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 30,
        mass: 0.8,
      }}
    >
      <div className="absolute inset-1 rounded-xl border border-neutral-200/50 bg-neutral-50/50 backdrop-blur-sm dark:border-neutral-700/50 dark:bg-neutral-900/50" />

      <div className="relative z-10">
        <dl className="mb-4 grid grid-cols-4 justify-center gap-2">
          {product.specs.map((spec) => (
            <div
              className="flex flex-col items-start text-left text-[10px] backdrop-blur-sm"
              key={spec.label}
            >
              <dd className="w-full text-left font-medium text-gray-500 dark:text-gray-400">
                {spec.value}
              </dd>
              <dt className="mb-0.5 w-full text-left text-gray-900 dark:text-gray-100">
                {spec.label}
              </dt>
            </div>
          ))}
        </dl>

        <div
          className={cn(
            "aspect-[16/11] w-full overflow-hidden rounded-lg",
            "bg-neutral-100 dark:bg-neutral-900",
            "border border-neutral-200/50 dark:border-neutral-700/50",
            "shadow-inner"
          )}
        >
          <img
            alt={product.title}
            className="h-full w-full object-cover"
            loading="lazy"
            src={product.image}
          />
        </div>

        <div className="mt-4">
          <div className="space-y-1">
            <h2 className="text-left font-bold text-3xl text-gray-900 tracking-tight dark:text-white">
              {product.title}
            </h2>
            <span className="block bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 bg-clip-text text-left font-semibold text-3xl text-transparent tracking-tight dark:from-gray-200 dark:via-white dark:to-gray-300">
              {product.subtitle}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

interface CardStackProps {
  className?: string
  products?: Product[]
}

export default function CardStack({
  className,
  products = defaultProducts,
}: CardStackProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <button
      aria-label="Toggle card stack"
      className={cn(
        "relative mx-auto cursor-pointer",
        "min-h-[440px] w-full max-w-[90vw]",
        "md:max-w-[1200px]",
        "appearance-none border-0 bg-transparent p-0",
        "mb-8 flex items-center justify-center",
        className
      )}
      onClick={() => setIsExpanded(!isExpanded)}
      type="button"
    >
      {products.map((product, index) => (
        <Card
          index={index}
          isExpanded={isExpanded}
          key={product.id}
          product={product}
          totalCards={products.length}
        />
      ))}
    </button>
  )
}
