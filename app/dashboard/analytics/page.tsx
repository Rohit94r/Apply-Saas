import { redirect } from "next/navigation";

/** Progress/analytics now lives on the Applications & progress hub. */
export default function AnalyticsPage() {
  redirect("/dashboard/applications");
}
