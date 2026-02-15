"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface SoftwarePurchaseCardProps {
  softwareName: string
  startDate: string
  seats: number
  pricingType: string
  price: string
  onApprove?: () => void
  onDiscard?: () => void
}

function SoftwarePurchaseCard({
  softwareName,
  startDate,
  seats,
  pricingType,
  price,
  onApprove,
  onDiscard,
}: SoftwarePurchaseCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{softwareName}</CardTitle>
        <p className="text-sm text-muted-foreground">Purchase Summary</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Start Date</span>
          <span className="text-sm font-medium">{startDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Seats</span>
          <span className="text-sm font-medium">{seats}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Pricing</span>
          <Badge variant="outline">{pricingType}</Badge>
        </div>
        <Separator />
        <div className="flex justify-between">
          <span className="font-semibold">Monthly Cost</span>
          <span className="font-semibold">{price}</span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" className="flex-1" onClick={onDiscard}>
          Discard
        </Button>
        <Button className="flex-1" onClick={onApprove}>
          Approve
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function SoftwarePurchase() {
  const handleApprove = () => {
    console.log("Purchase approved")
  }

  const handleDiscard = () => {
    console.log("Purchase discarded")
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6">
      <div className="flex w-full max-w-6xl flex-col gap-8 lg:flex-row">
        <div className="flex flex-1 flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Software Purchase Request</h1>
            <p className="text-muted-foreground">
              Review and approve the software purchase details below
            </p>
          </div>

          <Separator />

          <div className="flex flex-col gap-6">
            <div>
              <h2 className="mb-4 text-xl font-semibold">Purchase Details</h2>
              <div className="grid gap-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium">Software Name</span>
                  <span className="text-muted-foreground">Enterprise Cloud Suite</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium">Vendor</span>
                  <span className="text-muted-foreground">CloudTech Solutions Inc.</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium">License Type</span>
                  <span className="text-muted-foreground">Commercial License</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium">Contract Duration</span>
                  <span className="text-muted-foreground">12 months</span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="mb-4 text-xl font-semibold">Billing Information</h2>
              <div className="grid gap-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium">Annual Total</span>
                  <span className="text-muted-foreground font-semibold">$30,000</span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="mb-4 text-xl font-semibold">Additional Information</h2>
              <div className="grid gap-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium">Status</span>
                  <Badge variant="secondary" className="w-fit">Pending Approval</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start justify-center lg:sticky lg:top-6 lg:h-fit lg:w-[400px]">
          <SoftwarePurchaseCard
            softwareName="Enterprise Cloud Suite"
            startDate="2025-01-15"
            seats={50}
            pricingType="per-seat"
            price="$2,500"
            onApprove={handleApprove}
            onDiscard={handleDiscard}
          />
        </div>
      </div>
    </div>
  )
}
