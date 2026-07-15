import { redirect } from "next/navigation";

/** Canonical desktop page is /downloads — keep /desktop as alias. */
export default function DesktopRedirectPage() {
  redirect("/downloads");
}
