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
    this.coffeeHeaders = page.locator("//*[contains(@class, 'cup')]/ancestor::li/h4");
  }

  async open() {
    await this.page.goto('/');
  }

  async getAllCoffeeHeaders() {
    return await this.coffeeHeaders.all();
  }

  /**
  * @param {import('@playwright/test').Locator} coffeeHeader
  */
  async getCoffeeNameFromHeader(coffeeHeader) {
    return (await coffeeHeader.innerText()).split('\n')[0].trim();
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

  async assertCartCounterIsZero() {
    await this.assertCartCount(0);
  }

  async assertTotalIsZero() {
    await this.assertTotalValue(0);
  }

  async assertNoDuplicateProductNames() {
    const productsNameAndPrice = await this.coffeeHeaders.all()
    const productNames = await Promise.all(productsNameAndPrice.map(async (coffeeHeader) =>
      await this.getCoffeeNameFromHeader(coffeeHeader)));

    const uniqueProductNames = new Set(productNames);

    expect(uniqueProductNames.size).toBe(productNames.length);
  }

  /**
   * @param {import('@playwright/test').Locator} coffeeHeader
   * @param {string} coffeeChineseName
   */
  async assertCoffeeNameInChinese(coffeeHeader, coffeeChineseName) {
    const coffeeHeaderText = await coffeeHeader.innerText();
    const coffeeName = await this.getCoffeeNameFromHeader(coffeeHeader);
    await coffeeHeader.dblclick();
    await expect(coffeeHeader).toHaveText(coffeeHeaderText
      .replace(coffeeName, coffeeChineseName));
  }
}
