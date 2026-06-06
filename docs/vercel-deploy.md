# Vercel deploy — “commit author did not have contributing access”

This error on **Hobby + private GitHub repo** means Vercel does not recognize the commit author as **you** (the repo owner on the linked GitHub account).

Your local git history already uses `Rohit Jadhav <rjdhav67@gmail.com>`. The block is almost always **GitHub ↔ Vercel account linking**, not wrong git commands.

## Fix checklist (do in order)

### 1. Use GitHub’s noreply email (most reliable)

Vercel checks the commit author against your **GitHub** identity. If `rjdhav67@gmail.com` is not verified on GitHub, use your GitHub noreply address instead:

```text
156529768+Rohit94r@users.noreply.github.com
```

New commits on this machine should use:

```bash
git commit --author="Rohit Jadhav <156529768+Rohit94r@users.noreply.github.com>" ...
```

(Find yours: GitHub → Settings → Emails → “Keep my email addresses private”.)

### 2. Verify email on GitHub

1. Open [GitHub → Settings → Emails](https://github.com/settings/emails)
2. Add **rjdhav67@gmail.com** if missing
3. Open the verification link Gmail sends
4. Optionally set it as **Primary** (recommended)

Until this email is verified, GitHub may not count you as the commit author for Vercel’s check.

### 2. Same GitHub account on Vercel

1. [Vercel Dashboard](https://vercel.com/dashboard) → **Account Settings**
2. **Login Connections** → GitHub must be **Rohit94r** (owner of `Apply-Saas`)
3. If wrong account is connected, disconnect and reconnect the correct GitHub

The Vercel project must be under **your** personal account, not a teammate’s.

### 3. Turn off deployment protection (Hobby)

1. Vercel → your **Apply** project → **Settings** → **Git**
2. Find **Deployment Protection** / **Commit Author Access**
3. Disable rules that require “contributor access” or “team member” for production

On Hobby, only the solo owner can deploy private repos anyway.

### 4. Push latest commits

```bash
git push origin main
```

You currently have 7 local commits not on GitHub yet — push them after steps 1–3.

### 5. If it still fails (pick one)

| Option | When to use |
|--------|-------------|
| **Make repo public** | Hobby allows solo-owner deploys on public repos without collaborator limits |
| **Upgrade Vercel to Pro** | Need private repo + multiple git authors / team |
| **Use GitHub noreply email** | Last resort if Gmail still not linked — set git email to `YOUR_ID+Rohit94r@users.noreply.github.com` from GitHub email settings |

## Verify commit author before push

```bash
git log -3 --format='%an <%ae> | committer: %ce'
```

You should see `rjdhav67@gmail.com` for both author and committer.

## Production env vars

Copy from `.env.vercel.example` into Vercel → Project → Settings → Environment Variables (Production + Preview).

Required minimum:

- `MONGODB_URI`, `CLERK_*`, `GROQ_API_KEY`
- `NEXT_PUBLIC_APP_URL=https://apply.neexmeet.com`
- `ADMIN_EMAIL=rjdhav67@gmail.com`
- `NEXT_PUBLIC_ADMIN_EMAIL=rjdhav67@gmail.com`
- `PAYMENT_NOTIFY_EMAIL=rjdhav67@gmail.com`

## Redeploy

After fixes: Vercel → **Deployments** → **Redeploy** latest `main`, or push an empty commit:

```bash
git commit --allow-empty -m "chore: trigger Vercel redeploy"
git push origin main
```
