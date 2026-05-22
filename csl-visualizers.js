/**
 * CSL Visualizers — Cyberpunk Visualization System
 * Handles pricing chart animations, process flows, audio visualizers, and case study interactivity
 * Dependencies: Three.js (CDN), GSAP (CDN)
 */

(function() {
  'use strict';

  const CSL_Viz = {
    initialized: false,

    /* ---- Initialize all visualizers on the page ---- */
    init: function() {
      if (this.initialized) return;
      this.initialized = true;

      this.initPricingBars();
      this.initProcessFlow();
      this.initLevelCards();
      this.initAudioWaveform();
    },

    /* ---- Animated pricing bars ---- */
    initPricingBars: function() {
      const bars = document.querySelectorAll('.viz-bar-fill');
      if (!bars.length) return;

      bars.forEach((bar, i) => {
        const height = bar.dataset.height || '120';
        bar.style.height = '0px';
        setTimeout(() => {
          bar.style.transition = 'height 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
          bar.style.height = height + 'px';
        }, 200 + (i * 200));
      });
    },

    /* ---- Process flow interactivity ---- */
    initProcessFlow: function() {
      const nodes = document.querySelectorAll('.process-node');
      if (!nodes.length) return;

      nodes.forEach(node => {
        node.addEventListener('click', function() {
          const desc = this.parentElement.querySelector('.process-desc');
          if (desc) {
            desc.style.transition = 'opacity 0.3s, transform 0.3s';
            desc.style.opacity = '1';
            desc.style.transform = 'translateY(0)';
            setTimeout(() => {
              desc.style.opacity = '';
              desc.style.transform = '';
            }, 2000);
          }
        });
      });
    },

    /* ---- Case study level card animations ---- */
    initLevelCards: function() {
      const cards = document.querySelectorAll('.csl-level-card');
      if (!cards.length) return;

      // Staggered entrance animation
      cards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-30px)';
        setTimeout(() => {
          card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateX(0)';
        }, 200 + (i * 150));
      });
    },

    /* ---- Audio waveform visualizer (Canvas-based) ---- */
    initAudioWaveform: function() {
      const containers = document.querySelectorAll('.csl-waveform-viz');
      if (!containers.length) return;

      containers.forEach(container => {
        const canvas = container.querySelector('canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width * (window.devicePixelRatio || 1);
        canvas.height = rect.height * (window.devicePixelRatio || 1);
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
        ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

        // Draw idle waveform
        this.drawIdleWaveform(ctx, rect.width, rect.height);
      });
    },

    /* ---- Generate idle waveform animation (cyberpunk style) ---- */
    drawIdleWaveform: function(ctx, w, h) {
      const bars = 64;
      const gap = 2;
      const barWidth = (w / bars) - gap;

      function animate() {
        ctx.clearRect(0, 0, w, h);
        
        for (let i = 0; i < bars; i++) {
          const amplitude = Math.sin(Date.now() / 500 + i * 0.3) * 0.4 + 0.6;
          const barHeight = Math.max(4, h * amplitude * 0.6);
          const x = i * (barWidth + gap);
          const y = (h - barHeight) / 2;

          // Neon gradient bars
          const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
          gradient.addColorStop(0, '#00f0ff');
          gradient.addColorStop(0.5, '#aa00ff');
          gradient.addColorStop(1, '#00f0ff');
          
          ctx.fillStyle = gradient;
          ctx.globalAlpha = 0.4 + (amplitude * 0.3);
          ctx.shadowColor = '#00f0ff';
          ctx.shadowBlur = 8;
          ctx.fillRect(x, y, barWidth, barHeight);
          ctx.shadowBlur = 0;
        }

        requestAnimationFrame(animate);
      }

      animate();
    }
  };

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => CSL_Viz.init());
  } else {
    CSL_Viz.init();
  }

  // Expose globally
  window.CSL_Viz = CSL_Viz;

})();
