"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowClockwise, Crown, UsersThree } from "@phosphor-icons/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AdminUser = {
  clerkId: string;
  name: string;
  email: string;
  plan: "free" | "pro" | "expired";
  daysRemaining: number;
  proExpiresAt: string | null;
  lastLoginAt: string | null;
  loginCount: number;
  resumesGenerated: number;
  features: {
    generate: number;
    build: number;
    interview: number;
    jobs: number;
    payment: number;
  };
};

type AdminActivity = {
  id: string;
  email: string;
  name: string;
  action: string;
  detail?: string;
  createdAt: string | null;
};

type PendingPayment = {
  id: string;
  userName: string;
  userEmail: string;
  amountInr: number;
  discountCode?: string;
  createdAt: string | null;
};

type AdminOverview = {
  users: AdminUser[];
  recentActivity: AdminActivity[];
  pendingPayments: PendingPayment[];
};

function formatWhen(value: string | null) {
  if (!value) {
    return "—";
  }

  return new Date(value).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  });
}

export function AdminDashboard() {
  const [data, setData] = useState<AdminOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [days, setDays] = useState("30");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/admin/overview");
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error ?? "Unable to load admin dashboard");
      }

      setData(json);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to load admin dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function activateSubscription(options: {
    email?: string;
    clerkId?: string;
    paymentId?: string;
    daysValue?: number;
  }) {
    setSaving(true);

    try {
      const response = await fetch("/api/admin/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: options.email,
          clerkId: options.clerkId,
          paymentId: options.paymentId,
          days: options.daysValue ?? Number(days)
        })
      });
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error ?? "Unable to update subscription");
      }

      toast.success(`Pro activated — ${json.daysRemaining} days remaining`);
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to update subscription");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="fine-label mb-2">Owner dashboard</p>
          <h1 className="font-serif text-4xl text-primary">Users &amp; subscriptions</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            See who logged in, what they used, and activate Pro after WhatsApp payment.
          </p>
        </div>
        <Button type="button" variant="outline" onClick={() => void load()} disabled={loading}>
          <ArrowClockwise className="h-4 w-4" weight="regular" />
          Refresh
        </Button>
      </div>

      <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
        <div className="mb-4 flex items-center gap-2">
          <Crown className="h-5 w-5 text-accent" weight="regular" />
          <h2 className="text-lg font-semibold text-primary">Activate Pro</h2>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">
          After WhatsApp payment, enter the user email and number of days (e.g. 100).
        </p>
        <div className="grid gap-3 sm:grid-cols-[1.4fr_120px_auto]">
          <Input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="user@gmail.com"
            type="email"
          />
          <Input
            value={days}
            onChange={(event) => setDays(event.target.value.replace(/\D/g, ""))}
            placeholder="Days"
            inputMode="numeric"
          />
          <Button
            type="button"
            disabled={saving || !email.trim() || !days.trim()}
            onClick={() => void activateSubscription({ email: email.trim() })}
          >
            Add days
          </Button>
        </div>
      </div>

      {data?.pendingPayments.length ? (
        <div className="rounded-2xl border border-warning/30 bg-warning/5 p-6">
          <h2 className="text-lg font-semibold text-primary">Pending WhatsApp payments</h2>
          <div className="mt-4 space-y-3">
            {data.pendingPayments.map((payment) => (
              <div
                key={payment.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-white p-4"
              >
                <div>
                  <p className="font-semibold text-foreground">{payment.userName}</p>
                  <p className="text-sm text-muted-foreground">
                    {payment.userEmail} · ₹{payment.amountInr}
                    {payment.discountCode ? ` · ${payment.discountCode}` : ""}
                  </p>
                  <p className="text-xs text-muted-foreground">{formatWhen(payment.createdAt)}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={saving}
                    onClick={() =>
                      void activateSubscription({ paymentId: payment.id, daysValue: 30 })
                    }
                  >
                    +30 days
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    disabled={saving}
                    onClick={() =>
                      void activateSubscription({ paymentId: payment.id, daysValue: 100 })
                    }
                  >
                    +100 days
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
        <div className="mb-4 flex items-center gap-2">
          <UsersThree className="h-5 w-5 text-primary" weight="regular" />
          <h2 className="text-lg font-semibold text-primary">Users</h2>
        </div>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="px-3 py-2 font-medium">User</th>
                  <th className="px-3 py-2 font-medium">Last login</th>
                  <th className="px-3 py-2 font-medium">Plan</th>
                  <th className="px-3 py-2 font-medium">Days left</th>
                  <th className="px-3 py-2 font-medium">Features</th>
                  <th className="px-3 py-2 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.users.map((user) => (
                  <tr key={user.clerkId} className="border-b border-border/70">
                    <td className="px-3 py-3">
                      <p className="font-semibold text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </td>
                    <td className="px-3 py-3 text-muted-foreground">
                      {formatWhen(user.lastLoginAt)}
                      <p className="text-xs">{user.loginCount} logins</p>
                    </td>
                    <td className="px-3 py-3 capitalize">{user.plan}</td>
                    <td className="px-3 py-3">{user.daysRemaining || "—"}</td>
                    <td className="px-3 py-3 text-xs text-muted-foreground">
                      Gen {user.features.generate} · Build {user.features.build} · Interview{" "}
                      {user.features.interview} · Resumes {user.resumesGenerated}
                    </td>
                    <td className="px-3 py-3">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        disabled={saving}
                        onClick={() => {
                          setEmail(user.email);
                          void activateSubscription({ clerkId: user.clerkId, daysValue: 100 });
                        }}
                      >
                        +100 days
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
        <h2 className="text-lg font-semibold text-primary">Recent activity</h2>
        <div className="mt-4 space-y-2">
          {data?.recentActivity.map((item) => (
            <div
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border/70 px-3 py-2 text-sm"
            >
              <div>
                <span className="font-semibold text-foreground">{item.name}</span>
                <span className="text-muted-foreground"> · {item.email}</span>
              </div>
              <div className="text-muted-foreground">
                {item.action}
                {item.detail ? ` — ${item.detail}` : ""} · {formatWhen(item.createdAt)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
