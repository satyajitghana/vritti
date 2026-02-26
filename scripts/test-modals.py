#!/usr/bin/env python3
"""Click-test modal components to verify they open when triggered."""

import asyncio
import json
import os
from playwright.async_api import async_playwright

MODALS = [
    "modal-alert",
    "modal-confirmation",
    "modal-cookie",
    "modal-delete",
    "modal-feedback",
    "modal-form",
    "modal-invite",
    "modal-newsletter",
    "modal-notification",
    "modal-pricing",
    "modal-profile",
    "modal-settings",
    "modal-share",
    "modal-success",
]

# Also test limited-offer-dialog
MODALS.append("limited-offer-dialog")

BASE_URL = "http://localhost:3000"
SCREENSHOT_DIR = "/home/user/vritti/screenshots/modal-tests"

os.makedirs(SCREENSHOT_DIR, exist_ok=True)

results = {}

async def test_modal(page, name):
    """Test a single modal by navigating to its preview, clicking the trigger, and checking if dialog opens."""
    url = f"{BASE_URL}/preview/{name}-demo"
    print(f"  Testing {name}...")

    try:
        await page.goto(url, wait_until="networkidle", timeout=20000)
        await page.wait_for_timeout(1000)

        # Take before screenshot
        await page.screenshot(path=f"{SCREENSHOT_DIR}/{name}-before.png")

        # Find and click the trigger button
        # Most modals use a Button component as DialogTrigger
        button = page.locator("button").first
        if await button.count() == 0:
            results[name] = {"status": "error", "message": "No button found on page"}
            return

        button_text = await button.text_content()
        await button.click()
        await page.wait_for_timeout(800)

        # Check if a dialog/modal opened
        # Radix Dialog renders with role="dialog" or data-state="open"
        dialog = page.locator('[role="dialog"], [role="alertdialog"], [data-state="open"]')
        dialog_count = await dialog.count()

        # Also check for overlay/backdrop which indicates modal is open
        overlay = page.locator('[data-state="open"][data-radix-dialog-overlay], .fixed.inset-0')
        overlay_count = await overlay.count()

        # Take after screenshot
        await page.screenshot(path=f"{SCREENSHOT_DIR}/{name}-after.png")

        if dialog_count > 0 or overlay_count > 0:
            results[name] = {
                "status": "pass",
                "message": f"Modal opened successfully (trigger: '{button_text}')",
                "dialog_elements": dialog_count,
            }
            print(f"    ✓ PASS - Modal opened (trigger: '{button_text}')")
        else:
            results[name] = {
                "status": "fail",
                "message": f"Modal did not open after clicking '{button_text}'",
            }
            print(f"    ✗ FAIL - Modal did not open after clicking '{button_text}'")

    except Exception as e:
        results[name] = {"status": "error", "message": str(e)}
        print(f"    ✗ ERROR - {e}")
        try:
            await page.screenshot(path=f"{SCREENSHOT_DIR}/{name}-error.png")
        except:
            pass

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=True,
            executable_path="/root/.cache/ms-playwright/chromium-1194/chrome-linux/chrome",
        )
        context = await browser.new_context(viewport={"width": 1280, "height": 900})
        page = await context.new_page()

        print(f"Testing {len(MODALS)} modal components...\n")

        for name in MODALS:
            await test_modal(page, name)

        await browser.close()

    # Summary
    print(f"\n{'='*50}")
    print(f"Results Summary:")
    passed = sum(1 for r in results.values() if r["status"] == "pass")
    failed = sum(1 for r in results.values() if r["status"] == "fail")
    errors = sum(1 for r in results.values() if r["status"] == "error")
    print(f"  Passed: {passed}/{len(MODALS)}")
    print(f"  Failed: {failed}/{len(MODALS)}")
    print(f"  Errors: {errors}/{len(MODALS)}")

    if failed > 0 or errors > 0:
        print(f"\nFailed/Error modals:")
        for name, result in results.items():
            if result["status"] != "pass":
                print(f"  - {name}: {result['message']}")

    # Save results
    with open(f"{SCREENSHOT_DIR}/results.json", "w") as f:
        json.dump(results, f, indent=2)

    print(f"\nScreenshots saved to {SCREENSHOT_DIR}/")

asyncio.run(main())
