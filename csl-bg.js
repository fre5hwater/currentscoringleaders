/* CSL shared ambient background injector
 * Auto-inserts the wallpaper collage + waveform footer on every page that includes this script.
 * Skips injection if a page already has <div class="csl-bg-collage"> (avoids duplicates on pricing router).
 */
(function () {
  if (document.querySelector('.csl-bg-collage')) return;

  var images = [
    'img_csl_studio.webp',
    'img_eagles_art1.webp',
    'img_genesis_art.webp',
    'img_ps2_collage.webp',
    'img_hero_nostalgia.webp',
    'img_ranger_slayer.webp'
  ];

  var collage = document.createElement('div');
  collage.className = 'csl-bg-collage';
  collage.setAttribute('aria-hidden', 'true');
  
  for (var i = 0; i < images.length; i++) {
    var src = images[i];
    var img = document.createElement('img');
    img.className = 'c' + (i + 1);
    img.src = src;
    img.alt = '';
    img.loading = 'lazy';
    collage.appendChild(img);
  }

  var wave = document.createElement('div');
  wave.className = 'csl-bg-wave';
  wave.setAttribute('aria-hidden', 'true');

  var grid = document.createElement('div');
  grid.className = 'csl-bg-grid';
  grid.setAttribute('aria-hidden', 'true');

  document.body.insertBefore(wave, document.body.firstChild);
  document.body.insertBefore(grid, document.body.firstChild);
  document.body.insertBefore(collage, document.body.firstChild);
})();
