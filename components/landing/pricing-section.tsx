"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";
import { FounderSupportCard } from "@/components/billing/founder-support-card";
import { SectionHeading } from "@/components/landing/section-heading";
import { PRO_MONTHLY_PRICE_INR } from "@/lib/billing/constants";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    price: {
      usd: "$0",
      inr: "₹0"
    },
    description: "Start free — 5 tailored resumes for students and job seekers anywhere.",
    features: [
      "5 free resume generations",
      "Master resume upload",
      "ATS keyword scan",
      "PDF export"
    ],
    cta: "Start free"
  },
  {
    name: "Pro",
    price: {
      usd: "$1",
      inr: `₹${PRO_MONTHLY_PRICE_INR}`
    },
    period: "/month",
    description: "Unlimited tailored resumes for 30 days. Pay in INR or USD — upgrade when you are ready.",
    features: [
      "Unlimited tailored resumes for 30 days",
      "Job search + learner prep",
      "Interview prep guides",
      "Private discounts via DM — no public codes"
    ],
    cta: "Upgrade to Pro",
    highlighted: true
  }
];

export function PricingSection() {
  const [currency, setCurrency] = useState<"usd" | "inr">("inr");

  return (
    <section id="pricing" className="bg-white py-24">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Pricing"
            title="5 free resumes worldwide. Pro when you need more."
            description="Free for everyone — students and early-career applicants in any country. Upgrade supports INR (UPI) and USD pricing."
          />
        </Reveal>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-full border border-border bg-[#f7f4ee] p-1">
            {[
              { label: "INR", value: "inr" },
              { label: "USD", value: "usd" }
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setCurrency(option.value as "usd" | "inr")}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-semibold text-muted-foreground transition",
                  currency === option.value &&
                    "bg-primary text-primary-foreground shadow-button"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
          {plans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 0.08}>
              <div
                className={
                  plan.highlighted
                    ? "h-full rounded-2xl border border-primary bg-primary p-7 text-primary-foreground shadow-soft"
                    : "h-full rounded-2xl border border-border bg-[#fbfaf6] p-7"
                }
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-4xl">{plan.name}</h3>
                    <p
                      className={
                        plan.highlighted
                          ? "mt-2 text-sm text-white/70"
                          : "mt-2 text-sm text-muted-foreground"
                      }
                    >
                      {plan.description}
                    </p>
                  </div>
                  {plan.highlighted ? (
                    <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-semibold">
                      Pro
                    </span>
                  ) : null}
                </div>
                <div className="mt-8 flex items-end gap-1">
                  <span className="font-serif text-6xl">{plan.price[currency]}</span>
                  {plan.period ? (
                    <span className="pb-3 text-sm opacity-70">{plan.period}</span>
                  ) : null}
                </div>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <CheckCircle className="h-4 w-4 shrink-0 text-accent" weight="regular" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="mt-8 w-full"
                  variant={plan.highlighted ? "subtle" : "default"}
                >
                  <Link href={plan.highlighted ? "/dashboard/upgrade" : "/dashboard/generate"}>
                    {plan.cta}
                  </Link>
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <div className="mx-auto mt-12 max-w-2xl">
            <FounderSupportCard />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
