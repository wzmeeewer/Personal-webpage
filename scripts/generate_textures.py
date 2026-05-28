from pathlib import Path
import math
import random

from PIL import Image, ImageColor, ImageDraw, ImageFilter


SIZE = 2048
OUT_DIR = Path(__file__).resolve().parents[1] / "public" / "textures" / "paper"


def rgba(hex_color, alpha):
    r, g, b = ImageColor.getrgb(hex_color)
    return (r, g, b, int(alpha * 255))


def draw_curve(draw, start, color, width, rng, length=None):
    x0, y0 = start
    length = length or rng.randint(180, 640)
    points = []
    amp1 = rng.uniform(-28, 28)
    amp2 = rng.uniform(-20, 20)
    phase = rng.uniform(0, math.tau)
    for step in range(28):
        t = step / 27
        x = x0 + length * t
        y = y0 + math.sin(t * math.pi * 2 + phase) * amp1 + math.sin(t * math.pi * 5 + phase) * amp2
        points.append((x, y))
    draw.line(points, fill=color, width=width, joint="curve")


def add_spots(layer, count, color_hex, alpha_range, size_range, rng):
    draw = ImageDraw.Draw(layer, "RGBA")
    for _ in range(count):
        size = rng.randint(*size_range)
        x = rng.randint(0, SIZE - size)
        y = rng.randint(0, SIZE - size)
        draw.rectangle((x, y, x + size, y + size), fill=rgba(color_hex, rng.uniform(*alpha_range)))


def add_fibers(layer, count, color_hex, alpha_range, width_range, rng):
    draw = ImageDraw.Draw(layer, "RGBA")
    for _ in range(count):
        start = (rng.randint(-120, SIZE - 80), rng.randint(0, SIZE))
        draw_curve(draw, start, rgba(color_hex, rng.uniform(*alpha_range)), rng.randint(*width_range), rng)


def add_blotches(layer, count_range, color_hex, alpha_range, rng):
    draw = ImageDraw.Draw(layer, "RGBA")
    for _ in range(rng.randint(*count_range)):
        w = rng.randint(260, 560)
        h = rng.randint(180, 460)
        x = rng.randint(-80, SIZE - w + 80)
        y = rng.randint(-80, SIZE - h + 80)
        blob = Image.new("RGBA", (w, h), (0, 0, 0, 0))
        blob_draw = ImageDraw.Draw(blob, "RGBA")
        blob_draw.ellipse((0, 0, w, h), fill=rgba(color_hex, rng.uniform(*alpha_range)))
        blob = blob.filter(ImageFilter.GaussianBlur(rng.randint(18, 42)))
        layer.alpha_composite(blob, (x, y))


def add_edge_darkening(image, strength):
    overlay = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    pixels = overlay.load()
    edge = 20
    max_alpha = int(255 * strength)
    for y in range(SIZE):
        dy = min(y, SIZE - 1 - y)
        for x in range(SIZE):
            d = min(x, SIZE - 1 - x, dy)
            if d < edge:
                alpha = int(max_alpha * (1 - d / edge))
                pixels[x, y] = (80, 48, 30, alpha)
    return Image.alpha_composite(image.convert("RGBA"), overlay)


def add_wood_lines(layer, rng):
    draw = ImageDraw.Draw(layer, "RGBA")
    for _ in range(rng.randint(20, 30)):
        y = rng.randint(40, SIZE - 40)
        points = []
        amp = rng.uniform(10, 34)
        phase = rng.uniform(0, math.tau)
        for step in range(90):
            t = step / 89
            x = SIZE * t
            yy = y + math.sin(t * math.pi * 4 + phase) * amp + math.sin(t * math.pi * 11 + phase) * amp * 0.18
            points.append((x, yy))
        draw.line(points, fill=rgba("#c4956e", rng.uniform(0.15, 0.30)), width=rng.randint(3, 8))


