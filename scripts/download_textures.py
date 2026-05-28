from pathlib import Path
import math
import random
import urllib.request

from PIL import Image, ImageColor, ImageDraw, ImageFilter


SIZE = 2048
OUT_DIR = Path(__file__).resolve().parents[1] / "public" / "textures" / "paper"
OUT_DIR.mkdir(parents=True, exist_ok=True)

TEXTURES = {
    "wood": "https://www.transparenttextures.com/patterns/wood-pattern.png",
    "cream_paper": "https://www.transparenttextures.com/patterns/paper-fibers.png",
    "pink_paper": "https://www.transparenttextures.com/patterns/cardboard.png",
    "yellow_paper": "https://www.transparenttextures.com/patterns/cardboard-flat.png",
    "warm_orange_paper": "https://www.transparenttextures.com/patterns/exclusive-paper.png",
    "decorative_back": "https://www.transparenttextures.com/patterns/notebook.png",
}

BASE_COLORS = {
    "wood": (232, 201, 168),
    "cream_paper": (255, 248, 238),
    "pink_paper": (248, 192, 202),
    "yellow_paper": (255, 232, 160),
    "warm_orange_paper": (248, 210, 176),
    "decorative_back": (255, 240, 220),
}


def clamp(value):
    return max(0, min(255, int(value)))


def rgba(rgb, alpha):
    return (rgb[0], rgb[1], rgb[2], int(alpha))


def darker(rgb, amount):
    return tuple(clamp(channel - amount) for channel in rgb)


def lighter(rgb, amount):
    return tuple(clamp(channel + amount) for channel in rgb)


def download_sources():
    downloaded = set()
    for name, url in TEXTURES.items():
        out_path = OUT_DIR / f"{name}.png"
        try:
            print(f"Downloading {name}...")
            request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(request, timeout=20) as response:
                out_path.write_bytes(response.read())
            print(f"  {name}.png: {out_path.stat().st_size / 1024:.0f} KB")
            downloaded.add(name)
        except Exception as exc:
            print(f"  download failed: {name}: {exc}")
    return downloaded


def tile_texture(path):
    tex = Image.open(path).convert("RGBA")
    tiled = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    for x in range(0, SIZE, tex.width):
        for y in range(0, SIZE, tex.height):
            tiled.alpha_composite(tex, (x, y))
    return tiled


def draw_bezier(draw, rng, base_color, count, alpha_range=(26, 110), width_range=(1, 4)):
    fiber_color = darker(base_color, 44)
    for _ in range(count):
        x1 = rng.randint(-100, SIZE + 100)
        y1 = rng.randint(-100, SIZE + 100)
        length = rng.randint(80, 380)
        angle = rng.uniform(0, math.tau)
        x2 = x1 + length * math.cos(angle)
        y2 = y1 + length * math.sin(angle)
        mx = (x1 + x2) / 2 + rng.randint(-70, 70)
        my = (y1 + y2) / 2 + rng.randint(-70, 70)
        alpha = rng.randint(*alpha_range)
        width = rng.randint(*width_range)
        points = []
        for step in range(34):
            t = step / 33
            x = (1 - t) ** 2 * x1 + 2 * (1 - t) * t * mx + t**2 * x2
            y = (1 - t) ** 2 * y1 + 2 * (1 - t) * t * my + t**2 * y2
            points.append((x, y))
        draw.line(points, fill=rgba(fiber_color, alpha), width=width)


def add_noise(draw, rng, base_color, count=18000):
    dark = darker(base_color, 35)
    light = lighter(base_color, 28)
    for _ in range(count):
        x = rng.randint(0, SIZE - 1)
        y = rng.randint(0, SIZE - 1)
        radius = rng.randint(1, 6)
        color = dark if rng.random() < 0.62 else light
        alpha = rng.randint(18, 74)
        draw.ellipse((x, y, x + radius, y + radius), fill=rgba(color, alpha))


def add_blotches(layer, rng, base_color, count=24):
    for _ in range(count):
        w = rng.randint(220, 780)
        h = rng.randint(150, 560)
        x = rng.randint(-120, SIZE - 80)
        y = rng.randint(-120, SIZE - 80)
        blob = Image.new("RGBA", (w, h), (0, 0, 0, 0))
        blob_draw = ImageDraw.Draw(blob, "RGBA")
        color = tuple(clamp(channel + rng.randint(-28, 22)) for channel in base_color)
        blob_draw.ellipse((0, 0, w, h), fill=rgba(color, rng.randint(18, 48)))
        blob = blob.filter(ImageFilter.GaussianBlur(rng.randint(18, 50)))
        layer.alpha_composite(blob, (x, y))


def add_edge_darkening(img, amount=34):
    pixels = img.load()
    edge = 56
    for y in range(SIZE):
        for x in range(SIZE):
            dist = min(x, y, SIZE - 1 - x, SIZE - 1 - y)
            if dist < edge:
                strength = (edge - dist) / edge
                r, g, b = pixels[x, y]
                pixels[x, y] = (
                    clamp(r - amount * strength),
                    clamp(g - amount * strength),
                    clamp(b - amount * strength),
                )


