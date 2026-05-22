"""
One-shot image optimization for CSL website.
- Converts heavy PNG/JPG to WebP (quality 82)
- Resizes max 1920px width for heros
- Generates favicons from CSL_logo_clean.png
Run once; keeps originals intact (outputs new files).
"""
from PIL import Image
from pathlib import Path

HERE = Path(__file__).parent
MAX_HERO = 1920
MAX_DECOR = 1400
QUALITY = 82

targets = [
    ("img_csl_studio.png",  MAX_HERO,  "img_csl_studio.webp"),
    ("img_csl_logo_art.png", MAX_DECOR, "img_csl_logo_art.webp"),
    ("img_eagles_art1.png",  MAX_DECOR, "img_eagles_art1.webp"),
    ("img_eagles_art2.png",  MAX_DECOR, "img_eagles_art2.webp"),
    ("img_eagles_art3.png",  MAX_DECOR, "img_eagles_art3.webp"),
    ("img_genesis_art.jpg",  MAX_DECOR, "img_genesis_art.webp"),
    ("img_ps2_collage.jpg",  MAX_DECOR, "img_ps2_collage.webp"),
    ("img_hero_nostalgia.jpg", MAX_HERO, "img_hero_nostalgia.webp"),
    ("img_ranger_slayer.jpg", MAX_DECOR, "img_ranger_slayer.webp"),
    ("img_genesis_schematic.jpg", MAX_DECOR, "img_genesis_schematic.webp"),
]

for src, max_w, dst in targets:
    sp = HERE / src
    if not sp.exists():
        print(f"skip (missing): {src}")
        continue
    im = Image.open(sp).convert("RGB")
    if im.width > max_w:
        ratio = max_w / im.width
        im = im.resize((max_w, int(im.height * ratio)), Image.LANCZOS)
    dp = HERE / dst
    im.save(dp, "WEBP", quality=QUALITY, method=6)
    before = sp.stat().st_size / 1024
    after = dp.stat().st_size / 1024
    print(f"{src:32s} {before:7.1f} KB -> {dst:32s} {after:7.1f} KB")

# FAVICONS from CSL_logo_clean.png
logo = HERE / "CSL_logo_clean.png"
if logo.exists():
    im = Image.open(logo).convert("RGBA")
    for size, name in [(16,"favicon-16.png"),(32,"favicon-32.png"),(180,"apple-touch-icon.png"),(192,"icon-192.png"),(512,"icon-512.png")]:
        resized = im.resize((size,size), Image.LANCZOS)
        resized.save(HERE / name, "PNG", optimize=True)
        print(f"favicon: {name}")
    # Multi-size .ico
    ico_sizes = [(16,16),(32,32),(48,48)]
    im.save(HERE / "favicon.ico", sizes=ico_sizes)
    print("favicon: favicon.ico")
else:
    print("logo missing; favicons skipped")

print("done.")
