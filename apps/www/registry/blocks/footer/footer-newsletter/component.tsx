"use client";

import { Facebook, Github, Linkedin, Twitter, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LINKS = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap"],
  Resources: ["Documentation", "API Reference", "Guides", "Blog"],
  Company: ["About Us", "Careers", "Press", "Contact"],
  Support: ["Help Center", "Community", "Status", "Bug Bounty"],
};

const SOCIAL = [
  { icon: Twitter, href: "#" },
  { icon: Facebook, href: "#" },
  { icon: Linkedin, href: "#" },
  { icon: Github, href: "#" },
];

export default function FooterNewsletter() {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h3 className="text-xl font-bold">YourBrand</h3>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="secondary" size="sm" className="gap-2">
              <Globe className="h-4 w-4" />
              English
            </Button>
            <Button variant="secondary" size="sm">
              USD ($)
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {Object.entries(LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 text-sm font-semibold opacity-90">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm opacity-70 transition-opacity hover:opacity-100">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="mb-4 text-sm font-semibold opacity-90">Newsletter</h4>
            <p className="mb-4 text-sm opacity-70">Subscribe for the latest updates.</p>
            <div className="flex gap-2">
              <Input placeholder="your@email.com" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50" />
              <Button variant="secondary" size="sm">Go</Button>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/20 pt-8 md:flex-row">
          <p className="text-sm opacity-60">&copy; {new Date().getFullYear()} YourBrand. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {SOCIAL.map(({ icon: Icon, href }, index) => (
              <a key={index} href={href} className="opacity-60 transition-opacity hover:opacity-100">
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
