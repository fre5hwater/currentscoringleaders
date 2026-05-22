#!/usr/bin/env python3
"""
Fresh Water Design Converter
Converts remaining CSL pages to the Fresh Water design system.
"""

import os, re

BASE = "C:/Users/Avery/Desktop/AI content/GOAL_TASKS/Music Scoring Business/WEBSITE"

# ====== HEAD TEMPLATE ======
FW_HEAD = '''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#0a0a0f">
<title>PAGE_TITLE | Current Scoring Leaders</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<link rel="stylesheet" href="csl-bg.css">
<link rel="stylesheet" href="csl-draft.css">
<style>
.page-content{padding:4rem 1.5rem;max-width:1200px;margin:0 auto;width:100%}
.page-content h2{font-size:clamp(1.75rem,3vw,2.5rem);font-weight:800;margin-bottom:1.5rem;background:linear-gradient(135deg,#00a8ff,#0bc5a0);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.page-content h3{font-size:1.35rem;font-weight:700;color:#e2e8f0;margin-bottom:0.75rem}
.page-content p{color:#94a3b8;line-height:1.7;margin-bottom:1rem}
.page-content ul{list-style:none;padding:0}
.page-content ul li{padding:0.5rem 0 0.5rem 1.5rem;position:relative;color:#cbd5e1}
.page-content ul li:before{content:"\f00c";font-family:"Font Awesome 6 Free";font-weight:900;position:absolute;left:0;color:#0bc5a0;font-size:0.8rem}
.fw-card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:2rem;transition:transform 0.3s,box-shadow 0.3s}
.fw-card:hover{transform:translateY(-4px);box-shadow:0 8px 32px rgba(0,168,255,0.15)}
.fw-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.5rem;margin:2rem 0}
.fw-hero-small{padding:6rem 1.5rem 3rem;text-align:center;position:relative;background:linear-gradient(180deg,rgba(0,168,255,0.08),transparent);border-bottom:1px solid rgba(255,255,255,0.06)}
.fw-hero-small h1{font-size:clamp(2rem,4vw,3.5rem);font-weight:900;background:linear-gradient(135deg,#00a8ff,#00d4ff,#0bc5a0);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:1rem}
.fw-hero-small .subtitle{color:#94a3b8;font-size:1.15rem;max-width:700px;margin:0 auto}
.retro-line{width:80px;height:3px;background:linear-gradient(90deg,#00a8ff,#0bc5a0);border:0;margin:1.5rem 0}
.fw-tag{display:inline-block;padding:0.35rem 1rem;border-radius:100px;font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;background:linear-gradient(135deg,rgba(0,168,255,0.15),rgba(11,197,160,0.15));border:1px solid rgba(0,168,255,0.2);color:#00a8ff;margin-bottom:1rem}
.fw-table{width:100%;border-collapse:separate;border-spacing:0;overflow:hidden;border-radius:12px;border:1px solid rgba(255,255,255,0.06);margin:2rem 0}
.fw-table th{background:rgba(0,168,255,0.1);padding:1rem 1.25rem;text-align:left;font-weight:700;color:#e2e8f0;border-bottom:1px solid rgba(255,255,255,0.06)}
.fw-table td{padding:0.9rem 1.25rem;border-bottom:1px solid rgba(255,255,255,0.04);color:#cbd5e1}
.fw-table tr:last-child td{border-bottom:0}
.fw-table tr:hover td{background:rgba(0,168,255,0.03)}
@media(max-width:768px){.fw-grid{grid-template-columns:1fr}.page-content{padding:2rem 1rem}}
</style>
</head>
'''

FW_NAV = '''<nav class="draft-nav">
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
    <button class="nav-mobile-toggle" aria-label="Toggle navigation"><i class="fas fa-bars"></i></button>
  </div>
</nav>
'''

FW_FOOTER = '''<footer class="draft-footer">
  <div class="footer-inner">
    <div class="footer-brand">
      <div class="footer-logo">Fresh Water <span class="dim">/ CSL</span></div>
      <p class="footer-tagline">Current Scoring Leaders LLC &bull; Fresh Water Division</p>
      <p class="footer-location"><i class="fas fa-map-pin"></i> Philadelphia, PA</p>
      <p class="footer-contact"><i class="fas fa-envelope"></i> <a href="mailto:avery@currentscoringleaders.com">avery@currentscoringleaders.com</a></p>
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
      <p>&copy; 2026 Current Scoring Leaders LLC. All rights reserved.</p>
      <p class="fw-quote">Music that hits. On time. On budget.</p>
    </div>
  </div>
</footer>
<script src="csl-chatbot.js"></script>
</body>
</html>'''

PAGE_TITLES = {
    'CSL_booking.html': 'Book a Project',
    'CSL_portfolio.html': 'Portfolio',
    'CSL_faq.html': 'FAQ',
    'CSL_legal.html': 'Legal Center',
    'CSL_licensing.html': 'Licensing',
    'CSL_contracts.html': 'Contract Templates',
    'CSL_signup.html': 'Client Intake',
    'CSL_thankyou.html': 'Thank You',
    'CSL_commission.html': 'Commission',
    'CSL_catalog.html': 'Catalog Licensing',
    'CSL_retainer.html': 'Monthly Retainer',
    'CSL_ip.html': 'Intellectual Property',
    'CSL_ip_assignment.html': 'IP Assignment',
}

def extract_content(html):
    """Extract main content from original page."""
    # Find nav end - try multiple patterns
    patterns = [r'<div class="page', r'<div id="page', r'<main', r'<div class="content', r'<article', r'<div class="container', r'<div class="main', r'<section']
    starts = []
    for p in patterns:
        m = re.search(p, html, re.I)
        if m:
            starts.append(m.start())
    # The latest occurrence after the nav is likely the content start
    nav_markers = [m.start() for m in re.finditer(r'</nav>', html, re.I)]
    if nav_markers:
        nav_end = nav_markers[-1]
    else:
        nav_end = 0

    # Find footer start
    footer_markers = [m.start() for m in re.finditer(r'<footer', html, re.I)]
    if footer_markers:
        footer_start = footer_markers[0]
    else:
        footer_start = len(html)

    # Extract content
    if nav_end > 0 and footer_start > nav_end:
        content = html[nav_end:footer_start]
    else:
        content = html

    # Clean up
    content = re.sub(r'<nav[^>]*>.*?</nav>', '', content, flags=re.DOTALL)
    content = re.sub(r'<body[^>]*>|<main[^>]*>|</main>', '', content)
    content = re.sub(r'<script[^>]*>.*?</script>', '', content, flags=re.DOTALL)
    content = content.strip()
    return content

def convert(filename):
    filepath = os.path.join(BASE, filename)
    if not os.path.exists(filepath):
        print(f"SKIP {filename}: not found")
        return None

    with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
        html = f.read()

    title = PAGE_TITLES.get(filename, filename.replace('.html','').replace('CSL_','').replace('_',' ').title())
    content = extract_content(html)

    # Try to extract h1 and subtitle from content
    h1_match = re.search(r'<h1[^>]*>(.*?)</h1>', content, re.DOTALL)
    hero_title = re.sub(r'<[^>]+>', '', h1_match.group(1)).strip() if h1_match else title

    sub_match = re.search(r'<p[^>]*class=["\'](?:subtitle|lead|description|tagline)["\'][^>]*>(.*?)</p>', content, re.DOTALL | re.I)
    subtitle = re.sub(r'<[^>]+>', '', sub_match.group(1)).strip() if sub_match else ''

    
