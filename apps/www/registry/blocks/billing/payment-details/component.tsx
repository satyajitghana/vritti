"use client";

import { useState } from "react";
import { CreditCard, Shield, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PaymentDetails({ className }: { className?: string }) {
  const [cardNumber, setCardNumber] = useState("");

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 16);
    return numbers.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  return (
    <Card className={cn("mx-auto w-full max-w-2xl", className)}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
            <CreditCard className="text-primary h-5 w-5" />
          </div>
          <div>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>
              Add your payment information securely
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <Label htmlFor="cardName">Cardholder Name</Label>
            <Input id="cardName" placeholder="John Doe" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <div className="relative">
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) =>
                  setCardNumber(formatCardNumber(e.target.value))
                }
                maxLength={19}
              />
              <CreditCard className="text-muted-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input id="expiry" placeholder="MM/YY" maxLength={5} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" placeholder="123" maxLength={4} type="password" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="billingAddress">Billing Address</Label>
            <Input id="billingAddress" placeholder="123 Main Street" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="New York" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" placeholder="NY" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP</Label>
              <Input id="zip" placeholder="10001" />
            </div>
          </div>

          <div className="bg-muted/50 flex items-start gap-3 rounded-lg border p-4">
            <Shield className="mt-0.5 h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm font-medium">Secure Payment</p>
              <p className="text-muted-foreground text-xs">
                Your payment information is encrypted and stored securely.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 gap-2">
              <Check className="h-4 w-4" />
              Save Payment Method
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
