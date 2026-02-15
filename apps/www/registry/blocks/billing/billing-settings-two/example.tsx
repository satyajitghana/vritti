"use client";

import BillingSettingsTwo from "./component";

export default function BillingSettingsTwoExample() {
  return (
    <BillingSettingsTwo
      onSave={() => console.log("Saved")}
      onCancel={() => console.log("Cancelled")}
    />
  );
}
