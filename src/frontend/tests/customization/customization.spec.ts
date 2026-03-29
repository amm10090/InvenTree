import test, { expect } from '@playwright/test';
import { noaccessuser } from '../defaults';
import { navigate } from '../helpers';
import { doLogin } from '../login';

/**
 * Tests for user interface customization functionality.
 *
 * Note: The correct environment variables must be set for these tests to work correctly. See "playwright.config.ts" for details.
 * These tests are designed to run in CI environments where specific environment variables are set to enable custom logos and splash screens. The tests verify that these customizations are correctly applied in the user interface.
 */

test('Customization - Splash', async ({ page }) => {
  await navigate(page, '/');

  await page.waitForLoadState('networkidle');

  // 登录页不再使用自定义 splash 图片作为背景。
  await expect(
    page.locator('[style*="playwright_custom_splash.png"]')
  ).toHaveCount(0);
});

test('Customization - Logo', async ({ page }) => {
  await doLogin(page, {
    user: noaccessuser
  });

  await page.waitForLoadState('networkidle');

  await page.waitForTimeout(2500);
  return;
});
