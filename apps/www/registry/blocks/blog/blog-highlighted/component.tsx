"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const FEATURED = {
  image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
  tag: "Featured",
  title: "The Complete Guide to Modern Web Development in 2025",
  description: "Everything you need to know about building modern web applications, from frameworks to deployment strategies.",
  date: "Dec 15, 2024",
  readTime: "15 min read",
};

const POSTS = [
  {
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600",
    tag: "Design",
    title: "Component-Driven Development",
    date: "Dec 10, 2024",
  },
  {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
    tag: "Analytics",
    title: "Measuring What Matters",
    date: "Dec 5, 2024",
  },
  {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    tag: "Engineering",
    title: "Performance Optimization Tips",
    date: "Nov 28, 2024",
  },
];

export default function BlogHighlighted() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold">From the Blog</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            The latest insights and stories from our team.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="group cursor-pointer overflow-hidden transition-all hover:shadow-xl">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={FEATURED.image} alt={FEATURED.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 p-6 text-white">
                <Badge className="mb-3 bg-white/20 text-white backdrop-blur">{FEATURED.tag}</Badge>
                <h3 className="mb-2 text-2xl font-bold">{FEATURED.title}</h3>
                <p className="mb-3 text-sm text-white/80">{FEATURED.description}</p>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <span>{FEATURED.date}</span>
                  <span>&middot;</span>
                  <span>{FEATURED.readTime}</span>
                </div>
              </div>
            </div>
          </Card>
          <div className="flex flex-col gap-6">
            {POSTS.map((post, index) => (
              <Card key={index} className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg">
                <div className="grid grid-cols-[120px_1fr] sm:grid-cols-[160px_1fr]">
                  <div className="overflow-hidden">
                    <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                  </div>
                  <CardContent className="flex flex-col justify-center p-4">
                    <Badge variant="secondary" className="mb-2 w-fit">{post.tag}</Badge>
                    <h3 className="mb-1 font-semibold">{post.title}</h3>
                    <p className="text-muted-foreground text-xs">{post.date}</p>
                    <a href="#" className="text-primary mt-2 flex items-center gap-1 text-sm font-medium">
                      Read more <ArrowRight className="h-3 w-3" />
                    </a>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
