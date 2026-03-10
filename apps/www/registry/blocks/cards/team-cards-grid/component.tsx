"use client";

import { motion } from "motion/react";
import { Github, Linkedin, Twitter } from "lucide-react";

import { cn } from "@/lib/utils";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
  gradient: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

const defaultMembers: TeamMember[] = [
  {
    name: "Alex Johnson",
    role: "CEO & Founder",
    bio: "Passionate about building products that make a difference.",
    initials: "AJ",
    gradient: "from-violet-500 to-purple-600",
    social: { twitter: "#", linkedin: "#", github: "#" },
  },
  {
    name: "Sarah Chen",
    role: "Lead Designer",
    bio: "Crafting beautiful interfaces with attention to every detail.",
    initials: "SC",
    gradient: "from-pink-500 to-rose-600",
    social: { twitter: "#", linkedin: "#" },
  },
  {
    name: "Marcus Williams",
    role: "Senior Engineer",
    bio: "Building scalable systems and mentoring the next generation.",
    initials: "MW",
    gradient: "from-blue-500 to-cyan-600",
    social: { github: "#", linkedin: "#" },
  },
  {
    name: "Emily Park",
    role: "Product Manager",
    bio: "Bridging the gap between user needs and technical solutions.",
    initials: "EP",
    gradient: "from-amber-500 to-orange-600",
    social: { twitter: "#", linkedin: "#" },
  },
  {
    name: "David Kim",
    role: "DevOps Lead",
    bio: "Keeping the infrastructure running smoothly at any scale.",
    initials: "DK",
    gradient: "from-emerald-500 to-green-600",
    social: { github: "#" },
  },
  {
    name: "Lisa Torres",
    role: "Marketing Director",
    bio: "Telling compelling stories that connect brands with people.",
    initials: "LT",
    gradient: "from-fuchsia-500 to-pink-600",
    social: { twitter: "#", linkedin: "#" },
  },
];

export interface TeamCardsGridProps {
  className?: string;
  members?: TeamMember[];
}

export default function TeamCardsGrid({
  className,
  members = defaultMembers,
}: TeamCardsGridProps) {
  return (
    <section className={cn("px-4 py-16", className)}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            Meet Our Team
          </h2>
          <p className="text-muted-foreground mt-3 text-lg">
            The talented people behind our success.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-background relative overflow-hidden rounded-2xl border p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
                <div className="flex flex-col items-center text-center">
                  <div
                    className={cn(
                      "flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br text-lg font-bold text-white",
                      member.gradient
                    )}
                  >
                    {member.initials}
                  </div>

                  <h3 className="text-foreground mt-4 text-lg font-semibold">
                    {member.name}
                  </h3>
                  <p className="text-muted-foreground text-sm font-medium">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground mt-2 text-sm">
                    {member.bio}
                  </p>

                  <motion.div
                    className="mt-4 flex items-center gap-3"
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {member.social?.twitter && (
                        <a
                          href={member.social.twitter}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={`${member.name} on Twitter`}
                        >
                          <Twitter className="h-4 w-4" />
                        </a>
                      )}
                      {member.social?.linkedin && (
                        <a
                          href={member.social.linkedin}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={`${member.name} on LinkedIn`}
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      )}
                      {member.social?.github && (
                        <a
                          href={member.social.github}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={`${member.name} on GitHub`}
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
