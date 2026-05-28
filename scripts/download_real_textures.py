"""
Download real CC0 paper/wood textures from ambientCG only.

This script intentionally has no procedural fallback. If a source asset fails,
it tries another ambientCG asset/package. If all ambientCG candidates fail, the
script exits with an error instead of generating fake paper textures.
"""

import io
import json
import os
import shutil
import subprocess
import tempfile
import time
import zipfile
import urllib.request

from PIL import Image, ImageEnhance, ImageOps


OUT_DIR = "public/textures/paper"
os.makedirs(OUT_DIR, exist_ok=True)

PACKAGES = ("2K-JPG", "1K-JPG")
CHUNK_SIZE = 1024 * 512
PER_FILE_DEADLINE_SECONDS = 600

TEXTURE_JOBS = {
    "wood": {
        "assets": ("Wood049", "Wood066", "Wood052", "Wood027"),
        "base": (232, 201, 168),
        "tint": 0.28,
    },
    "cream_paper": {
        "assets": ("Paper002", "Paper001", "Paper003", "Paper007", "Paper008"),
        "base": (255, 248, 238),
        "tint": 0.62,
    },
    "pink_paper": {
        "assets": ("Paper004", "Paper002", "Paper001", "Paper003", "Paper007"),
        "base": (248, 192, 202),
        "tint": 0.72,
    },
    "yellow_paper": {
        "assets": ("Paper006", "Paper005", "Paper001", "Paper003"),
        "base": (255, 232, 160),
        "tint": 0.70,
    },
    "warm_orange_paper": {
        "assets": ("Paper006", "Paper002", "Paper001", "Paper003", "Cardboard001"),
        "base": (248, 210, 176),
        "tint": 0.68,
    },
    "decorative_back": {
        "assets": ("Cardboard001", "Paper006", "Paper005", "Paper001"),
        "base": (255, 240, 220),
        "tint": 0.58,
    },
}


def clamp(value):
    return max(0, min(255, int(value)))


def adjust(color, amount):
    return tuple(clamp(channel + amount) for channel in color)


def fit_square(img, size=2048):
    img = ImageOps.exif_transpose(img).convert("RGB")
    width, height = img.size
    side = min(width, height)
    left = (width - side) // 2
    top = (height - side) // 2
    img = img.crop((left, top, left + side, top + side))
    return img.resize((size, size), Image.Resampling.LANCZOS)


def color_grade(img, base_color, strength):
    """Preserve the real ambientCG texture luminance while matching the room palette."""
    gray = ImageOps.grayscale(img)
    gray = ImageEnhance.Contrast(gray).enhance(1.28)
    gray = ImageEnhance.Sharpness(gray).enhance(1.15)
    tinted = ImageOps.colorize(
        gray,
        black=adjust(base_color, -68),
        white=adjust(base_color, 48),
    ).convert("RGB")
    return Image.blend(img.convert("RGB"), tinted, strength)


def pick_color_file(names):
    image_names = [
        name
        for name in names
        if name.lower().endswith((".jpg", ".jpeg", ".png", ".webp"))
    ]
    blocked_tokens = (
        "normal",
        "rough",
        "metal",
        "displacement",
        "height",
        "ao",
        "opacity",
        "arm",
        "nor",
        "bump",
    )
    candidates = [
        name
        for name in image_names
        if not any(token in name.lower() for token in blocked_tokens)
    ]
    preferred_tokens = ("color", "albedo", "basecolor", "diffuse", "_col")
    for token in preferred_tokens:
        for name in candidates:
            if token in name.lower():
                return name
    return candidates[0] if candidates else None


