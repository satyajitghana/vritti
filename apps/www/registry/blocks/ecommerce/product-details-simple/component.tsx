"use client";

import { useState } from "react";
import { Heart, Minus, Plus, ShoppingCart, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const SIZES = ["XS", "S", "M", "L", "XL"];
const COLORS = [
  { name: "Black", value: "bg-black" },
  { name: "White", value: "bg-white border" },
  { name: "Navy", value: "bg-blue-900" },
  { name: "Gray", value: "bg-gray-500" },
];

export default function ProductDetailsSimple() {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Black");
  const [quantity, setQuantity] = useState(1);

  return (
    <section className="py-10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800"
                alt="Product"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">New Arrival</Badge>
              <h1 className="text-3xl font-bold">Premium Cotton T-Shirt</h1>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={cn("h-4 w-4", i < 4 ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30")} />
                  ))}
                </div>
                <span className="text-muted-foreground text-sm">(128 reviews)</span>
              </div>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold">$49.99</span>
              <span className="text-muted-foreground text-lg line-through">$79.99</span>
              <Badge className="bg-red-100 text-red-700">-38%</Badge>
            </div>
            <Separator />
            <div>
              <p className="mb-3 font-medium">Color</p>
              <div className="flex gap-3">
                {COLORS.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={cn("h-8 w-8 rounded-full", color.value, selectedColor === color.name && "ring-primary ring-2 ring-offset-2")}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 font-medium">Size</p>
              <div className="flex gap-2">
                {SIZES.map((size) => (
                  <Button key={size} variant={selectedSize === size ? "default" : "outline"} size="sm" onClick={() => setSelectedSize(size)}>
                    {size}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 font-medium">Quantity</p>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1 gap-2">
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-4">
              <Truck className="text-muted-foreground h-5 w-5" />
              <div>
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-muted-foreground text-xs">On orders over $50. Delivered in 3-5 business days.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
