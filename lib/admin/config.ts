export const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL?.toLowerCase() ??
  process.env.NEXT_PUBLIC_ADMIN_EMAIL?.toLowerCase() ??
  "rjdhav67@gmail.com";

export const PUBLIC_ADMIN_EMAIL =
  process.env.NEXT_PUBLIC_ADMIN_EMAIL?.toLowerCase() ?? "rjdhav67@gmail.com";
