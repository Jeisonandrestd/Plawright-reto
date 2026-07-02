import { Locator, Page } from "playwright/test";

export class JobMenu {
    private readonly page: Page
    readonly job: Locator
    readonly jobTitlesOption
    readonly payGradesOption
    readonly employmentStatus
    readonly jobCategories
    readonly workShifts

    constructor(page: Page) {
        this.page = page
        this.job = page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Job') //Buscar Job en el menú
        this.jobTitlesOption = page.getByRole('menuitem', { name: 'Job Titles' })
        this.payGradesOption = page.getByRole('menuitem', { name: 'Pay Grades' })
        this.employmentStatus = page.getByRole('menuitem', { name: 'Employment Status' })
        this.jobCategories = page.getByRole('menuitem', { name: 'Job Categories' })
        this.workShifts = page.getByRole('menuitem', { name: 'Work Shifts' })
    }

    private async clickOnJobs() {
        await this.job.click()
    }

    async clickOnJobTitles() {
        await this.clickOnJobs()
        await this.jobTitlesOption.click()
    }

    async clickOnPayGrades() {
        await this.clickOnJobs()
        await this.payGradesOption.click()
    }

    async clickOnEmploymentStatus() {
        await this.clickOnJobs()
        await this.employmentStatus.click()
    }
    async clickOnJobCategories() {
        await this.clickOnJobs()
        await this.jobCategories.click()
    }
    async clickOnWorkShifts() {
        await this.clickOnJobs()
        await this.workShifts.click()
    }
}