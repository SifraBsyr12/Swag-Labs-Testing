import { test, expect } from '@playwright/test';

const URL = 'https://www.saucedemo.com/';

async function login(page) {
    await page.goto(URL);

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await page.waitForURL('**/inventory.html');
}

test('Add multiple items to cart', async ({ page }) => {
    await login(page);

    // Add first item
    await page.locator('.inventory_item button').nth(0).click();

    // Add second item
    await page.locator('.inventory_item button').nth(1).click();

    // Verify cart badge shows 2 items
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
});