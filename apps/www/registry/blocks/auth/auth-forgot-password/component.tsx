"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface AuthForgotPasswordProps {
  className?: string;
  onSubmit?: (email: string) => void;
  onBackToLogin?: () => void;
}

export default function AuthForgotPassword({
  className,
  onSubmit,
  onBackToLogin,
}: AuthForgotPasswordProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    onSubmit?.(email);
  };

  return (
    <section
      className={cn(
        "flex min-h-screen items-center justify-center px-4 py-16",
        className
      )}
    >
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="bg-background rounded-2xl border p-8 shadow-sm">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  type="button"
                  onClick={onBackToLogin}
                  className="text-muted-foreground hover:text-foreground mb-6 flex items-center gap-2 text-sm transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to login
                </button>

                <div className="mb-8">
                  <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                    <Mail className="text-primary h-6 w-6" />
                  </div>
                  <h1 className="text-foreground text-2xl font-bold">
                    Forgot your password?
                  </h1>
                  <p className="text-muted-foreground mt-2 text-sm">
                    No worries. Enter the email address associated with your
                    account and we&apos;ll send you a link to reset your
                    password.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="forgot-email">Email address</Label>
                    <Input
                      id="forgot-email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Send Reset Link
                  </Button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.1,
                  }}
                  className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30"
                >
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </motion.div>

                <h2 className="text-foreground mb-2 text-xl font-bold">
                  Check your email
                </h2>
                <p className="text-muted-foreground mb-2 text-sm">
                  We&apos;ve sent a password reset link to
                </p>
                <p className="text-foreground mb-6 text-sm font-medium">
                  {email}
                </p>
                <p className="text-muted-foreground mb-8 text-xs">
                  Didn&apos;t receive the email? Check your spam folder or{" "}
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-primary hover:underline"
                  >
                    try again
                  </button>
                </p>

                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={onBackToLogin}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to login
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
