#!/usr/bin/env bash
# Recent agency work (Sep–Oct 2026) → web-ready portfolio assets.
# Sources are the delivered client files in the YSC folder (junctions to the
# external workspace drive — plug it in first). Run from the repo root:
#   bash scripts/recent-assets.sh
# Boards are composed afterwards by scripts/recent-boards.mjs (PowerShell).
set -euo pipefail
Y="C:/Users/vjalm/OneDrive/Documents/Graphic Designer/YSC"
OUT="public/images"
VID="public/videos"
mkdir -p "$OUT/augellos" "$OUT/recent" "$OUT/tnt" "$VID" "scripts/assets/recent"

# 4:5 poster → 1080x1350 JPEG (downscale only; pad when the source isn't 4:5)
poster() { # src dst [padColour]
  local pad="${3:-#111111}"
  ffmpeg -v error -y -i "$Y/$1" -vf "scale=1080:1350:force_original_aspect_ratio=decrease,pad=1080:1350:(ow-iw)/2:(oh-ih)/2:color=$pad" -q:v 4 "$2"
}

# ── Augello's ────────────────────────────────────────────────
A="Augello's/Organic Content"
poster "$A/Poster-Stories/Vertical Poster 2.jpg" "$OUT/augellos/organic-pasta.jpg"
for n in 1 2 3 4 5 6 7; do poster "$A/Carousel Post 1/Vertical Poster $n.jpg" "$OUT/augellos/carousel-$n.jpg"; done
W="Augello's/Whats On Landing Page"
D="$Y/$W/PREVIEW-Desktop-1920.png"
ffmpeg -v error -y -i "$D" -vf "crop=1920:1200:0:0,scale=1600:-2" -q:v 3 "$OUT/augellos/web-hero.jpg"
ffmpeg -v error -y -i "$D" -vf "crop=1920:1200:0:888,scale=1600:-2" -q:v 3 "$OUT/augellos/web-specials.jpg"
ffmpeg -v error -y -i "$D" -vf "crop=1920:1200:0:2840,scale=1600:-2" -q:v 3 "$OUT/augellos/web-nights.jpg"
# board sources (not published): desktop + mobile previews at board size
M="$Y/$W/PREVIEW-Mobile-420.png"
ffmpeg -v error -y -i "$D" -vf "crop=1920:1200:0:0,scale=1200:-2" -q:v 3 "scripts/assets/recent/aug-desktop-top.jpg"
ffmpeg -v error -y -i "$M" -vf "crop=840:1780:0:0,scale=420:-2" -q:v 3 "scripts/assets/recent/aug-mobile-top.jpg"
ffmpeg -v error -y -i "$M" -vf "crop=840:1780:0:1240,scale=420:-2" -q:v 3 "scripts/assets/recent/aug-mobile-specials.jpg"
P="Augello's/Ads & Google Pmax/Pmax Set 2 - Sep 2026"
for h in "02 - From Pizza to Pasta, Made with Heart" "11 - Authentic Italian, Served Warm"; do
  k="${h%% *}"
  ffmpeg -v error -y -i "$Y/$P/Landscape 1200x628/$h.jpg" -q:v 3 "scripts/assets/recent/pmax-$k-l.jpg"
  ffmpeg -v error -y -i "$Y/$P/Square 1200x1200/$h.jpg" -vf scale=800:-2 -q:v 3 "scripts/assets/recent/pmax-$k-s.jpg"
  ffmpeg -v error -y -i "$Y/$P/Portrait 960x1200/$h.jpg" -vf scale=800:-2 -q:v 3 "scripts/assets/recent/pmax-$k-p.jpg"
done

