'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Zap } from 'lucide-react';

export function PricingPreview() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        '5 projects',
        '5GB storage',
        'Basic analytics',
        'Community support',
        'Email support',
      ],
      cta: 'Get Started',
      variant: 'outline' as const,
      popular: false,
    },
    {
      name: 'Pro',
      price: '$19',
      period: 'per month',
      description: 'Best for professionals',
      features: [
        'Unlimited projects',
        '100GB storage',
        'Advanced analytics',
        'Priority support',
        'Custom domain',
        'API access',
        'Team collaboration',
      ],
      cta: 'Start Free Trial',
      variant: 'default' as const,
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: 'per month',
      description: 'For large organizations',
      features: [
        'Everything in Pro',
        'Unlimited storage',
        'Advanced security',
        'Dedicated support',
        'Custom integrations',
        'SLA guarantee',
        'Training sessions',
        'Account manager',
      ],
      cta: 'Contact Sales',
      variant: 'outline' as const,
      popular: false,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold">Simple, transparent pricing</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect plan for your needs. Always flexible to scale up or down.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan, idx) => (
          <Card
            key={idx}
            className={`relative ${
              plan.popular ? 'border-primary shadow-lg scale-105' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-0 right-0 mx-auto w-fit">
                <Badge className="px-3 py-1">
                  <Zap className="h-3 w-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
            )}

            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground ml-2">/{plan.period}</span>
              </div>
            </CardHeader>

            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature, featureIdx) => (
                  <li key={featureIdx} className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button variant={plan.variant} className="w-full" size="lg">
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>
              Everything you need to know about our pricing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                q: 'Can I change my plan later?',
                a: 'Yes, you can upgrade or downgrade your plan at any time.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, PayPal, and bank transfers.',
              },
              {
                q: 'Is there a free trial?',
                a: 'Yes, Pro plan comes with a 14-day free trial. No credit card required.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="space-y-1">
                <h4 className="text-sm font-semibold">{faq.q}</h4>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
