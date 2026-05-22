/**
 * CSL Mobile Navigation  Hamburger menu toggle
 * Include: <script src="csl-mobile-nav.js" defer></script>
 * Requires: csl-draft.css (mobile menu styles)
 */
(function() {
  'use strict';

  var toggleBtn, navLinks;

  function init() {
    toggleBtn = document.querySelector('.mobile-menu-toggle');
    navLinks = document.querySelector('.nav-links');
    
    if (!toggleBtn || !navLinks) return;

    toggleBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('active');
      navLinks.classList.toggle('open');
      // Update aria-expanded
      var expanded = navLinks.classList.contains('open');
      this.setAttribute('aria-expanded', expanded);
    });

    // Close menu when clicking a nav link (mobile)
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          toggleBtn.classList.remove('active');
          navLinks.classList.remove('open');
          toggleBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (window.innerWidth > 768) return;
      if (!navLinks.classList.contains('open')) return;
      if (!navLinks.contains(e.target) && !toggleBtn.contains(e.target)) {
        toggleBtn.classList.remove('active');
        navLinks.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
