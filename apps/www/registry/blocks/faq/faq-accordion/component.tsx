"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const FAQS = [
  {
    category: "General",
    question: "What services do you offer?",
    answer: "We offer a comprehensive suite of tools including project management, team collaboration, analytics, and customer support features.",
  },
  {
    category: "General",
    question: "How do I get started?",
    answer: "Simply sign up for a free account, complete the onboarding wizard, and you'll be ready to go in minutes. No credit card required.",
  },
  {
    category: "Billing",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise plans.",
  },
  {
    category: "Billing",
    question: "Can I cancel my subscription?",
    answer: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your current billing period.",
  },
  {
    category: "Technical",
    question: "Is there an API available?",
    answer: "Yes, we provide a comprehensive REST API with detailed documentation. API access is available on Pro and Enterprise plans.",
  },
  {
    category: "Technical",
    question: "Do you offer SSO integration?",
    answer: "SSO is available on Enterprise plans. We support SAML 2.0 and OpenID Connect protocols for seamless authentication.",
  },
];

export default function FaqAccordion() {
  return (
    <section className="py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-16 text-center">
          <Badge variant="secondary" className="mb-4">FAQ</Badge>
          <h2 className="mb-4 text-3xl font-bold">Common Questions</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Find answers to the most frequently asked questions about our product.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {FAQS.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="rounded-lg border px-6">
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="shrink-0 text-xs">
                    {faq.category}
                  </Badge>
                  <span className="font-medium">{faq.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
