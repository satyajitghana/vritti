"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  {
    question: "How do I order?",
    answer: "You can order through our website by selecting the products you want, adding them to your cart, and proceeding to checkout.",
  },
  {
    question: "How can I make a return?",
    answer: "To make a return, please contact our support team within 30 days of delivery. We'll provide you with a return shipping label.",
  },
  {
    question: "How long does delivery take?",
    answer: "Standard delivery takes 5-7 business days. Express delivery is available for 2-3 business days.",
  },
  {
    question: "Where is my order?",
    answer: "You can track your order using the tracking number sent to your email. Visit our tracking page for real-time updates.",
  },
  {
    question: "Can I cancel or change my order?",
    answer: "Orders can be cancelled or modified within 1 hour of placing them. After that, please contact our support team for assistance.",
  },
];

export default function FaqCards() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="mb-4 text-3xl font-bold">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-lg">
              Can&apos;t find the answer you&apos;re looking for? Reach out to
              our customer support team.
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
      </div>
    </section>
  );
}
