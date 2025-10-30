import { Page, BrowserContext } from "@playwright/test";
import { URLConstants } from "../constants/urlConstants";
import { PlaywrightWrapper } from "../utils/playwright"


export class AdminGroupPage extends PlaywrightWrapper {

    static pageUrl = URLConstants.adminURL;

    public selectors = {
        clickAdminGroup: (user: string) => `//div[text()='${user}']`,
        searchUser: "#includeLearner-filter-field",
        chooseUser: (user: string) => `//li[text()='${user}']`,
        //(username:string)=>`//span[text()=${username}]/following::i[contains(@class,'fa-square icon')][1]
        //selectUser:`(//div[contains(@class,'custom-control custom-chkbox')])[2]`,
        selectUser: `(//div[contains(@class,'chkbox')]//i[contains(@class,'fa-square icon')])[2]`,
        clickSelectUser: `//button[text()='Select Users']`,
        selectUpdate: `//button[text()='Update']`,
        searchCustomerAdmin: `//button[text()='CREATE GROUP']/following::input[1]`,
        // selectPopup: `//li[text()='Super admin - Customer']`,
        // commerceAdmin: `//div[text()='Commerce admin']`      
        createGroupButton: `#admin-view-btn-primary`,
        groupTitle: `#title`,
        adminRoledropdown: `//button[@data-id='admin_roles']`,
        selectRole: (roleName: string) => `//a[@class='dropdown-item']//span[text()='${roleName}']`,
        saveAdminGroup: `#lrnSaveUpdate`,
        proceedButton: `//button[contains(text(),'Yes, Proceed')]`,
        clickActivateBtn:`//span[text()='Activate']`,
        adminGroupValue: `//label[text()='Learner Group']//preceding::label[@class='form-label d-block my-0 me-1 text-break']`,
        adminGroupValueInUser: `//label[text()='Admin Group']//following::label[@class='form-label d-block my-0 me-1 text-break']`,
    
    }

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }


    public async searchAdmin(admin: string) {
        await this.type(this.selectors.searchCustomerAdmin, "Search Admin", admin)

    }
    public async clickGroup(data: string) {
        await this.mouseHover(this.selectors.chooseUser(data), "POP up ");
        await this.click(this.selectors.chooseUser(data), "Pop up", "Clicked");
        await this.click(this.selectors.clickAdminGroup(data), "Customer Admin", "Button");
    }


    public async clickCommerceAdmin() {
        await this.click(this.selectors.clickAdminGroup("Commerce admin"), "Commerce Admin", "Button");

    }

    public async clickLearningAdmin() {
        await this.click(this.selectors.clickAdminGroup("Learning admin"), "Learning Admin", "Button");
        await this.wait('minWait')
    }


    public async clickPeopleAdmin() {
        await this.click(this.selectors.clickAdminGroup("People admin"), "People Admin", "Button");
    }


    public async clickEnrollAdmin() {
        await this.click(this.selectors.clickAdminGroup("Enrollment admin"), "People Admin", "Button");
    }


    public async clickCourseAdmin() {
        await this.click(this.selectors.clickAdminGroup("Course creator admin"), "Course Admin", "Button");
    }


    // public async adminPopup(admintype:string){
    //     const adminGroup = [
    //         "Customer Admin", "Course creator admin", "Enrollment admin",
    //          "People admin", "Learning admin", "Commerce admin", "Talent admin",           
    //     ];   
    //     for(let name of adminGroup){     
    //         if(name.includes(admintype))
    //         await this.click(this.selectors.clickAdminGroup(`${name}`), `${name}`, "Button");
    //     }}


    public async searchUser(data: string) {
        await this.typeAndEnter(this.selectors.searchUser, "Search User", data);

    }
    public async clickuserCheckbox(username: string) {
        await this.validateElementVisibility(this.selectors.selectUser, username);
        await this.click(this.selectors.selectUser, username, "CheckBox");
        await this.isCheckboxClicked(this.selectors.selectUser, "CheckBox");
    }

    public async clickSelectUsers() {
        await this.click(this.selectors.clickSelectUser, "Username", "Checkbox ");
    }

    public async clickUpdate() {
        await this.validateElementVisibility(this.selectors.selectUpdate, "Update");
        await this.wait('minWait');
        await this.click(this.selectors.selectUpdate, "Update", "Button");
    }
    public async clickCreateGroup() {
        await this.click(this.selectors.createGroupButton, "Create Group", "Button")
    }

    public async enterGroupTitle(title: string) {
        await this.type(this.selectors.groupTitle, "Custome Group title", title)

    }

    public async selectroleAdmin(roleName: string) {
        await this.click(this.selectors.adminRoledropdown, "Admin Role", "Dropdown")
        await this.click(this.selectors.selectRole(roleName), "Custom Admin Role", "Option")
    }

    public async clickSave() {
        await this.click(this.selectors.saveAdminGroup, "Custom Group Save ", "button")
    }

    public async clickProceed() {
        await this.wait("minWait")
        await this.validateElementVisibility(this.selectors.proceedButton, "Proceed");
        await this.click(this.selectors.proceedButton, "Proceed", "button")

    }

    async getAdminGroups() {
        await this.wait("mediumWait");
        const locator = this.page.locator(this.selectors.adminGroupValue);
        const count = await locator.count();
        let adminGroup: any = [];
        for (let i = 0; i < count; i++) {
            const ag = await locator.nth(i).innerHTML();
            await adminGroup.push(ag);
        }
        return adminGroup;
    }
    async getAdminGroupsInUserPage() {
        await this.wait("mediumWait");
        const locator = this.page.locator(this.selectors.adminGroupValueInUser);
        const count = await locator.count();
        let adminGroup: any = [];
        for (let i = 0; i < count; i++) {
            const ag = await locator.nth(i).innerHTML();
            await adminGroup.push(ag);
        }
        return adminGroup;
    }
    async clickActivate() {
        await this.validateElementVisibility(this.selectors.clickActivateBtn, "Activate");
        await this.click(this.selectors.clickActivateBtn, "Activate", "Radio");
    }
    public async clickSelelctUsers() {
        await this.click(this.selectors.clickSelectUser, "Username", "Checkbox ");
    }

}