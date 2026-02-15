"use client";

import { Button } from "@/components/ui/button";

const LINKS = {
  Product: ["Overview", "Features", "Pricing", "Integrations"],
  Resources: ["Documentation", "Guides", "API Reference", "Blog"],
  Company: ["About", "Careers", "Press", "Partners"],
  Support: ["Help Center", "Contact Us", "Status", "Community"],
};

export default function FooterLinks() {
  return (
    <footer className="border-t py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          <div>
            <h3 className="mb-2 text-lg font-bold">YourBrand</h3>
            <p className="text-muted-foreground max-w-xs text-sm">
              Empowering teams to build better products faster.
            </p>
            <Button variant="outline" className="mt-4" size="sm">
              Sign In
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(LINKS).map(([category, links]) => (
              <div key={category}>
                <h4 className="mb-4 text-sm font-semibold">{category}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-muted-foreground text-sm transition-colors hover:text-foreground">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} YourBrand Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
