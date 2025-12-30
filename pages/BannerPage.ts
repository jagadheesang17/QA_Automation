
import { Page, BrowserContext } from "@playwright/test";
import { PlaywrightWrapper } from "../utils/playwright";
import { AdminHomePage } from "./AdminHomePage";
import { FakerData, getCurrentDateFormatted } from "../utils/fakerUtils";

export class BannerPage extends AdminHomePage {
    public selectors = {
        ...this.selectors,
        bannerTitle: `//input[@id='banner-title']`,
        bannerDatefield: `//input[@id='banner_from_date-input']`,
        dateFrom: `//td[@class='today day']`,
        dateTo: `//input[@id='banner_to_date-input']`,
        nextButton: `(//th[@class='next'])[1]`,
        sequenceSelect: `//span[text()='Sequence']/following::div[@id='wrapper-banner_sequence']`,
        sequenceOption: `//a[@class='dropdown-item']`,
        sequenceOptionIndex: (index: number) => `(//a[@class='dropdown-item'])[${index}]`,
        clickheretoUpload: `//span[text()='Click here']`,
        uploadFile: `//span[text()='Click here']/following::input[@type='file']`,
        publishButton: `//button[@id='banner-btn-publish']`,
        bannerUrl: `//input[@id='banner_link']`,
        editBanner: `//a[text()='Edit Banner']`,
        bannerListing: `//a[text()='Go to Listing']`,
        unpublishtab: `//button[text()='Unpublished']`,
        deleteIcon: `(//a[@aria-label="Delete"]/i)[1]`,
        confirmDelete: `//button[text()="Delete"]`,
        editIcon: (title:string)=>`(//div[text()='${title}']/following::i[contains(@class,'fa fa-duotone')])`,
        editIconIndex:(index:number)=> `(//i[contains(@class,'fa fa-duotone')])[${index}]`,
        updatebtn: `//button[text()='Update']`,
        editSequence:`//span[text()='Sequence']/following::button[@data-id='banner_sequence']`,
        editsequenceindex:`//ul[contains(@class,'dropdown-menu inner')]//a`,
        selectsequenceIndex:(index: number)=>`(//ul[contains(@class,'dropdown-menu inner')]//a)[${index}]`,
        modalDialog:`//div[contains(@class,'modal-content ')]//span[contains(text(),'deleted')]`,
        okButton:`//button[text()='OK']`,
        randomDate: `(//td[@class='day']/following-sibling::td)[1]`,
        nextMonth: `//div[@class='datepicker-days']//th[@class='next']`,
        //pageBuilder selectors
        bannerTitlecheckbox:`//a[text()='Show Title']`,
        learnerPageBuilderMenu:`//span[text()='Learner Page Builder']`,
        bannerRadioButton:`//h1[text()='Banner/Learner Engagement Console']`,
        editTemplateButton:`//button[text()='Edit Template']`,
        lastDomainButton:`(//button[@aria-controls="nav-home"])[last()]`,
        cloneIconbutton:`//a[@aria-label='Clone']/i`,
        unpublishIcon: `(//a[@aria-label='Unpublish']/i)[1]`,
        confirmUnpublish: `//button[text()='OK']`,
        successMessage: `//div[contains(@class,'success') or contains(@class,'alert')]//span | //span[contains(text(),'Successfully')]`,
        publishedTab: `//button[text()='Published']`,
        bannerInListing: (title: string) => `//div[contains(text(),'${title}')] | //td[contains(text(),'${title}')] | //span[contains(text(),'${title}')]`,
        searchField: `//input[@id='exp-search-field']`,
        noResultsMessage: `//h3[text()='There are no results that match your current filters. Try removing some of them to get better results.']`,
        invalidUrlErrorMessage: `//span[contains(text(),'Invalid URL') or contains(text(),'invalid url') or contains(text(),'Please enter a valid URL')] | //div[contains(@class,'error')]//span[contains(text(),'URL')]`,
        unsupportedFileErrorMessage: `//span[contains(text(),'unsupported') or contains(text(),'Unsupported') or contains(text(),'invalid file') or contains(text(),'Invalid file')] | //div[contains(@class,'error')]//span | //span[@class='help-block']`,
        disabledDates: `//td[contains(@class,'disabled') and contains(@class,'day')]`,
        tooltip: `//div[contains(@class,'tooltip') or @role='tooltip']`,
        changelogIcon: `//i[contains(@class,'fa-history') or contains(@class,'history')] | //a[contains(@aria-label,'History') or contains(@aria-label,'Changelog')]`,
        changelogModal: `//div[contains(@class,'modal')]//h3[contains(text(),'Change Log') or contains(text(),'History')]`,

    };

