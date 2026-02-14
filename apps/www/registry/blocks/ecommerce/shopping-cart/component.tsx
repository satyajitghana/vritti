"use client";

import { useState } from "react";
import { Minus, Plus, Trash2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const INITIAL_ITEMS = [
  { id: 1, name: "Premium Cotton T-Shirt", size: "M", color: "Black", price: 49.99, quantity: 2, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=200" },
  { id: 2, name: "Slim Fit Jeans", size: "32", color: "Blue", price: 89.99, quantity: 1, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=200" },
  { id: 3, name: "Canvas Sneakers", size: "10", color: "White", price: 65.00, quantity: 1, image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=200" },
];

export default function ShoppingCart() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [promoCode, setPromoCode] = useState("");

  const updateQuantity = (id: number, delta: number) => {
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <section className="py-10">
      <div className="container mx-auto max-w-5xl px-4">
        <h1 className="mb-8 text-3xl font-bold">Shopping Cart ({items.length})</h1>
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="flex gap-4 p-4">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-muted-foreground text-sm">Size: {item.size} / Color: {item.color}</p>
                      </div>
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, -1)}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center text-sm">{item.quantity}</span>
                        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, 1)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm" className="text-muted-foreground gap-1 text-xs" onClick={() => removeItem(item.id)}>
                        <Trash2 className="h-3 w-3" /> Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {items.length === 0 && (
              <div className="text-muted-foreground py-20 text-center">Your cart is empty.</div>
            )}
          </div>
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <Input placeholder="Promo code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} className="pl-9" />
                </div>
                <Button variant="outline">Apply</Button>
              </div>
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold"><span>Total</span><span>${total.toFixed(2)}</span></div>
              <Button className="w-full">Proceed to Checkout</Button>
              <p className="text-muted-foreground text-center text-xs">Free shipping on orders over $100</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
