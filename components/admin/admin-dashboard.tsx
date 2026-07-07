"use client";

import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowClockwise,
  CaretDown,
  CaretUp,
  ChartBar,
  Clock,
  Crown,
  Cursor,
  Eye,
  Funnel,
  SignOut,
  UsersThree
} from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
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
  pageViews: number;
  lastPage: string | null;
  lastPageAt: string | null;
  journey: Array<{
    action: string;
    detail?: string;
    createdAt: string | null;
  }>;
  features: {
    generate: number;
    build: number;
    interview: number;
    jobs: number;
    freelance: number;
    payment: number;
  };
};

type AdminActivity = {
  id: string;
  clerkId: string;
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

function formatTime(value: string | null) {
  if (!value) {
    return "—";
  }
  return new Date(value).toLocaleString("en-IN", {
    timeStyle: "short",
    day: "2-digit",
    month: "short"
  });
}

const actionMeta: Record<
  string,
  { label: string; icon: PhosphorIcon; tone: string }
> = {
  login: { label: "Logged in", icon: SignOut, tone: "text-emerald-600" },
  page_view: { label: "Viewed page", icon: Eye, tone: "text-sky-600" },
  generate: { label: "Generated resume", icon: Crown, tone: "text-accent" },
  build: { label: "Built resume", icon: ChartBar, tone: "text-accent" },
  interview: { label: "Interview prep", icon: ChartBar, tone: "text-primary" },
  jobs: { label: "Searched jobs", icon: ChartBar, tone: "text-primary" },
  freelance: { label: "Explored freelancing", icon: ChartBar, tone: "text-primary" },
  tools: { label: "Used AI tools", icon: Cursor, tone: "text-primary" },
  upgrade: { label: "Viewed upgrade", icon: Crown, tone: "text-amber-600" },
  payment: { label: "Payment activity", icon: Crown, tone: "text-amber-600" }
};

function actionLabel(action: string, detail?: string) {
  const meta = actionMeta[action];
  if (action === "page_view") {
    return `Viewed ${detail ?? "page"}`;
  }
  return meta ? meta.label : action;
}

export function AdminDashboard() {
  const [data, setData] = useState<AdminOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [days, setDays] = useState("30");
  const [saving, setSaving] = useState(false);
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [activityFilter, setActivityFilter] = useState<string>("all");

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
      toast.error(
        error instanceof Error ? error.message : "Unable to load admin dashboard"
      );
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
      toast.error(
        error instanceof Error ? error.message : "Unable to update subscription"
      );
    } finally {
      setSaving(false);
    }
  }

  const filteredActivity = useMemo(() => {
    if (!data) return [];
    if (activityFilter === "all") return data.recentActivity;
    return data.recentActivity.filter(
      (item) => item.clerkId === activityFilter
    );
  }, [data, activityFilter]);

  const totalPageViews = useMemo(
    () => data?.users.reduce((sum, u) => sum + u.pageViews, 0) ?? 0,
    [data]
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="fine-label mb-2">Owner dashboard</p>
          <h1 className="font-serif text-4xl text-primary">
            Users &amp; analytics
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            See who logged in, which pages they viewed, what they generated, and
            activate Pro after WhatsApp payment.
          </p>
        </div>
        <Button type="button" variant="outline" onClick={() => void load()} disabled={loading}>
          <ArrowClockwise className="h-4 w-4" weight="regular" />
          Refresh
        </Button>
      </div>

      {/* Stat strip */}
      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard
          icon={UsersThree}
          label="Signed-up users"
          value={data?.users.length ?? 0}
        />
        <StatCard
          icon={Eye}
          label="Total page views"
          value={totalPageViews}
        />
        <StatCard
          icon={Clock}
          label="Recent events"
          value={data?.recentActivity.length ?? 0}
        />
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

      {/* Users table — expandable journey */}
      <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
        <div className="mb-4 flex items-center gap-2">
          <UsersThree className="h-5 w-5 text-primary" weight="regular" />
          <h2 className="text-lg font-semibold text-primary">
            Users — click a row to see their journey
          </h2>
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
                  <th className="px-3 py-2 font-medium">Last page seen</th>
                  <th className="px-3 py-2 font-medium">Views</th>
                  <th className="px-3 py-2 font-medium">Plan</th>
                  <th className="px-3 py-2 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.users.map((user) => {
                  const expanded = expandedUser === user.clerkId;
                  return (
                    <Fragment key={user.clerkId}>
                      <tr
                        className="cursor-pointer border-b border-border/70 transition hover:bg-muted/40"
                        onClick={() =>
                          setExpandedUser(expanded ? null : user.clerkId)
                        }
                      >
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            {expanded ? (
                              <CaretUp className="h-3 w-3 text-muted-foreground" weight="regular" />
                            ) : (
                              <CaretDown className="h-3 w-3 text-muted-foreground" weight="regular" />
                            )}
                            <div>
                              <p className="font-semibold text-foreground">{user.name}</p>
                              <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-muted-foreground">
                          {formatWhen(user.lastLoginAt)}
                          <p className="text-xs">{user.loginCount} logins</p>
                        </td>
                        <td className="px-3 py-3 text-xs text-muted-foreground">
                          <span className="font-mono">{user.lastPage ?? "—"}</span>
                          <p className="text-[11px]">{formatTime(user.lastPageAt)}</p>
                        </td>
                        <td className="px-3 py-3 font-semibold text-primary">
                          {user.pageViews}
                        </td>
                        <td className="px-3 py-3 capitalize">{user.plan}</td>
                        <td className="px-3 py-3">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            disabled={saving}
                            onClick={(event) => {
                              event.stopPropagation();
                              setEmail(user.email);
                              void activateSubscription({
                                clerkId: user.clerkId,
                                daysValue: 100
                              });
                            }}
                          >
                            +100 days
                          </Button>
                        </td>
                      </tr>
                      {expanded ? (
                        <tr key={`${user.clerkId}-journey`}>
                          <td colSpan={6} className="bg-[#fbfaf6] px-3 py-4">
                            <UserJourney user={user} />
                          </td>
                        </tr>
                      ) : null}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent activity — filterable */}
      <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Funnel className="h-5 w-5 text-primary" weight="regular" />
            <h2 className="text-lg font-semibold text-primary">Recent activity</h2>
          </div>
          <select
            value={activityFilter}
            onChange={(event) => setActivityFilter(event.target.value)}
            className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-semibold text-foreground outline-none focus:border-primary"
          >
            <option value="all">All users</option>
            {data?.users.map((user) => (
              <option key={user.clerkId} value={user.clerkId}>
                {user.name || user.email}
              </option>
            ))}
          </select>
        </div>
        {filteredActivity.length ? (
          <div className="space-y-2">
            {filteredActivity.map((item) => {
              const meta = actionMeta[item.action] ?? {
                label: item.action,
                icon: Eye,
                tone: "text-muted-foreground"
              };
              const Icon = meta.icon;
              return (
                <div
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border/70 px-3 py-2 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${meta.tone}`} weight="regular" />
                    <span className="font-semibold text-foreground">{item.name}</span>
                    <span className="text-muted-foreground">· {item.email}</span>
                  </div>
                  <div className="text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {actionLabel(item.action, item.detail)}
                    </span>
                    {" · "}
                    {formatWhen(item.createdAt)}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No activity yet.</p>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value
}: {
  icon: PhosphorIcon;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" weight="regular" />
        <p className="text-xs font-semibold uppercase">{label}</p>
      </div>
      <p className="mt-2 font-serif text-3xl text-primary">{value}</p>
    </div>
  );
}

function UserJourney({ user }: { user: AdminUser }) {
  if (!user.journey.length) {
    return (
      <p className="text-xs text-muted-foreground">
        No detailed journey yet — only logged in.
      </p>
    );
  }

  const featureChips = [
    { label: "Resumes", value: user.resumesGenerated },
    { label: "Generate", value: user.features.generate },
    { label: "Build", value: user.features.build },
    { label: "Interview", value: user.features.interview },
    { label: "Jobs", value: user.features.jobs },
    { label: "Freelance", value: user.features.freelance }
  ].filter((chip) => chip.value > 0);

  return (
    <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
      <div>
        <p className="fine-label mb-3">Recent journey (latest first)</p>
        <div className="space-y-0">
          {user.journey.map((step, index) => {
            const meta = actionMeta[step.action] ?? {
              label: step.action,
              icon: Eye,
              tone: "text-muted-foreground"
            };
            const Icon = meta.icon;
            return (
              <div
                key={`${step.action}-${index}`}
                className="relative border-l-2 border-accent/30 pb-4 pl-6 last:pb-0"
              >
                <span className="absolute -left-[13px] flex h-6 w-6 items-center justify-center rounded-full border border-accent bg-white">
                  <Icon className={`h-3 w-3 ${meta.tone}`} weight="regular" />
                </span>
                <p className="text-sm font-semibold text-foreground">
                  {actionLabel(step.action, step.detail)}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {formatWhen(step.createdAt)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <p className="fine-label mb-3">Engagement</p>
        <div className="flex flex-wrap gap-2">
          {featureChips.length ? (
            featureChips.map((chip) => (
              <span
                key={chip.label}
                className="rounded-full bg-primary/5 px-2.5 py-1 text-xs font-semibold text-primary"
              >
                {chip.label}: {chip.value}
              </span>
            ))
          ) : (
            <span className="text-xs text-muted-foreground">
              No feature usage recorded yet.
            </span>
          )}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          {user.pageViews} total page views · {user.loginCount} logins
        </p>
      </div>
    </div>
  );
}
