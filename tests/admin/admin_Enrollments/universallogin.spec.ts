import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Universal login test - saves storageState for reuse by other tests
// Selectors (XPath) provided by user:
const SIGNIN_BTN_XPATH = "//span[text()='Sign In']";
const USERNAME_XPATH = "//input[@id='username']";
const PASSWORD_XPATH = "//input[@id='password']";

const STORAGE_FILE = path.join(process.cwd(), 'test-results', 'storageState.json');

test('Universal sign in and save storage state', async ({ page }) => {
  // Change URL if your login page is at a different route
  await page.goto('https://example.com/login');

  // Wait for username field and fill
  const usernameLocator = page.locator(`xpath=${USERNAME_XPATH}`);
  await expect(usernameLocator).toBeVisible({ timeout: 5000 });
  await usernameLocator.fill('lmsadmin@nomail.com');

  // Wait for password field and fill
  const passwordLocator = page.locator(`xpath=${PASSWORD_XPATH}`);
  await expect(passwordLocator).toBeVisible({ timeout: 5000 });
  await passwordLocator.fill('Welcome1@');

  // Click sign in
  const signInBtn = page.locator(`xpath=${SIGNIN_BTN_XPATH}`);
  await expect(signInBtn).toBeVisible({ timeout: 5000 });

  // If clicking causes navigation, wait for it
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }),
    signInBtn.click(),
  ]).catch(async () => {
    // Some flows don't navigate — swallow and continue
    await page.waitForTimeout(2000);
  });

  // Verify some post-login indicator (title or dashboard element)
  // Adjust selector as necessary for the app
  await expect(page).toHaveTitle(/dashboard|home|qaautomation/i, { timeout: 10000 });

  // Save storage state for reuse in other tests
  await fs.promises.mkdir(path.dirname(STORAGE_FILE), { recursive: true });
  await page.context().storageState({ path: STORAGE_FILE });

  // Assert storage file exists
  expect(fs.existsSync(STORAGE_FILE)).toBeTruthy();
});
