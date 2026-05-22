# CSL Website — Complete Build Checklist

Generated from review of all files in `WEBSITE/` (Apr 2026), benchmarked against custom-music / scoring competitors (Marmoset, Musicbed, Soundstripe, Audiomachine, individual composer sites). Filtered to CSL's specific premium-bespoke positioning.

Legend: `[x]` shipped · `[~]` partial / placeholder · `[ ]` missing

---

## UPDATE — Apr 26, 2026 Sweep

**Just completed:**
- Archived `.bak` files + duplicate `img_ps2_alt.jpg` to `ARCHIVE/`
- Removed duplicate "Pricing" footer link in `CSL_index.html`
- Compressed 10 hero/decor images → WebP (11.8 MB → 1.7 MB total)
- Generated favicons (`.ico`, `16`, `32`, `180`, `192`, `512`)
- Added SEO meta (canonical + OG + Twitter) to index/about/pricing/portfolio/booking
- Added JSON-LD `LocalBusiness` schema on index
- Created `robots.txt` + `sitemap.xml`
- Added **Founder's Promise** + **Delivery-Ready For** + **Newsletter** sections to home
- Added **AI/Authorship Disclosure** section to `CSL_licensing.html`
- Added **DMCA + Designated Agent** section to `CSL_legal.html` (Section 12)
- Created `CSL_ip_assignment.html` (Founder IP Assignment Agreement, printable)
- Created `CSL_case_study_gaming.html` (first case study, 7-level game OST)

**Still needed from you:**
- Drop a founder headshot as `img_founder_avery.jpg` in WEBSITE folder
- Confirm domain (`currentscoringleaders.com` assumed in canonical/sitemap)
- Wire `CSL_BACKEND_URL` in `csl-forms.js` to live Apps Script URL
- Sign printed IP Assignment page and file internally
- Review AI disclosure wording on licensing page for your comfort

---

## INCIDENT — Apr 26, 2026 PowerShell Recovery

A SEO-injection PowerShell script with a buggy `-replace ... ,1` argument zeroed out 6 HTML files mid-run. No backups existed (untracked git folder, no OneDrive/Dropbox copies). All 6 files were rebuilt from scratch:

- `CSL_ip_assignment.html` — perfect recreation from chat history
- `CSL_legal.html` — comprehensive 5-tab rebuild (Terms, Privacy, Refund, Liability, DMCA), reconstructed from earlier conversation reads
- `CSL_ip.html` — IP &amp; Ownership policy with rights-by-tier table
- `CSL_process.html` — 5-step timeline page with turnarounds callout
- `CSL_signup.html` — multi-step (5-step) intake form with progress bar, review screen, and CSL helper integration
- `CSL_contracts.html` — 4-tab contract templates (License, SOW, WFH, NDA) with `?contract=license` URL routing

**Lessons applied:**
- Dangerous PowerShell scripts (`_inject_seo*.ps1`) deleted from the folder
- Future bulk edits will use `try/catch` + non-empty validation before `Set-Content`
- Folder needs to be initialized as a git repo for protection going forward

---

## UPDATE — Apr 27, 2026 Launch-Blocker Sweep

**Just completed:**
- Created `csl-cookie-banner.js` — GDPR/CCPA-compliant consent banner with localStorage persistence, Accept/Reject parity, and `window.CSL_CONSENT` API for future analytics
- Injected the banner script tag into all **19 HTML files** (validated edits with try/catch + non-empty checks)
- Switched `csl-forms.js` from Google Apps Script to **Formspree** — single-placeholder config (just paste form ID), proper JSON POST, error parsing, honeypot enforcement
- Created `vercel.json` — clean URL redirects (`/about`, `/pricing`, etc.), HSTS, X-Frame-Options, Permissions-Policy, smart cache headers per file type
- **Initialized git repo** with `.gitignore` (excludes `.bak`, `.env`, `ARCHIVE/`, `.vercel/`)
- Initial commit captures full website state — no more wipe risk

