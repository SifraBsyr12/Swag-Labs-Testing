import { test, expect } from '@playwright/test';

const URL = 'https://www.saucedemo.com/';

// Login helper
async function login(page) {
    await page.goto(URL);

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await page.waitForURL('**/inventory.html');
    await page.waitForSelector('.inventory_item');
}

// 1. Price Low → High
test('Sort products: Price Low to High', async ({ page }) => {
    await login(page);

    // correct value
    await page.selectOption('.product_sort_container', 'lohi');

    const prices = await page.$$eval('.inventory_item_price', items =>
        items.map(el => parseFloat(el.innerText.replace('$', '')))
    );

    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
});

// 2. Price High → Low
test('Sort products: Price High to Low', async ({ page }) => {
    await login(page);

    // correct value
    await page.selectOption('.product_sort_container', 'hilo');

    const prices = await page.$$eval('.inventory_item_price', items =>
        items.map(el => parseFloat(el.innerText.replace('$', '')))
    );

    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
});

// 3. Name A → Z
test('Sort products: Name A to Z', async ({ page }) => {
    await login(page);

    await page.selectOption('.product_sort_container', 'az');

    const names = await page.$$eval('.inventory_item_name', items =>
        items.map(el => el.innerText)
    );

    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
});

// 4. Name Z → A
test('Sort products: Name Z to A', async ({ page }) => {
    await login(page);

    await page.selectOption('.product_sort_container', 'za');

    const names = await page.$$eval('.inventory_item_name', items =>
        items.map(el => el.innerText)
    );

    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);
});