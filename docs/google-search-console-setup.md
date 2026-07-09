# Google Search Console Setup

Use this after deploying `https://apply.neexmeet.com`.

## Verification (done)

The site uses **HTML meta tag** verification in `app/layout.tsx`:

```html
<meta name="google-site-verification" content="aMaC-d-l0Bvd80mzAuNQdWqHZXgzfxpwTl0kcLpdC6I" />
```

Backup HTML file (optional method):  
`https://apply.neexmeet.com/googleaMaC-d-l0Bvd80mzAuNQdWqHZXgzfxpwTl0kcLpdC6I.html`

**Property URL must be exactly:** `https://apply.neexmeet.com` (not `http://`, not `www.`)

Delete `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` from Vercel if it still holds an old token.

---

## After verification — do these 3 steps (required)

Verification alone does **not** index your site. You must:

### 1. Submit sitemap

Search Console → **Sitemaps** → add:

```text
https://apply.neexmeet.com/sitemap.xml
```

Status should become **Success** within 24 hours.

### 2. Request indexing (homepage + blog)

Search Console → **URL inspection** → paste each URL → **Request indexing**:

```text
https://apply.neexmeet.com/
https://apply.neexmeet.com/blog
https://apply.neexmeet.com/blog/ats-friendly-resume-india-2026
```

### 3. Wait for data (normal timeline)

| Report | Typical wait |
|--------|----------------|
| Sitemap processed | 1–24 hours |
| Pages indexed | 2–14 days (new site) |
| Performance / Search results | **3–7 days** after first impressions |
| Core Web Vitals | 7–28 days |

---

## "Processing data" — is it broken?

**Usually no.** Google Search Console shows **Processing data** when:

1. **Performance tab** — no search impressions yet (new site, low traffic). Data appears only after people find you on Google.
2. **Pages report** — Google is still crawling; request indexing to speed up.
3. **Sitemaps** — sitemap not submitted yet, or submitted less than 24h ago.

This is **not** a verification bug if ownership shows **Verified**.

### Quick health check

```bash
# Meta tag present
curl -sL https://apply.neexmeet.com | grep google-site-verification

# Sitemap reachable
curl -sI https://apply.neexmeet.com/sitemap.xml

# Robots allows public pages
curl -s https://apply.neexmeet.com/robots.txt
```

Expected:

- Verification meta tag with token `aMaC-d-l0Bvd80mzAuNQdWqHZXgzfxpwTl0kcLpdC6I`
- Sitemap HTTP `200`
- `Allow: /` and `Sitemap: https://apply.neexmeet.com/sitemap.xml`

---

## Weekly checks

- **Pages** — homepage and blog URLs indexed
- **Sitemaps** — last read date recent, no errors
- **Search results** — impressions, clicks (after ~1 week)
- **Core Web Vitals** — mobile LCP, INP, CLS

## Target keywords (content SEO)

- resume builder for engineering students India
- ATS resume optimizer for freshers
- internship resume builder free
- fresher resume format for IT companies
- engineering student resume template
