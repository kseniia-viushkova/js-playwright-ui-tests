// @ts-check
import { test, expect } from '@playwright/test';
import { CoffeeCartMainPage } from '../pages/CoffeeCartMainPage';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle("Coffee cart");
});

test('has url', async ({ page, baseURL }) => {
  await page.goto('/');
  await expect(page).toHaveURL(baseURL ?? "https://coffee-cart.app/")
});

test('cart counter and total are zero on main page', async ({ page }) => {
  const mainPage = new CoffeeCartMainPage(page);

  await mainPage.open();
  await mainPage.assertCartCounterIsZero();
  await mainPage.assertTotalIsZero();
});

test('shows unique coffee names on the main page', async ({ page }) => {
  const mainPage = new CoffeeCartMainPage(page);

  await mainPage.open();
  await mainPage.assertNoDuplicateProductNames();
});

test('adds one drink and updates cart and total', async ({ page }) => {
  const mainPage = new CoffeeCartMainPage(page);

  await mainPage.open();
  await mainPage.addProduct('Espresso');

  await mainPage.assertCartCount(1);
  await mainPage.assertTotalValue(10);
});

test('adds two different drinks and shows combined total', async ({ page }) => {
  const mainPage = new CoffeeCartMainPage(page);

  await mainPage.open();
  await mainPage.addProduct('Mocha');
  await mainPage.addProduct('Americano');

  await mainPage.assertCartCount(2);
  await mainPage.assertTotalValue(15);
});

test('adds same drink twice and doubles total', async ({ page }) => {
  const mainPage = new CoffeeCartMainPage(page);

  await mainPage.open();
  await mainPage.addProduct('Espresso');
  await mainPage.addProduct('Espresso');

  await mainPage.assertCartCount(2);
  await mainPage.assertTotalValue(20);
});
