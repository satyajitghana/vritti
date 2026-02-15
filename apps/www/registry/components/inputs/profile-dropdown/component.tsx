"use client";

import * as React from "react";
import { Settings, CreditCard, FileText, LogOut, User } from "lucide-react";

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

const GeminiIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    height="1em"
    style={{ flex: "none", lineHeight: 1 }}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    {...props}
  >
    <title>Gemini</title>
    <defs>
      <linearGradient id="lobe-icons-gemini-fill" x1="0%" x2="68.73%" y1="100%" y2="30.395%">
        <stop offset="0%" stopColor="#1C7DFF" />
        <stop offset="52.021%" stopColor="#1C69FF" />
        <stop offset="100%" stopColor="#F0DCD6" />
      </linearGradient>
    </defs>
    <path
      d="M12 24A14.304 14.304 0 000 12 14.304 14.304 0 0012 0a14.305 14.305 0 0012 12 14.305 14.305 0 00-12 12"
      fill="url(#lobe-icons-gemini-fill)"
      fillRule="nonzero"
    />
  </svg>
);

interface Profile {
  name: string;
  email: string;
  avatar: string;
  subscription?: string;
  model?: string;
}

interface MenuItem {
  label: string;
  value?: string;
  href: string;
  icon: React.ReactNode;
  external?: boolean;
}

const SAMPLE_PROFILE_DATA: Profile = {
  name: "Eugene An",
  email: "eugene@kokonutui.com",
  avatar: "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/profile-mjss82WnWBRO86MHHGxvJ2TVZuyrDv.jpeg",
  subscription: "PRO",
  model: "Gemini 2.0 Flash",
};

interface ProfileDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: Profile;
}

export default function ProfileDropdown({
  data = SAMPLE_PROFILE_DATA,
  className,
  ...props
}: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const menuItems: MenuItem[] = [
    { label: "Profile", href: "#", icon: <User className="w-4 h-4" /> },
    { label: "Model", value: data.model, href: "#", icon: <GeminiIcon className="w-4 h-4" /> },
    { label: "Subscription", value: data.subscription, href: "#", icon: <CreditCard className="w-4 h-4" /> },
    { label: "Settings", href: "#", icon: <Settings className="w-4 h-4" /> },
    { label: "Terms & Policies", href: "#", icon: <FileText className="w-4 h-4" />, external: true },
  ];

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={cn("relative", className)} ref={dropdownRef} {...props}>
      <div className="group relative">
        <button
          type="button"
          className="flex items-center gap-16 p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 hover:shadow-sm transition-all duration-200 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="text-left flex-1">
            <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
              {data.name}
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 tracking-tight leading-tight">
              {data.email}
            </div>
          </div>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-0.5">
              <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-zinc-900">
                <img
                  src={data.avatar}
                  alt={data.name}
                  width={36}
                  height={36}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-1 w-64 p-2 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl shadow-xl shadow-zinc-900/5 dark:shadow-zinc-950/20 z-50">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center p-3 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/60 rounded-xl transition-all duration-200 cursor-pointer group/item hover:shadow-sm border border-transparent hover:border-zinc-200/50 dark:hover:border-zinc-700/50"
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="flex items-center gap-2 flex-1">
                    {item.icon}
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight whitespace-nowrap">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex-shrink-0 ml-auto">
                    {item.value && (
                      <span
                        className={cn(
                          "text-xs font-medium rounded-md py-1 px-2 tracking-tight",
                          item.label === "Model"
                            ? "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-500/10 border border-blue-500/10"
                            : "text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-500/10 border border-purple-500/10"
                        )}
                      >
                        {item.value}
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>

            <div className="my-3 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-800" />

            <button
              type="button"
              className="w-full flex items-center gap-3 p-3 duration-200 bg-red-500/10 rounded-xl hover:bg-red-500/20 cursor-pointer border border-transparent hover:border-red-500/30 hover:shadow-sm transition-all group/signout"
            >
              <LogOut className="w-4 h-4 text-red-500 group-hover/signout:text-red-600" />
              <span className="text-sm font-medium text-red-500 group-hover/signout:text-red-600">
                Sign Out
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
