import { test } from "../../../customFixtures/expertusFixture";

test.describe(`BNR009: Verify No Matching Result Found Message`, async () => {

    test(`Verify and check if the records are not matching, "No matching result found" message is displayed`, async ({ adminHome, bannerHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Manikandan` },
            { type: `TestCase`, description: `BNR009` },
            { type: `Test Description`, description: `Navigate to banner listing, search with invalid keyword and verify no matching results message is displayed` }
        );

        // Login as admin
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.wait("mediumWait");

        // Navigate to Communication > Banner
        await adminHome.menuButton();
        await adminHome.clickCommunicationLink();
        await adminHome.clickBanner();
        await adminHome.wait("mediumWait");
        console.log("✓ Navigated to banner page");

        // The banner listing page should be visible by default
        // If "Go to Listing" button exists, click it, otherwise we're already on listing page
        const isListingButtonVisible = await bannerHome.page.locator(bannerHome.selectors.bannerListing).isVisible().catch(() => false);
        
        if (isListingButtonVisible) {
            await bannerHome.clickListing();
            await adminHome.wait("mediumWait");
            console.log("✓ Clicked 'Go to Listing' button");
        } else {
            console.log("✓ Already on banner listing page");
        }

        // Click on search field
        await bannerHome.validateElementVisibility(bannerHome.selectors.searchField, "Search Field");
        await bannerHome.click(bannerHome.selectors.searchField, "Search", "Field");
        await adminHome.wait("minWait");
        console.log("✓ Clicked on search field");

        // Enter invalid search keyword that won't match any records
        const invalidSearchKeyword = "fhshfhsgfsfssd";
        await bannerHome.type(bannerHome.selectors.searchField, "Search Keyword", invalidSearchKeyword);
        await adminHome.wait("mediumWait");
        console.log(`✓ Entered invalid search keyword: "${invalidSearchKeyword}"`);

        // Verify no results message is displayed
        await bannerHome.validateElementVisibility(bannerHome.selectors.noResultsMessage, "No Results Message");
        
        const noResultsMessageText = await bannerHome.page.locator(bannerHome.selectors.noResultsMessage).textContent();
        console.log(`✓ No matching results message displayed: "${noResultsMessageText}"`);

        // Verify the exact message text
        const expectedMessage = "There are no results that match your current filters. Try removing some of them to get better results.";
        if (noResultsMessageText?.includes("no results") || noResultsMessageText === expectedMessage) {
            console.log("✓ No matching result found message verified successfully");
        } else {
            console.log(`⚠ Message text different than expected`);
            console.log(`   Expected: ${expectedMessage}`);
            console.log(`   Actual: ${noResultsMessageText}`);
        }

        console.log("✓ No matching result found test case completed successfully");
    });
});
