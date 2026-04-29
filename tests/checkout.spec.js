import { test, expect } from '@playwright/test';

const URL = 'https://www.saucedemo.com/';
const USER = 'standard_user';
const PASS = 'secret_sauce';

async function login(page) {
    await page.goto(URL);
    await page.fill('#user-name', USER);
    await page.fill('#password', PASS);
    await page.click('#login-button');
}

test('Successful checkout', async ({ page }) => {
    await login(page);

    await page.click('.inventory_item button');
    await page.click('.shopping_cart_link');
    await page.click('#checkout');

    await page.fill('#first-name', 'Basayar');
    await page.fill('#last-name', 'sifra');
    await page.fill('#postal-code', '50000');

    await page.click('#continue');
    await page.click('#finish');

    await expect(page.locator('.complete-header')).toBeVisible();
});

test('Checkout validation error', async ({ page }) => {
    await login(page);

    await page.click('.inventory_item button');
    await page.click('.shopping_cart_link');
    await page.click('#checkout');

    await page.click('#continue');

    await expect(page.locator('[data-test="error"]')).toBeVisible();
});