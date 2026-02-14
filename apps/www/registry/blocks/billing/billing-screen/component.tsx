"use client";

import {
  CreditCard,
  Calendar,
  ArrowUpRight,
  Download,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function BillingScreen({ className }: { className?: string }) {
  return (
    <div className={cn("mx-auto max-w-4xl space-y-6 px-4 py-8", className)}>
      <div>
        <h1 className="text-3xl font-bold">Billing</h1>
        <p className="text-muted-foreground">
          Manage your subscription, payment methods, and billing history.
        </p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>
                You are currently on the Pro plan.
              </CardDescription>
            </div>
            <Badge className="bg-green-100 text-green-700">Active</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-2xl font-bold">$20/month</p>
              <p className="text-muted-foreground text-sm">
                Billed monthly. Next billing date: Jan 15, 2025
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Cancel Plan
              </Button>
              <Button size="sm" className="gap-1">
                <ArrowUpRight className="h-4 w-4" />
                Upgrade
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Usage This Month
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>API Requests</span>
              <span className="font-medium">8,432 / 10,000</span>
            </div>
            <Progress value={84} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Storage</span>
              <span className="font-medium">3.2 GB / 10 GB</span>
            </div>
            <Progress value={32} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Team Members</span>
              <span className="font-medium">5 / 10</span>
            </div>
            <Progress value={50} />
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Method
            </CardTitle>
            <Button variant="outline" size="sm">
              Update
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="bg-muted flex h-12 w-16 items-center justify-center rounded-lg">
              <CreditCard className="text-muted-foreground h-6 w-6" />
            </div>
            <div>
              <p className="font-medium">Visa ending in 4242</p>
              <p className="text-muted-foreground text-sm">Expires 12/2026</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Invoices */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Invoices
            </CardTitle>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {[
              { date: "Dec 1, 2024", amount: "$20.00", status: "Paid" },
              { date: "Nov 1, 2024", amount: "$20.00", status: "Paid" },
              { date: "Oct 1, 2024", amount: "$20.00", status: "Paid" },
            ].map((invoice, index) => (
              <div key={index}>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium">Pro Plan - Monthly</p>
                    <p className="text-muted-foreground text-xs">
                      {invoice.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">
                      {invoice.amount}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {invoice.status}
                    </Badge>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                {index < 2 && <Separator />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
