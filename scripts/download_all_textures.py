"""
Download 8 NEW CC0 textures from ambientCG for the papercraft bedroom scene.

New textures (does NOT re-download existing wood/cream/pink/yellow/warmOrange/decorativeBack):
  quilt_fabric   - Fabric001  → blanket/quilt, tinted room-pink
  pillow_fabric  - Fabric003  → mattress & pillows, tinted cream
  rug_fabric     - Fabric011  → woven rug base layer, tinted soft pink
  dark_wood      - Wood042    → wardrobe/bookshelf dark trim, tinted deep brown
  white_wood     - Wood076    → window frame white-painted wood
  linen_book     - Fabric007  → book covers & hanging clothes (used with tintColor prop)
  cardboard      - Cardboard001 → door panels, tinted warm orange
  shirt_fabric   - Fabric005  → character shirt, tinted pink

Each asset: tries multiple ambientCG asset IDs and 2K/1K packages.
If ALL candidates fail, the texture is SKIPPED (warning printed) but the
script continues so partial runs still produce useful output.
"""

import io
import json
import os
import shutil
import subprocess
import sys
import tempfile
import time
import zipfile
import urllib.request

# Force UTF-8 output on Windows (avoids GBK encode errors in terminals)
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

from PIL import Image, ImageEnhance, ImageOps

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

OUT_DIR = os.path.join("public", "textures", "paper")
os.makedirs(OUT_DIR, exist_ok=True)

SOURCES_FILE = os.path.join(OUT_DIR, "ambientcg_sources.json")

PACKAGES = ("2K-JPG", "1K-JPG")
CHUNK_SIZE = 1024 * 512
PER_FILE_TIMEOUT = 600   # seconds per download attempt

# ---------------------------------------------------------------------------
# New texture jobs  (existing 6 are NOT repeated here)
# ---------------------------------------------------------------------------
# base: target RGB triple that the colour-grade will bias the texture toward
# tint: blend strength 0.0 (original) → 1.0 (solid colour).
#       Keep ≤ 0.70 to preserve texture detail.

TEXTURE_JOBS = {
    "quilt_fabric": {
        "assets": ("Fabric001", "Fabric005", "Fabric004", "Fabric002"),
        "base": (248, 185, 196),   # #f8b9c4  room blanket pink
        "tint": 0.62,
    },
    "pillow_fabric": {
        "assets": ("Fabric003", "Fabric010", "Fabric002", "Fabric001"),
        "base": (255, 247, 236),   # #fff7ec  cream mattress/pillow
        "tint": 0.55,
    },
    "rug_fabric": {
        "assets": ("Fabric011", "Fabric020", "Fabric009", "Fabric003"),
        "base": (217, 156, 171),   # #d99cab  rug shadow pink
        "tint": 0.50,
    },
    "dark_wood": {
        "assets": ("Wood042", "Wood050", "Wood037", "Wood023"),
        "base": (157, 104, 80),    # #9d6850  deep bookshelf brown
        "tint": 0.42,
    },
    "white_wood": {
        "assets": ("Wood076", "Wood084", "Wood074", "Wood070"),
        "base": (250, 246, 240),   # #faf6f0  white-painted window frame
        "tint": 0.30,
    },
    "linen_book": {
        "assets": ("Fabric007", "Fabric017", "Fabric013", "Fabric006"),
        "base": (232, 221, 208),   # #e8ddd0  neutral linen (tintColor applied in JSX)
        "tint": 0.22,
    },
    "cardboard": {
        "assets": ("Cardboard001", "Cardboard002", "Paper003", "Paper008"),
        "base": (242, 189, 145),   # #f2bd91  door warm-orange
        "tint": 0.55,
    },
    "shirt_fabric": {
        "assets": ("Fabric005", "Fabric026", "Fabric004", "Fabric002"),
        "base": (245, 163, 183),   # #f5a3b7  shirt pink
        "tint": 0.52,
    },
}

