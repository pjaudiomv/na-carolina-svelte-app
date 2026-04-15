import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('home page loads with all feature cards', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: /Find Meetings/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Clean Time/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Just For Today/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Spiritual Principle/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Events/ }).first()).toBeVisible();
  });

  test('can navigate to calculator from home', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Clean Time').click();
    await expect(page).toHaveURL('/calculator');
    await expect(page.getByText('Clean Time Calculator')).toBeVisible();
  });

  test('can navigate to JFT from home', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Just For Today').click();
    await expect(page).toHaveURL('/jft');
  });

  test('bottom nav is visible on all pages', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav[aria-label="Main navigation"]');
    await expect(nav).toBeVisible();
    await expect(nav.getByText('Home')).toBeVisible();
    await expect(nav.getByText('Meetings')).toBeVisible();
    await expect(nav.getByText('Calculator')).toBeVisible();
    await expect(nav.getByText('Daily')).toBeVisible();
    await expect(nav.getByText('More')).toBeVisible();
  });

  test('More drawer opens and shows extra nav items', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('More options').click();
    await expect(page.getByRole('link', { name: 'Events', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Contact', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Settings', exact: true })).toBeVisible();
  });
});

test.describe('Calculator', () => {
  test('calculates clean time and shows result', async ({ page }) => {
    await page.goto('/calculator');

    await page.selectOption('#month', '1');
    await page.selectOption('#day', '1');
    await page.selectOption('#year', '2020');

    await page.getByRole('button', { name: 'Calculate' }).click();

    await expect(page.getByText(/You have been clean for/)).toBeVisible();
    await expect(page.getByText('Your Keytags')).toBeVisible();
  });

  test('shows keytag images for multi-year clean time', async ({ page }) => {
    await page.goto('/calculator');

    await page.selectOption('#month', '1');
    await page.selectOption('#day', '1');
    await page.selectOption('#year', '2020');

    await page.getByRole('button', { name: 'Calculate' }).click();

    await expect(page.getByText('Welcome', { exact: true })).toBeVisible();
    await expect(page.getByText('1 Year', { exact: true })).toBeVisible();
    await expect(page.getByText('Multiple Years', { exact: true })).toBeVisible();
  });
});

test.describe('Daily Readings', () => {
  test('JFT page loads and shows content or loading state', async ({ page }) => {
    await page.goto('/jft');
    // Either content loaded or we're still loading — both are valid
    const hasContent = await page
      .getByText('Just for today')
      .isVisible()
      .catch(() => false);
    const isLoading = await page
      .getByText('Loading...')
      .isVisible()
      .catch(() => false);
    expect(hasContent || isLoading).toBe(true);
  });

  test('SPAD page loads and shows content or loading state', async ({ page }) => {
    await page.goto('/spad');
    const hasContent = await page
      .locator('blockquote')
      .isVisible()
      .catch(() => false);
    const isLoading = await page
      .getByText('Loading...')
      .isVisible()
      .catch(() => false);
    expect(hasContent || isLoading).toBe(true);
  });
});

test.describe('Events', () => {
  test('events page loads', async ({ page }) => {
    await page.goto('/events');
    await expect(page.getByRole('heading', { name: 'Events' })).toBeVisible();
    // Wait for either events to load or an error/empty state
    await page.waitForSelector('[class*="animate-spin"], [class*="space-y"], [class*="text-center"]', { timeout: 10000 });
  });
});

test.describe('Settings', () => {
  test('settings page shows theme options', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.getByText('Appearance')).toBeVisible();
    await expect(page.getByText('Light')).toBeVisible();
    await expect(page.getByText('Dark')).toBeVisible();
    await expect(page.getByText('System')).toBeVisible();
  });

  test('can toggle dark mode', async ({ page }) => {
    await page.goto('/settings');
    await page.getByText('Dark').click();
    await expect(page.locator('html')).toHaveClass(/dark/);
    await page.getByText('Light').click();
    await expect(page.locator('html')).not.toHaveClass(/dark/);
  });
});
