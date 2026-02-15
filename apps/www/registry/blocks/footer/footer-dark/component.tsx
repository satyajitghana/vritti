"use client";

import { Facebook, Github, Linkedin, Twitter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LINKS = {
  Product: ["Features", "Pricing", "Changelog", "Documentation"],
  Company: ["About", "Blog", "Careers", "Press"],
  Legal: ["Privacy", "Terms", "Security", "Cookies"],
};

const SOCIAL = [
  { icon: Twitter, href: "#" },
  { icon: Facebook, href: "#" },
  { icon: Linkedin, href: "#" },
  { icon: Github, href: "#" },
];

export default function FooterDark() {
  return (
    <footer className="bg-gray-900 py-16 text-gray-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <h3 className="mb-4 text-lg font-bold text-white">YourBrand</h3>
            <p className="mb-6 max-w-sm text-sm text-gray-400">
              Building beautiful experiences for the modern web. Subscribe to our
              newsletter for updates.
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="your@email.com"
                className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
          {Object.entries(LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 font-semibold text-white">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-400 transition-colors hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 md:flex-row">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {SOCIAL.map(({ icon: Icon, href }, index) => (
              <a key={index} href={href} className="text-gray-500 transition-colors hover:text-white">
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