    public async enterBannerTitile(homePage: string) {
        await this.type(this.selectors.bannerTitle, "BannerTitle", homePage)
    }

    public async enterFromDate() {
        await this.click(this.selectors.bannerDatefield, "From Date","Field")
        await this.click(this.selectors.dateFrom, "From Date","Field")
    }
    public async enterToDate(){
        await this.click(this.selectors.dateTo, "To Date", "Field")
        await this.click(this.selectors.nextMonth,"Next Month","Navigator")
        await this.click(this.selectors.randomDate,"Random","Date")
    }
    public async enterTotodayDate() {
        await this.click(this.selectors.dateTo, "To Date", "Field")
        await this.click(this.selectors.dateFrom, "From Date","Field") //today's date
    }

    public async laterDate() {
        await this.click(this.selectors.dateTo, "To Date", "Field")
        await this.click(this.selectors.dateFrom, "From Date","Field") //today's date
    }

    public async selectSequence(indexNumber: number) {
        await this.click(this.selectors.sequenceSelect, "Sequence", "dropdown")
        await this.click(this.selectors.sequenceOptionIndex(indexNumber), "SequenceOption", "Option");
   
    }

    public async editSequencefield(indexNumber: number) {
        await this.click(this.selectors.editSequence, "Sequence", "dropdown")
        const selector = this.page.locator(this.selectors.editSequenceIndex);
        const sequenceCount = await selector.count();
        const randomIndex = Math.floor(Math.random() * sequenceCount);
        await this.click(this.selectors.selectsequenceIndex(indexNumber), "SequenceOption", "Option");
    }
    public async uploadImage(fileName:string) {      
        const path = `../data/${fileName}.jpg`;
        await this.uploadFile(this.selectors.uploadFile, path);
    }
    public async clickPublish() {       
       
        await this.validateElementVisibility(this.selectors.publishButton, "Publish");
        await this.page.locator(this.selectors.publishButton).scrollIntoViewIfNeeded();
        await this.click(this.selectors.publishButton, "Publish", "Button")
        
    }
    public async enterbannerUrl() {         
        const url = this.page.url()
        await this.type(this.selectors.bannerUrl, "Banner Url ",url)
    }
    public async clickEditIcon(title:string) {     
       // await this.validateElementVisibility(this.selectors.editIcon(title),"EditIcon")
         const counter=this.page.locator(this.selectors.editIcon(title));
         const index=await counter.count()
         const randomIndex = Math.floor(Math.random() * index)+1;
        await this.click(this.selectors.editIconIndex(randomIndex), "Edit", "Icon")
        await this.wait("minWait")
    }

    public async clickUpdatebtn() {
        await this.click(this.selectors.updatebtn, "Update", "Button")
    }

    // public async clickeditBanner(){
    //     await this.click(this.selectors.editBanner,"Edit Banner","Button")
    // }

    public async clickListing() {
        await this.click(this.selectors.bannerListing, "Goto Listing", "Button")
    }

    public async clickUnpublishtab() {
        await this.click(this.selectors.unpublishtab, "unPublish", "Button")
    }

