'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Heart, Star, Filter, Search } from 'lucide-react';

export function EcommercePreview() {
  const products = [
    {
      name: 'Premium Headphones',
      price: 299.99,
      rating: 4.5,
      reviews: 128,
      badge: 'Best Seller',
      description: 'High-quality wireless headphones with noise cancellation',
    },
    {
      name: 'Smart Watch Pro',
      price: 399.99,
      rating: 4.8,
      reviews: 256,
      badge: 'New',
      description: 'Advanced fitness tracking and health monitoring',
    },
    {
      name: 'Wireless Earbuds',
      price: 149.99,
      rating: 4.3,
      reviews: 89,
      badge: 'Sale',
      description: 'Compact design with crystal clear sound',
    },
    {
      name: 'Portable Speaker',
      price: 199.99,
      rating: 4.6,
      reviews: 145,
      badge: 'Featured',
      description: 'Waterproof bluetooth speaker with 20h battery',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold">Shop</h2>
        <p className="text-muted-foreground">Discover our latest products</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search products..." className="pl-10" />
        </div>
        <Select defaultValue="popular">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {products.map((product, idx) => (
          <Card key={idx} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between">
                <Badge variant="secondary">{product.badge}</Badge>
                <Button variant="ghost" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Product Image Placeholder */}
              <div className="aspect-square rounded-lg bg-muted flex items-center justify-center">
                <ShoppingCart className="h-16 w-16 text-muted-foreground" />
              </div>

              <div className="space-y-2">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-primary text-primary'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">${product.price}</span>
                  <Button size="sm">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cart Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Shopping Cart</CardTitle>
          <CardDescription>2 items in your cart</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span>Subtotal</span>
            <span className="font-medium">$599.98</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Shipping</span>
            <span className="font-medium">$9.99</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Tax</span>
            <span className="font-medium">$48.00</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="font-semibold">Total</span>
            <span className="text-2xl font-bold">$657.97</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" size="lg">
            Proceed to Checkout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
