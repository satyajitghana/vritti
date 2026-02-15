"use client";

import LimitedOfferDialog from "./component";

export default function LimitedOfferDialogExample() {
  return (
    <LimitedOfferDialog
      title="Limited Time Offer!"
      description="Grab this deal before it's gone"
      onClaimOffer={async (offerId) => console.log("Claimed:", offerId)}
      onDeclineOffer={async (offerId) => console.log("Declined:", offerId)}
    />
  );
}
