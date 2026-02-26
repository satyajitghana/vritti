#!/usr/bin/env python3
"""
Visual Verification Script for Vritti UI Components & Blocks
Takes screenshots of all component/block preview pages using Playwright.
"""

import asyncio
import json
import os
import re
import sys
import time
from pathlib import Path

from playwright.async_api import async_playwright

# --- Configuration ---
BASE_URL = "http://localhost:3000"
SCREENSHOT_DIR = Path("/home/user/vritti/screenshots")
COMPONENT_LIST = Path("/home/user/vritti/apps/www/registry/component-list.ts")
BLOCK_LIST = Path("/home/user/vritti/apps/www/registry/block-list.ts")
CHROMIUM_PATH = "/root/.cache/ms-playwright/chromium-1194/chrome-linux/chrome"

VIEWPORT_WIDTH = 1280
VIEWPORT_HEIGHT = 900
MAX_IMAGE_HEIGHT = 1800  # Stay safely under 2000px
CONCURRENCY = 3
SETTLE_TIME_MS = 3000  # Time for lazy loading / animations
TIMEOUT_MS = 20000  # Navigation timeout

# WebGL/shader components to skip (render blank in headless)
WEBGL_SKIP = {
    "black-hole", "ballpit", "balatro", "particles-3d", "galaxy", "hyperspeed",
    "liquid-chrome", "liquid-ether", "grid-distortion", "silk", "model-viewer",
    "lanyard", "antigravity", "gravity", "aurora", "aurora-dots", "beams",
    "beams-background", "bolt-strike", "waves", "warp-background",
    "bg-animated-fractal-dot-grid", "canvas-fractal-grid", "color-bends",
    "fluid-cursor", "gradient-background", "iridescent", "lightning",
    "noise-gradient", "orb", "particles", "pixel-trail", "silk-shader",
    "splash-cursor", "star-border", "threads", "wobble",
}

# --- Results tracking ---
results = {
    "success": [],
    "error": [],
    "skipped_webgl": [],
    "tall_page": [],
    "total": 0,
    "start_time": None,
    "end_time": None,
}


def parse_list_file(filepath):
    """Parse component-list.ts or block-list.ts to extract entries."""
    content = filepath.read_text()
    pattern = r'\{\s*name:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*category:\s*"([^"]+)"\s*\}'
    return [{"name": m[0], "title": m[1], "category": m[2]}
            for m in re.findall(pattern, content)]


def build_task_list():
    """Build the full list of items to screenshot."""
    tasks = []

    # Components: screenshot the -demo version
    for comp in parse_list_file(COMPONENT_LIST):
        if comp["name"] in WEBGL_SKIP:
            results["skipped_webgl"].append(comp["name"])
            continue
        tasks.append({
            "name": comp["name"],
            "preview_name": f"{comp['name']}-demo",
            "title": comp["title"],
            "category": comp["category"],
            "type": "component",
            "url": f"{BASE_URL}/preview/{comp['name']}-demo",
            "output_dir": SCREENSHOT_DIR / "components" / comp["category"],
        })

    # Blocks: screenshot the -demo version
    for block in parse_list_file(BLOCK_LIST):
        if block["name"] in WEBGL_SKIP:
            results["skipped_webgl"].append(block["name"])
            continue
        tasks.append({
            "name": block["name"],
            "preview_name": f"{block['name']}-demo",
            "title": block["title"],
            "category": block["category"],
            "type": "block",
            "url": f"{BASE_URL}/preview/{block['name']}-demo",
            "output_dir": SCREENSHOT_DIR / "blocks" / block["category"],
        })

    return tasks


async def screenshot_task(page, task, index, total):
    """Screenshot a single component/block."""
    name = task["name"]
    preview = task["preview_name"]
    try:
        task["output_dir"].mkdir(parents=True, exist_ok=True)

        # Navigate
        await page.goto(task["url"], wait_until="networkidle", timeout=TIMEOUT_MS)

        # Wait for lazy loading and animations to settle
        await page.wait_for_timeout(SETTLE_TIME_MS)

        # Get actual page height
        page_height = await page.evaluate(
            "() => Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)"
        )

        output_path = task["output_dir"] / f"{name}.png"

        if page_height <= MAX_IMAGE_HEIGHT:
            # Single screenshot
            await page.screenshot(path=str(output_path), full_page=True)
        else:
            # Tall page: capture in segments
            results["tall_page"].append(name)
            num_segments = (page_height + MAX_IMAGE_HEIGHT - 1) // MAX_IMAGE_HEIGHT
            for i in range(min(num_segments, 5)):  # Cap at 5 segments
                y_offset = i * VIEWPORT_HEIGHT
                await page.evaluate(f"window.scrollTo(0, {y_offset})")
                await page.wait_for_timeout(300)
                segment_path = task["output_dir"] / f"{name}_part{i + 1}.png"
                await page.screenshot(path=str(segment_path))
            # Also take a single viewport screenshot as the main one
            await page.evaluate("window.scrollTo(0, 0)")
            await page.wait_for_timeout(200)
            await page.screenshot(path=str(output_path))

        results["success"].append({
            "name": name,
            "type": task["type"],
            "category": task["category"],
            "page_height": page_height,
        })
        status = "OK"

    except Exception as e:
        error_msg = str(e)[:200]
        results["error"].append({
            "name": name,
            "type": task["type"],
            "category": task["category"],
            "error": error_msg,
        })
        status = f"ERROR: {error_msg[:60]}"
        # Try to screenshot error state
        try:
            err_dir = SCREENSHOT_DIR / "errors"
            err_dir.mkdir(parents=True, exist_ok=True)
            await page.screenshot(path=str(err_dir / f"{name}_error.png"))
        except:
            pass

    print(f"  [{index + 1}/{total}] {name} ({task['category']}) - {status}")