# ── JUNK ─────────────────────────────────────────────────────
C="Junk/Coastalscape/Feedback Updates"
poster "$C/JUNK_Coastalscape_Social_V2_MakeWaves_1080x1350.png" "$OUT/recent/junk-coastal-makewaves.jpg"
poster "$C/JUNK_Coastalscape_Social_V3_ArtBitesGoodVibes_1080x1350.png" "$OUT/recent/junk-coastal-artbites.jpg"
ffmpeg -v error -y -i "$Y/$C/JUNK_Coastalscape_Social_V1_Coastalscape_1080x1350.png" -vf scale=540:-2 -q:v 3 "scripts/assets/recent/junk-social-v1.jpg"
ffmpeg -v error -y -i "$Y/$C/JUNK_Coastalscape_Story_V2_MakeWaves_1080x1920.png" -vf scale=540:-2 -q:v 3 "scripts/assets/recent/junk-story.jpg"
ffmpeg -v error -y -i "$Y/$C/JUNK_Coastalscape_WhatsOn_V1_Coastalscape_1600x900.png" -vf scale=900:-2 -q:v 3 "scripts/assets/recent/junk-whatson.jpg"
ffmpeg -v error -y -i "$Y/$C/Popup/JUNK_Coastalscape_Popup_Desktop_973x644.png" -q:v 3 "scripts/assets/recent/junk-popup.jpg"
ffmpeg -v error -y -i "$Y/Junk/Coastalscape/CREATIVES - CORRECTED/JUNK_Coastalscape_EDM_Hero_1200x600.png" -vf scale=900:-2 -q:v 3 "scripts/assets/recent/junk-edm.jpg"
poster "Junk/Gluten Free Menu/JUNK-Gluten-Free-Menu-V2-300dpi.png" "$OUT/recent/junk-gf-menu.jpg" "#F9ED1A"
ffmpeg -v error -y -i "$Y/Junk/Christmas Functions Email/Junk Email.jpg" -vf "crop=612:765:0:0" -q:v 3 "$OUT/recent/junk-christmas-email.jpg"
poster "Junk/September New Contents/Task B. Creative stories/Story 1 - Beef Tataki/Vertical Poster 1 v2.jpg" "$OUT/recent/junk-beef-tataki.jpg"
poster "Junk/September New Contents/Task B. Creative stories/Story 2 - Pina Colada/Vertical Poster 2.jpg" "$OUT/recent/junk-pina-colada.jpg"

# ── Tacos 'N' Tequilas, after the launch ────────────────────
T="Tacos'N'Tequilas/Tacos N Tequilas Creatives"
for n in 1 2 3; do poster "$T/Follower Campaign/Vertical Poster $n v2.jpg" "$OUT/tnt/follower-$n.jpg"; done

# ── Roster, Sep–Oct 2026 ─────────────────────────────────────
poster "Kumar's Sweets/AFL Game Day/Vertical Poster v1.jpg" "$OUT/recent/kumars-afl.jpg"
poster "Kumar's Sweets/Content/C. Creative Posters/Vertical Poster.jpg" "$OUT/recent/kumars-october.jpg"
poster "Kumar's Indian Kitchen & sweets/Happy Navratri/Vertical Poster v1.jpg" "$OUT/recent/kumars-navratri.jpg"
poster "Renzo's/Content/Carousel Post 1/JPG/Carousel 1.jpg" "$OUT/recent/renzos-pasta.jpg"
poster "Renzo's/Content/Posters & Stories/Vertical Poster 1.jpg" "$OUT/recent/renzos-cocktail.jpg"
poster "Victoria's/Point Cook Franchise/Vertical Poster 1.jpg" "$OUT/recent/victorias-point-cook.jpg"
poster "The Hill/Seniors Lunch/Vertical Poster 1.jpg" "$OUT/recent/the-hill-seniors-lunch.jpg"
poster "Sincero/Christmas Tables/Vertical Poster 1.jpg" "$OUT/recent/sincero-christmas.jpg"
poster "GCCO/Organic Content/Vertical Poster 1.jpg" "$OUT/recent/gcco-burger.jpg"
poster "GCCO/General Chicken Co. A3 Quick Order Posters/JPG/GCCoA3QuickOrderPosterv2.jpg" "$OUT/recent/gcco-a3-qr.jpg" "#1A1A1A"
poster "AUZ/Review - Rachel D/Vertical Poster 1.jpg" "$OUT/recent/auz-review.jpg"
poster "SP/Father's Day/Vertical Poster v1.jpg" "$OUT/recent/sp-fathers-day.jpg"

