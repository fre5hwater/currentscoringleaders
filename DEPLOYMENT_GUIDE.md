# CSL Website — Deployment Guide

Three things you need to do, in order. Total time: ~30 minutes.

---

## 1. Set Up Formspree (forms backend) — 5 minutes

The site has 5 forms (booking, contact, intake, contract ack, IP ack). They all share one Formspree endpoint.

1. Go to **https://formspree.io** and click **Get Started** (free).
2. Sign up with `currentscoringleaders@gmail.com` (or any address you'll watch).
3. Click **+ New Form**.
   - **Form name:** `CSL Website`
   - **Email:** `currentscoringleaders@gmail.com`
4. Save. You'll see a URL like:
   `https://formspree.io/f/xpzgkqab` ← copy the part after `/f/` (here: `xpzgkqab`)
5. Open `csl-forms.js` in this folder. Find line 24:

   ```js
   const CSL_FORMSPREE_ID = 'PASTE_YOUR_FORMSPREE_ID_HERE';
   ```

   Replace `PASTE_YOUR_FORMSPREE_ID_HERE` with your form ID:

   ```js
   const CSL_FORMSPREE_ID = 'xpzgkqab';
   ```

6. Save. Done. **Tell me when the ID is in and I'll commit it to git.**

> **Free-tier limit:** 50 submissions/month. If you outgrow it, upgrade to $10/mo or switch to Apps Script.

---

## 2. Deploy to Vercel — 15 minutes

Two ways. Pick whichever you prefer.

### Option A — Drag-and-drop (easiest)

1. Go to **https://vercel.com/signup** and sign up (use GitHub or email).
2. After signing in, click **Add New... → Project**.
3. Choose **Browse all templates → Other → Continue with templates** (or skip the template flow).
4. The simplest path: install the **Vercel CLI**:

   ```powershell
   npm install -g vercel
   ```

   Then from this folder:

   ```powershell
   vercel
   ```

   - Confirm: yes, set up and deploy
   - Scope: your personal account
   - Link to existing project: **No**
   - Project name: `csl-website` (or whatever)
   - Directory: `.` (current)
   - Override settings: **No**

5. After ~30 seconds you'll get a preview URL like `csl-website-abc123.vercel.app`. Open it and verify it works.
6. Run again to promote to production:

   ```powershell
   vercel --prod
   ```

### Option B — GitHub + Vercel (recommended long-term)

If you'd rather have automatic deploys on every git commit:

1. Create a free GitHub account at **https://github.com/join** (if you don't have one).
2. Create a new private repo named `csl-website`.
3. From this folder, push the existing git repo:

   ```powershell
   git remote add origin https://github.com/YOUR_USERNAME/csl-website.git
   git branch -M main
   git push -u origin main
   ```

4. At Vercel: **Add New... → Project → Import Git Repository → csl-website**.
5. Default settings work. Click **Deploy**.

Now every `git commit` + `git push` re-deploys automatically.

---

## 3. Connect Your Domain — 10 minutes

1. **Buy `currentscoringleaders.com`** if you haven't yet:
   - Cheapest legit registrar: **Cloudflare Registrar** (~$10/year, no markup)
   - Other good options: Namecheap (~$13/yr), Porkbun (~$11/yr)

2. In Vercel, open your project → **Settings → Domains → Add**.
3. Type `currentscoringleaders.com`, click **Add**.
4. Vercel will show you DNS records to add. Two options:
   - **If using Cloudflare:** add a `CNAME` record pointing `@` (or `www`) to `cname.vercel-dns.com`
   - **If using another registrar:** add the `A` record (`76.76.21.21`) and `CNAME` for `www` exactly as Vercel shows

5. DNS propagation takes 1–60 minutes. Vercel auto-issues HTTPS once it sees the records.
6. Repeat for `www.currentscoringleaders.com` if you want both to work.

---

## 4. Final Verification Checklist

After deploying, open your live URL and check:

- [ ] Home loads, hero image visible, no console errors
- [ ] Cookie banner appears on first visit; clicking Accept hides it permanently (try in incognito)
- [ ] Submit a test entry on `/booking` — confirm it arrives in your email
- [ ] Test the same on `/about` (contact form), `/signup`, `/contracts`, `/ip`
- [ ] `/sitemap.xml` and `/robots.txt` load (no 404)
- [ ] Open DevTools → Lighthouse → run audit. Aim for >90 on Performance, Accessibility, Best Practices, SEO.
- [ ] Click "View page source" on home, verify `<meta property="og:url">` has your real domain (not a placeholder)
- [ ] Submit homepage to **https://search.google.com/search-console** (add property → URL prefix → `https://currentscoringleaders.com/`)

---

## 5. Things You Still Need To Do Yourself

- [ ] **Founder headshot:** save as `img_founder_avery.jpg` in this folder before deploy. (You said you're getting one — let me know when it's saved and I'll commit it.)
- [ ] **Sign IP Assignment Agreement:** open `CSL_ip_assignment.html` in a browser, click Print → Save as PDF, sign, scan, and file in your business records folder. **Do not upload signed copy to the public site.**
- [ ] **Configure Formspree spam settings:** in your Formspree dashboard, enable hCaptcha or Akismet (free) for stronger spam filtering.

---

## When Things Break

- **Form submissions failing:** check the Formspree dashboard for "Spam" filter — may be flagging legit traffic. Whitelist your test email.
- **Cookie banner not showing:** clear localStorage (DevTools → Application → Local Storage → delete `csl_cookie_consent_v1`).
- **Vercel showing 404 on routes like `/about`:** check `vercel.json` is in the project root and was committed before deploy.
- **Site files got wiped again somehow:** `git reset --hard HEAD` recovers everything to the last committed state.

---

## Recovery Notes

This folder is a git repo as of Apr 27, 2026. Last-known-good state is always one command away:

```powershell
git log --oneline               # see commit history
git reset --hard HEAD           # discard uncommitted local changes
git diff HEAD~1 HEAD            # see what changed in the last commit
```

Make a commit before any risky bulk operation:

```powershell
git add -A
git commit -m "Pre-experiment snapshot"
```
