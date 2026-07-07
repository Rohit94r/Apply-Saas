# Google Search Console Setup

Use this after deploying `https://apply.neexmeet.com`.

1. Open Google Search Console and add the property `https://apply.neexmeet.com`.
2. Choose **HTML tag** verification (recommended on Vercel — avoids DNS CNAME conflicts).
3. The app emits this meta tag from `app/layout.tsx` (hardcoded — do not override via env):

```html
<meta name="google-site-verification" content="aMaC-d-l0Bvd80mzAuNQdWqHZXgzfxpwTl0kcLpdC6I" />
```

**If verification fails with the old token:** Vercel may still have `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` set to an old value. **Delete that env var** in Vercel → Settings → Environment Variables, then redeploy.

4. Push to GitHub and wait for Vercel deploy to finish.
5. Confirm live HTML shows the new token:

```bash
curl -sL https://apply.neexmeet.com | grep google-site-verification
```

6. Click **Verify** in Search Console.
5. In Search Console, submit:

```text
https://apply.neexmeet.com/sitemap.xml
```

6. Use URL Inspection for:

```text
https://apply.neexmeet.com/
https://apply.neexmeet.com/blog
https://apply.neexmeet.com/blog/ats-friendly-resume-india-2026
```

7. Check these reports weekly:

- Pages: confirm blog URLs are indexed.
- Sitemaps: confirm the sitemap was read successfully.
- Search results: track impressions, clicks, CTR, and average position.
- Core Web Vitals: watch mobile LCP, INP, and CLS.

Target early keywords:

- resume builder for engineering students India
- ATS resume optimizer for freshers
- internship resume builder free
- fresher resume format for IT companies
- engineering student resume template
