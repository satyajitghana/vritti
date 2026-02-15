"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  {
    question: "What is your refund policy?",
    answer: "If you are unhappy with your purchase for any reason, email us within 90 days and we will refund you in full, no questions asked.",
  },
  {
    question: "Do you offer technical support?",
    answer: "Yes, we provide 24/7 technical support through our help center, email, and live chat. Premium plans also get phone support.",
  },
  {
    question: "Can I upgrade my plan later?",
    answer: "Absolutely! You can upgrade your plan at any time. The price difference will be prorated for the remainder of your billing cycle.",
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes, we offer a 14-day free trial on all plans. No credit card required to get started.",
  },
  {
    question: "How secure is my data?",
    answer: "We use industry-standard encryption and security practices. All data is encrypted at rest and in transit. We are SOC 2 Type II certified.",
  },
];

export default function FaqSimple() {
  return (
    <section className="py-20">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about the product and billing.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-base font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
