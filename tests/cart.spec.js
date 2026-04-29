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

test('Add item to cart', async ({ page }) => {
    await login(page);

    await page.click('.inventory_item button');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

test('Remove item from cart', async ({ page }) => {
    await login(page);

    await page.click('.inventory_item button'); // add
    await page.click('.inventory_item button'); // remove

    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
});