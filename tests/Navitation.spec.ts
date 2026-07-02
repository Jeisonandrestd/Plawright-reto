import { test, expect } from '@playwright/test'
import { LoginPage } from '../pageobjects/LoginPage'
import { SideMenuOption, SidePanel } from '../components/SidePanel'
import { TopBarMenu } from '../components/top-bar-menu/TopBarMenu'

test.describe("Validation of navigation options", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.LoginAsAdmin()
    })

    test('Click on the side menu using page objets', async({page})=>{
        const sidePanel= new SidePanel(page)
        await sidePanel.clickOnOption(SideMenuOption.ADMIN)
        await sidePanel.clickOnOption(SideMenuOption.BUZZ)
        await sidePanel.clickOnOption(SideMenuOption.PERFORMANCE)
    })

    test('Filter on the side menu using page objets', async({page})=>{
        const sidePanel= new SidePanel(page)
        await sidePanel.clickOnOption(SideMenuOption.ADMIN)
        await sidePanel.filterBy(SideMenuOption.BUZZ)
        await sidePanel.IsVisibleOption(SideMenuOption.BUZZ)
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

    test('Navigate through the letf panel', async ({ page }) => {
        const letfMenuItems = page.getByLabel('Sidepanel').getByRole('listitem') //Capturo todos los items
        const currentMenuItemsCount = await letfMenuItems.count()//Cuenta cuantas opciones son

        for (let i = 0; i < currentMenuItemsCount; i++) {
            const menuItem = letfMenuItems.nth(i)//acceder al indice con nth
            const menuText = await menuItem.innerText() //obtener el texto
            console.log('Current menu item: ', menuText)
            if (menuText === 'Maintenance') {
                console.log('Se necesitan permisos de administrador. Regresa')
                await page.goBack() //No da click en Maintenance y regresa la página (Botón atrás)
            }
            else {
                await menuItem.click()
            }

        }
    })

    test('check all the qualification links', async ({ page }) => {
        //Establece en variable como array el menú y el Path de la URL que debe tener
        const expectPages = [
            {
                menu: 'Skills',
                url: 'web/index.php/admin/viewSkills'
            },
            {
                menu: 'Education',
                url: 'web/index.php/admin/viewEducation'
            },
            {
                menu: 'Licenses',
                url: 'web/index.php/admin/viewLicenses'
            }
        ]
        await page.getByRole('link', { name: 'Admin' }).click()
        //Buscar Qualifications en el topbar menú
        await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Qualifications').click()
        //Click en la opción user del menú
        const qualificationOptions = page.getByRole('menu').locator('li')//Todos los li a la variable

        for (let expectedPage of expectPages) { //por cada pagina en el array
            //Filtra cada valor del array que tenga el coincida con el indice menu
            const menuOption = qualificationOptions.filter({ hasText: expectedPage.menu }) //coincide por texto
            await menuOption.click() //click en la opción
            await expect(page).toHaveURL(new RegExp(expectedPage.url)) //verifica que la página tenga en su URL el path esperado
            await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Qualifications').click()//Da click porque al cargar, se cierran las opciones del TopBar menu
        }

    })

    test('check all the Job links', async ({ page }) => {
        //Establece en variable como array el menú y el Path de la URL que debe tener
        const expectPages = [
            {
                menu: 'Job Titles',
                url: 'web/index.php/admin/viewJobTitleList'
            },
            {
                menu: 'Pay Grades',
                url: 'web/index.php/admin/viewPayGrades'
            },
            {
                menu: 'Employment Status',
                url: 'web/index.php/admin/employmentStatus'
            }
        ]
        await page.getByRole('link', { name: 'Admin' }).click()
        //Buscar Qualifications en el topbar menú
        await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Job').click()
        //Click en la opción user del menú
        const qualificationOptions = page.getByRole('menu').locator('li')//Todos los li a la variable

        for (let expectedPage of expectPages) { //por cada pagina en el array
            //Filtra cada valor del array que tenga el coincida con el indice menu
            const menuOption = qualificationOptions.filter({ hasText: expectedPage.menu }) //coincide por texto
            await menuOption.click() //click en la opción
            await expect(page).toHaveURL(new RegExp(expectedPage.url)) //verifica que la página tenga en su URL el path esperado
            await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Job').click()//Da click porque al cargar, se cierran las opciones del TopBar menu
        }

    })

     test('Testing topbar menu User Management - Jobs', async({page})=>{
        //utilizando los componentes
        const sidePanel= new SidePanel(page)
        await sidePanel.clickOnOption(SideMenuOption.ADMIN)
        const topBarMenu = new TopBarMenu(page)
        //Menu user management
        await topBarMenu.userManagement.clickOnUsers()
        //Menu Job
        await topBarMenu.job.clickOnJobTitles()
        await topBarMenu.job.clickOnJobTitles()
        await topBarMenu.job.clickOnEmploymentStatus()
        await topBarMenu.job.clickOnJobCategories()
        await topBarMenu.job.clickOnWorkShifts()
    })

    test('Testing topbar menu Organization', async({page})=>{
        //utilizando los componentes
        const sidePanel= new SidePanel(page)
        await sidePanel.clickOnOption(SideMenuOption.ADMIN)
        const topBarMenu = new TopBarMenu(page)
        //Organization
        await topBarMenu.organization.clickOnGeneralInformation()
        await topBarMenu.organization.clickOnLocations()
        await topBarMenu.organization.clickOnStructure()
       
    })

    test('Testing topbar menu Qualification', async({page})=>{
        //utilizando los componentes
        const sidePanel= new SidePanel(page)
        await sidePanel.clickOnOption(SideMenuOption.ADMIN)
        const topBarMenu = new TopBarMenu(page)
        //Qualifications
        await topBarMenu.qualifications.clickOnSkills()
        await topBarMenu.qualifications.clickOnLanguages()
        await topBarMenu.qualifications.clickOnLicenses()
        await topBarMenu.qualifications.clickOnMemberships()
        await topBarMenu.qualifications.clickOnEducation()

    })



})