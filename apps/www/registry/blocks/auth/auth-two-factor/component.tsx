"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { ShieldCheck, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface AuthTwoFactorProps {
  className?: string;
  codeLength?: number;
  onSubmit?: (code: string) => void;
  onResend?: () => void;
  onBackToLogin?: () => void;
}

export default function AuthTwoFactor({
  className,
  codeLength = 6,
  onSubmit,
  onResend,
  onBackToLogin,
}: AuthTwoFactorProps) {
  const [code, setCode] = useState<string[]>(new Array(codeLength).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const setInputRef = useCallback(
    (index: number) => (el: HTMLInputElement | null) => {
      inputRefs.current[index] = el;
    },
    []
  );

  const focusInput = (index: number) => {
    if (index >= 0 && index < codeLength) {
      inputRefs.current[index]?.focus();
    }
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];

    if (value.length > 1) {
      // Handle paste
      const pastedChars = value.slice(0, codeLength - index).split("");
      pastedChars.forEach((char, i) => {
        if (index + i < codeLength) {
          newCode[index + i] = char;
        }
      });
      setCode(newCode);
      const nextIndex = Math.min(index + pastedChars.length, codeLength - 1);
      focusInput(nextIndex);
    } else {
      newCode[index] = value;
      setCode(newCode);
      if (value && index < codeLength - 1) {
        focusInput(index + 1);
      }
    }

    const fullCode = newCode.join("");
    if (fullCode.length === codeLength && !newCode.includes("")) {
      onSubmit?.(fullCode);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (code[index] === "") {
        focusInput(index - 1);
      } else {
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
      }
    } else if (e.key === "ArrowLeft") {
      focusInput(index - 1);
    } else if (e.key === "ArrowRight") {
      focusInput(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");
    if (pastedData) {
      const newCode = [...code];
      pastedData.split("").forEach((char, i) => {
        if (i < codeLength) {
          newCode[i] = char;
        }
      });
      setCode(newCode);
      focusInput(Math.min(pastedData.length, codeLength - 1));

      if (pastedData.length >= codeLength) {
        onSubmit?.(newCode.join(""));
      }
    }
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
          <button
            type="button"
            onClick={onBackToLogin}
            className="text-muted-foreground hover:text-foreground mb-6 flex items-center gap-2 text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </button>

          <div className="mb-8 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-primary/10 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full"
            >
              <ShieldCheck className="text-primary h-7 w-7" />
            </motion.div>
            <h1 className="text-foreground text-2xl font-bold">
              Two-Factor Authentication
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Enter the {codeLength}-digit code from your authenticator app to
              verify your identity.
            </p>
          </div>

          <div className="mb-8">
            <div
              className="flex justify-center gap-2 sm:gap-3"
              onPaste={handlePaste}
            >
              {code.map((digit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <input
                    ref={setInputRef(index)}
                    type="text"
                    inputMode="numeric"
                    maxLength={codeLength}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onFocus={(e) => e.target.select()}
                    className={cn(
                      "border-border bg-background text-foreground focus:border-primary focus:ring-primary/20 h-14 w-11 rounded-lg border text-center text-xl font-semibold transition-all focus:outline-none focus:ring-2 sm:h-16 sm:w-13",
                      digit && "border-primary"
                    )}
                    aria-label={`Digit ${index + 1}`}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <Button
            className="w-full"
            disabled={code.includes("")}
            onClick={() => onSubmit?.(code.join(""))}
          >
            Verify Code
          </Button>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              Didn&apos;t receive a code?{" "}
              <button
                type="button"
                onClick={onResend}
                className="text-primary font-medium hover:underline"
              >
                Resend code
              </button>
            </p>
          </div>

          <div className="mt-6 rounded-lg bg-amber-50 p-3 dark:bg-amber-950/30">
            <p className="text-center text-xs text-amber-700 dark:text-amber-400">
              If you&apos;ve lost access to your authenticator app, please{" "}
              <a href="#" className="font-medium underline">
                contact support
              </a>{" "}
              for account recovery.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
