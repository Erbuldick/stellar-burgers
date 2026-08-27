import { test, expect } from '@playwright/test';

test.describe('Конструктор бургера', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('./tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      update: false
    });

    await page.route('**/api/auth/user', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          user: { email: 'test@test.com', name: 'Test User' }
        })
      });
    });

    await page.route('**/api/orders', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          order: { number: 12345 }
        })
      });
    });

    await page.addInitScript(() => {
      localStorage.setItem('refreshToken', 'mock-refresh-token');
    });

    await page
      .context()
      .addCookies([
        {
          name: 'accessToken',
          value: 'mock-access-token',
          url: 'http://localhost:4000'
        }
      ]);

    await page.goto('/');
    await page.waitForSelector('[data-testid="add-bun"]', { timeout: 15000 });
  });

  test('Добавление булки и начинки в конструктор', async ({ page }) => {
    const constructorItemsBefore = page.locator('.constructor-element');
    await expect(constructorItemsBefore).toHaveCount(0);

    await page.locator('[data-testid="add-bun"] button').first().click();
    const topBun = page.locator('.constructor-element_pos_top');
    await expect(topBun).toBeVisible({ timeout: 5000 });

    await page.locator('[data-testid="add-main"] button').first().click();
    const ingredientElements = page.locator(
      '.constructor-element:not(.constructor-element_pos_top):not(.constructor-element_pos_bottom)'
    );
    await expect(ingredientElements).toHaveCount(1, { timeout: 5000 });

    const priceLocator = page.locator('[data-testid="total-price"]');
    await expect(priceLocator).toBeVisible({ timeout: 5000 });
    const priceText = await priceLocator.textContent();
    expect(Number(priceText)).toBeGreaterThan(0);
  });

  test('Открытие и закрытие модалки ингредиента с проверкой названия', async ({
    page
  }) => {
    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).not.toBeVisible();

    const firstCardLink = page.locator('a[href^="/ingredients/"]').first();
    const ingredientName = await firstCardLink
      .locator('.text_type_main-default')
      .textContent();
    await firstCardLink.click();

    await expect(modal).toBeVisible({ timeout: 5000 });
    const modalTitle = modal.locator('h3.text_type_main-medium');
    await expect(modalTitle).toHaveText(ingredientName || '');

    const closeButton = page.locator('[data-testid="modal-close"]');
    await closeButton.click();
    await expect(modal).not.toBeVisible({ timeout: 5000 });
  });

  test('Оформление заказа', async ({ page }) => {
    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).not.toBeVisible();

    await page.locator('[data-testid="add-bun"] button').first().click();
    await page.locator('[data-testid="add-main"] button').first().click();

    const orderResponsePromise = page.waitForResponse(
      (response) =>
        response.url().includes('/api/orders') && response.status() === 200
    );

    const orderButton = page.locator('[data-testid="order-button"]');
    await orderButton.click();
    await orderResponsePromise;

    await expect(modal).toBeVisible({ timeout: 10000 });

    const orderNumber = modal.locator('[data-testid="order-number"]');
    await expect(orderNumber).toHaveText('12345', { timeout: 5000 });

    const constructorItems = page.locator('.constructor-element');
    await expect(constructorItems).toHaveCount(0, { timeout: 5000 });

    await page.locator('[data-testid="modal-close"]').click();
    await expect(modal).not.toBeVisible({ timeout: 5000 });
  });
});
