"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
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
    tag: "House",
    title: "Shared Coworking",
    desc: "Use border utilities to quickly style the border and border-radius of an element. Great for images, buttons.",
    date: "Posted on 26 May",
    author: {
      img: "/basic-img.png",
      name: "Otto Gonzalez",
    },
  },
  {
    img: "/placeholder.jpg",
    tag: "Office",
    title: "Really Housekeeping",
    desc: "Use border utilities to quickly style the border and border-radius of an element. Great for images, buttons.",
    date: "Posted on 03 May",
    author: {
      img: "/basic-img.png",
      name: "Chriss Smahos",
    },
  },
  {
    img: "/placeholder.jpg",
    tag: "Hub",
    title: "Coworking Office",
    desc: "Use border utilities to quickly style the border and border-radius of an element. Great for images, buttons.",
    date: "Posted on 12 April",
    author: {
      img: "/basic-img.png",
      name: "Elijah Miller",
    },
  },
]

export default function BlogContentCards() {
  return (
    <section className="py-16">
      <div className="container mx-auto grid grid-cols-1 items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
        {POSTS.map(({ img, tag, title, desc, date, author }) => (
          <Card key={title} className="overflow-hidden py-0">
            <CardHeader className="p-4 pb-0">
              <div className="relative h-60 w-full overflow-hidden rounded-lg">
                <img
                  src={img}
                  alt={title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </CardHeader>
            <CardContent className="px-6">
              <Badge variant="secondary" className="mb-2">
                {tag}
              </Badge>
              <CardTitle className="mb-2 text-xl">{title}</CardTitle>
              <CardDescription>{desc}</CardDescription>
            </CardContent>
            <CardFooter className="flex items-center gap-3 p-6 pt-0">
              <Avatar>
                <AvatarImage src={author.img} alt={author.name} />
                <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-0.5">
                <p className="text-sm font-semibold">{author.name}</p>
                <p className="text-muted-foreground text-xs">{date}</p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
