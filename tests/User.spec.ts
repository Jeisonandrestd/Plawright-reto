import { test, expect } from '@playwright/test'

test.describe("Get data from table", () => {
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

    test('Select specific user for edition', async ({ page }) => {
        const userForEdition = 'testuser_planner_001' //usuario a editar
        await page.getByRole('link', { name: 'Admin' }).click()
        //Buscar User Management en el menú
        await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('User Management').click()
        //Click en la opción user del menú
        await page.getByRole('menuitem', { name: 'Users' }).click()
        //Detectar la tabla y tomar las filas

        const PencilToEdit = page
            .getByRole('table') //Encuentra la tabla
            .getByRole('row') //Encuentra las filas
            .filter({ hasText: userForEdition }) //Dentro de los row, busca el usuario para editar
            .locator('button') //filtra a los botones
            .filter({ has: page.locator('i.bi-pencil-fill') }) //Encuentra el botón con lapiz de editar
        //encuentra el I con clase bi-pencil-fill
        await PencilToEdit.click()
        //En el form de edición utilizamos XPath porque no tiene accesbilidad, innerText
        const currentUserName = await page.locator("//label[contains(., 'Username')]/parent::div/following-sibling::div/input")
            .inputValue()
        //assert 
        expect(currentUserName).toEqual(userForEdition)

        //assert de otra forma:
        expect(page.locator("//label[contains(., 'Username')]/parent::div/following-sibling::div/input"))
            .toHaveValue(userForEdition)
    })

    test('Select random user for edition', async ({ page }) => {
        await page.getByRole('link', { name: 'Admin' }).click()
        //Buscar User Management en el menú
        await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('User Management').click()
        //Click en la opción user del menú
        await page.getByRole('menuitem', { name: 'Users' }).click()
        //Detectar la tabla y tomar las filas

        const rows = await page
            .getByRole('table') //Encuentra la tabla
            .getByRole('row') //Encuentra las filas

        const rowCount = await rows.count()
        console.log('Rows found:', rowCount);

        const usernames: string[] = [];
        for (let i = 1; i < rowCount; i++) {
            const username = await rows.nth(i).getByRole('cell').nth(1).innerText();
            if (username !== 'Admin') {
                usernames.push(username);
            }
        }
        console.log(usernames);

        const randomIndex = Math.floor(Math.random() * usernames.length)//generar un número random entre la cantidad de nombres
        const userForEdition = usernames[randomIndex]
        console.log(`Randomly selected user for editing: ${userForEdition}`)

        const PencilToEdit = page
            .getByRole('table') //Encuentra la tabla
            .getByRole('row') //Encuentra las filas
            .filter({ hasText: userForEdition }) //Dentro de los row, busca el usuario para editar
            .locator('button') //filtra a los botones
            .filter({ has: page.locator('i.bi-pencil-fill') }) //Encuentra el botón con lapiz de editar
        //encuentra el I con clase bi-pencil-fill
        await PencilToEdit.click()
        //En el form de edición utilizamos XPath porque no tiene accesbilidad, innerText
        const currentUserName = await page.locator("//label[contains(., 'Username')]/parent::div/following-sibling::div/input")
            .inputValue()
        //assert 
        expect(currentUserName).toEqual(userForEdition)

        //assert de otra forma:
        expect(page.locator("//label[contains(., 'Username')]/parent::div/following-sibling::div/input"))
            .toHaveValue(userForEdition)
    })

})