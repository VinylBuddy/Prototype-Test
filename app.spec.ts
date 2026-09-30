import { test, expect } from '@playwright/test';

test.describe('Todo-App: UI-Akzeptanztests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('AT01: Aufgabe hinzufügen und Eingabe leeren', async ({ page }) => {
        const input = page.getByRole('textbox', {
            name: 'Neue Aufgabe',
            exact: true,
        });

        await input.fill('Milch kaufen');

        await page.getByRole('button', {
            name: 'Hinzufügen',
            exact: true,
        }).click();

        await expect(
            page.getByText('Milch kaufen', { exact: true }),
        ).toBeVisible();

        await expect(
            page.getByText('1 Aufgabe', { exact: true }),
        ).toBeVisible();

        await expect(input).toHaveValue('');

        await expect(
            page.getByText('Noch keine Aufgaben.', { exact: true }),
        ).toHaveCount(0);
    });

    test('AT02: Leere Aufgabe ablehnen', async ({ page }) => {
        await page.getByRole('textbox', {
            name: 'Neue Aufgabe',
            exact: true,
        }).fill('   ');

        await page.getByRole('button', {
            name: 'Hinzufügen',
            exact: true,
        }).click();

        await expect(page.getByRole('alert')).toHaveText(
            'Bitte eine Aufgabe eingeben.',
        );

        await expect(
            page.getByText('0 Aufgaben', { exact: true }),
        ).toBeVisible();

        await expect(
            page.getByText('Noch keine Aufgaben.', { exact: true }),
        ).toBeVisible();
    });
});