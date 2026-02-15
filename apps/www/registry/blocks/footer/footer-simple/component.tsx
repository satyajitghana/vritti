"use client";

import { Facebook, Github, Linkedin, Twitter } from "lucide-react";

const SOCIAL_LINKS = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
];

const LINKS = [
  { label: "About Us", href: "#" },
  { label: "License", href: "#" },
  { label: "Contribute", href: "#" },
  { label: "Contact Us", href: "#" },
];

export default function FooterSimple() {
  return (
    <footer className="border-t py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {LINKS.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-muted-foreground text-sm transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }, index) => (
              <a
                key={index}
                href={href}
                aria-label={label}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