def make_seamless(img):
    """Blend opposite edges so repeated textures do not show hard seams."""
    w, h = img.size
    pixels = img.load()
    blend_width = 60

    for y in range(h):
        for x in range(blend_width):
            left_px = pixels[x, y]
            right_px = pixels[w - blend_width + x, y]
            t = x / blend_width
            blended = tuple(
                int(left_px[channel] * (1 - t) + right_px[channel] * t)
                for channel in range(3)
            )
            pixels[x, y] = blended
            pixels[w - blend_width + x, y] = blended

    for x in range(w):
        for y in range(blend_width):
            top_px = pixels[x, y]
            bottom_px = pixels[x, h - blend_width + y]
            t = y / blend_width
            blended = tuple(
                int(top_px[channel] * (1 - t) + bottom_px[channel] * t)
                for channel in range(3)
            )
            pixels[x, y] = blended
            pixels[x, h - blend_width + y] = blended

    return img


def add_wood_lines(draw, rng, base_color):
    color = darker(base_color, 58)
    for index in range(32):
        y_base = 20 + index * (2008 / 32) + rng.randint(-14, 14)
        points = []
        phase = rng.random() * math.tau
        for x in range(-40, SIZE + 81, 22):
            y = y_base + 28 * math.sin(x / 260 + phase) + 9 * math.sin(x / 80 + phase * 0.6)
            points.append((x, y))
        draw.line(points, fill=rgba(color, rng.randint(38, 105)), width=rng.randint(3, 8))


def add_decorative_stickers(layer, rng):
    sticker_colors = [
        (248, 215, 165),
        (246, 182, 195),
        (213, 227, 187),
        (199, 219, 234),
        (255, 230, 180),
        (240, 170, 180),
    ]
    for _ in range(24):
        w = rng.randint(150, 320)
        h = rng.randint(80, 190)
        sticker = Image.new("RGBA", (w + 36, h + 36), (0, 0, 0, 0))
        draw = ImageDraw.Draw(sticker, "RGBA")
        draw.rounded_rectangle((12, 14, w + 12, h + 14), radius=8, fill=(120, 100, 90, 34))
        draw.rectangle((6, 6, w + 6, h + 6), fill=rgba(rng.choice(sticker_colors), rng.randint(72, 104)))
        for _line in range(rng.randint(2, 5)):
            lx = rng.randint(18, w - 18)
            draw.line((lx, 18, lx + rng.randint(-28, 28), h - 12), fill=(140, 120, 110, 32), width=2)
        sticker = sticker.rotate(rng.uniform(-15, 15), resample=Image.Resampling.BICUBIC, expand=True)
        layer.alpha_composite(sticker, (rng.randint(40, SIZE - 380), rng.randint(40, SIZE - 260)))


def compose_texture(name, downloaded_names):
    rng = random.Random(4200 + list(BASE_COLORS).index(name))
    base_color = BASE_COLORS[name]
    bg = Image.new("RGBA", (SIZE, SIZE), base_color + (255,))

    if name in downloaded_names and (OUT_DIR / f"{name}.png").exists():
        source = tile_texture(OUT_DIR / f"{name}.png")
        bg.alpha_composite(source)

    detail = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    detail_draw = ImageDraw.Draw(detail, "RGBA")
    add_blotches(detail, rng, base_color, count=28 if name != "wood" else 18)
    add_noise(detail_draw, rng, base_color, count=24000 if name == "wood" else 19000)
    draw_bezier(detail_draw, rng, base_color, count=760 if name == "wood" else 560)
    if name == "wood":
        add_wood_lines(detail_draw, rng, base_color)
    if name == "decorative_back":
        add_decorative_stickers(detail, rng)

    result = Image.alpha_composite(bg, detail).convert("RGB")
    add_edge_darkening(result, amount=44 if name == "wood" else 34)
    result = result.filter(ImageFilter.UnsharpMask(radius=1.1, percent=80, threshold=2))
    return make_seamless(result)


def convert_all(downloaded_names):
    for name in BASE_COLORS:
        result = compose_texture(name, downloaded_names=downloaded_names)
        webp_path = OUT_DIR / f"{name}.webp"
        result.save(webp_path, "webp", quality=85, method=6)
        print(f"{name}.webp: {webp_path.stat().st_size / 1024:.0f} KB ({result.size[0]}x{result.size[1]})")
        png_path = OUT_DIR / f"{name}.png"
        if png_path.exists():
            png_path.unlink()


if __name__ == "__main__":
    downloaded_names = download_sources()
    missing = sorted(set(BASE_COLORS) - downloaded_names)
    if missing:
        print(f"Using procedural fallback base for: {', '.join(missing)}")
    convert_all(downloaded_names=downloaded_names)