async def worker(browser, task_queue, total):
    """Worker that processes tasks from the queue."""
    context = await browser.new_context(
        viewport={"width": VIEWPORT_WIDTH, "height": VIEWPORT_HEIGHT}
    )
    page = await context.new_page()

    while not task_queue.empty():
        try:
            index, task = task_queue.get_nowait()
        except asyncio.QueueEmpty:
            break
        await screenshot_task(page, task, index, total)
        task_queue.task_done()

    await page.close()
    await context.close()


async def main():
    tasks = build_task_list()
    results["total"] = len(tasks) + len(results["skipped_webgl"])
    results["start_time"] = time.time()

    print(f"=== Vritti UI Visual Verification ===")
    print(f"Total items: {results['total']}")
    print(f"To screenshot: {len(tasks)}")
    print(f"Skipped (WebGL): {len(results['skipped_webgl'])}")
    print()

    # Create output directories
    SCREENSHOT_DIR.mkdir(parents=True, exist_ok=True)
    (SCREENSHOT_DIR / "errors").mkdir(parents=True, exist_ok=True)

    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=True,
            executable_path=CHROMIUM_PATH,
            args=[
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
                "--disable-gpu",
            ],
        )

        # --- Warm-up: visit first few pages sequentially ---
        print("Warming up dev server (first pages trigger Next.js compilation)...")
        ctx = await browser.new_context(
            viewport={"width": VIEWPORT_WIDTH, "height": VIEWPORT_HEIGHT}
        )
        warmup_page = await ctx.new_page()
        for task in tasks[:3]:
            try:
                await warmup_page.goto(task["url"], wait_until="networkidle", timeout=30000)
                await warmup_page.wait_for_timeout(2000)
                print(f"  Warmed up: {task['name']}")
            except Exception as e:
                print(f"  Warm-up failed for {task['name']}: {e}")
        await warmup_page.close()
        await ctx.close()
        print("Warm-up complete.\n")

        # --- Group tasks by category for organized progress ---
        categories = {}
        for i, task in enumerate(tasks):
            key = f"{task['type']}/{task['category']}"
            categories.setdefault(key, []).append((i, task))

        for cat_key, cat_tasks in categories.items():
            print(f"\n--- {cat_key} ({len(cat_tasks)} items) ---")

            # Build queue for this category
            queue = asyncio.Queue()
            for item in cat_tasks:
                queue.put_nowait(item)

            # Launch workers
            num_workers = min(CONCURRENCY, len(cat_tasks))
            workers = []
            for _ in range(num_workers):
                workers.append(asyncio.create_task(
                    worker(browser, queue, len(tasks))
                ))

            await asyncio.gather(*workers)

        await browser.close()

    results["end_time"] = time.time()
    elapsed = results["end_time"] - results["start_time"]

    # --- Write report ---
    report_path = SCREENSHOT_DIR / "report.json"
    with open(report_path, "w") as f:
        json.dump(results, f, indent=2)

    print(f"\n{'=' * 50}")
    print(f"=== RESULTS ===")
    print(f"Total items:        {results['total']}")
    print(f"Screenshotted:      {len(results['success'])}")
    print(f"Errors:             {len(results['error'])}")
    print(f"Skipped (WebGL):    {len(results['skipped_webgl'])}")
    print(f"Tall pages (split): {len(results['tall_page'])}")
    print(f"Time elapsed:       {elapsed:.1f}s")
    print(f"Report saved to:    {report_path}")

    if results["error"]:
        print(f"\n=== ERRORS ===")
        for err in results["error"]:
            print(f"  {err['name']} ({err['category']}): {err['error'][:100]}")


if __name__ == "__main__":
    asyncio.run(main())
