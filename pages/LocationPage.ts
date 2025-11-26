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
        floorNo:`//input[@id="building_name"]`,
        capacity:`//input[@id="capacity"]`,
        latitude :`//input[@id="latitude"]`,
        longitude:` //input[@id="longitude"]`,
        latLongErrorMessage:`(//div[@id="message-container"]/div[2]/ul/li/span)[1]`,
        phone: `//input[@id="phone"]`,
        listingPageXpath:`//a[text()='Go to Listing']`,
        //xpaths for uunpublish location click filtered location and delete
        filteredItem: `//div[@id="exp-search-lms-scroll-results"]/ul/li`,
        unpublishButton: `//i[@class="fa-duotone fa-ban icon_14_6"]`,
        okButton: `//button[text()='OK']`,
        deleteButton: `//a[@aria-label="Delete"]/i`,
        confirmDeleteButton: `//button[text()='Yes']`,
        unpublishButtonfilter:`//button[text()='Unpublished']`,
        editlocationButton:`//a[text()='Edit Location']`,
        unpublishedButton:` //button[text()='Unpublish']`,
        discardButton:`//button[@id="location-btn-discard"]`,
        publishedLocation: (locationname: string) => `//h5[text()='${locationname}']`,
        addEquipmentButton:`//*[self::button or self::div][normalize-space(.)='Add Equipment']`,
        equipmentTextbox:`//input[@id='add_equipment' or @id='data_name']`,
        equipmentTickButton:`//i[@class="fad fa-check pointer icon_18_1"]`,
        equipmentDrodownXpath:`//div[@id="wrapper-equipment_ids"]`,
        equipmentDropdownValuess: (equipmentName:string) => `//span[text()='${equipmentName}']`,
        saveButton:`//button[text()='Save']`,
        loadMoreButton:`//button[text()='Load More']`,
        publishedTabCount: `//button[@id='nav-home-tab-published']/span`,
        deleteIcon: `//i[@class='fa-duotone fa-trash-can icon_14_6']`,
        locationNameText: "//h5[@class='h5_action_title_inactive card-title text-nowrap text-truncate mb-1 text-capitalize mw-100 fit-content pb-2']",
        locationTrainingWarningMessage: "//div[@class='align-items-center justify-content-center text-break information_text']/span",

        
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

    async enterCitywithclear(data: string) {
    const cityInput = this.page.locator(this.selectors.cityInput);
    await cityInput.clear();
    await cityInput.fill(data);
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

    async clickDiscardButton() {
        await this.validateElementVisibility(this.selectors.discardButton, "Yes,Proceed");
        await this.click(this.selectors.yesProceedBtn, "Yes,Proceed", "Button");
    }
    
    ////button[@id="location-btn-discard"]

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
        try {
            await expect(this.selectors.duplicate_message).toBeVisible({ timeout: 5000 });
            console.log(" Duplicate location not allowed – test case passed");
        } catch (error) {
            console.log("Duplicate location allowed – test case failed");
        }


    }

    async enterFloorN0() {
    const floorInput = this.page.locator(this.selectors.floorNo);
    const randomFloorName = `Building-${Math.floor(Math.random() * 100) + 1}`;
    await floorInput.fill(randomFloorName);
}

    async roomCapacity() {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const capacityInput = this.page.locator(this.selectors.capacity);
    await capacityInput.fill(randomNumber.toString());
    console.log(`Entered random room capacity: ${randomNumber}`);
    }

    public async setLatitude() {
    const lat = (Math.random() * 180 - 90).toFixed(6); // -90 to +90
    await this.page.locator(this.selectors.latitude).fill(lat);
    console.log(`Random latitude set to: ${lat}`);
    }

    public async setLongitude() {
        const lon = (Math.random() * 360 - 180).toFixed(6); // -180 to +180
        await this.page.locator(this.selectors.longitude).fill(lon);
        console.log(`Random longitude set to: ${lon}`);
    }

   
    // Function to manually set Latitude
    public async setManualLatitude(latValue: string) {
    const latitudeInput = this.page.locator(this.selectors.latitude);
    await latitudeInput.fill(latValue);
    console.log(`Manually set latitude to: ${latValue}`);
    }

    // Function to manually set Longitude
    public async setManualLongitude(longValue: string) {
    const longitudeInput = this.page.locator(this.selectors.longitude);
    await longitudeInput.fill(longValue);
    console.log(`Manually set longitude to: ${longValue}`);
    }

   
    public async verifyInvalidLatLongErrorMessage() {
    const errorLocator = this.page.locator(this.selectors.latLongErrorMessage);

    try {
        const isVisible = await errorLocator.isVisible({ timeout: 5000 });

        if (isVisible) {
            const messageText = await errorLocator.textContent();
            console.log(` Validation Passed — Error message displayed: ${messageText?.trim()}`);
        } else {
            console.error(" Validation Failed — Expected error message not visible.");
            throw new Error("Invalid Latitude/Longitude validation message not displayed.");
        }
    } catch (error) {
        console.error(" Validation Failed — Error message not found or not visible.");
        throw error;
    }
    }

   

