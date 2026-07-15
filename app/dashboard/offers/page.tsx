import { redirect } from "next/navigation";

/** Compare offers lives under AI tools — keep this path for bookmarks. */
export default function OffersPage() {
  redirect("/dashboard/tools?tool=offers");
}
