"use client";

import { Facebook, Github, Linkedin, Twitter, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const LINKS = {
  Product: ["Features", "Pricing", "Changelog"],
  Company: ["About", "Blog", "Careers"],
  Legal: ["Privacy", "Terms", "Cookies"],
};

const SOCIAL = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
];

export default function FooterSocial() {
  return (
    <footer className="py-16">
      <div className="container mx-auto px-4">
        <Card className="mb-12 overflow-hidden">
          <CardContent className="flex flex-col items-center justify-between gap-6 p-8 md:flex-row md:p-12">
            <div>
              <h3 className="mb-2 text-2xl font-bold">Stay up to date</h3>
              <p className="text-muted-foreground">Get the latest news and updates delivered to your inbox.</p>
            </div>
            <div className="flex w-full gap-2 md:w-auto">
              <Input placeholder="Enter your email" className="md:w-64" />
              <Button className="gap-2">
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <h3 className="mb-4 text-lg font-bold">YourBrand</h3>
            <div className="flex items-center gap-3">
              {SOCIAL.map(({ icon: Icon, href, label }, index) => (
                <a key={index} href={href} aria-label={label} className="text-muted-foreground transition-colors hover:text-foreground">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 text-sm font-semibold">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-muted-foreground text-sm transition-colors hover:text-foreground">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t pt-8 text-center">
          <p className="text-muted-foreground text-sm">&copy; {new Date().getFullYear()} YourBrand. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
