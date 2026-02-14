"use client";

import { Mail, MapPin, Phone, User } from "lucide-react";

const OPTIONS = [
  { icon: MapPin, title: "Address", description: "12124 First Street, nr 54" },
  { icon: Mail, title: "Email", description: "hello@email.com" },
  { icon: Phone, title: "Phone", description: "+1 (424) 535-3523" },
  { icon: User, title: "Contact", description: "Andrew Samian" },
];

export default function ContactFormMinimal() {
  return (
    <section className="bg-muted/30 relative min-h-[70vh] w-full">
      <div className="bg-primary/5 absolute inset-0" />
      <div className="relative flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
        <h2 className="mb-6 text-5xl font-bold">Got a Question?</h2>
        <p className="text-muted-foreground mx-auto mb-12 max-w-xl text-xl">
          We&apos;d like to talk more about what you need
        </p>
        <div className="grid grid-cols-1 justify-items-center gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {OPTIONS.map(({ icon: Icon, title, description }, key) => (
            <div
              key={key}
              className="group text-center transition-transform hover:scale-105"
            >
              <div className="bg-primary/10 group-hover:bg-primary/20 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl shadow-lg transition-all group-hover:shadow-xl">
                <Icon className="text-primary h-8 w-8" />
              </div>
              <p className="mb-2 text-xl font-bold">{title}</p>
              <p className="text-muted-foreground text-base">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
