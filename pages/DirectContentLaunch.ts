import { BrowserContext, expect, Page } from "@playwright/test";
import { AdminHomePage } from "./AdminHomePage";

export class DirectContentLaunch extends AdminHomePage {

public selectors = {
        ...this.selectors,
        domaindropdown:`//button[@role='combobox']`,
        domainnameselect:(Options: string) => `//a[@class='dropdown-item']//span[text()='${Options}']`,
        searchfield:`//input[@id='exp-search-field']`, 
        generatebtn:`//button[text()='Generate URL']`, 
        innerurl:`//input[@id='direct_content_URL']`,
        clearbtn:`//button[text()='Clear']`,
        copy:`//i[@aria-label='Copy']`,
        successverify:`//div[contains(@class, 'show alert alert-success')]//following::span`,
        directcontentSearchResult: (clsTitle:string) =>`//li[contains(text(),'${clsTitle}')]`,
        copyurl:`//i[@aria-label='Copy']`,
        clearfields:`//button[text()='Clear']`,
        urlText:`//input[@name='direct_content_URL']`,

    };

    constructor(page: Page, context: BrowserContext) {
        super(page, context)
        
    }
    public async clickdomaindropdown(data: string) {
        await this.wait("minWait")
        await this.click(this.selectors.domaindropdown, "domaindropdown", "Button")
        await this.click(this.selectors.domainnameselect(data), "domainnameselect","Link")
    }

    
    // public async searchfield(data: string) {
    //     await this.type(this.selectors.searchfield, "searchfield", data)
    //     await this.wait ("minWait")
    // }
    public async searchfield(clsTitle: string) {
        await this.type(this.selectors.searchfield, "searchfield", clsTitle)
        await this.wait ("minWait")
	await this.mouseHoverandClick(this.selectors.directcontentSearchResult(clsTitle),this.selectors.directcontentSearchResult(clsTitle),"directcontentsearch", "dropdown")
    }
    public async generateURL() {
        await this.click(this.selectors.generatebtn, "generatebtn", "Button")
        await this.wait ("mediumWait")
    }

    async verifySuccessMessage() {
        
        await this.verification(this.selectors.successverify, "successfully");
        await this.wait("minWait")
    }
    public async copyURL() {
        await this.click(this.selectors.copyurl, "copyurl", "Button")
        await this.wait ("minWait")
        const copyURL=await this.page.locator(this.selectors.urlText).inputValue()
        return copyURL;
    }
    public async clearFields() {
        await this.click(this.selectors.clearfields, "clearfields", "Button")
        await this.wait ("minWait")
    }

  


}