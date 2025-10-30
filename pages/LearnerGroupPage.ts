import { BrowserContext, Page, expect } from "@playwright/test";
import { CatalogPage } from "./CatalogPage";
import { PlaywrightWrapper } from "../utils/playwright"
import path from "path";
import fs from "fs"
import { group } from "console";

export class LearnerGroupPage extends PlaywrightWrapper {

    public selectors = {
        createGroupbtn: `//button[text()='CREATE GROUP']`,
        clickSelectLearner: `//button[@id="AddUserSave"]`,
        clickAccess: `(//span[text()='Access'])[1]`,
        adminGroupWrapper: `//label[contains(text(),'Admin Group')]/following::div[1]`,
        adminGroupsearch: `//label[text()='Admin Group']/following::input[@type='search']`,
        adminGroupLink: (adminGroup: string) => `(//label[text()='Admin Group']//following::span[text()='${adminGroup}'])[1]`,
        okButton: `//button[text()='OK']`,
        learnerGroupValue: `//label[text()='Learner Group']//following::label[@class='form-label d-block my-0 me-1 text-break']`,
        clickSelectUser: `//button[@id="AddUserSave"]`
    };

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    public async clickSelelctLearners() {
        await this.validateElementVisibility(this.selectors.clickSelectLearner, "Select Learners")
        await this.click(this.selectors.clickSelectLearner, "Select Learners", "Button");
    }


    async clickAccessButtonInLearner() {
        await this.validateElementVisibility(this.selectors.clickAccess, "Access"),
            await this.click(this.selectors.clickAccess, "Access", "Link");
        await this.wait('mediumWait');
    }

    async selectAdminGrpInLearner(adminGroup: string) {
        await this.wait("minWait")
        await this.click(this.selectors.adminGroupWrapper, "Admin Group", "Field");
        await this.type(this.selectors.adminGroupsearch, "Input Field", adminGroup);
        await this.mouseHover(this.selectors.adminGroupLink(adminGroup), adminGroup);
        await this.click(this.selectors.adminGroupLink(adminGroup), adminGroup, "Button");
    }
    async clickOkButton() {
        await this.wait("minWait")
        await this.validateElementVisibility(this.selectors.okButton, "Access groups are updated for the Learner Group");
        await this.click(this.selectors.okButton, "Access groups are updated for the Learner Group", "Button");
    }

    async getLearnerGroups() {
        await this.wait("mediumWait");
        const locator = this.page.locator(this.selectors.learnerGroupValue);
        const count = await locator.count();
        let learnerGroup: any = [];
        for (let i = 0; i < count; i++) {
            const lg = await locator.nth(i).innerHTML();
            await learnerGroup.push(lg);
        }
        return learnerGroup
        console.log(learnerGroup);
    }

    async addGroups(group1: string, group2: string): Promise<string[]> {
        const learnerGroups: string[] = [];
        learnerGroups.push(group1, group2)
        return learnerGroups;
    }
    async verifyGroups(actual: string[], expected: string[]) {
        expect(actual).toEqual(expected);
    }



}