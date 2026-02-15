"use client";

import { useState } from "react";
import BillingSettings from "./component";

export default function BillingSettingsExample() {
  const [activeTab, setActiveTab] = useState("general");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [usageAlerts, setUsageAlerts] = useState(true);
  const [invoiceReminders, setInvoiceReminders] = useState(false);
  const [invoiceFormat, setInvoiceFormat] = useState<"PDF" | "HTML">("PDF");
  const [overageProtection, setOverageProtection] = useState(true);
  const [usageLimitAlerts, setUsageLimitAlerts] = useState(true);

  return (
    <BillingSettings
      activeTab={activeTab}
      onTabChange={setActiveTab}
      emailNotifications={emailNotifications}
      onEmailNotificationsChange={setEmailNotifications}
      usageAlerts={usageAlerts}
      onUsageAlertsChange={setUsageAlerts}
      invoiceReminders={invoiceReminders}
      onInvoiceRemindersChange={setInvoiceReminders}
      cards={[
        {
          id: "1",
          last4: "4242",
          brand: "Visa",
          expiry: "12/25",
          primary: true,
        },
        {
          id: "2",
          last4: "8888",
          brand: "Mastercard",
          expiry: "06/26",
        },
      ]}
      onAddCard={() => console.log("Add card")}
      invoiceFormat={invoiceFormat}
      onInvoiceFormatChange={setInvoiceFormat}
      onEditBillingAddress={() => console.log("Edit billing address")}
      overageProtection={overageProtection}
      onOverageProtectionChange={setOverageProtection}
      usageLimitAlerts={usageLimitAlerts}
      onUsageLimitAlertsChange={setUsageLimitAlerts}
    />
  );
}
