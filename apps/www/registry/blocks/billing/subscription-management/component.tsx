"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Calendar, CreditCard, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubscriptionManagementProps {
  className?: string;
  planName?: string;
  planDescription?: string;
  price?: string;
  billingCycle?: string;
  status?: "active" | "inactive" | "past_due" | "cancelled";
  nextBillingDate?: string;
  paymentMethod?: string;
}

export default function SubscriptionManagement({
  className,
  planName = "Pro Plan",
  planDescription = "For companies adding collaboration in production.",
  price = "$20",
  billingCycle = "monthly",
  status = "active",
  nextBillingDate = "January 15, 2025",
  paymentMethod = "Visa ending in 4242",
}: SubscriptionManagementProps) {
  const statusColors = {
    active: "bg-green-100 text-green-700 border-green-200",
    inactive: "bg-gray-100 text-gray-700 border-gray-200",
    past_due: "bg-yellow-100 text-yellow-700 border-yellow-200",
    cancelled: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <Card className={cn("mx-auto w-full max-w-2xl", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Subscription</CardTitle>
            <CardDescription>Manage your subscription and billing</CardDescription>
          </div>
          <Badge className={cn("capitalize", statusColors[status])}>
            {status.replace("_", " ")}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{planName}</h3>
              <p className="text-muted-foreground text-sm">{planDescription}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{price}</p>
              <p className="text-muted-foreground text-sm">/{billingCycle}</p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-lg">
              <Calendar className="text-muted-foreground h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium">Next billing date</p>
              <p className="text-muted-foreground text-sm">{nextBillingDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-lg">
              <CreditCard className="text-muted-foreground h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium">Payment method</p>
              <p className="text-muted-foreground text-sm">{paymentMethod}</p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button className="flex-1 gap-2">
            <ArrowUpRight className="h-4 w-4" />
            Upgrade Plan
          </Button>
          <Button variant="outline" className="flex-1">
            Cancel Subscription
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
