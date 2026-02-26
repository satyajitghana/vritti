"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const POSTS = [
  {
    img: "/placeholder.jpg",
    tag: "Enterprise",
    title: "Autodesk looks to future of 3D printing with Project",
    desc: "Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens bed design but the back is too high for the beams and angle of the ceiling.",
    date: "10 September 2022",
    author: {
      img: "/basic-img.png",
      name: "Ryan Samuel",
    },
  },
  {
    img: "/placeholder.jpg",
    tag: "Startups",
    title: "Lyft launching cross-platform service this week",
    desc: "Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens bed design but the back is too high for the beams and angle of the ceiling.",
    date: "12 September 2022",
    author: {
      img: "/basic-img.png",
      name: "Nora Hazel",
    },
  },
  {
    img: "/placeholder.jpg",
    tag: "Trending",
    title: "6 insights into the French Fashion landscape",
    desc: "Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens bed design but the back is too high for the beams and angle of the ceiling.",
    date: "16 September 2022",
    author: {
      img: "/basic-img.png",
      name: "Otto Gonzalez",
    },
  },
  {
    img: "/placeholder.jpg",
    tag: "Lifestyle",
    title: "Autodesk looks to future of 3D printing with Project",
    desc: "Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens bed design but the back is too high for the beams and angle of the ceiling.",
    date: "18 September 2022",
    author: {
      img: "/basic-img.png",
      name: "Ryan Samuel",
    },
  },
]

export default function BlogRectangular() {
  return (
    <section className="py-16">
      <div className="container my-auto grid grid-cols-1 gap-8 lg:grid-cols-2">
        {POSTS.map(({ img, tag, title, desc, date, author }) => (
          <div key={title} className="grid items-center gap-4 sm:grid-cols-2">
            <div className="h-full max-h-72 overflow-hidden rounded-lg lg:max-h-full">
              <img
                src={img}
                alt={title}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="space-y-4 p-2">
              <Badge variant="secondary">{tag}</Badge>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-muted-foreground text-sm">{desc}</p>
              <div className="mt-6 flex items-center gap-3 md:mt-8">
                <Avatar>
                  <AvatarImage src={author.img} alt={author.name} />
                  <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="mb-1 text-sm font-semibold">{author.name}</p>
                  <p className="text-muted-foreground text-xs">{date}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
