"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const POSTS = [
  {
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    tag: "Engineering",
    title: "Scaling Our Infrastructure to 1M Users",
    description: "The journey of scaling our platform from thousands to millions of users while maintaining performance.",
    date: "Dec 15, 2024",
    readTime: "8 min read",
  },
  {
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    tag: "Product",
    title: "Introducing Our New Design System",
    description: "We rebuilt our design system from the ground up to improve consistency and developer experience.",
    date: "Dec 10, 2024",
    readTime: "5 min read",
  },
  {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    tag: "Company",
    title: "Our Series B and What It Means",
    description: "We raised $50M in Series B funding. Here is what we plan to do with it.",
    date: "Dec 5, 2024",
    readTime: "4 min read",
  },
  {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    tag: "Tutorial",
    title: "Getting Started with Our API",
    description: "A comprehensive guide to integrating with our REST API in under 10 minutes.",
    date: "Nov 28, 2024",
    readTime: "10 min read",
  },
];

export default function BlogCardsLayout() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="mb-2 text-3xl font-bold">Blog</h2>
            <p className="text-muted-foreground text-lg">Stories, tips, and guides from our team.</p>
          </div>
          <Button variant="outline" className="hidden gap-2 md:flex">
            View All Posts
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {POSTS.map((post, index) => (
            <Card key={index} className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="aspect-video overflow-hidden sm:aspect-auto sm:h-full">
                  <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                </div>
                <CardContent className="flex flex-col justify-center p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <Badge variant="secondary">{post.tag}</Badge>
                    <span className="text-muted-foreground text-xs">{post.readTime}</span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{post.title}</h3>
                  <p className="text-muted-foreground mb-3 text-sm">{post.description}</p>
                  <p className="text-muted-foreground text-xs">{post.date}</p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" className="gap-2">
            View All Posts
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
