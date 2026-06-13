"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle, QrCode, WhatsappLogo } from "@phosphor-icons/react";
import { toast } from "sonner";
import { FounderSupportCard } from "@/components/billing/founder-support-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { founderLinks } from "@/lib/constants/founder";
import { billingRequestHeaders } from "@/lib/device-id";
import { PRO_MONTHLY_PRICE_INR, QR_CODE_PATH } from "@/lib/billing/constants";

type PricingPreview = {
  code: string | null;
  originalAmountInr: number;
  amountInr: number;
  percentOff: number;
  label: string;
};

export function UpgradeCheckout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [discountCode, setDiscountCode] = useState("");
  const [pricing, setPricing] = useState<PricingPreview>({
    code: null,
    originalAmountInr: PRO_MONTHLY_PRICE_INR,
    amountInr: PRO_MONTHLY_PRICE_INR,
    percentOff: 0,
    label: "Full price"
  });
  const [loading, setLoading] = useState(false);
  const [applyingCode, setApplyingCode] = useState(false);

  useEffect(() => {
    const notice = searchParams.get("payment");

    if (notice === "confirmed") {
      toast.success("Payment marked confirmed. Pro stays active.");
    }

    if (notice === "rejected") {
      toast.error("Payment rejected. Pro access removed.");
    }
  }, [searchParams]);

  async function applyDiscountCode() {
    setApplyingCode(true);

    try {
      const response = await fetch("/api/billing/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ discountCode })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "That code didn't work");
      }

      setPricing(data);
      toast.success(`Locked in — pay ₹${data.amountInr} on UPI`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "That code didn't work");
    } finally {
      setApplyingCode(false);
    }
  }

  async function handlePaymentComplete() {
    setLoading(true);

    try {
      const response = await fetch("/api/billing/payment-complete", {
        method: "POST",
        headers: billingRequestHeaders(),
        body: JSON.stringify({ discountCode: pricing.code ?? discountCode.trim() })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Payment flow failed");
      }

      toast.success("WhatsApp opened. Pro activates after payment is confirmed.");
      window.open(data.whatsappUrl, "_blank", "noopener,noreferrer");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Payment flow failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
          <p className="fine-label mb-2">Upgrade to Pro</p>
          <h2 className="font-serif text-3xl text-primary">Unlimited resumes worldwide</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Pay via UPI QR (INR) or contact support for other regions. Scan, pay the amount
            shown, then tap <strong>Payment done</strong>. WhatsApp opens with your details.
            Pro activates after payment is confirmed.
          </p>

          <FounderSupportCard compact />

          <div className="mt-6 rounded-xl border border-border bg-[#fbfaf6] p-4">
            <p className="text-sm font-semibold text-primary">Private discount code</p>
            <p className="mt-1 text-xs leading-6 text-muted-foreground">
              Only if you received a code via Instagram or LinkedIn.
            </p>
            <div className="mt-4 flex gap-2">
              <Input
                value={discountCode}
                onChange={(event) => setDiscountCode(event.target.value.toUpperCase())}
                placeholder="Private code"
                className="uppercase"
                autoComplete="off"
              />
              <Button
                type="button"
                variant="outline"
                onClick={applyDiscountCode}
                disabled={applyingCode || !discountCode.trim()}
              >
                Apply
              </Button>
            </div>
          </div>

          <div className="mt-6 space-y-2 rounded-xl border border-border bg-[#fbfaf6] p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Plan</span>
              <span className="font-semibold">Pro monthly</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">MRP</span>
              <span>₹{pricing.originalAmountInr}</span>
            </div>
            {pricing.percentOff > 0 ? (
              <div className="flex items-center justify-between text-sm text-accent">
                <span>Your deal ({pricing.label})</span>
                <span>-{pricing.percentOff}%</span>
              </div>
            ) : null}
            <div className="flex items-center justify-between border-t border-border pt-3">
              <span className="font-semibold text-primary">Pay only</span>
              <span className="font-serif text-4xl text-primary">₹{pricing.amountInr}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-white p-6 text-center shadow-soft">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <QrCode className="h-6 w-6" weight="regular" />
        </div>
        <p className="mt-4 text-sm font-semibold text-foreground">Scan &amp; pay ₹{pricing.amountInr}</p>
        <div className="mx-auto mt-5 inline-flex rounded-2xl border border-border bg-white p-4 shadow-soft">
          <Image
            src={QR_CODE_PATH}
            alt="PhonePe UPI QR code for Apply Pro payment"
            width={220}
            height={220}
            className="h-[220px] w-[220px] object-contain"
            priority
          />
        </div>
        <ul className="mt-6 space-y-2 text-left text-sm text-muted-foreground">
          <li className="flex gap-2">
            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-success" weight="regular" />
            Pay the exact ₹{pricing.amountInr} shown above
          </li>
          <li className="flex gap-2">
            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-success" weight="regular" />
            5 free resumes per device — new accounts won&apos;t reset credits
          </li>
          <li className="flex gap-2">
            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-success" weight="regular" />
            Pro = unlimited tailored resumes for 30 days
          </li>
        </ul>
        <Button
          type="button"
          className="mt-8 w-full"
          size="lg"
          onClick={handlePaymentComplete}
          disabled={loading}
        >
          <WhatsappLogo className="h-5 w-5" weight="fill" />
          Payment done — confirm on WhatsApp
        </Button>
        <p className="mt-3 text-xs text-muted-foreground">
          Opens WhatsApp{" "}
          <Link href={founderLinks.whatsapp} className="text-accent underline">
            +91 8459262203
          </Link>{" "}
          with your name &amp; email pre-filled.
        </p>
        <div className="mt-6 text-left">
          <FounderSupportCard compact />
        </div>
      </div>
    </div>
  );
}
