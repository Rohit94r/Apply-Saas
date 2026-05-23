# Google Search Console Setup

Use this after deploying `https://apply.neexmeet.com`.

1. Open Google Search Console and add the property `https://apply.neexmeet.com`.
2. Prefer DNS verification if you control the domain. Otherwise use the HTML tag method.
3. If you use the HTML tag method, copy only the verification token and set:

```bash
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-google-token
```

4. Redeploy the app.
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
