"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

interface PaymentCardProps {
  className?: string;
  title?: string;
  description?: string;
  price?: string;
  features?: string[];
}

export default function PaymentCard({
  className,
  title = "Pro Plan",
  description = "Get started with advanced features",
  price = "$20/mo",
  features = [
    "Unlimited projects",
    "Advanced analytics",
    "Priority support",
    "Custom domains",
  ],
}: PaymentCardProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <Card className={cn("mx-auto w-full max-w-md", className)}>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <p className="text-primary mt-2 text-4xl font-bold">{price}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3 text-sm">
              <Check className="text-primary h-4 w-4 flex-none" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {!submitted ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button
              className="w-full gap-2"
              onClick={() => setSubmitted(true)}
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="bg-muted/50 flex flex-col items-center gap-2 rounded-lg border p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <Check className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-sm font-medium">You&apos;re all set!</p>
            <p className="text-muted-foreground text-xs">
              Check your email for next steps.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
