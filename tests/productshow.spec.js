import { test, expect } from '@playwright/test';

const URL = 'https://www.saucedemo.com/';

async function login(page) {
    await page.goto(URL);

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await page.waitForURL('**/inventory.html');
}

test('Verify products are displayed after login', async ({ page }) => {
    await login(page);

    // Verify product list is visible
    const products = page.locator('.inventory_item');
    await expect(products).toHaveCount(6);

    // Optional stronger check
    await expect(page.locator('.inventory_item_name').first()).toBeVisible();
    await expect(page.locator('.inventory_item_price').first()).toBeVisible();
});