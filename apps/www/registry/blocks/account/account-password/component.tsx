"use client";

import { useState } from "react";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const REQUIREMENTS = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { label: "One number", test: (p: string) => /[0-9]/.test(p) },
  { label: "One special character", test: (p: string) => /[!@#$%^&*]/.test(p) },
];

export default function AccountPassword() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  return (
    <section className="py-10">
      <div className="container mx-auto max-w-3xl px-4">
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Update your password to keep your account secure.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative">
                  <Input id="current-password" type={showCurrent ? "text" : "password"} placeholder="Enter current password" />
                  <button type="button" className="absolute top-1/2 right-3 -translate-y-1/2" onClick={() => setShowCurrent(!showCurrent)}>
                    {showCurrent ? <EyeOff className="text-muted-foreground h-4 w-4" /> : <Eye className="text-muted-foreground h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Input id="new-password" type={showNew ? "text" : "password"} placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                  <button type="button" className="absolute top-1/2 right-3 -translate-y-1/2" onClick={() => setShowNew(!showNew)}>
                    {showNew ? <EyeOff className="text-muted-foreground h-4 w-4" /> : <Eye className="text-muted-foreground h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" placeholder="Confirm new password" />
              </div>
              {newPassword && (
                <div className="space-y-2 rounded-lg border p-4">
                  <p className="text-sm font-medium">Password Requirements</p>
                  <ul className="space-y-1">
                    {REQUIREMENTS.map((req, index) => {
                      const met = req.test(newPassword);
                      return (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          {met ? <Check className="h-3.5 w-3.5 text-green-500" /> : <X className="text-muted-foreground h-3.5 w-3.5" />}
                          <span className={met ? "text-green-600" : "text-muted-foreground"}>{req.label}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              <div className="flex justify-end gap-3">
                <Button variant="outline">Cancel</Button>
                <Button>Update Password</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
