import { test, expect } from '@playwright/test';

const URL = 'https://www.saucedemo.com/';
const USER = 'standard_user';
const PASS = 'secret_sauce';

// Helper login
async function login(page) {
  await page.goto(URL);
  await page.fill('#user-name', USER);
  await page.fill('#password', PASS);
  await page.click('#login-button');
}

test('Valid login', async ({ page }) => {
  await login(page);
  await expect(page).toHaveURL(/inventory/);
});

test('Invalid login shows error', async ({ page }) => {
  await page.goto(URL);
  await page.fill('#user-name', USER);
  await page.fill('#password', 'wrong');
  await page.click('#login-button');

  await expect(page.locator('[data-test="error"]')).toBeVisible();
});