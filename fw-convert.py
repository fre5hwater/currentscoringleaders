import os, re

BASE = r'C:/Users/Avery/Desktop/AI content/GOAL_TASKS/Music Scoring Business/WEBSITE'

HEAD = '''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>%s | Current Scoring Leaders</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<link rel="stylesheet" href="csl-bg.css">
<link rel="stylesheet" href="csl-draft.css">
<style>
.page-content{padding:4rem 1.5rem;max-width:1200px;margin:0 auto;width:100%}
.page-content h2{font-size:clamp(1.75rem,3vw,2.5rem);font-weight:800;margin-bottom:1.5rem;background:linear-gradient(135deg,#00a8ff,#0bc5a0);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.page-content h3{font-size:1.35rem;font-weight:700;color:#e2e8f0;margin-bottom:.75rem}
.page-content p{color:#94a3b8;line-height:1.7;margin-bottom:1rem}
.fw-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:16px;padding:2rem;transition:transform .3s,box-shadow .3s}
.fw-card:hover{transform:translateY(-4px);box-shadow:0 8px 32px rgba(0,168,255,.15)}
.fw-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.5rem;margin:2rem 0}
.fw-hero-small{padding:6rem 1.5rem 3rem;text-align:center;background:linear-gradient(180deg,rgba(0,168,255,.08),transparent);border-bottom:1px solid rgba(255,255,255,.06)}
.fw-hero-small h1{font-size:clamp(2rem,4vw,3.5rem);font-weight:900;background:linear-gradient(135deg,#00a8ff,#00d4ff,#0bc5a0);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:1rem}
.fw-hero-small .subtitle{color:#94a3b8;font-size:1.15rem;max-width:700px;margin:0 auto}
.fw-tag{display:inline-block;padding:.35rem 1rem;border-radius:100px;font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;background:linear-gradient(135deg,rgba(0,168,255,.15),rgba(11,197,160,.15));border:1px solid rgba(0,168,255,.2);color:#00a8ff;margin-bottom:1rem}
.fw-table{width:100%;border-collapse:separate;border-spacing:0;overflow:hidden;border-radius:12px;border:1px solid rgba(255,255,255,.06);margin:2rem 0}
.fw-table th{background:rgba(0,168,255,.1);padding:1rem 1.25rem;text-align:left;font-weight:700;color:#e2e8f0;border-bottom:1px solid rgba(255,255,255,.06)}
.fw-table td{padding:.9rem 1.25rem;border-bottom:1px solid rgba(255,255,255,.04);color:#cbd5e1}
.fw-table tr:last-child td{border-bottom:0}
.fw-table tr:hover td{background:rgba(0,168,255,.03)}
@media(max-width:768px){.fw-grid{grid-template-columns:1fr}.page-content{padding:2rem 1rem}}
</style>
</head>
'''

NAV = '''<nav class="draft-nav">
<div class="nav-inner">
<a href="CSL_index.html" class="nav-logo"><span class="fw-only">Fresh Water</span> <span class="csl-only">CSL</span></a>
<div class="nav-links">
<a href="CSL_index.html">Home</a>
<a href="CSL_about.html">About</a>
<a href="CSL_services.html">Services</a>
<a href="CSL_pricing.html">Pricing</a>
<a href="CSL_case_study.html">Case Study</a>
<a href="CSL_booking.html">Book</a>
</div>
<button class="nav-mobile-toggle" aria-label="Menu"><i class="fas fa-bars"></i></button>
</div>
</nav>
'''

FOOTER = '''<footer class="draft-footer">
<div class="footer-inner">
<div class="footer-brand">
<div class="footer-logo">Fresh Water <span class="dim">/ CSL</span></div>
<p class="footer-tagline">Current Scoring Leaders LLC - Fresh Water Division</p>
<p class="footer-location"><i class="fas fa-map-pin"></i> Philadelphia, PA</p>
<p class="footer-contact"><i class="fas fa-envelope"></i> avery@currentscoringleaders.com</p>
</div>
<div class="footer-links">
<a href="CSL_index.html">Home</a>
<a href="CSL_about.html">About</a>
<a href="CSL_services.html">Services</a>
<a href="CSL_pricing.html">Pricing</a>
<a href="CSL_portfolio.html">Portfolio</a>
<a href="CSL_booking.html">Book</a>
<a href="CSL_faq.html">FAQ</a>
<a href="CSL_legal.html">Legal</a>
</div>
<div class="footer-bottom">
<p>(c) 2026 Current Scoring Leaders LLC. All rights reserved.</p>
<p class="fw-quote">Music that hits. On time. On budget.</p>
</div>
</div>
</footer>
<script src="csl-chatbot.js"></script>
</body>
</html>'''

def extract(html):
    navs = [m.end() for m in re.finditer(r'</nav>', html, re.I)]
    footers = [m.start() for m in re.finditer(r'<footer', html, re.I)]
    if navs and footers:
        return html[navs[-1]:footers[0]]
    return html

def convert(fname, title):
    fp = os.path.join(BASE, fname)
    if not os.path.exists(fp):
        return None
    with open(fp, 'r', encoding='utf-8', errors='replace') as f:
        html = f.read()
    content = extract(html)
    content = re.sub(r'<script[^>]*>.*?</script>', '', content, flags=re.DOTALL)
    content = content.strip()
    hero_h1 = title
    m = re.search(r'<h1[^>]*>(.*?)</h1>', content, re.DOTALL)
    if m:
        hero_h1 = re.sub(r'<[^>]+>', '', m.group(1)).strip() or title
    hero = '<section class="fw-hero-small">'
    hero += '<span class="fw-tag">Fresh Water / CSL</span>'
    hero += '<h1>' + hero_h1 + '</h1>'
    hero += '<p class="subtitle">Built different. Composed right.</p>'
    hero += '</section>'
    out = HEAD.replace('%s', title) + '<body>\n' + NAV + '\n' + hero + '\n'
    out += '<div class="page-content">' + content + '</div>\n'
    out += FOOTER
    oname = fname.replace('.html', '_draft.html')
    opath = os.path.join(BASE, oname)
    with open(opath, 'w', encoding='utf-8') as f:
        f.write(out)
    print('OK: ' + oname + ' (' + str(os.path.getsize(opath)) + ' bytes)')
    return oname

pages = [
    ('CSL_booking.html', 'Book a Project'),
    ('CSL_portfolio.html', 'Portfolio'),
    ('CSL_faq.html', 'FAQ'),
    ('CSL_legal.html', 'Legal Center'),
    ('CSL_licensing.html', 'Licensing'),
    ('CSL_contracts.html', 'Contract Templates'),
    ('CSL_signup.html', 'Client Intake'),
    ('CSL_thankyou.html', 'Thank You'),
    ('CSL_commission.html', 'Commission'),
    ('CSL_catalog.html', 'Catalog Licensing'),
    ('CSL_retainer.html', 'Monthly Retainer'),
    ('CSL_ip.html', 'Intellectual Property'),
    ('CSL_ip_assignment.html', 'IP Assignment'),
]

print('=== Converting to Fresh Water ===')
results = []
for fname, title in pages:
    r = convert(fname, title)
    if r:
        results.append(r)
print('=== Done: ' + str(len(results)) + ' pages ===')
