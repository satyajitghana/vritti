"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Check,
  CreditCard,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion, AnimatePresence } from "motion/react";

export interface PaymentFormData {
  nameOnCard?: string;
  cardNumber?: string;
  validTill?: string;
  cvv?: string;
  firstName?: string;
  middleLastName?: string;
  country?: string;
  state?: string;
  city?: string;
  billingAddress?: string;
  pinCode?: string;
  contactNumber?: string;
  general?: string;
}

// Card detection utilities (inline)
const detectCardType = (
  cardNumber: string,
):
  | "visa"
  | "mastercard"
  | "amex"
  | "rupay"
  | "discover"
  | "unknown" => {
  const number = cardNumber.replace(/\s/g, "");
  if (/^4/.test(number)) return "visa";
  if (/^3[47]/.test(number)) return "amex";
  if (
    /^5[1-5]/.test(number) ||
    /^222[1-9]/.test(number) ||
    /^22[3-9]\d/.test(number) ||
    /^2[3-6]\d{2}/.test(number) ||
    /^27[0-1]\d/.test(number) ||
    /^2720/.test(number)
  )
    return "mastercard";
  if (
    /^6011/.test(number) ||
    /^65/.test(number) ||
    /^64[4-9]/.test(number)
  )
    return "discover";
  if (
    /^60/.test(number) ||
    /^81/.test(number) ||
    /^82/.test(number) ||
    /^508/.test(number)
  )
    return "rupay";
  return "unknown";
};

const formatCardNumber = (value: string): string => {
  const number = value.replace(/\s/g, "").replace(/[^0-9]/gi, "");
  const matches = number.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || "";
  const parts = [];
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  if (parts.length) {
    return parts.join(" ");
  }
  return number;
};

const formatExpiryDate = (value?: string): string => {
  if (!value) return "";
  const number = value.replace(/\D/g, "");
  if (number.length >= 2) {
    return number.substring(0, 2) + "/" + number.substring(2, 4);
  }
  return number;
};

const validateLuhn = (cardNumber: string): true | string => {
  const number = cardNumber.replace(/\s/g, "");
  if (!number || !/^\d+$/.test(number)) return "Invalid card number";
  let sum = 0;
  let shouldDouble = false;
  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number.charAt(i));
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0 ? true : "Invalid card number";
};

const CardLogo = ({ type }: { type: string }) => {
  switch (type) {
    case "visa":
      return (
        <div className="flex h-5 w-10 items-center justify-center rounded bg-blue-600 text-xs font-bold text-white">
          VISA
        </div>
      );
    case "mastercard":
      return (
        <div className="flex items-center">
          <div className="h-5 w-5 rounded-full bg-red-500"></div>
          <div className="-ml-2 h-5 w-5 rounded-full bg-orange-400"></div>
        </div>
      );
    case "amex":
      return (
        <div className="flex h-6 w-10 items-center justify-center rounded bg-blue-500 text-xs font-bold text-white">
          AMEX
        </div>
      );
    case "rupay":
      return (
        <div className="flex h-5 w-10 items-center justify-center rounded bg-green-600 text-xs font-bold text-white">
          RuPay
        </div>
      );
    case "discover":
      return (
        <div className="flex h-6 w-10 items-center justify-center rounded bg-orange-600 text-xs font-bold text-white">
          DISC
        </div>
      );
    default:
      return <CreditCard className="text-muted-foreground h-5 w-5" />;
  }
};

// Simple country list for the demo
const defaultCountries = [
  { name: "United States", isoCode: "US" },
  { name: "United Kingdom", isoCode: "GB" },
  { name: "Canada", isoCode: "CA" },
  { name: "Australia", isoCode: "AU" },
  { name: "Germany", isoCode: "DE" },
  { name: "France", isoCode: "FR" },
  { name: "India", isoCode: "IN" },
  { name: "Japan", isoCode: "JP" },
];

