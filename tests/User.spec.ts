import { test, expect } from '@playwright/test'

test('Get all the usernames registered', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/')
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
    await page.getByRole('button', { name: 'Login' }).click()
    //Comprobar componente en el dashboard para asegurar que ingresó correctamente:
    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

    await page.getByRole('link', { name: 'Admin' }).click()
    //Buscar User Management en el menú
    await page.getByRole('navigation',{name: 'Topbar menu'}).getByText('User Management').click()
    //Click en la opción del menú
    await page.getByRole('menuitem', {name: 'Users'}).click()
    //Detectar la tabla y tomar las filas
    const rows = page.getByRole('table').getByRole('row')
    const usernames: string [] = []
    const rowCount = await rows.count()

    for (let i=1; i< rowCount; i++){
        const cell = rows.nth(i).getByRole('cell').nth(1) 
        const username = await cell.textContent()
        if (username){
             usernames.push(username)
        }
       
    }
    console.log(usernames)


})