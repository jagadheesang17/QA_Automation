import { Page, BrowserContext } from "@playwright/test";
import { AdminHomePage } from "./AdminHomePage";
import { FakerData } from "../utils/fakerUtils";

export class OrganizationPage extends AdminHomePage {

    public selectors = {
        ...this.selectors,
        menu: "//div[text()='Menu']",
        peopleMenu: "//span[text()='People']",
        organizationSubMenu: "//a[text()='Organization']",
        create: "//button[@id='admin-view-btn-primary']",
        enterName: "//input[@id='Name']",
        selectTab: "//label[text()='Type']//following::div[@id='wrapper-Type']",
        selectType: (index: number) => `(//a[@class='dropdown-item']//span)[${index}]`,
        description: "//div[@id='Description']//p",
        save: "//button[text()='Save']",
        editOrganization: `//a[text()='Edit Organization']`,
        contactName: `//input[@id='ContactName']`,
        updateBtn: `//button[text()='Update']`,
        orgeditIcon: `(//i[contains(@class,'fa-duotone fa-pen ')])[1]`,
        parentOrg: `//input[@id='ParentOrg-filter-field']`,
        selectParentOrg: `(//div[@id='ParentOrg-filter-results-container']//li)[1]`,
        childCount: (fieldName: string) => `//div[contains(text(),'${fieldName}')]/following::span[contains(text(),'Child Organizations')][1]`,
        //childCount: (fieldName: string) => `//div[text()='${fieldName}']/following::span[contains(text(),'Child Organizations')][1]`,
        loadMore: `//button[text()='Load More']`,
        orgType:(data:string)=>`//span[text()='${data}']`,

          //edit organization
        editOrg:(data:string)=>`(//div[text()='${data}']//following::i[contains(@class,'fa-duotone fa-pen ')])[1]`,
        orgSearchField: "//input[@id='exp-search-field']",
        descriptionVerify:`//div[@id='Description']//p`,

        //create organization
        clickCreateOrg:`//a[text()='Create Organization']`
    };

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    public async menuButton() {
        await this.page.waitForLoadState('load');
        await this.spinnerDisappear();
        await this.mouseHover(this.selectors.menu, "Menu");
        await this.click(this.selectors.menu, "Menu", "Button");
    }

    public async people() {
        await this.validateElementVisibility(this.selectors.peopleMenu, "People");
        await this.click(this.selectors.peopleMenu, "People", "Button");
    }

    public async organizationMenu() {
        await this.click(this.selectors.organizationSubMenu, "Organization", "Link");
    }

    public async createOrganization() {
        await this.wait("minWait")
        await this.validateElementVisibility(this.selectors.create, "Create Organization");
        await this.click(this.selectors.create, "Create Organization", "Button");
    }
      public async clickCreateOrganization() {
        await this.validateElementVisibility(this.selectors.clickCreateOrg, "Create Organization");
        await this.click(this.selectors.clickCreateOrg, "Create Organization", "Button");
    }

    public async enterName(orgName: string) {
        await this.type(this.selectors.enterName, "Name", orgName);
    }

    // public async typeDropdown() {
    //     await this.click(this.selectors.selectTab, "Select", "Dropdown");
    //     const count = await this.page.locator("//a[@class='dropdown-item']//span").count()
    //     const randomIndex = Math.floor(Math.random() * count) + 1;
    //     await this.click(this.selectors.selectType(randomIndex), "Type", "dropdown");
    // }

    public async selectOrgType(orgTypeData: string) {
         await this.click(this.selectors.selectTab, "Select", "Dropdown");
         await this.click(this.selectors.orgType(orgTypeData), "Select", "Dropdown");
         }

    public async typeDescription() {
        await this.type(this.selectors.description, "Textbox", FakerData.getDescription());
    }

    public async clickSave() {
        await this.click(this.selectors.save, "Save", "Button")
    }

    public async clickEditOrg() {
        await this.click(this.selectors.editOrganization, "Edit ", "Button")
    }
    public async clickEditIcon() {
        await this.click(this.selectors.orgeditIcon, "Edit ", "Icon")
    }
    public async childOrgCount(fdname: string) {
        for (let i = 0; i <= 1; i++) {
            await this.click(this.selectors.loadMore, "LoadMore", "Button")
            await this.wait("minWait")
        }
        const org = await this.getInnerText(this.selectors.childCount(fdname));
        console.log(org)
        let orgName = org.split(":").at(1)
        return parseInt(orgName)
    }
    public async enterParentOrg(orgName: string) {
        await this.keyboardType(this.selectors.parentOrg, orgName)
        await this.validateElementVisibility(this.selectors.selectParentOrg, "parentOrgName")
        await this.click(this.selectors.selectParentOrg, "parentOrgName", "Option")

    }
    public async enterContactName() {
        await this.wait("minWait");
        await this.validateElementVisibility(this.selectors.contactName, "ContactName");
        await this.type(this.selectors.contactName, "ContactName", FakerData.getFirstName());
    }
    public async clickUpdate() {
        await this.click(this.selectors.updateBtn, "Update", "Button")
    }



       public async editOrganization(data:string) {
        await this.type(this.selectors.orgSearchField, "Search Field", data);
        await this.keyboardAction(this.selectors.orgSearchField, "Enter", "Search Field", data);
        await this.spinnerDisappear();
        await this.wait("minWait")
        await this.validateElementVisibility(this.selectors.editOrg(data), "Edit Organization");
        await this.click(this.selectors.editOrg(data), "Edit Organization", "Button");
        await this.wait("minWait")
    }
    //verifying edited organization after updated through API
    public async verifyingEditedOrganization(data:string) {
        await this.verification(this.selectors.descriptionVerify,data);
    }
}