public async setRandomContactNumber() {
    // Generate random 10-digit number (first digit non-zero)
    const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
    
    // Locate and fill the phone input
    const phoneInput = this.page.locator(this.selectors.phone);
    await phoneInput.fill(randomNumber.toString());

    console.log(` Entered random contact number: ${randomNumber}`);
}

public async clickGoToListingButton() {
    const listingButton = this.page.locator(this.selectors.listingPageXpath);
    await listingButton.waitFor({ state: 'visible', timeout: 5000 });
    await listingButton.click();
    console.log("Clicked on 'Go to Listing' button successfully.");
    //listingPageXpath
}

public async deleteLocation(locationName: string) {
    // Step 1: Click search box and enter location name
    const searchBox = this.page.locator(this.selectors.searchLocation);
    await searchBox.click();
    await searchBox.fill(locationName);
    await this.page.waitForSelector(this.selectors.filteredItem, { state: 'visible', timeout: 5000 });
    // Step 2: Click filtered search result
    await this.page.locator(this.selectors.filteredItem).first().click();
    
    await this.clickunpublishedTab();
    // Step 4: Click OK confirmation button

    // const okBtn = this.page.locator(this.selectors.okButton);
    // await okBtn.waitFor({ state: 'visible', timeout: 5000 });
    // await okBtn.click();
    // console.log(`Location "${locationName}" unpublished successfully.`);
    // // Step 5: Clear search box
    // await searchBox.click({ clickCount: 3 });
    // await this.page.keyboard.press('Backspace');
    // // Step 6: Search the location again
    // await searchBox.fill(locationName);
    // await this.page.waitForSelector(this.selectors.filteredItem, { state: 'visible', timeout: 5000 });
    // await this.page.locator(this.selectors.filteredItem).first().click();
    // Step 7: Click delete button
    const deleteBtn = this.page.locator(this.selectors.deleteButton);
    await deleteBtn.waitFor({ state: 'visible', timeout: 5000 });
    await deleteBtn.click();
    // Step 8: Confirm deletion
    const yesBtn = this.page.locator(this.selectors.confirmDeleteButton);
    await yesBtn.waitFor({ state: 'visible', timeout: 5000 });
    await yesBtn.click();
    console.log(`Location "${locationName}" deleted successfully.`);
}
public async clickunpublishedTab() {
    const listingButton = this.page.locator(this.selectors.unpublishButtonfilter);
    await listingButton.waitFor({ state: 'visible', timeout: 5000 });
    await listingButton.click();
    console.log("Clicked on 'Go to Listing' button successfully.");
   
}

public async clickEditLocationButton() {
    const listingButton = this.page.locator(this.selectors.editlocationButton);
    await listingButton.waitFor({ state: 'visible', timeout: 5000 });
    await listingButton.click();
    console.log("Clicked on 'Go to Listing' button successfully.");
    }    
// public async clickUnpublishedButton() {
//     const listingButton = this.page.locator(this.selectors.unpublishedButton);
//     await listingButton.waitFor({ state: 'visible', timeout: 5000 });
//     await listingButton.click();
//     console.log("Clicked on 'UnpublishedButton'  successfully.");
//     } 
public async clickUnpublishedButton() {
    const listingButton = this.page.locator(this.selectors.unpublishedButton);

    await listingButton.waitFor({ state: 'visible', timeout: 5000 });
    await listingButton.click();
    console.log("Clicked on 'Unpublish' button successfully.");

    // Double verification — click again if still visible
    const stillVisible = await listingButton.isVisible();
    if (stillVisible) {
        console.log("Button still visible after first click — clicking again.");
        await listingButton.click();
        console.log("Clicked on 'Unpublish' button successfully on second attempt.");
    } else {
        console.log("Button no longer visible after first click.");
    }
}

public async searchandselectItem(searchitem:string){ {
    const searchBox = this.page.locator(this.selectors.searchLocation);
    await searchBox.click();
    await searchBox.fill(searchitem);
    await this.page.waitForSelector(this.selectors.filteredItem, { state: 'visible', timeout: 5000 });
    // Step 2: Click filtered search result
    await this.page.locator(this.selectors.filteredItem).first().click();  
}
}
async isVisiblePublishedLocation(locationname: string) {
    const locationElement = this.page.locator(this.selectors.publishedLocation(locationname));
    return await locationElement.isVisible();
    await this.wait("minWait")
}
async verifyLocationVisible() {
    const label = this.page.locator(this.selectors.locationLabel);
    if (await label.isVisible()) {
        console.log('Discard function success');
    } else {
        console.log('Discard function failed');
    }
}

public async clickAddEquipmentButton() {
    const listingButton = this.page.locator(this.selectors.addEquipmentButton);
    await listingButton.waitFor({ state: 'visible', timeout: 5000 });
    await listingButton.click();
    console.log("Clicked on 'Add Equipment' button successfully.");
    } 

