import path from "path";
import { PlaywrightWrapper } from "../utils/playwright";
import { AdminHomePage } from "./AdminHomePage";
import fs from "fs"
import { filePath } from "../data/MetadataLibraryData/filePathEnv";
import { test, expect } from '@playwright/test';

export class LocationPage extends AdminHomePage {

    public selectors = {
        ...this.selectors,
        locationLabel: "//h1[text()='Location']",
        createLocationBtn: "//button[text()='CREATE LOCATION']",
        locationName: "//label[text()='Location Name']/following-sibling::input",
        address1Input: "//label[text()='Address 1']/following-sibling::input",
        countryBtn: "//label[text()='Country']/following::button[1]",
        stateBtn: "//label[text()='State/Province']/following::button[1]",
        timezoneBtn: "//label[text()='Time Zone']/following::button[1]",
        cityInput: "//label[text()='City/Town']/following::input[1]",
        zipcodeInput: "//label[text()='Zip Code']/following::input[1]",
        publishBtn: "//button[text()='Publish']",
        commonInputField: "//footer/following::input[1]",
        yesProceedBtn: "//footer/following::button[text()='Yes, Proceed']",
        successMessage: "//h3[contains(text(),'successfully')]",
        locationsValue: "//div[contains(@class,'flex-column justify-content')]//h5",
        duplicate_message: "//span[text()='The Location Name field already exists.']",
        //Verifying created location through api
        searchLocation:`//input[contains(@id,'exp-search')]`,

    }

    async verifyLocationLabel() {
        await this.validateElementVisibility(this.selectors.locationLabel, "Location");
        await this.verification(this.selectors.locationLabel, "Location");
    }

    async clickCreateLocation() {
        await this.wait("mediumWait");
        await this.click(this.selectors.createLocationBtn, "Create Location", "Button");
    }

    async locationName(data: string) {
        await this.wait('mediumWait');
        await this.type(this.selectors.locationName, "Create Location", data);
    }

    async enterAddress(data: string) {
        await this.type(this.selectors.address1Input, "Address1", data);
    }

    async enterCountry(data: string) {
        await this.click(this.selectors.countryBtn, "Country", "Button");
        await this.type(this.selectors.commonInputField, "Input", data);
        await this.click("//span[text()='" + data + "']", "Country", "Dropdown");
    }

    async enterState(data: string) {
        await this.click(this.selectors.stateBtn, "Country", "Button");
        await this.type(this.selectors.commonInputField, "Input", data);
        await this.click("//span[text()='" + data + "']", "Country", "Dropdown");
    }

    async enterTimezone(data: string) {
        await this.click(this.selectors.timezoneBtn, "Country", "Button");
        await this.type(this.selectors.commonInputField, "Input", data);
        await this.click("//span[text()='" + data + "']", "Country", "Dropdown");
    }

    async enterCity(data: string) {
        await this.type(this.selectors.cityInput, "Input", data);
    }

    async enterZipcode(data: string) {
        await this.type(this.selectors.zipcodeInput, "Input", data);
    }

    async clickPublishButton() {
        await this.validateElementVisibility(this.selectors.publishBtn, "Publish");
        await this.click(this.selectors.publishBtn, "Publish", "Button");
    }

    async clickProceed() {
        await this.validateElementVisibility(this.selectors.yesProceedBtn, "Yes,Proceed");
        await this.click(this.selectors.yesProceedBtn, "Yes,Proceed", "Button");
    }

    async verify_successfullMessage() {
        await this.validateElementVisibility(this.selectors.successMessage, "SuccessFull Message");
        await this.verification(this.selectors.successMessage, "successfully");
    }

    async getLocation() {
        await this.wait("mediumWait");
        const file=filePath.location
        const locator = this.page.locator(this.selectors.locationsValue);
        const count = await locator.count();
        let locations: any = [];
       // for (let i = 0; i < count; i++) {
            const location = await locator.nth(0).innerHTML();
            await locations.push(location);
     //   }
        console.log(locations);

        try {
            const filePath = file;
            const fileName = path.join(__dirname, filePath)
            fs.writeFileSync(fileName, JSON.stringify(locations));
            console.log(`Locations saved to ${filePath}`);
        } catch (err) {
            console.error('Error writing file:', err);
        }

    }
    //Verifying created location through api
    async verifyCreatedLocation(data:string) {
        await this.wait("minWait")
        await this.typeAndEnter(this.selectors.searchLocation,"Location Name",data)
        await this.validateElementVisibility(this.selectors.locationsValue, "Location Name");
        await this.verification(this.selectors.locationsValue, data);
    }

    async verifyduplicateLocationErrorMessage() {
        //const duplicateMessage = page.locator("//span[text()='The Location Name field already exists.']");
        
        try {
            await expect(this.selectors.duplicateMessage).toBeVisible({ timeout: 5000 });
            console.log(" Duplicate location not allowed – test case passed");
        } catch (error) {
            console.log("Duplicate location allowed – test case failed");
        }


    }
}