def download_url(url):
    curl_bin = shutil.which("curl.exe") or shutil.which("curl")
    if curl_bin:
        fd, temp_path = tempfile.mkstemp(suffix=".zip")
        os.close(fd)
        try:
            print("    downloading with curl", flush=True)
            result = subprocess.run(
                [
                    curl_bin,
                    "-L",
                    "--fail",
                    "--retry",
                    "2",
                    "--retry-delay",
                    "2",
                    "--connect-timeout",
                    "30",
                    "--max-time",
                    str(PER_FILE_DEADLINE_SECONDS),
                    "-o",
                    temp_path,
                    url,
                ],
                text=True,
                capture_output=True,
                check=False,
            )
            if result.returncode != 0:
                message = result.stderr.strip() or result.stdout.strip() or f"curl exit {result.returncode}"
                raise RuntimeError(message)
            with open(temp_path, "rb") as file:
                data = file.read()
            if len(data) < 1000:
                raise RuntimeError("downloaded file is too small")
            return data
        finally:
            if os.path.exists(temp_path):
                os.remove(temp_path)

    request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    deadline = time.monotonic() + PER_FILE_DEADLINE_SECONDS
    chunks = []
    downloaded = 0
    last_report = time.monotonic()

    with urllib.request.urlopen(request, timeout=35) as response:
        while True:
            if time.monotonic() > deadline:
                raise TimeoutError("download timed out")
            chunk = response.read(CHUNK_SIZE)
            if not chunk:
                break
            chunks.append(chunk)
            downloaded += len(chunk)
            now = time.monotonic()
            if now - last_report > 8:
                print(f"    downloaded {downloaded / 1024 / 1024:.1f} MB", flush=True)
                last_report = now

    data = b"".join(chunks)
    if len(data) < 1000:
        raise RuntimeError("downloaded file is too small")
    return data


def convert_zip_to_texture(data, out_name, job, asset_id, package):
    with zipfile.ZipFile(io.BytesIO(data)) as archive:
        color_file = pick_color_file(archive.namelist())
        if not color_file:
            raise RuntimeError("no color/albedo image found in archive")

        with archive.open(color_file) as image_file:
            img = Image.open(image_file)
            img = fit_square(img)
            img = color_grade(img, job["base"], job["tint"])

        out_path = os.path.join(OUT_DIR, f"{out_name}.webp")
        img.save(out_path, "webp", quality=92, method=6)
        size = os.path.getsize(out_path)

    print(
        f"  OK {out_name}.webp: {size / 1024:.0f} KB "
        f"(ambientCG {asset_id} {package}, {color_file})",
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
    errors = []
    for asset_id in job["assets"]:
        for package in PACKAGES:
            url = f"https://ambientcg.com/get?file={asset_id}_{package}.zip"
            print(f"Trying {out_name}: {asset_id} {package}", flush=True)
            try:
                data = download_url(url)
                return convert_zip_to_texture(data, out_name, job, asset_id, package)
            except Exception as exc:
                message = f"{asset_id} {package}: {exc}"
                print(f"  FAIL {message}", flush=True)
                errors.append(message)
    raise RuntimeError(f"{out_name} failed. Tried ambientCG only: {errors}")


def main():
    results = []
    for out_name, job in TEXTURE_JOBS.items():
        existing = os.path.join(OUT_DIR, f"{out_name}.webp")
        if os.path.exists(existing) and os.path.getsize(existing) > 50 * 1024:
            size_kb = os.path.getsize(existing) / 1024
            print(f"  skip {out_name}.webp already exists ({size_kb:.0f} KB)", flush=True)
            results.append({"name": out_name, "skipped": True, "size_kb": round(size_kb, 1)})
            continue
        results.append(download_one(out_name, job))

    metadata_path = os.path.join(OUT_DIR, "ambientcg_sources.json")
    with open(metadata_path, "w", encoding="utf-8") as file:
        json.dump(results, file, ensure_ascii=False, indent=2)

    print("\nDone. ambientCG-only texture set:", flush=True)
    for result in results:
        if result.get("skipped"):
            print(f"  {result['name']}.webp  skipped ({result['size_kb']} KB)", flush=True)
        else:
            print(
                f"  {result['name']}.webp -> {result['asset']} "
                f"{result['package']} ({result['size_kb']} KB)",
                flush=True,
            )


if __name__ == "__main__":
    main()