# ── Client motion (audio stripped: music licences cover the client's
#    channels, not a public portfolio; the site plays reels muted anyway) ──
reel() { # src dst posterAt
  ffmpeg -v error -y -i "$Y/$1" -vf "scale=720:1280:flags=lanczos,fps=30" -c:v libx264 -preset slow -crf 25 -pix_fmt yuv420p -movflags +faststart -an "$VID/$2.mp4"
  ffmpeg -v error -y -ss "$3" -i "$VID/$2.mp4" -frames:v 1 -q:v 3 "$OUT/recent/$2-poster.jpg"
}
reel "$A/Reel/Reel.mp4" augellos-reel 3.5
reel "Renzo's/Content/Posters & Stories/Animated Story 1.mp4" renzos-story 3.5
reel "$T/Follower Campaign/Animated Story 1 v2.mp4" tnt-follower-story 5

echo "assets done"

# ── added in pass 2 ──────────────────────────────────────────
poster "$A/Poster-Stories/Vertical Photo Edit 6.jpg" "$OUT/augellos/photo-edit.jpg"
poster "$T/Follower Campaign/Google Poster 3 v2.jpg" "$OUT/tnt/follower-google.jpg" "#FBEED0"

# ── October 2026 roster additions (pass 3) ──────────────────
poster "Kumar's Sweets/Dussehra/Vertical Poster.jpg" "$OUT/recent/kumars-dussehra.jpg"
poster "Kumar's Indian Kitchen & sweets/EL02 Thali Ads/Vertical Poster 1.jpg" "$OUT/recent/kumars-thali.jpg"
poster "Victoria's/Melbourne Cup/v1/Vertical Poster 1.jpg" "$OUT/recent/victorias-melbourne-cup.jpg"
poster "Junk/Melbourne Cup Catering/v2/A. Posters/Vertical Poster 1.jpg" "$OUT/recent/junk-melbourne-cup-1.jpg"
poster "Junk/Melbourne Cup Catering/v2/A. Posters/Vertical Poster 2.jpg" "$OUT/recent/junk-melbourne-cup-2.jpg"
poster "GCCO/Halloween/Vertical Poster.jpg" "$OUT/recent/gcco-halloween.jpg"
poster "Liliana's/Liliana's - Christmas Parties and EOY Functions/A. Posters/Vertical Poster 1.jpg" "$OUT/recent/lilianas-christmas.jpg"
poster "The Hill/Batch 3 The Lunch/Vertical Poster 1.jpg" "$OUT/recent/the-hill-lunch.jpg"
# QA safe-zone templates (Vaugn's own team tooling) → board sources
Q="The Hill/Batch 1 QA/Safe Zone Templates"
for t in ig-story-1080x1920 ig-feed-4x5-1080x1350 google-post-1200x900 ig-reel-1080x1920; do
  cp "$Y/$Q/$t-overlay.png" "scripts/assets/recent/qa-$t.png"
done

# ── pass 4: Augello's pinned-post series replaces the organic posters ──
for n in 1 2 3 4 5 6; do ffmpeg -v error -y -i "$Y/Augello's/Pinned Post 2/Vertical Poster $n.jpg" -vf "scale=1080:1350" -q:v 4 "$OUT/augellos/pinned-$n.jpg"; done
ffmpeg -v error -y -i "$Y/Augello's/Pinned Post 1/Vertical Poster 4.jpg" -vf "scale=1080:1350" -q:v 4 "$OUT/augellos/pinned-7.jpg"
