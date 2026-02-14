"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const TECHNOLOGIES = ["React", "TypeScript", "Node.js", "Python", "Go", "Rust", "GraphQL", "Docker"];

export default function ModalProfile() {
  const [open, setOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState<string[]>(["React", "TypeScript"]);
  const [notifications, setNotifications] = useState(true);

  return (
    <section className="flex min-h-[400px] items-center justify-center py-10">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>Make changes to your profile here.</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="https://images.unsplash.com/photo-1716662318479-a9c0f1cd1a0e?auto=format&fit=crop&q=80&w=200" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">Change Photo</Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@johndoe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" rows={3} defaultValue="Full-stack developer passionate about open source." />
            </div>
            <div className="space-y-2">
              <Label>Technologies</Label>
              <div className="flex flex-wrap gap-2">
                {TECHNOLOGIES.map((tech) => (
                  <Badge
                    key={tech}
                    variant={selectedTech.includes(tech) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() =>
                      setSelectedTech((prev) =>
                        prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
                      )
                    }
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="text-sm font-medium">Email Notifications</p>
                <p className="text-muted-foreground text-xs">Receive email about activity.</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
