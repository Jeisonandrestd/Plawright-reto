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

    test('Get all the usernames registered', async ({ page }) => {
        await page.getByRole('link', { name: 'Admin' }).click()
        //Buscar User Management en el menú
        await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('User Management').click()
        //Click en la opción user del menú
        await page.getByRole('menuitem', { name: 'Users' }).click()
        //Detectar la tabla y tomar las filas
        const rows = page.getByRole('table').getByRole('row') //Identifica la tabla y las filas
        const usernames: string[] = [] //Establece arreglo 
        const rowCount = await rows.count() //cuenta cuantas filas son
        //Ciclo for para recorrer las filas: primera fila - titulos
        for (let i = 1; i < rowCount; i++) {
            const cell = rows.nth(i).getByRole('cell').nth(1) //nth para posiciones
            const username = await cell.textContent() //Para obtener el valor
            if (username) {
                usernames.push(username)//Para agregar valor al arreglo
            }
        }
        console.log('Cantidad de registros:', rowCount - 1)
        console.log('Usernames:', usernames)
    })

    test('Get all the employee names registered', async ({ page }) => {
        await page.getByRole('link', { name: 'Admin' }).click()
        //Buscar User Management en el menú
        await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('User Management').click()
        //Click en la opción user del menú
        await page.getByRole('menuitem', { name: 'Users' }).click()
        //Detectar la tabla y tomar las filas
        const rows = page.getByRole('table').getByRole('row') //Identifica la tabla y las filas
        const employeeNames: string[] = [] //Establece arreglo 
        const rowCount = await rows.count() //cuenta cuantas filas son
        //Ciclo for para recorrer las filas: primera fila - titulos
        for (let i = 1; i < rowCount; i++) {
            const cell = rows.nth(i).getByRole('cell').nth(3) //nth para posiciones
            const employee = await cell.textContent() //Para obtener el valor
            if (employee) {
                employeeNames.push(employee)//Para agregar valor al arreglo
            }
        }
        console.log('Cantidad de registros:', rowCount - 1)
        console.log('Employee Names:', employeeNames)
    })

})