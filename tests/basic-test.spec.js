// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle("Coffee cart");
});

test('has url', async ({ page, baseURL }) => {
  await page.goto('/');
  await expect(page).toHaveURL(baseURL ?? "https://coffee-cart.app/")
});
