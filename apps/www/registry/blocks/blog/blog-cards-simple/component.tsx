"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const POSTS = [
  {
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    tag: "Development",
    title: "Building Scalable Web Applications",
    description: "Learn the best practices for building scalable and maintainable web applications using modern frameworks.",
    author: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1716662318479-a9c0f1cd1a0e?auto=format&fit=crop&q=80&w=100",
    date: "Dec 15, 2024",
  },
  {
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    tag: "Design",
    title: "The Future of UI Design Systems",
    description: "Explore how design systems are evolving and what this means for the future of digital product design.",
    author: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1623853434105-8e7a72898180?auto=format&fit=crop&q=80&w=100",
    date: "Dec 10, 2024",
  },
  {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    tag: "Analytics",
    title: "Data-Driven Decision Making",
    description: "How to leverage analytics and data insights to make better business decisions and improve product outcomes.",
    author: "Emma Rodriguez",
    avatar: "https://images.unsplash.com/photo-1641906840000-4b88f1d44de6?auto=format&fit=crop&q=80&w=100",
    date: "Dec 5, 2024",
  },
];

export default function BlogCardsSimple() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold">Latest from the Blog</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Insights, tutorials, and updates from our team.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((post, index) => (
            <Card key={index} className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg">
              <div className="aspect-video overflow-hidden">
                <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
              </div>
              <CardContent className="p-6">
                <Badge variant="secondary" className="mb-3">{post.tag}</Badge>
                <h3 className="mb-2 text-xl font-semibold">{post.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm">{post.description}</p>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={post.avatar} alt={post.author} />
                    <AvatarFallback>{post.author.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">{post.author}</span>
                    <span className="text-muted-foreground">&middot;</span>
                    <span className="text-muted-foreground">{post.date}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
