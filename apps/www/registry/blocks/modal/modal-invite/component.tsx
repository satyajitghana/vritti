"use client";

import { useState } from "react";
import { Copy, Mail, UserPlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MEMBERS = [
  { name: "Sarah Johnson", email: "sarah@example.com", role: "Admin", image: "https://images.unsplash.com/photo-1716662318479-a9c0f1cd1a0e?auto=format&fit=crop&q=80&w=100" },
  { name: "Michael Chen", email: "michael@example.com", role: "Editor", image: "https://images.unsplash.com/photo-1623853434105-8e7a72898180?auto=format&fit=crop&q=80&w=100" },
  { name: "Emma Rodriguez", email: "emma@example.com", role: "Viewer", image: "https://images.unsplash.com/photo-1641906840000-4b88f1d44de6?auto=format&fit=crop&q=80&w=100" },
];

export default function ModalInvite() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <section className="flex min-h-[400px] items-center justify-center py-10">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            Invite Team Members
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Invite Team Members</DialogTitle>
            <DialogDescription>Add people to your workspace by email or share a link.</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-9" />
              </div>
              <Select defaultValue="editor">
                <SelectTrigger className="w-[110px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
              <Button>Invite</Button>
            </div>
            <div className="bg-muted/50 flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="text-sm font-medium">Share invite link</p>
                <p className="text-muted-foreground truncate text-xs">https://app.example.com/invite/abc123</p>
              </div>
              <Button variant="ghost" size="sm" className="gap-1">
                <Copy className="h-3.5 w-3.5" />
                Copy
              </Button>
            </div>
            <div>
              <p className="mb-3 text-sm font-medium">Team Members</p>
              <div className="space-y-3">
                {MEMBERS.map((member) => (
                  <div key={member.email} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.image} alt={member.name} />
                        <AvatarFallback>{member.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-muted-foreground text-xs">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">{member.role}</Badge>
                      <Button variant="ghost" size="sm">
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