**Decisions locked in:**
- Domain: `currentscoringleaders.com` (confirmed)
- Hosting: Vercel (free tier, MCP-deployable)
- Form backend: Formspree (free tier)

**Still needed from you:**
- Sign up at [formspree.io](https://formspree.io) → create form → paste form ID into `csl-forms.js` line 24
- Sign up at [vercel.com](https://vercel.com) → connect this folder → deploy
- Drop founder headshot as `img_founder_avery.jpg` in WEBSITE folder
- Sign printed IP Assignment page and file internally

See `DEPLOYMENT_GUIDE.md` for step-by-step instructions on the above.

---

## 1. Core Pages

- [x] **Home / Index** — `CSL_index.html` (hero, services preview, audience, process, CTA)
- [x] **Pricing** — `CSL_pricing.html` (full tiers)
- [x] **Portfolio** — `CSL_portfolio.html` (60+ tracks w/ `<audio>` players, filters)
- [x] **Process** — `CSL_process.html`
- [x] **About + Contact** — `CSL_about.html` (bio, contact card, quick-message form)
- [x] **FAQ** — `CSL_faq.html`
- [x] **Booking / Project Inquiry** — `CSL_booking.html`
- [x] **Client Signup / Intake** — `CSL_signup.html`
- [x] **Contracts** — `CSL_contracts.html`
- [x] **IP & Ownership** — `CSL_ip.html`
- [x] **Licensing** — `CSL_licensing.html`
- [x] **Legal Center** — `CSL_legal.html` (Terms, Privacy, Refund, Liability)
- [~] **Privacy Policy** — `CSL_privacy.html` is a redirect stub to `CSL_legal.html?tab=privacy` (functional, but not standalone for SEO)
- [~] **Terms of Service** — `CSL_terms.html` redirect stub (same)
- [~] **Services** — `CSL_services.html` redirect stub to pricing (consider whether to keep stub or remove)
- [x] **Thank You / Confirmation** — `CSL_thankyou.html`
- [x] **404 Page** — `CSL_404.html`
- [ ] **Refund Policy (standalone)** — currently only inside `CSL_legal.html`; competitors usually have a direct URL
- [ ] **Cookie Policy (standalone)** — referenced by GDPR/CCPA; can be a section but should be linkable
- [ ] **Accessibility Statement** — increasingly expected on professional services sites
- [ ] **Press / Media Kit page** — logo downloads, founder photos, brand guidelines, boilerplate copy
- [ ] **Case Studies page** — long-form project breakdowns (different from portfolio gallery)
- [ ] **Blog / Insights / News** — composition tips, behind-the-scenes; major SEO driver competitors all have
- [ ] **Newsletter / Mailing-list landing** — subscriber capture for marketing flywheel
- [ ] **Sitemap (HTML, user-facing)** — small footer link

## 2. Content Sections (cross-page)

- [x] Hero with brand promise + studio photo
- [x] Service tiers w/ pricing
- [x] Audience segments ("Who we serve")
- [x] 4-step process explainer
- [x] CTA banners
- [x] Founder bio (FreshWater / Avery Jones)
- [x] Audio portfolio with categorized players
- [ ] **Testimonials / client quotes** — none found anywhere
- [ ] **Client logos / "trusted by" strip** — none
- [ ] **Featured case study on home** — none
- [ ] **Numerical social proof beyond track count** — e.g., delivery time, on-time rate, repeat-client %
- [ ] **Press mentions / awards** — if/when applicable
- [ ] **Genre / style explorer** — competitors let users browse by mood/tempo/instrument
- [ ] **Sample license preview / sample contract PDF download** — builds trust pre-purchase
- [ ] **Founder photo on About** — verify presence (currently no `img_avery_*` or `img_freshwater_*` file in folder)
- [ ] **Studio gear / DAW credits** — niche but builds credibility for scoring buyers
- [ ] **"How we're different from stock libraries" comparison** — direct attack on competitor positioning

## 3. Forms & Lead Capture

- [x] Booking / project inquiry form (`CSL_booking.html`)
- [x] Quick contact message form (`CSL_about.html`)
- [x] Multi-step client intake / signup (`CSL_signup.html`)
- [x] Contract acknowledgement form (`CSL_contracts.html`)
- [x] IP / rights acknowledgement form (`CSL_ip.html`)
- [x] Honeypot spam protection (`_gotcha` field across forms)
- [x] Shared submission helper (`csl-forms.js`)
- [~] **Backend wired up** — `CSL_BACKEND_URL = 'PASTE_YOUR_APPS_SCRIPT_URL_HERE'` in `csl-forms.js` (placeholder, no live endpoint)
- [ ] **Newsletter / email capture form** — none
- [ ] **Custom-quote / pricing calculator** — competitors often have one
- [ ] **File upload** in booking (reference tracks, scripts, video)
- [ ] **Server-side reCAPTCHA / Turnstile** — currently honeypot only
- [ ] **Confirmation email automation** — depends on Apps Script implementation; verify
- [ ] **Calendar booking** (Calendly / Cal.com) for discovery calls

## 4. Legal & Compliance

- [x] Terms of Service (in `CSL_legal.html`)
- [x] Privacy Policy (in `CSL_legal.html`)
- [x] Refund Policy (in `CSL_legal.html`)
- [x] Liability / Disclaimers (in `CSL_legal.html`)
- [x] IP & ownership policy (`CSL_ip.html`)
- [x] PA governing law clause
- [x] LLC name + address listed
- [ ] **Cookie consent banner** — none (required for EU/CA visitors)
- [ ] **DMCA / copyright takedown notice & agent designation** — important since you sell music
- [ ] **AI-disclosure statement** — Suno-generated tracks need disclosure language for buyers (Copyright Office GRUW process, sync clients, etc.)
- [ ] **Founder IP Assignment Agreement (signed PDF)** — pre-3/30/2026 IP transfer from Avery Jones individual to CSL LLC (per business memo). Should be uploaded as internal record, optionally referenced in IP page
- [ ] **Sample license PDFs** linked from licensing page — Creator / Sync / Sync Premium / WFH / Exclusive
- [ ] **W-9 / EIN verification info** for B2B clients

## 5. SEO & Discoverability

- [x] `<title>` tags
- [x] `<meta name="description">`
- [ ] **Open Graph tags** (`og:title`, `og:description`, `og:image`, `og:url`) — none found
- [ ] **Twitter Card tags** — none
- [ ] **Canonical URLs** — none
- [ ] **JSON-LD structured data** — none. Should add `MusicGroup` / `LocalBusiness` / `Service` schema
- [ ] **`sitemap.xml`** — none in folder
- [ ] **`robots.txt`** — none in folder
- [ ] **Favicon** (`favicon.ico` / multiple sizes) — none
- [ ] **Apple touch icon** — none
- [ ] **Web app manifest** (`site.webmanifest`) — none
- [ ] **Alt text audit** on all `<img>` tags
- [ ] **Heading hierarchy audit** — competitors lose ranks here often

## 6. Analytics & Tracking

- [ ] Google Analytics 4 / Plausible / Fathom — none
- [ ] Search Console verification meta — none
- [ ] Goal / conversion events on form submits
- [ ] Heatmap (Hotjar / Microsoft Clarity) — optional
- [ ] UTM strategy for outreach campaigns

## 7. Performance & Tech

- [x] Single-page HTML, no framework — fast
- [x] Mobile media queries present
- [x] Backdrop-filter / modern CSS
- [ ] **Image optimization** — `img_csl_studio.png` is 2.8 MB, `img_csl_logo_art.png` is 1.7 MB, eagles_art*.png are 2 MB+ each. Compress to WebP/AVIF
- [ ] **Lazy loading** (`loading="lazy"`) on portfolio images / audio
- [ ] **Preload key fonts**
- [ ] **Lighthouse run** — score not yet measured
- [ ] **Working external CDN backups** (font/Font Awesome failure fallback)
- [ ] **Service worker / offline support** — optional but PWA-friendly

## 8. Hosting & Deployment

- [ ] **Domain registered** — confirm `currentscoringleaders.com` (or preferred TLD) ownership
- [ ] **DNS configured** — A/CNAME records
- [ ] **HTTPS / TLS certificate**
- [ ] **Hosting provider chosen** — current notes mention SitePro, Vercel MCP available
- [ ] **CI/CD or manual deploy workflow documented**
- [ ] **Email forwarding** — `info@`, `licensing@`, `legal@` aliases → main inbox
- [ ] **Professional email** — currently using `currentscoringleaders@gmail.com` (Gmail). Consider Google Workspace under custom domain for legitimacy
- [ ] **CSP / security headers** — `web.config` or `_headers` file
- [ ] **Backup snapshot strategy** — even just zip + git tag

## 9. Brand & Visual Assets

- [x] Logo (clean + dark variants): `CSL_logo_clean.png`, `CSL_logo_dark.png`
- [x] Hero studio photo: `img_csl_studio.png`
- [x] Decorative art: eagles_art1-3, genesis_art, ps2_collage, ranger_slayer, hero_nostalgia
- [ ] **SVG logo** — for crisp scaling and small file size
- [ ] **Vertical / square logo** — for social profiles
- [ ] **Founder headshot** (FreshWater / Avery Jones) — none in folder
- [ ] **Brand guidelines doc** — colors are defined in CSS but not extracted as a reference

## 10. Social & Off-site

- [ ] **Footer social-icon links** — none currently
- [ ] **YouTube channel link** — if applicable
- [ ] **Instagram / TikTok handles**
- [ ] **Spotify / SoundCloud / Bandcamp portfolio mirrors**
- [ ] **LinkedIn company page**
- [ ] **Google Business Profile** (Roslyn PA local SEO)
- [ ] **BMI / ASCAP profile link** (per business plan)

## 11. Operational Pages (internal but useful)

- [ ] **Status / changelog page** — what's new in services / pricing
- [ ] **Affiliate / referral program** (mentioned in services — "video editors and agencies referral partnerships")
- [ ] **Partner / agency portal** — gated discounted pricing
- [ ] **Existing-client login portal** — track revisions, deliverables (long-term)

## 12. House-keeping

- [ ] Delete or archive `_CSL_pricing_OLD.html.bak` and `_CSL_services_OLD.html.bak` (currently sitting in folder)
- [ ] Footer dedupe — `CSL_index.html` lists "Pricing" twice in footer
- [ ] Decide on `CSL_services.html` and `CSL_terms.html` and `CSL_privacy.html` redirect stubs vs. full standalone pages (SEO trade-off)
- [ ] Replace `img_ps2_collage.jpg` and `img_ps2_alt.jpg` (identical 410530 bytes, look like dupes)

---

## Priority Order to Close Gaps

**Immediate (launch blockers):**
1. Wire `CSL_BACKEND_URL` in `csl-forms.js` to a live Google Apps Script `/exec` endpoint
2. Domain + hosting + HTTPS
3. Favicon + OG tags + canonical (each page)
4. `robots.txt` + `sitemap.xml`
5. Cookie consent banner
6. Compress hero/studio images (2-3 MB → <300 KB)

**Short-term (first 30 days):**
7. Add 3-5 testimonials (even if from beta clients / referral letters)
8. Founder headshot + photo on About
9. Newsletter capture
10. JSON-LD `LocalBusiness` + `Service` schema
11. Google Analytics 4 + Search Console
12. AI-disclosure / Suno authorship statement on Licensing page

**Medium-term (60-90 days):**
13. 1-2 full case studies
14. Blog with 3-5 evergreen posts
15. Calendly integration for discovery calls
16. Press / media kit page
17. Sample license PDFs
18. Standalone Refund / Cookie / Accessibility pages

**Long-term:**
19. Client portal
20. Partner program
21. PWA / service worker
22. Affiliate referral system
