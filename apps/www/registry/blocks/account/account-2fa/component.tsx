"use client";

import { useState } from "react";
import { Shield, Smartphone, Mail, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const METHODS = [
  {
    id: "authenticator",
    icon: Smartphone,
    title: "Authenticator App",
    description: "Use an authenticator app to generate one-time codes.",
    recommended: true,
  },
  {
    id: "sms",
    icon: Mail,
    title: "SMS Verification",
    description: "Receive a verification code via text message.",
    recommended: false,
  },
  {
    id: "security-key",
    icon: Key,
    title: "Security Key",
    description: "Use a physical security key for authentication.",
    recommended: false,
  },
];

export default function Account2fa() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    authenticator: true,
    sms: false,
    "security-key": false,
  });

  return (
    <section className="py-10">
      <div className="container mx-auto max-w-3xl px-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                <Shield className="text-primary h-5 w-5" />
              </div>
              <div>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {METHODS.map((method) => (
              <div key={method.id} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-lg">
                    <method.icon className="text-muted-foreground h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{method.title}</p>
                      {method.recommended && (
                        <Badge variant="secondary" className="text-xs">Recommended</Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm">{method.description}</p>
                  </div>
                </div>
                <Switch
                  checked={enabled[method.id]}
                  onCheckedChange={(checked) =>
                    setEnabled((prev) => ({ ...prev, [method.id]: checked }))
                  }
                />
              </div>
            ))}
            <div className="flex justify-end">
              <Button>Save Settings</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
