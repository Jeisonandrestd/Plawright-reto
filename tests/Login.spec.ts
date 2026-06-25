import { expect, test } from '@playwright/test'
import { LoginPage } from '../pageobjects/LoginPage'
//En el test.describe se le indica que para cada test debe hacer el goto(HRM PAGE) primero
test.describe("Validation of login page", () => { 
    test.beforeEach(async ({ page }) => {
        await page.goto('https://opensource-demo.orangehrmlive.com/')
    })

    test('Do login as an employee', async({page})=>{
        const login = new LoginPage(page)
        await login.LoginAsEmployee()
        //Comprobar que no existe Admin en el SidePanel
        await expect(page.getByRole('link', { name: 'Admin' })).not.toBeVisible()
    })

    test('Succesful login', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
        await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
        await page.getByRole('button', { name: 'Login' }).click()
        //Comprobar componente en el dashboard para asegurar que ingresó correctamente:
        await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()
    })

    test('invalid credentials alert', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
        await page.getByRole('textbox', { name: 'Password' }).fill('sol123')
        await page.getByRole('button', { name: 'Login' }).click()
        await expect(page.getByRole('alert')).toContainText('Invalid credentials')
    })

    test('required fields login', async ({ page }) => {
        await page.getByRole('button', { name: 'Login' }).click()
        //Al dar click sin completar los campos, deben aparecer las alertas de campo requerido (2: username y password)
        await expect(page.getByText('Required')).toHaveCount(2)
    })
})

