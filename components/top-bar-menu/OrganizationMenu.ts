import { Locator, Page } from "playwright/test";

export class OrganizationMenu {
    private readonly page: Page
    readonly organization: Locator
    readonly generalInformation
    readonly locations
    readonly structure

    constructor(page: Page) {
        this.page = page
        this.organization = page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Organization') //Buscar Organization en el menú
        this.generalInformation = page.getByRole('menuitem', { name: 'General Information' })
        this.locations = page.getByRole('menuitem', { name: 'Locations' })
        this.structure = page.getByRole('menuitem', { name: 'Structure' })
    }

    private async clickOnOrganization() {
        await this.organization.click()
    }

    async clickOnGeneralInformation() {
        await this.clickOnOrganization()
        await this.generalInformation.click()
    }

    async clickOnLocations() {
        await this.clickOnOrganization()
        await this.locations.click()
    }

    async clickOnStructure() {
        await this.clickOnOrganization()
        await this.structure.click()
    }
    
}