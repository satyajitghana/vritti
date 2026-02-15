"use client";

import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    role: "Product Designer",
    image: "https://images.unsplash.com/photo-1716662318479-a9c0f1cd1a0e?auto=format&fit=crop&q=80&w=400&h=400",
    quote: "An exceptional design tool that has revolutionized our workflow. The components are beautifully crafted and highly customizable.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Tech Lead at Stripe",
    image: "https://images.unsplash.com/photo-1623853434105-8e7a72898180?auto=format&fit=crop&q=80&w=400&h=400",
    quote: "The best component library I've used. TypeScript support is flawless and the documentation is comprehensive. Our team's productivity doubled.",
    rating: 5,
  },
  {
    name: "Emma Rodriguez",
    role: "Frontend Developer",
    image: "https://images.unsplash.com/photo-1641906840000-4b88f1d44de6?auto=format&fit=crop&q=80&w=400&h=400",
    quote: "Production-ready components with excellent accessibility. The design system is cohesive and makes building consistent UIs effortless.",
    rating: 4,
  },
];

export default function TestimonialRatings() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Customer Reviews</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            See what our customers have to say about their experience with our products.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <Card key={index} className="text-center">
              <CardContent className="flex flex-col items-center px-8 py-10">
                <Avatar className="mb-6 h-20 w-20">
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback>
                    {testimonial.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="mb-4 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`}
                    />
                  ))}
                </div>
                <blockquote className="text-muted-foreground mb-6 text-sm leading-relaxed">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-muted-foreground text-sm">{testimonial.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
