"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const NOTIFICATIONS = [
  { id: "marketing", label: "Marketing emails", description: "Receive emails about new products, features, and more.", email: true, push: false, sms: false },
  { id: "social", label: "Social notifications", description: "Receive notifications for friend requests, follows, and mentions.", email: true, push: true, sms: false },
  { id: "security", label: "Security alerts", description: "Receive alerts about unusual account activity.", email: true, push: true, sms: true },
  { id: "updates", label: "Product updates", description: "Receive updates about product changes and new features.", email: true, push: false, sms: false },
  { id: "billing", label: "Billing notifications", description: "Receive notifications about your billing and subscription.", email: true, push: true, sms: false },
];

export default function AccountNotifications() {
  const [settings, setSettings] = useState(
    NOTIFICATIONS.reduce((acc, n) => ({
      ...acc,
      [n.id]: { email: n.email, push: n.push, sms: n.sms },
    }), {} as Record<string, { email: boolean; push: boolean; sms: boolean }>)
  );

  const toggle = (id: string, channel: "email" | "push" | "sms") => {
    setSettings((prev) => ({
      ...prev,
      [id]: { ...prev[id], [channel]: !prev[id][channel] },
    }));
  };

  return (
    <section className="py-10">
      <div className="container mx-auto max-w-3xl px-4">
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Choose how you want to be notified.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm">
                    <th className="pb-3 font-medium">Notification</th>
                    <th className="pb-3 text-center font-medium">Email</th>
                    <th className="pb-3 text-center font-medium">Push</th>
                    <th className="pb-3 text-center font-medium">SMS</th>
                  </tr>
                </thead>
                <tbody>
                  {NOTIFICATIONS.map((notification) => (
                    <tr key={notification.id} className="border-b last:border-0">
                      <td className="py-4">
                        <p className="font-medium">{notification.label}</p>
                        <p className="text-muted-foreground text-sm">{notification.description}</p>
                      </td>
                      <td className="py-4 text-center">
                        <Switch checked={settings[notification.id]?.email} onCheckedChange={() => toggle(notification.id, "email")} />
                      </td>
                      <td className="py-4 text-center">
                        <Switch checked={settings[notification.id]?.push} onCheckedChange={() => toggle(notification.id, "push")} />
                      </td>
                      <td className="py-4 text-center">
                        <Switch checked={settings[notification.id]?.sms} onCheckedChange={() => toggle(notification.id, "sms")} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex justify-end">
              <Button>Save Preferences</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
