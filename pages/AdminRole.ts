import { Page, BrowserContext } from "@playwright/test";
import { URLConstants } from "../constants/urlConstants";
import { AdminHomePage } from "./AdminHomePage";
import { PlaywrightWrapper } from "../utils/playwright";
import { th } from "@faker-js/faker";



export class AdminRolePage extends AdminHomePage {
    static pageUrl = URLConstants.adminURL;

    public selectors = {
        ...this.selectors,
        addAdminrole: `//button[text()='ADD ADMIN ROLE']`,
        adminroleName: `#role_name`,
        moduleName: (index: number) => `(//span[@class='pointer text-truncate'])[${index}]`,
        additonalModuleName: (index: number) => `(//span[@class='text-truncate'])[${index}]`,
        deleteIcon: (module: string) => `(//label[@for='${module}-delete']//i)[2]`,
        saveButton: `#role-meta-data-save`,
        createdRole: `//div[contains(@id,'role_name')]/span`,
        //   searchField: `//input[contains(@id,'exp-search')]`,
        searchField: `//input[contains(@id,'exp-search')]`,
        selectRole: `//div[contains(@id,'exp-search-lms-scroll-results')]//li`,
        selectEnrollmentRole:`//label[@for='Enrollments-create']`

    };
    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    public async clickAddAdminRole() {
        await this.wait("minWait");
        await this.click(this.selectors.addAdminrole, "Add AdminRole", "Button")
    }

    public async enterName(roleName: string) {
        await this.type(this.selectors.adminroleName, "Admin Role Name", roleName)
    }

    public async clickAllPriveileges() {
        await this.wait('mediumWait')
        const count = await this.page.locator(`//span[contains(@class,'pointer text-truncate')]`).count()
        for (let index = 1; index <= count; index++) {
            const text = await this.page.locator(this.selectors.moduleName(index)).innerHTML();
            await this.click(this.selectors.deleteIcon(text), `${text}`, "Delete Checkbox")
        }
        const countMod = await this.page.locator(`//span[@class='text-truncate']`).count()
        console.log(countMod)
        for (let index = 1; index <= countMod; index++) {
            const text = await this.page.locator(this.selectors.additonalModuleName(index)).innerHTML();
            await this.click(this.selectors.deleteIcon(text), `${text}`, "Delete Checkbox")
        }
        await this.click(this.selectors.selectEnrollmentRole, "Enrollment Role", "Checkbox") // Click on Enrollments-create checkbox

    }

    public async clickSave() {
        await this.click(this.selectors.saveButton, "Save", "Button")
        await this.page.reload();
    }

    public async roleSearch(roleName: string) {
        await this.type(this.selectors.searchField, "Search Field", roleName)
        await this.mouseHover(this.selectors.selectRole, "Search Field")
        await this.click(this.selectors.selectRole, "Search Field", "Option")
    }



    public async verifyRole(roleName: string) {
        await this.verification(this.selectors.createdRole, roleName)
    }
}




