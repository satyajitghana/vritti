"use client";

import CancelSubscriptionDialog from "./component";

export default function CancelSubscriptionDialogExample() {
  return (
    <CancelSubscriptionDialog
      title="Cancel Your Subscription"
      description="We're sorry to see you go. Please review your plan details before cancelling."
      plan={{
        id: "pro",
        title: "Pro",
        currency: "$",
        monthlyPrice: "20",
        features: [
          { name: "Unlimited projects" },
          { name: "Advanced analytics" },
          { name: "Priority support" },
          { name: "Custom domains" },
        ],
      }}
      warningTitle="Before you cancel"
      warningText="You will lose access to all premium features at the end of your current billing period."
      onCancel={async (planId) => console.log("Cancelled plan:", planId)}
      onKeepSubscription={async (planId) => console.log("Kept plan:", planId)}
    />
  );
}