def add_stickers(layer, rng):
    colors = ["#f8d7a5", "#f6b6c3", "#d5e3bb", "#c7dbea"]
    for _ in range(rng.randint(18, 24)):
        w = rng.randint(160, 280)
        h = rng.randint(80, 160)
        x = rng.randint(80, SIZE - w - 80)
        y = rng.randint(80, SIZE - h - 80)
        angle = rng.uniform(-15, 15)
        sticker = Image.new("RGBA", (w + 24, h + 24), (0, 0, 0, 0))
        sticker_draw = ImageDraw.Draw(sticker, "RGBA")
        sticker_draw.rounded_rectangle((8, 8, w + 8, h + 8), radius=10, fill=rgba("#c4a088", 0.12))
        sticker_draw.rectangle((4, 4, w + 4, h + 4), fill=rgba(rng.choice(colors), rng.uniform(0.20, 0.35)))
        sticker = sticker.rotate(angle, resample=Image.Resampling.BICUBIC, expand=True)
        layer.alpha_composite(sticker, (x, y))


def make_texture(name, base, seed, fiber, fiber_count, fiber_alpha, fiber_width, spots, spot_color, spot_alpha, spot_size, blotch=None, wood=False, stickers=False, edge=0.10):
    rng = random.Random(seed)
    image = Image.new("RGBA", (SIZE, SIZE), ImageColor.getrgb(base) + (255,))
    layer = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))

    if blotch:
        add_blotches(layer, blotch["count"], blotch["color"], blotch["alpha"], rng)
    if wood:
        add_wood_lines(layer, rng)

    add_fibers(layer, fiber_count, fiber, fiber_alpha, fiber_width, rng)
    add_spots(layer, spots, spot_color, spot_alpha, spot_size, rng)

    if stickers:
        add_stickers(layer, rng)

    image = Image.alpha_composite(image, layer)
    image = add_edge_darkening(image, edge).convert("RGB")
    path = OUT_DIR / name
    image.save(path, "WEBP", quality=85, method=6)
    print(f"{path.name}: {path.stat().st_size / 1024:.1f} KB")


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    make_texture(
        "wood.webp",
        "#e8c9a8",
        101,
        "#8b6240",
        200,
        (0.08, 0.18),
        (1, 3),
        500,
        "#7a5030",
        (0.04, 0.12),
        (2, 6),
        wood=True,
        edge=0.15,
    )
    make_texture(
        "cream_paper.webp",
        "#fff8ee",
        102,
        "#c4a88a",
        180,
        (0.10, 0.20),
        (1, 2),
        400,
        "#b8957a",
        (0.05, 0.12),
        (2, 5),
        blotch={"count": (8, 12), "color": "#f0e2d0", "alpha": (0.08, 0.15)},
        edge=0.10,
    )
    make_texture(
        "pink_paper.webp",
        "#f8c0ca",
        103,
        "#d495a5",
        150,
        (0.10, 0.22),
        (1, 2),
        350,
        "#c48090",
        (0.06, 0.14),
        (2, 5),
        blotch={"count": (6, 10), "color": "#e8b0ba", "alpha": (0.08, 0.14)},
        edge=0.10,
    )
    make_texture(
        "yellow_paper.webp",
        "#ffe8a0",
        104,
        "#d4b870",
        150,
        (0.10, 0.22),
        (1, 2),
        350,
        "#c4a860",
        (0.06, 0.14),
        (2, 5),
        blotch={"count": (6, 10), "color": "#f0d890", "alpha": (0.08, 0.14)},
        edge=0.10,
    )
    make_texture(
        "warm_orange_paper.webp",
        "#f8d2b0",
        105,
        "#c49a78",
        160,
        (0.10, 0.20),
        (1, 2),
        380,
        "#b48868",
        (0.06, 0.14),
        (2, 5),
        blotch={"count": (6, 10), "color": "#e8c2a0", "alpha": (0.08, 0.14)},
        edge=0.10,
    )
    make_texture(
        "decorative_back.webp",
        "#fff0dc",
        106,
        "#c4a88a",
        180,
        (0.10, 0.20),
        (1, 2),
        400,
        "#b8957a",
        (0.05, 0.12),
        (2, 5),
        stickers=True,
        edge=0.12,
    )


if __name__ == "__main__":
    main()
