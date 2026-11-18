#!/usr/bin/env python3
"""Build index.html: join the files in src/ into one self-contained page.

    src/template.html   page shell
    src/font.css        Figtree, embedded (used by the Flam page around the phone)
    src/app.css         styles
    src/data.js         Flicks, titles, Tadka, search
    src/app.js          the app
    src/engine.js       Flick embed, option sync and sound control (shared with the bigbasket demo)
    src/assets/*.webp   cuts from the JioHotstar app, inlined as IMG[name] = [width, height, data URI]

Usage (from the repo root):
    python3 scripts/build.py
"""
import base64
import glob
import json
import os

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "src")


def read(name):
    with open(os.path.join(SRC, name), encoding="utf-8") as f:
        return f.read()


def data_uri(path, mime):
    with open(path, "rb") as f:
        return f"data:{mime};base64," + base64.b64encode(f.read()).decode()


def main():
    images = {}
    for path in sorted(glob.glob(os.path.join(SRC, "assets", "*.webp"))):
        key = os.path.splitext(os.path.basename(path))[0]
        with Image.open(path) as im:
            images[key] = [im.width, im.height, data_uri(path, "image/webp")]
    data = (
        "const IMG = " + json.dumps(images) + ";\n"
        + "const FLAMLOGO = " + json.dumps(data_uri(os.path.join(SRC, "assets", "flam_logo.png"), "image/png")) + ";\n"
        + "const JHLOGO = " + json.dumps(data_uri(os.path.join(SRC, "assets", "jh_logo.png"), "image/png")) + ";\n"
        + read("data.js")
    )
    app = read("app.js")
    if "/*ENGINE*/" not in app:
        raise SystemExit("build failed: /*ENGINE*/ is missing from src/app.js")
    app = app.replace("/*ENGINE*/", read("engine.js"))
    html = read("template.html")
    for mark, text in (("/*CSS*/", read("font.css") + read("app.css")), ("/*DATA*/", data), ("/*APP*/", app)):
        if mark not in html:
            raise SystemExit(f"build failed: {mark} is missing from src/template.html")
        html = html.replace(mark, text)
    out = os.path.join(ROOT, "index.html")
    with open(out, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"wrote {out} ({os.path.getsize(out) / 1e6:.2f} MB, {len(images)} pictures)")


if __name__ == "__main__":
    main()
