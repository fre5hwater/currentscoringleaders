/**
 * CSL Cookie Consent Banner
 * Lightweight, dependency-free, GDPR/CCPA-friendly.
 *
 * Behavior:
 *  - Shows on first visit; hides after Accept or Reject (stored in localStorage).
 *  - "Reject" is as easy as "Accept" (regulatory requirement).
 *  - Exposes window.CSL_CONSENT = { analytics: true|false } for any future analytics scripts.
 *  - Does NOT load any tracking until explicit consent is granted.
 */
(function () {
    'use strict';

    var STORAGE_KEY = 'csl_cookie_consent_v1';

    function getConsent() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    }

    function setConsent(value) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                analytics: !!value,
                ts: Date.now()
            }));
        } catch (e) { /* private mode or quota */ }
        window.CSL_CONSENT = { analytics: !!value };
        // Fire a custom event so any deferred analytics loader can react.
        try {
            window.dispatchEvent(new CustomEvent('csl:consent', { detail: { analytics: !!value } }));
        } catch (e) { /* old browser */ }
    }

    function injectStyles() {
        if (document.getElementById('csl-cookie-banner-styles')) return;
        var css = [
            '#csl-cookie-banner{',
            '  position:fixed;left:1rem;right:1rem;bottom:1rem;z-index:9999;',
            '  max-width:520px;margin-left:auto;',
            '  background:#0f0f18;color:#f1f5f9;',
            '  border:1px solid #1e1e2e;border-radius:14px;',
            '  padding:1.25rem 1.5rem;',
            '  font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;',
            '  font-size:0.88rem;line-height:1.55;',
            '  box-shadow:0 20px 50px rgba(0,0,0,0.5);',
            '  -webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);',
            '  animation:csl-cookie-slide 0.4s ease-out;',
            '}',
            '@keyframes csl-cookie-slide{from{transform:translateY(20px);opacity:0;}to{transform:translateY(0);opacity:1;}}',
            '#csl-cookie-banner h3{font-size:0.95rem;font-weight:700;margin:0 0 0.4rem;color:#f1f5f9;}',
            '#csl-cookie-banner p{margin:0 0 0.85rem;color:#cbd5e1;font-size:0.85rem;}',
            '#csl-cookie-banner a{color:#3b82f6;text-decoration:none;}',
            '#csl-cookie-banner a:hover{text-decoration:underline;}',
            '#csl-cookie-banner .csl-cb-actions{display:flex;gap:0.5rem;flex-wrap:wrap;}',
            '#csl-cookie-banner button{',
            '  flex:1;min-width:120px;padding:0.6rem 1rem;border:none;border-radius:8px;',
            '  font-family:inherit;font-size:0.85rem;font-weight:600;cursor:pointer;',
            '  transition:transform 0.15s,background 0.15s;',
            '}',
            '#csl-cookie-banner button:hover{transform:translateY(-1px);}',
            '#csl-cookie-banner .csl-cb-accept{background:#3b82f6;color:white;}',
            '#csl-cookie-banner .csl-cb-accept:hover{background:#2563eb;}',
            '#csl-cookie-banner .csl-cb-reject{background:transparent;color:#cbd5e1;border:1px solid #1e1e2e;}',
            '#csl-cookie-banner .csl-cb-reject:hover{border-color:#3b82f6;color:#f1f5f9;}',
            '@media(max-width:520px){#csl-cookie-banner{left:0.75rem;right:0.75rem;bottom:0.75rem;padding:1rem 1.1rem;}}'
        ].join('');
        var styleEl = document.createElement('style');
        styleEl.id = 'csl-cookie-banner-styles';
        styleEl.appendChild(document.createTextNode(css));
        document.head.appendChild(styleEl);
    }

    function buildBanner() {
        var wrap = document.createElement('div');
        wrap.id = 'csl-cookie-banner';
        wrap.setAttribute('role', 'dialog');
        wrap.setAttribute('aria-live', 'polite');
        wrap.setAttribute('aria-label', 'Cookie consent');

        wrap.innerHTML = [
            '<h3>We respect your privacy</h3>',
            '<p>We use a small set of cookies to keep the site running and, with your permission, to understand how it\'s used. ',
            'See our <a href="CSL_legal.html?tab=privacy">Privacy Policy</a> for details.</p>',
            '<div class="csl-cb-actions">',
            '  <button class="csl-cb-reject" type="button" aria-label="Reject optional cookies">Reject optional</button>',
            '  <button class="csl-cb-accept" type="button" aria-label="Accept all cookies">Accept all</button>',
            '</div>'
        ].join('');

        wrap.querySelector('.csl-cb-accept').addEventListener('click', function () {
            setConsent(true);
            wrap.remove();
        });
        wrap.querySelector('.csl-cb-reject').addEventListener('click', function () {
            setConsent(false);
            wrap.remove();
        });

        return wrap;
    }

    function init() {
        var existing = getConsent();
        if (existing) {
            window.CSL_CONSENT = { analytics: !!existing.analytics };
            return; // Already decided
        }
        // Defer slightly so it doesn't fight the initial paint.
        setTimeout(function () {
            injectStyles();
            document.body.appendChild(buildBanner());
        }, 600);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Public API for a future "Manage cookie preferences" footer link.
    window.CSL_Cookies = {
        reset: function () {
            try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
            location.reload();
        },
        get: getConsent
    };
})();
