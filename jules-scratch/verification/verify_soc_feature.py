import re
from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Login to admin panel
    page.goto("http://localhost:5173/admin/login")
    page.get_by_placeholder("Enter your email").fill("test@example.com")
    page.get_by_placeholder("Enter your password").fill("password")
    page.get_by_role("button", name="Login").click()

    # Navigate to SOC page and add a new link
    page.goto("http://localhost:5173/soc")
    page.get_by_label("Name").fill("Test SOC")
    page.get_by_label("URL").fill("https://example.com/soc")
    page.get_by_role("button", name="Create SOC Link").click()

    # Verify the link was added
    page.goto("http://localhost:5173/socdisplay")
    expect(page.get_by_text("Test SOC")).to_be_visible()
    expect(page.get_by_text("https://example.com/soc")).to_be_visible()

    # Go to the website and check the footer
    page.goto("http://localhost:5174")
    footer = page.locator("footer")
    expect(footer.get_by_text("Test SOC")).to_be_visible()
    expect(footer.get_by_role("link", name="Test SOC")).to_have_attribute("href", "https://example.com/soc")

    page.screenshot(path="jules-scratch/verification/verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
