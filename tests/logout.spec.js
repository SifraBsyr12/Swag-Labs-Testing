import { test, expect } from '@playwright/test';

const URL = 'https://www.saucedemo.com/';

async function login(page) {
    await page.goto(URL);

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await page.waitForURL('**/inventory.html');
}

test('Verify user logout successfully', async ({ page }) => {
    await login(page);

    // Open menu
    await page.click('#react-burger-menu-btn');

    // Click logout
    await page.click('#logout_sidebar_link');

    // Verify redirected to login page
    await expect(page).toHaveURL(URL);

    // Optional: verify login button is visible again
    await expect(page.locator('#login-button')).toBeVisible();
});