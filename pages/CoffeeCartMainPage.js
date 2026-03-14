// @ts-check
import { expect } from '@playwright/test';

export class CoffeeCartMainPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.cartLink = page.getByRole('link', { name: 'Cart page' });
    this.checkoutButton = page.locator('button.pay');
    this.coffeeNameAndPrice = page.locator("//*[contains(@class, 'cup')]/ancestor::li/h4");
  }

  async open() {
    await this.page.goto('/');
  }

  async assertCartCounterIsZero() {
    await this.assertCartCount(0);
  }

  async assertTotalIsZero() {
    await this.assertTotalValue(0);
  }

  async assertNoDuplicateProductNames() {
    const productsNameAndPrice = await this.coffeeNameAndPrice.all()
    const productNames = await Promise.all(productsNameAndPrice.map(async (element) =>
      (await element.innerText()).split('\n')[0].trim()));

    const uniqueProductNames = new Set(productNames);

    expect(uniqueProductNames.size).toBe(productNames.length);
  }

  /**
   * @param {string} productDataTestValue
   */
  async addProduct(productDataTestValue) {
    await this.page.locator(`[data-test="${productDataTestValue}"]`).click();
  }

  /**
   * @param {number} count
   */
  async assertCartCount(count) {
    await expect(this.cartLink).toHaveText(`cart (${count})`);
  }

  /**
   * @param {number} total
   */
  async assertTotalValue(total) {
    await expect(this.checkoutButton).toHaveText(`Total: $${total.toFixed(2)}`);
  }
}
