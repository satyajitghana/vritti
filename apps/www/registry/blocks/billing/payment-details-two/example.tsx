"use client";

import PaymentDetailsTwo from "./component";

export default function PaymentDetailsTwoExample() {
  return (
    <PaymentDetailsTwo
      onSubmit={(data) => console.log("Submitted:", data)}
      onDiscard={() => console.log("Discarded")}
    />
  );
}