# ---------------------------------------------------------------------------
# Image helpers
# ---------------------------------------------------------------------------

def clamp(v):
    return max(0, min(255, int(v)))


def shift(rgb, amount):
    return tuple(clamp(c + amount) for c in rgb)


def fit_square(img, size=2048):
    img = ImageOps.exif_transpose(img).convert("RGB")
    w, h = img.size
    side = min(w, h)
    left = (w - side) // 2
    top  = (h - side) // 2
    img = img.crop((left, top, left + side, top + side))
    return img.resize((size, size), Image.Resampling.LANCZOS)


def color_grade(img, base_rgb, strength):
    """
    Convert to greyscale → boost contrast & sharpness → tint to base_rgb →
    blend back with the original at the given strength.
    Preserves high-frequency texture detail while matching room palette.
    """
    gray = ImageOps.grayscale(img)
    gray = ImageEnhance.Contrast(gray).enhance(1.28)
    gray = ImageEnhance.Sharpness(gray).enhance(1.15)
    tinted = ImageOps.colorize(
        gray,
        black=shift(base_rgb, -68),
        white=shift(base_rgb, +48),
    ).convert("RGB")
    return Image.blend(img.convert("RGB"), tinted, strength)


def pick_color_file(names):
    """Return the albedo/colour file from a zip's namelist."""
    imgs = [n for n in names if n.lower().endswith((".jpg", ".jpeg", ".png", ".webp"))]
    blocked = ("normal", "rough", "metal", "displacement", "height",
               "ao", "opacity", "arm", "nor", "bump")
    candidates = [n for n in imgs if not any(b in n.lower() for b in blocked)]
    for token in ("color", "albedo", "basecolor", "diffuse", "_col"):
        for n in candidates:
            if token in n.lower():
                return n
    return candidates[0] if candidates else None

# ---------------------------------------------------------------------------
# Download helpers
# ---------------------------------------------------------------------------

def download_url(url):
    curl = shutil.which("curl.exe") or shutil.which("curl")
    if curl:
        fd, tmp = tempfile.mkstemp(suffix=".zip")
        os.close(fd)
        try:
            print(f"    curl → {url}", flush=True)
            r = subprocess.run(
                [curl, "-L", "--fail", "--retry", "2", "--retry-delay", "3",
                 "--connect-timeout", "30", "--max-time", str(PER_FILE_TIMEOUT),
                 "-o", tmp, url],
                text=True, capture_output=True, check=False,
            )
            if r.returncode != 0:
                raise RuntimeError(r.stderr.strip() or f"curl exit {r.returncode}")
            with open(tmp, "rb") as fh:
                data = fh.read()
            if len(data) < 1000:
                raise RuntimeError("response too small")
            return data
        finally:
            if os.path.exists(tmp):
                os.remove(tmp)

    # fallback: urllib
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    deadline = time.monotonic() + PER_FILE_TIMEOUT
    chunks, downloaded, last_log = [], 0, time.monotonic()
    with urllib.request.urlopen(req, timeout=35) as resp:
        while True:
            if time.monotonic() > deadline:
                raise TimeoutError("download timed out")
            chunk = resp.read(CHUNK_SIZE)
            if not chunk:
                break
            chunks.append(chunk)
            downloaded += len(chunk)
            if time.monotonic() - last_log > 8:
                print(f"    {downloaded / 1024 / 1024:.1f} MB", flush=True)
                last_log = time.monotonic()
    data = b"".join(chunks)
    if len(data) < 1000:
        raise RuntimeError("response too small")
    return data


