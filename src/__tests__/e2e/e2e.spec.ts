import { test, expect } from '@playwright/test';

test('complete game flow', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page).toHaveTitle('Criminal Hunt');

    await page.click('text=Start Game');
    await expect(page).toHaveURL(/city-selection/);

    await page.selectOption('select[name="cop1City"]', '1');
    await page.selectOption('select[name="cop2City"]', '2');
    await page.selectOption('select[name="cop3City"]', '3');
    await page.click('text=Next');
    await expect(page).toHaveURL(/vehicle-selection/);

    await page.selectOption('select[name="cop1Vehicle"]', '1');
    await page.selectOption('select[name="cop2Vehicle"]', '2');
    await page.selectOption('select[name="cop3Vehicle"]', '3');
    await page.click('text=Submit');
    await expect(page).toHaveURL(/result/);

    const resultText = await page.textContent('h1');
    expect(resultText).toMatch(/Result/);
});