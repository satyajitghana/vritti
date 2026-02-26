#!/usr/bin/env python3
"""Screenshot WebGL/shader components using SwiftShader software rendering."""

import asyncio
import json
import os
import time
from pathlib import Path

from playwright.async_api import async_playwright

BASE_URL = "http://localhost:3000"
SCREENSHOT_DIR = Path("/home/user/vritti/screenshots")
CHROMIUM_PATH = "/root/.cache/ms-playwright/chromium-1194/chrome-linux/chrome"

VIEWPORT_WIDTH = 1280
VIEWPORT_HEIGHT = 900
SETTLE_TIME_MS = 5000  # Longer settle time for WebGL components
TIMEOUT_MS = 30000

# WebGL/shader components that were previously skipped
WEBGL_COMPONENTS = [
    # Components (use -demo suffix)
    {"name": "black-hole", "category": "backgrounds", "type": "component"},
    {"name": "ballpit", "category": "backgrounds", "type": "component"},
    {"name": "balatro", "category": "backgrounds", "type": "component"},
    {"name": "particles-3d", "category": "backgrounds", "type": "component"},
    {"name": "galaxy", "category": "backgrounds", "type": "component"},
    {"name": "hyperspeed", "category": "backgrounds", "type": "component"},
    {"name": "liquid-chrome", "category": "backgrounds", "type": "component"},
    {"name": "liquid-ether", "category": "backgrounds", "type": "component"},
    {"name": "grid-distortion", "category": "backgrounds", "type": "component"},
    {"name": "silk", "category": "backgrounds", "type": "component"},
    {"name": "model-viewer", "category": "special", "type": "component"},
    {"name": "lanyard", "category": "layouts", "type": "component"},
    {"name": "antigravity", "category": "animations", "type": "component"},
    {"name": "gravity", "category": "animations", "type": "component"},
    {"name": "aurora", "category": "backgrounds", "type": "component"},
    {"name": "aurora-dots", "category": "backgrounds", "type": "component"},
    {"name": "beams", "category": "backgrounds", "type": "component"},
    {"name": "beams-background", "category": "backgrounds", "type": "component"},
    {"name": "bolt-strike", "category": "backgrounds", "type": "component"},
    {"name": "waves", "category": "backgrounds", "type": "component"},
    {"name": "warp-background", "category": "backgrounds", "type": "component"},
    {"name": "bg-animated-fractal-dot-grid", "category": "backgrounds", "type": "component"},
    {"name": "canvas-fractal-grid", "category": "backgrounds", "type": "component"},
    {"name": "color-bends", "category": "backgrounds", "type": "component"},
    {"name": "fluid-cursor", "category": "animations", "type": "component"},
    {"name": "gradient-background", "category": "backgrounds", "type": "component"},
    {"name": "iridescent", "category": "backgrounds", "type": "component"},
    {"name": "lightning", "category": "backgrounds", "type": "component"},
    {"name": "noise-gradient", "category": "backgrounds", "type": "component"},
    {"name": "orb", "category": "backgrounds", "type": "component"},
    {"name": "particles", "category": "backgrounds", "type": "component"},
    {"name": "pixel-trail", "category": "animations", "type": "component"},
    {"name": "silk-shader", "category": "backgrounds", "type": "component"},
    {"name": "splash-cursor", "category": "animations", "type": "component"},
    {"name": "star-border", "category": "animations", "type": "component"},
    {"name": "threads", "category": "backgrounds", "type": "component"},
    {"name": "wobble", "category": "backgrounds", "type": "component"},
]

results = {"success": [], "error": []}


async def screenshot_component(page, comp, index, total):
    name = comp["name"]
    category = comp["category"]
    comp_type = comp["type"]

    preview_name = f"{name}-demo"
    url = f"{BASE_URL}/preview/{preview_name}"
    output_dir = SCREENSHOT_DIR / ("components" if comp_type == "component" else "blocks") / category
    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / f"{name}.png"

    try:
        await page.goto(url, wait_until="networkidle", timeout=TIMEOUT_MS)
        await page.wait_for_timeout(SETTLE_TIME_MS)

        await page.screenshot(path=str(output_path))
        results["success"].append(name)
        print(f"  [{index + 1}/{total}] {name} ({category}) - OK")
    except Exception as e:
        error_msg = str(e)[:150]
        results["error"].append({"name": name, "error": error_msg})
        print(f"  [{index + 1}/{total}] {name} ({category}) - ERROR: {error_msg}")

        try:
            err_dir = SCREENSHOT_DIR / "errors"
            err_dir.mkdir(parents=True, exist_ok=True)
            await page.screenshot(path=str(err_dir / f"{name}_webgl_error.png"))
        except:
            pass


async def main():
    total = len(WEBGL_COMPONENTS)
    print(f"=== WebGL Component Screenshot (SwiftShader) ===")
    print(f"Total WebGL components: {total}")
    print()

    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=True,
            executable_path=CHROMIUM_PATH,
            args=[
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
                "--use-gl=swiftshader",  # Software WebGL rendering
                "--enable-webgl",
                "--enable-webgl2",
            ],
        )

        context = await browser.new_context(
            viewport={"width": VIEWPORT_WIDTH, "height": VIEWPORT_HEIGHT}
        )
        page = await context.new_page()

        # Warm up
        print("Warming up...")
        try:
            await page.goto(f"{BASE_URL}/preview/{WEBGL_COMPONENTS[0]['name']}-demo",
                          wait_until="networkidle", timeout=TIMEOUT_MS)
            await page.wait_for_timeout(3000)
        except:
            pass

        # Screenshot each component
        for i, comp in enumerate(WEBGL_COMPONENTS):
            await screenshot_component(page, comp, i, total)

        await page.close()
        await context.close()
        await browser.close()

    # Summary
    print(f"\n{'='*50}")
    print(f"Results: {len(results['success'])}/{total} OK, {len(results['error'])}/{total} errors")
    if results["error"]:
        print("\nErrors:")
        for err in results["error"]:
            print(f"  - {err['name']}: {err['error']}")

    # Save results
    with open(SCREENSHOT_DIR / "webgl-results.json", "w") as f:
        json.dump(results, f, indent=2)


asyncio.run(main())
