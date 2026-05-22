# Sitewide theme sweep: drop purple/gold, bump nav logo, inject shared bg
# Idempotent — safe to run twice.

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path

$htmlFiles = Get-ChildItem -Path $root -Filter 'CSL_*.html' -File

# Color replacements: purple + gold + amber + pink → blue-light + silver
$colorMap = @{
    # Hex codes (case-insensitive via regex below)
    '#8b5cf6' = '#60a5fa'    # purple-500 -> blue-light
    '#a78bfa' = '#93c5fd'    # purple-400 -> blue-300
    '#c4b5fd' = '#bfdbfe'    # purple-300 -> blue-200
    '#7c3aed' = '#3b82f6'    # purple-600 -> blue
    '#c9a855' = '#cbd5e1'    # brand gold -> silver
    '#f59e0b' = '#60a5fa'    # amber-500 -> blue-light
    '#d97706' = '#3b82f6'    # amber-600 -> blue
    '#fbbf24' = '#93c5fd'    # amber-400 -> blue-300
    '#ec4899' = '#60a5fa'    # pink-500 -> blue-light
    '#f472b6' = '#93c5fd'    # pink-400 -> blue-300
    '#db2777' = '#3b82f6'    # pink-600 -> blue

    # rgba patterns
    'rgba\(139,\s*92,\s*246'     = 'rgba(96, 165, 250'
    'rgba\(167,\s*139,\s*250'    = 'rgba(147, 197, 253'
    'rgba\(201,\s*168,\s*85'     = 'rgba(203, 213, 225'
    'rgba\(245,\s*158,\s*11'     = 'rgba(96, 165, 250'
    'rgba\(236,\s*72,\s*153'     = 'rgba(96, 165, 250'
    'rgba\(124,\s*58,\s*237'     = 'rgba(59, 130, 246'

    # CSS var name aliases (preserve backward compat — variables still resolve)
    '--purple:\s*#[0-9a-fA-F]{6}'  = '--purple: #60a5fa'
    '--gold:\s*#[0-9a-fA-F]{6}'    = '--gold: #cbd5e1'
    '--amber:\s*#[0-9a-fA-F]{6}'   = '--amber: #60a5fa'
    '--pink:\s*#[0-9a-fA-F]{6}'    = '--pink: #60a5fa'
}

# Logo size bump: find `.nav-logo img { height: NNpx }` and force 120px
$logoPattern = '(\.nav-logo\s+img\s*\{[^}]*height:\s*)(\d+)(px)'

# Font import: add Space Grotesk if missing
$fontLinkPattern = '(family=Inter:wght@[0-9;]+)(&(?!family=Space\+Grotesk))'
$fontReplace = '$1&family=Space+Grotesk:wght@500;600;700$2'

# Alt: add Space Grotesk after Inter if end-of-family (no trailing &)
$fontLinkEndPattern = '(family=Inter:wght@[0-9;]+)(&display=swap)(?!.*Space\+Grotesk)'
$fontEndReplace = '$1&family=Space+Grotesk:wght@500;600;700$2'

$modified = 0
foreach ($f in $htmlFiles) {
    $c = Get-Content $f.FullName -Raw
    $orig = $c

    # Color swaps (case-insensitive)
    foreach ($k in $colorMap.Keys) {
        $c = [regex]::Replace($c, $k, $colorMap[$k], 'IgnoreCase')
    }

    # Logo bump — everywhere nav-logo img sets a height, force 120
    $c = [regex]::Replace($c, $logoPattern, { param($m) $m.Groups[1].Value + '120' + $m.Groups[3].Value }, 'IgnoreCase')

    # Font import — add Space Grotesk (two patterns, idempotent)
    if ($c -notmatch 'Space\+Grotesk') {
        $c = [regex]::Replace($c, $fontLinkEndPattern, $fontEndReplace)
    }

    # Inject bg CSS link before </head>
    if ($c -notmatch 'csl-bg\.css') {
        $c = [regex]::Replace($c, '</head>', '<link rel="stylesheet" href="csl-bg.css">' + "`n</head>", 1)
    }

    # Inject bg JS script before </body>
    if ($c -notmatch 'csl-bg\.js') {
        $c = [regex]::Replace($c, '</body>', '<script src="csl-bg.js" defer></script>' + "`n</body>", 1)
    }

    if ($c -ne $orig) {
        Set-Content -Path $f.FullName -Value $c -NoNewline
        Write-Host ("  updated: " + $f.Name)
        $modified++
    }
}

Write-Host ("`nSweep complete: " + $modified + " files modified of " + $htmlFiles.Count + " total.")