def process_zip(data, out_name, job, asset_id, package):
    with zipfile.ZipFile(io.BytesIO(data)) as zf:
        color_file = pick_color_file(zf.namelist())
        if not color_file:
            raise RuntimeError("no colour image found in archive")
        with zf.open(color_file) as fh:
            img = Image.open(fh)
            img.load()   # read before zip closes
    img = fit_square(img)
    img = color_grade(img, job["base"], job["tint"])
    out_path = os.path.join(OUT_DIR, f"{out_name}.webp")
    img.save(out_path, "webp", quality=92, method=6)
    size = os.path.getsize(out_path)
    print(
        f"  ✓ {out_name}.webp  {size / 1024:.0f} KB  "
        f"← {asset_id} {package} ({color_file})",
        flush=True,
    )
    return {
        "name": out_name,
        "asset": asset_id,
        "package": package,
        "source_file": color_file,
        "size_kb": round(size / 1024, 1),
        "source_url": f"https://ambientcg.com/a/{asset_id}",
        "download_url": f"https://ambientcg.com/get?file={asset_id}_{package}.zip",
    }


def download_one(out_name, job):
    out_path = os.path.join(OUT_DIR, f"{out_name}.webp")
    if os.path.exists(out_path):
        size = os.path.getsize(out_path)
        if size > 50_000:
            print(f"  ↷ {out_name}.webp already exists ({size // 1024} KB) – skipping", flush=True)
            return {
                "name": out_name,
                "asset": "(existing)",
                "package": "(existing)",
                "source_file": f"{out_name}.webp",
                "size_kb": round(size / 1024, 1),
                "source_url": "",
                "download_url": "",
            }

    errors = []
    for asset_id in job["assets"]:
        for package in PACKAGES:
            url = f"https://ambientcg.com/get?file={asset_id}_{package}.zip"
            print(f"  Trying {out_name}: {asset_id} {package} …", flush=True)
            try:
                data = download_url(url)
                return process_zip(data, out_name, job, asset_id, package)
            except Exception as exc:
                msg = f"{asset_id}/{package}: {exc}"
                print(f"    ✗ {msg}", flush=True)
                errors.append(msg)

    print(f"\n  ⚠ WARNING: {out_name} – all candidates failed, texture skipped.", flush=True)
    for e in errors:
        print(f"      {e}", flush=True)
    return None   # caller handles None → no JSON entry


# ---------------------------------------------------------------------------
# Sources JSON helpers
# ---------------------------------------------------------------------------

def load_existing_sources():
    if os.path.exists(SOURCES_FILE):
        try:
            with open(SOURCES_FILE, encoding="utf-8") as fh:
                return json.load(fh)
        except (json.JSONDecodeError, OSError):
            pass
    return []


def save_sources(records):
    with open(SOURCES_FILE, "w", encoding="utf-8") as fh:
        json.dump(records, fh, ensure_ascii=False, indent=2)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    print("=== download_all_textures.py ===", flush=True)
    print(f"Output dir : {os.path.abspath(OUT_DIR)}", flush=True)
    print(f"New jobs   : {len(TEXTURE_JOBS)}\n", flush=True)

    existing = load_existing_sources()
    existing_names = {r["name"] for r in existing}

    new_results = []
    failed = []

    for out_name, job in TEXTURE_JOBS.items():
        print(f"\n[{out_name}]", flush=True)
        result = download_one(out_name, job)
        if result is None:
            failed.append(out_name)
        else:
            new_results.append(result)
            existing_names.discard(out_name)   # will be replaced by new entry

    # Merge: keep existing records for names NOT in this run, append new
    merged = [r for r in existing if r["name"] not in {nr["name"] for nr in new_results}]
    merged.extend(new_results)
    save_sources(merged)

    # Summary
    print("\n" + "=" * 50, flush=True)
    print(f"Done. {len(new_results)} texture(s) written/skipped-existing, "
          f"{len(failed)} failed.\n", flush=True)

    for r in new_results:
        print(f"  {r['name']}.webp  {r['size_kb']} KB  ← {r['asset']}", flush=True)

    if failed:
        print("\nFailed (textures were skipped, scene will use fallback colour):", flush=True)
        for name in failed:
            print(f"  {name}", flush=True)
        sys.exit(1)


if __name__ == "__main__":
    main()