function PaymentDetailsTwo({
  className,
  onSubmit,
  onDiscard,
  countries,
}: {
  className?: string;
  onSubmit?: (data: PaymentFormData) => void;
  onDiscard?: () => void;
  countries?: { name: string; isoCode: string }[];
}) {
  const [step, setStep] = useState(1);
  const [cardType, setCardType] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<PaymentFormData>({
    nameOnCard: "",
    cardNumber: "",
    validTill: "",
    cvv: "",
    firstName: "",
    middleLastName: "",
    country: "",
    state: "",
    city: "",
    billingAddress: "",
    pinCode: "",
    contactNumber: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const availableCountries = countries || defaultCountries;

  const updateField = (field: keyof PaymentFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const formatAndSetCard = (val: string) => {
    const raw = val.replace(/\s+/g, "");
    const formatted = formatCardNumber(raw);
    updateField("cardNumber", formatted);
    setCardType(detectCardType(formatted));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onSubmit) return;
    try {
      setIsSubmitting(true);
      await onSubmit(formData);
      setIsSaved(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDiscardClick = () => {
    if (onDiscard) {
      onDiscard();
    } else {
      setFormData({
        nameOnCard: "",
        cardNumber: "",
        validTill: "",
        cvv: "",
        firstName: "",
        middleLastName: "",
        country: "",
        state: "",
        city: "",
        billingAddress: "",
        pinCode: "",
        contactNumber: "",
      });
      setIsSaved(false);
    }
  };

  const handleNext = () => {
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <Card className={cn("mx-auto w-full max-w-2xl pb-0", className)}>
      <CardHeader className="space-y-4">
        <div>
          <CardTitle>Payment Details</CardTitle>
          <CardDescription className="mt-1.5">
            {step === 1
              ? "Enter your card information"
              : "Enter your billing address"}
          </CardDescription>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex flex-1 items-center gap-2">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
                step === 1
                  ? "bg-primary text-primary-foreground"
                  : "bg-primary/20 text-primary",
              )}
            >
              1
            </div>
            <div className="bg-border h-1 flex-1 rounded-full">
              <div
                className={cn(
                  "bg-primary h-full rounded-full transition-all duration-300",
                  step === 2 ? "w-full" : "w-0",
                )}
              />
            </div>
          </div>
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
              step === 2
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground",
            )}
          >
            2
          </div>
        </div>
      </CardHeader>

      <form onSubmit={handleFormSubmit}>
        <CardContent className="min-h-[420px] py-6">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div className="space-y-2">
                  <Label htmlFor="nameOnCard">Name on card</Label>
                  <Input
                    id="nameOnCard"
                    placeholder="John Doe"
                    value={formData.nameOnCard}
                    onChange={(e) => updateField("nameOnCard", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card number</Label>
                  <div className="relative">
                    <div className="absolute top-1/2 left-3 z-10 -translate-y-1/2">
                      <CardLogo type={cardType} />
                    </div>
                    <Input
                      id="cardNumber"
                      className="pl-14 font-mono tracking-wide"
                      placeholder="1234 5678 9012 3456"
                      maxLength={20}
                      inputMode="numeric"
                      value={formData.cardNumber}
                      onChange={(e) => formatAndSetCard(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="validTill">Expiry date</Label>
                    <Input
                      id="validTill"
                      className="font-mono"
                      placeholder="MM/YY"
                      maxLength={5}
                      value={formData.validTill}
                      onChange={(e) =>
                        updateField("validTill", formatExpiryDate(e.target.value))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <div className="relative">
                      <Shield className="text-muted-foreground absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2" />
                      <Input
                        id="cvv"
                        type="password"
                        className="pl-10 font-mono"
                        placeholder="123"
                        maxLength={4}
                        inputMode="numeric"
                        value={formData.cvv}
                        onChange={(e) => updateField("cvv", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="middleLastName">Last name</Label>
                    <Input
                      id="middleLastName"
                      placeholder="Doe"
                      value={formData.middleLastName}
                      onChange={(e) =>
                        updateField("middleLastName", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select
                    onValueChange={(val) => updateField("country", val)}
                  >
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCountries.map((c) => (
                        <SelectItem key={c.isoCode} value={c.isoCode}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billingAddress">Billing Address</Label>
                  <Textarea
                    id="billingAddress"
                    placeholder="Enter Billing Address"
                    value={formData.billingAddress}
                    onChange={(e) =>
                      updateField("billingAddress", e.target.value)
                    }
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="pinCode">Pincode</Label>
                    <Input
                      id="pinCode"
                      placeholder="110024"
                      value={formData.pinCode}
                      onChange={(e) => updateField("pinCode", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactNumber">Mobile</Label>
                    <Input
                      id="contactNumber"
                      placeholder="9991023558"
                      value={formData.contactNumber}
                      onChange={(e) =>
                        updateField("contactNumber", e.target.value)
                      }
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>

        <CardFooter className="bg-muted/30 flex justify-between border-t py-6">
          {step === 1 ? (
            <>
              <Button
                type="button"
                variant="ghost"
                onClick={handleDiscardClick}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleNext}
                className="min-w-[100px]"
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button type="button" variant="ghost" onClick={handleBack}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || isSaved}
                className="min-w-[120px]"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isSubmitting ? (
                    <motion.div
                      key="saving"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <div className="border-background h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                      <span>Saving...</span>
                    </motion.div>
                  ) : isSaved ? (
                    <motion.div
                      key="saved"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="h-4 w-4" />
                      <span>Saved</span>
                    </motion.div>
                  ) : (
                    <motion.span
                      key="default"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Save Changes
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}

export default PaymentDetailsTwo;
