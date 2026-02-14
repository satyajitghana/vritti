"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    role: "Product Designer",
    image: "https://images.unsplash.com/photo-1716662318479-a9c0f1cd1a0e?auto=format&fit=crop&q=80&w=400&h=400",
    quote: "The attention to detail and component quality is outstanding. These UI blocks have significantly accelerated our design workflow.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Tech Lead at Stripe",
    image: "https://images.unsplash.com/photo-1623853434105-8e7a72898180?auto=format&fit=crop&q=80&w=400&h=400",
    quote: "Exceptional component library with excellent documentation. The customization options and TypeScript support make it perfect for enterprise applications.",
    rating: 5,
  },
  {
    name: "Emma Rodriguez",
    role: "Frontend Developer",
    image: "https://images.unsplash.com/photo-1641906840000-4b88f1d44de6?auto=format&fit=crop&q=80&w=400&h=400",
    quote: "A game-changer for rapid prototyping and production. The components are production-ready, well-tested, and the design system is incredibly cohesive.",
    rating: 5,
  },
];

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const testimonial = TESTIMONIALS[current];

  return (
    <section className="bg-gray-900 py-20 text-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 flex items-center justify-center gap-1">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <blockquote className="mb-10 text-xl leading-relaxed text-gray-200 md:text-2xl">
            &quot;{testimonial.quote}&quot;
          </blockquote>
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-white/20">
              <AvatarImage src={testimonial.image} alt={testimonial.name} />
              <AvatarFallback className="bg-gray-700">
                {testimonial.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold">{testimonial.name}</p>
              <p className="text-gray-400">{testimonial.role}</p>
            </div>
          </div>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="border-white/20 bg-transparent text-white hover:bg-white/10"
              onClick={() => setCurrent((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 w-2 rounded-full transition-all ${i === current ? "w-6 bg-white" : "bg-white/30"}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="border-white/20 bg-transparent text-white hover:bg-white/10"
              onClick={() => setCurrent((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1))}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