    public async clickDelete() {
        await this.click(this.selectors.deleteIcon, "unPublish", "Button")
        await this.click(this.selectors.confirmDelete, "Delete", "Button")
    }

    public async verifyDeleteMsg(){
     await this.verification(this.selectors.modalDialog,"deleted")
     await this.click(this.selectors.okButton,"OK","Button")
   }
   
    public async enableBannerTitle() {
        await this.validateElementVisibility(this.selectors.bannerTitlecheckbox, "Show Title Checkbox");
        await this.click(this.selectors.bannerTitlecheckbox, "Show Title", "Checkbox");
    }

    public async disableBannerTitle() {
        await this.validateElementVisibility(this.selectors.bannerTitlecheckbox, "Show Title Checkbox");
        await this.click(this.selectors.bannerTitlecheckbox, "Show Title", "Checkbox");
    }

    public async enableBannerRadioButton() {
        await this.validateElementVisibility(this.selectors.bannerRadioButton, "Banner Radio Button");
        await this.click(this.selectors.bannerRadioButton, "Banner/Learner Engagement Console", "Radio Button");
    }

    public async disableBannerRadioButton() {
        await this.validateElementVisibility(this.selectors.bannerRadioButton, "Banner Radio Button");
        await this.click(this.selectors.bannerRadioButton, "Banner/Learner Engagement Console", "Radio Button");
    }

    public async clickLastDomain() {
        await this.validateElementVisibility(this.selectors.lastDomainButton, "Last Domain Button");
        await this.click(this.selectors.lastDomainButton, "Last Domain", "Button");
    }

    public async clickEditTemplateButton() {
        await this.validateElementVisibility(this.selectors.editTemplateButton, "Edit Template Button");
        await this.click(this.selectors.editTemplateButton, "Edit Template", "Button");
    }

    public async enableBannerTitleInSiteSettings() {
        // Click Site Settings
        await this.siteSettings();
        await this.wait("minWait");
        
        // Click Learner Page Builder
        await this.validateElementVisibility(this.selectors.learnerPageBuilderMenu, "Learner Page Builder");
        await this.click(this.selectors.learnerPageBuilderMenu, "Learner Page Builder", "Menu");
        await this.wait("minWait");
        
        // Click Last Domain
        await this.clickLastDomain();
        await this.wait("minWait");
        
        // Click Edit Template
        await this.clickEditTemplateButton();
        await this.wait("minWait");
        
        // Click Enable Banner Radio Button
        await this.enableBannerRadioButton();
        await this.wait("minWait");
        
        // Enable Banner Title Checkbox
        await this.enableBannerTitle();
        await this.wait("minWait");
    }

    public async clickCloneButton() {
        await this.validateElementVisibility(this.selectors.cloneIconbutton, "Clone Button");
        await this.click(this.selectors.cloneIconbutton, "Clone", "Button");
    }

    public async clickUnpublishIcon() {
        await this.validateElementVisibility(this.selectors.unpublishIcon, "Unpublish Icon");
        await this.click(this.selectors.unpublishIcon, "Unpublish", "Icon");
    }

    public async clickOkButton() {
        await this.validateElementVisibility(this.selectors.okButton, "OK Button");
        await this.click(this.selectors.okButton, "OK", "Button");
    }

    public async clickPublishedTab() {
        await this.validateElementVisibility(this.selectors.publishedTab, "Published Tab");
        await this.click(this.selectors.publishedTab, "Published", "Tab");
    }

    public async verifySuccessMessage(expectedMessage: string) {
        await this.validateElementVisibility(this.selectors.successMessage, "Success Message");
        const actualMessage = await this.page.locator(this.selectors.successMessage).textContent();
        if (actualMessage?.includes(expectedMessage)) {
            console.log(`✓ Success message verified: ${actualMessage}`);
        } else {
            console.log(`⚠ Expected message not found. Actual: ${actualMessage}`);
        }
    }

}