async setEquipmentName(data: string) {
        await this.wait('mediumWait');
        await this.type(this.selectors.equipmentTextbox, "Create Location", data);
    }
async clickEquipmentTickButton() {
        await this.wait("mediumWait");
        await this.click(this.selectors.equipmentTickButton, "Create Location", "Button");
    }

async clickEquipmentDropdown() {
        await this.wait("mediumWait");
        await this.click(this.selectors.equipmentDrodownXpath, "Create Location", "Button");
    }

async clickDropdownValues(equipmentName:string) {
        await this.wait("mediumWait");
        await this.click(this.selectors.equipmentDropdownValuess(equipmentName), "Create Location", "Button");
    }
 async clickSaveButton(data: string) {
        await this.wait('mediumWait');
        await this.type(this.selectors.saveButton, "Create Location", data);
    }
async createEquipmentAndVerify() {
    const randomEquipmentName = `Equipment_${Math.floor(Math.random() * 100000)}`;
    await this.clickAddEquipmentButton();
    await this.setEquipmentName(randomEquipmentName);
    await this.clickEquipmentTickButton();
    //await this.clickEquipmentDropdown();
    //await this.clickDropdownValues(randomEquipmentName);
}

async clickLoadMoreButton() {
        await this.wait("mediumWait");
        await this.click(this.selectors.loadMoreButton, "Create Location", "Button");
    }
async loadMoreButtonVerification() {
    const countText = await this.page.locator(this.selectors.publishedTabCount).textContent();
    const count = parseInt(countText?.replace(/[()]/g, '') || '0');
    console.log(`Published Tab Count: ${count}`);
    const loadMore = this.page.locator(this.selectors.loadMoreButton);
    if (count > 12) {
        const isEnabled = await loadMore.isEnabled();
        if (isEnabled) {
            console.log(`Load More button is enabled (count: ${count})`);
        } else {
            console.log(`Load More button should be enabled but is disabled (count: ${count})`);
        }
    } else {
        console.log(`Count is ${count}, Load More button not required`);
    }
}

async verifyDeleteIconNotVisible() {
    const icons = this.page.locator(this.selectors.deleteIcon);
    const count = await icons.count();
    if (count > 0) {
        console.log(` Test failed: ${count} delete icon(s) are visible on the page`);
        throw new Error('Delete icon(s) should not be visible');
    } else {
        console.log(' Test passed: No delete icons found on the page');
    }
}
async MessageForLocationWithTrainingAssociations() {
    const expectedText = "This location is associated with one or more trainings. Please remove the associations and then unpublish this location.";
    const messageLocator = this.page.locator(this.selectors.locationTrainingWarningMessage);

    const isVisible = await messageLocator.isVisible();
    if (!isVisible) {
        throw new Error("Warning message not visible — Test Failed");
    }

    const actualText = await messageLocator.textContent();
    if (actualText?.trim() === expectedText) {
        console.log("Correct warning message displayed — Test Passed");
    } else {
        throw new Error(`Incorrect message displayed. Expected: "${expectedText}" but got: "${actualText}"`);
    }
}
async ClickonlocationName() {
    const locationElement = this.page.locator(this.selectors.locationNameText);
    await locationElement.waitFor({ state: 'visible' });
    await locationElement.click();
    console.log("Clicked on location name successfully");
}
public async clickOkButton() {
    const listingButton = this.page.locator(this.selectors.okButton);
    await listingButton.waitFor({ state: 'visible', timeout: 5000 });
    await listingButton.click();
    console.log("Clicked on 'Go to Listing' button successfully.");
    //listingPageXpath
}

// ===== Custom Field Related Functions =====

async verifyCustomFieldLabelWithHashSymbol(customFieldName: string) {
    await this.wait('minWait');
    const labelWithHash = this.page.locator(`//label[contains(.,'${customFieldName}')]//span[text()='#'] | //label[contains(.,'${customFieldName}') and contains(.,'#')]`).first();
    await labelWithHash.waitFor({ state: 'visible', timeout: 10000 });
    const isVisible = await labelWithHash.isVisible();
    expect(isVisible).toBeTruthy();
    console.log(`✓ Custom field "${customFieldName}" appears with # symbol (mandatory indicator)`);
}

async verifyMandatoryCustomFieldValidation(customFieldName: string) {
    await this.wait('minWait');
    const validationError = this.page.locator(`//label[contains(.,'${customFieldName}')]//following::span[contains(@class,'error') or contains(@class,'validation') or contains(text(),'required') or contains(text(),'mandatory')] | //div[contains(@class,'error') and contains(.,'${customFieldName}')] | //span[contains(text(),'${customFieldName}') and (contains(text(),'required') or contains(text(),'mandatory'))]`).first();
    await validationError.waitFor({ state: 'visible', timeout: 10000 });
    const isVisible = await validationError.isVisible();
    expect(isVisible).toBeTruthy();
    console.log(`✓ Mandatory field validation displayed for "${customFieldName}"`);
}


}




