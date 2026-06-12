import { test, expect } from '@playwright/test'

test.describe("Login to HRM", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://opensource-demo.orangehrmlive.com/')
        await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
        await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
        await page.getByRole('button', { name: 'Login' }).click()
        //Comprobar componente en el dashboard para asegurar que ingresó correctamente:
        await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()
    })

    test('Get left menu options', async ({ page }) => {
        const letfMenuItems = page.getByLabel('Sidepanel').getByRole('listitem') //Capturo todos los items
        const currentMenuItemsCount = await letfMenuItems.count()//Cuenta cuantas opciones son
        console.log('Current menu items count:', currentMenuItemsCount)
        const currentMenuItems: string[] = [] //Arreglo
        for (let i = 0; i < currentMenuItemsCount; i++) {
            const menuText = await letfMenuItems.nth(i).innerText()//Metodo recomendado para sacar texto visible
            currentMenuItems.push(menuText)
        }
        console.log(currentMenuItems)

        const expectedMenuItems = [
            'Admin',
            'PIM',
            'Leave',
            'Time',
            'Recruitment',
            'My Info',
            'Performance',
            'Dashboard',
            'Directory',
            'Maintenance',
            'Claim',
            'Buzz'
        ]
        expect(currentMenuItems).toEqual(expectedMenuItems)
        expect(currentMenuItems[0]).toEqual(expectedMenuItems[0])
    })



})