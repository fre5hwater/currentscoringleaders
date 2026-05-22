<?php
// Direct bypass for Mozilo - serve raw HTML without wrapper
// Place this in /legal/ as index.php to override Mozilo protection

// Prevent Mozilo from processing this file
define('MOZILO_BYPASS', true);

// Set headers to prevent caching of encrypted version
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');
header('X-Content-Type-Options: nosniff');
header('Content-Type: text/html; charset=UTF-8');

// Disable any output buffering
while (ob_get_level()) {
    ob_end_clean();
}

// Read and serve the actual content
$requested = basename($_GET['page'] ?? 'privacy');
$allowed = ['privacy', 'terms', 'licensing'];

if (!in_array($requested, $allowed)) {
    $requested = 'privacy';
}

$file = dirname(__FILE__) . '/' . $requested . '_raw.html';

if (file_exists($file)) {
    readfile($file);
} else {
    // Fallback - show legal hub
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Legal Documents - Freshwater Music</title>
        <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
        <style>
            *{margin:0;padding:0;box-sizing:border-box}
            :root{--black:#000;--gray:#1A1A1A;--cyan:#00D9FF;--green:#39FF14;--purple:#9D00FF}
            body{font-family:'Poppins',sans-serif;background:var(--black);color:#E0E0E0;line-height:1.9}
            header{background:linear-gradient(135deg,var(--gray),rgba(139,0,0,.2));border-bottom:2px solid var(--cyan);padding:20px 0;position:sticky;top:0;z-index:100}
            .hdr{max-width:1200px;margin:0 auto;padding:0 20px;display:flex;justify-content:space-between;align-items:center}
            .logo{font-family:'Fredoka One',sans-serif;font-size:24px;background:linear-gradient(135deg,var(--green),var(--cyan));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;text-decoration:none}
            nav{display:flex;gap:25px}
            nav a{color:#E0E0E0;text-decoration:none;font-size:14px}
            nav a:hover{color:var(--cyan)}
            .wrap{max-width:960px;margin:0 auto;padding:60px 20px 80px;text-align:center}
            h1{color:var(--cyan);font-size:42px;margin:20px 0}
            .docs{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:25px;margin:40px 0}
            .doc-card{background:rgba(0,217,255,.1);border:1px solid var(--cyan);border-radius:12px;padding:30px;transition:all 0.3s}
            .doc-card:hover{transform:translateY(-5px);box-shadow:0 10px 30px rgba(0,217,255,.2)}
            .doc-card a{display:inline-block;padding:10px 20px;background:var(--cyan);color:var(--black);border-radius:6px;font-weight:600;margin-top:15px}
            footer{text-align:center;color:#555;margin-top:60px;padding-top:20px;border-top:1px solid rgba(255,255,255,.1)}
        </style>
    </head>
    <body>
        <header>
            <div class="hdr">
                <a href="/" class="logo">🎵 Freshwater Music</a>
            </div>
        </header>
        <div class="wrap">
            <h1>Legal Documents</h1>
            <div class="docs">
                <div class="doc-card">
                    <h3>🔐 Privacy Policy</h3>
                    <p>Learn how we protect your data</p>
                    <a href="?page=privacy">Read</a>
                </div>
                <div class="doc-card">
                    <h3>⚖️ Terms of Service</h3>
                    <p>Terms for our services</p>
                    <a href="?page=terms">Read</a>
                </div>
                <div class="doc-card">
                    <h3>📜 Licensing</h3>
                    <p>Music licensing terms</p>
                    <a href="?page=licensing">Read</a>
                </div>
            </div>
            <footer>© 2025 Freshwater Music</footer>
        </div>
    </body>
    </html>
    <?php
}
?>
