/* CSL shared components: standardized footer + sticky CTA bar
   Auto-injects on every page that loads this script. */
(function () {
    'use strict';

    var css = '.csl-footer{background:#0f0f18;border-top:1px solid #1e1e2e;padding:3.5rem 2rem 1.5rem;color:#94a3b8;font-family:\'Inter\',sans-serif;position:relative;z-index:5;}' +
    '.csl-footer-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:2.5rem;}' +
    '.csl-footer-brand img{height:42px;width:auto;margin-bottom:1rem;}' +
    '.csl-footer-brand p{font-size:0.85rem;line-height:1.6;color:#94a3b8;margin-bottom:1rem;max-width:280px;}' +
    '.csl-footer-brand .csl-footer-loc{font-size:0.78rem;color:#64748b;display:flex;align-items:center;gap:0.4rem;}' +
    '.csl-footer-col h5{font-size:0.72rem;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:#f1f5f9;margin-bottom:1rem;}' +
    '.csl-footer-col ul{list-style:none;padding:0;margin:0;}' +
    '.csl-footer-col li{margin-bottom:0.55rem;}' +
    '.csl-footer-col a{color:#94a3b8;text-decoration:none;font-size:0.86rem;transition:color 0.15s;}' +
    '.csl-footer-col a:hover{color:#3b82f6;}' +
    '.csl-footer-bottom{max-width:1200px;margin:2.5rem auto 0;padding-top:1.5rem;border-top:1px solid #1e1e2e;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;font-size:0.76rem;color:#64748b;}' +
    '.csl-footer-bottom .csl-footer-legal{display:flex;gap:1.25rem;flex-wrap:wrap;}' +
    '.csl-footer-bottom .csl-footer-legal a{color:#64748b;text-decoration:none;}' +
    '.csl-footer-bottom .csl-footer-legal a:hover{color:#94a3b8;}' +
    '@media(max-width:780px){.csl-footer-inner{grid-template-columns:1fr 1fr;gap:2rem;}.csl-footer-bottom{flex-direction:column;text-align:center;}}' +
    '@media(max-width:480px){.csl-footer-inner{grid-template-columns:1fr;}}' +
    '.csl-sticky-cta{position:fixed;bottom:0;left:0;right:0;background:linear-gradient(135deg,rgba(15,15,24,0.96),rgba(20,20,31,0.96));-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border-top:1px solid rgba(59,130,246,0.3);padding:0.75rem 1.25rem;z-index:90;transform:translateY(120%);transition:transform 0.4s cubic-bezier(0.4,0,0.2,1);font-family:\'Inter\',sans-serif;}' +
    '.csl-sticky-cta.visible{transform:translateY(0);}' +
    '.csl-sticky-cta-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:1rem;}' +
    '.csl-sticky-cta-msg{display:flex;align-items:center;gap:0.85rem;color:#f1f5f9;font-size:0.88rem;font-weight:600;flex:1;min-width:0;}' +
    '.csl-sticky-cta-msg i{color:#3b82f6;font-size:1.1rem;flex-shrink:0;}' +
    '.csl-sticky-cta-msg .csl-sub{display:block;font-size:0.72rem;font-weight:500;color:#94a3b8;margin-top:0.1rem;letter-spacing:0;}' +
    '.csl-sticky-cta-actions{display:flex;align-items:center;gap:0.5rem;flex-shrink:0;}' +
    '.csl-sticky-cta-btn{background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:white;padding:0.65rem 1.25rem;border-radius:9px;text-decoration:none;font-weight:700;font-size:0.85rem;display:inline-flex;align-items:center;gap:0.45rem;white-space:nowrap;transition:transform 0.15s;}' +
    '.csl-sticky-cta-btn:hover{transform:translateY(-1px);}' +
    '.csl-sticky-cta-close{background:transparent;border:none;color:#64748b;cursor:pointer;font-size:1.1rem;padding:0.5rem;line-height:1;}' +
    '.csl-sticky-cta-close:hover{color:#f1f5f9;}' +
    '@media(max-width:600px){.csl-sticky-cta-msg{font-size:0.78rem;}.csl-sticky-cta-msg .csl-sub{display:none;}.csl-sticky-cta-btn{padding:0.55rem 0.9rem;font-size:0.78rem;}}';

    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    /* ────── FOOTER ────── */
    var footerHTML = '<footer class="csl-footer">' +
      '<div class="csl-footer-inner">' +
        '<div class="csl-footer-brand">' +
          '<img src="CSL_logo_clean.png" alt="Current Scoring Leaders LLC">' +
          '<p>Original music scoring for creators, studios, games, and brands that take their craft seriously.</p>' +
          '<div class="csl-footer-loc"><i class="fas fa-map-marker-alt"></i> Roslyn, PA · USA</div>' +
        '</div>' +
        '<div class="csl-footer-col">' +
          '<h5>Studio</h5>' +
          '<ul>' +
            '<li><a href="CSL_index.html">Home</a></li>' +
            '<li><a href="CSL_about.html">About &amp; Contact</a></li>' +
            '<li><a href="CSL_process.html">Our Process</a></li>' +
            '<li><a href="CSL_faq.html">FAQ</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="csl-footer-col">' +
          '<h5>Work</h5>' +
          '<ul>' +
            '<li><a href="CSL_pricing.html">Pricing</a></li>' +
            '<li><a href="CSL_portfolio.html">Portfolio</a></li>' +
            '<li><a href="CSL_licensing.html">Licensing</a></li>' +
            '<li><a href="CSL_booking.html">Start a Project</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="csl-footer-col">' +
          '<h5>Legal</h5>' +
          '<ul>' +
            '<li><a href="CSL_legal.html?tab=tos">Terms of Service</a></li>' +
            '<li><a href="CSL_legal.html?tab=privacy">Privacy Policy</a></li>' +
            '<li><a href="CSL_legal.html?tab=refund">Refund Policy</a></li>' +
            '<li><a href="CSL_legal.html?tab=dmca">DMCA</a></li>' +
            '<li><a href="CSL_ip.html">IP &amp; Ownership</a></li>' +
            '<li><a href="CSL_contracts.html">Contracts</a></li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
      '<div class="csl-footer-bottom">' +
        '<div>&copy; 2026 Current Scoring Leaders LLC · All Rights Reserved</div>' +
        '<div class="csl-footer-legal">' +
          '<a href="CSL_legal.html?tab=tos">Terms</a>' +
          '<a href="CSL_legal.html?tab=privacy">Privacy</a>' +
          '<a href="CSL_legal.html?tab=dmca">DMCA</a>' +
          '<a href="mailto:currentscoringleaders@gmail.com">currentscoringleaders@gmail.com</a>' +
        '</div>' +
      '</div>' +
    '</footer>';

    function installFooter() {
        var oldFooter = document.querySelector('body > footer, footer:not(.csl-footer)');
        var wrap = document.createElement('div');
        wrap.innerHTML = footerHTML;
        var newFooter = wrap.firstElementChild;
        if (oldFooter) {
            oldFooter.replaceWith(newFooter);
        } else {
            document.body.appendChild(newFooter);
        }
    }

    /* ────── STICKY CTA ────── */
    var stickyDismissedKey = 'csl_sticky_cta_dismissed';
    var path = (location.pathname || '').toLowerCase();
    var skipPages = ['booking', 'thankyou', 'signup', 'ip_assignment'];
    var skip = false;
    for (var k = 0; k < skipPages.length; k++) {
        if (path.indexOf(skipPages[k]) !== -1) {
            skip = true;
            break;
        }
    }

    function installStickyCTA() {
        if (skip) return;
        if (sessionStorage.getItem(stickyDismissedKey) === '1') return;

        var bar = document.createElement('div');
        bar.className = 'csl-sticky-cta';
        bar.innerHTML = '<div class="csl-sticky-cta-inner">' +
            '<div class="csl-sticky-cta-msg">' +
              '<i class="fas fa-headphones"></i>' +
              '<div>' +
                '<div>Ready to score your project?</div>' +
                '<span class="csl-sub">48-hour response · Free quote · No commitment</span>' +
              '</div>' +
            '</div>' +
            '<div class="csl-sticky-cta-actions">' +
              '<a href="CSL_booking.html" class="csl-sticky-cta-btn"><i class="fas fa-paper-plane"></i> Start Now</a>' +
              '<button class="csl-sticky-cta-close" aria-label="Dismiss">&times;</button>' +
            '</div>' +
          '</div>';
        document.body.appendChild(bar);

        bar.querySelector('.csl-sticky-cta-close').addEventListener('click', function () {
            bar.classList.remove('visible');
            sessionStorage.setItem(stickyDismissedKey, '1');
        });

        // Show after user scrolls 600px or after 8s on page
        var shown = false;
        function show() { if (!shown) { shown = true; bar.classList.add('visible'); } }
        window.addEventListener('scroll', function () { if (window.scrollY > 600) show(); }, { passive: true });
        setTimeout(show, 8000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { installFooter(); installStickyCTA(); });
    } else {
        installFooter();
        installStickyCTA();
    }
})();
