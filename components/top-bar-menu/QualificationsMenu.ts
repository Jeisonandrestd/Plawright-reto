import { Locator, Page } from "playwright/test";

export class QualificationsMenu {
    private readonly page: Page
    readonly qualifications: Locator
    readonly skills
    readonly education
    readonly licenses
    readonly languages
    readonly memberships

    constructor(page: Page) {
        this.page = page
        this.qualifications = page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Qualifications') //Buscar Qualifications en el menú
        this.skills = page.getByRole('menuitem', { name: 'Skills' })
        this.education = page.getByRole('menuitem', { name: 'Education' })
        this.licenses = page.getByRole('menuitem', { name: 'Licenses' })
        this.languages = page.getByRole('menuitem', { name: 'Languages' })
        this.memberships = page.getByRole('menuitem', { name: 'Memberships' })
    }

    private async clickOnQualifications() {
        await this.qualifications.click()
    }

    async clickOnSkills() {
        await this.clickOnQualifications()
        await this.skills.click()
    }

    async clickOnEducation() {
        await this.clickOnQualifications()
        await this.education.click()
    }

    async clickOnLicenses() {
        await this.clickOnQualifications()
        await this.licenses.click()
    }
    async clickOnLanguages() {
        await this.clickOnQualifications()
        await this.languages.click()
    }
    async clickOnMemberships() {
        await this.clickOnQualifications()
        await this.memberships.click()
    }
}