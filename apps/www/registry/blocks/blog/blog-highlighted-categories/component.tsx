"use client"

import { Globe, Heart, Mic, Puzzle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const POSTS = [
  {
    img: "/placeholder.jpg",
    icon: Heart,
    title: "Cultural",
    desc: "257 spots",
  },
  {
    img: "/placeholder.jpg",
    icon: Puzzle,
    title: "Modern Life",
    desc: "117 spots",
  },
  {
    img: "/placeholder.jpg",
    icon: Globe,
    title: "Popularity",
    desc: "363 spots",
  },
  {
    img: "/placeholder.jpg",
    icon: Mic,
    title: "Good Vibes",
    desc: "215 spots",
  },
]

export default function BlogHighlightedCategories() {
  return (
    <section className="container mx-auto py-16">
      <div className="mb-16 grid place-items-center text-center">
        <h2 className="my-4 text-3xl font-bold">Check out what&apos;s new</h2>
        <p className="text-muted-foreground mx-auto max-w-xl">
          We get insulted by others, lose trust for those others. We get back
          freezes every winter
        </p>
      </div>
      <div className="grid grid-cols-1 gap-x-0 gap-y-6 md:grid-cols-3 md:gap-x-6">
        <Card className="bg-primary text-primary-foreground flex flex-col justify-between py-0">
          <CardHeader className="p-6 sm:p-8">
            <p className="block text-center font-semibold opacity-80">
              Landscape
            </p>
          </CardHeader>
          <CardContent className="p-6 sm:p-8">
            <CardTitle className="text-center text-2xl">
              Nature&apos;s Light
            </CardTitle>
            <CardDescription className="py-6 text-center opacity-80">
              It really matters and then like it really doesn&apos;t matter.
              What matters is the people who are sparked by it.
            </CardDescription>
          </CardContent>
          <CardFooter className="p-6 text-center sm:p-8">
            <Button
              size="sm"
              variant="secondary"
              className="bg-background text-foreground hover:bg-background/90"
            >
              Read More
            </Button>
          </CardFooter>
        </Card>
        <div className="col-span-2 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {POSTS.map(({ img, icon: Icon, title, desc }) => (
            <Card
              key={title}
              className="relative grid min-h-48 w-full overflow-hidden border-0 py-0"
            >
              <img
                src={img}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 h-full w-full bg-black/60" />
              <CardContent className="relative flex h-full flex-col justify-between p-6">
                <Icon className="h-8 w-8 stroke-2 text-white" />
                <div className="space-y-0.5">
                  <CardTitle className="text-xl text-white">{title}</CardTitle>
                  <CardDescription className="text-sm text-white/80">
                    {desc}
                  </CardDescription>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
