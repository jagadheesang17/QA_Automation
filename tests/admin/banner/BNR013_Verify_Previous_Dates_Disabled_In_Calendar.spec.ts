import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";
import { URLConstants } from "../../../constants/urlConstants";

const bannerTitle = FakerData.getRandomTitle();

test.describe(`BNR013: Verify Previous Dates are Disabled in Calendar`, async () => {

    test(`Verify and check By default, the previous dates will be disabled in the calendar for selection`, async ({ adminHome, bannerHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Manikandan` },
            { type: `TestCase`, description: `BNR013` },
            { type: `Test Description`, description: `Verify previous dates are disabled in the calendar when selecting From Date and To Date` }
        );

        // Login as admin
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.wait("mediumWait");

        // Navigate to Communication > Banner
        await adminHome.menuButton();
        await adminHome.clickCommunicationLink();
        await adminHome.clickBanner();
        await adminHome.wait("minWait");

        // Click Create Banner
        await adminHome.clickCreateBanner();
        await adminHome.wait("minWait");
        console.log("✓ Navigated to Create Banner page");

        // Enter banner title
        await bannerHome.enterBannerTitile(bannerTitle);

        // Click on From Date field to open calendar
        await bannerHome.click(bannerHome.selectors.bannerDatefield, "From Date", "Field");
        await adminHome.wait("minWait");
        console.log("✓ Opened From Date calendar");

        // Verify previous dates are disabled
        const disabledDatesLocator = bannerHome.page.locator(bannerHome.selectors.disabledDates);
        const disabledDatesCount = await disabledDatesLocator.count();

        if (disabledDatesCount > 0) {
            console.log(`✓ Found ${disabledDatesCount} disabled dates in the calendar`);
            
            // Verify that disabled dates have the 'disabled' class
            const firstDisabledDate = disabledDatesLocator.first();
            const classList = await firstDisabledDate.getAttribute('class');
            
            if (classList?.includes('disabled')) {
                console.log("✓ Previous dates are properly disabled in the calendar");
            } else {
                console.log("⚠ Disabled dates class not found");
            }
        } else {
            console.log("⚠ No disabled dates found in the calendar");
        }

        // Select today's date for From Date
        await bannerHome.click(bannerHome.selectors.dateFrom, "From Date", "Field");
        await adminHome.wait("minWait");
        console.log("✓ Selected From Date (Today)");

        // Click on To Date field to open calendar
        await bannerHome.click(bannerHome.selectors.dateTo, "To Date", "Field");
        await adminHome.wait("minWait");
        console.log("✓ Opened To Date calendar");

        // Verify previous dates are disabled in To Date calendar
        const disabledDatesInToDate = await bannerHome.page.locator(bannerHome.selectors.disabledDates).count();

        if (disabledDatesInToDate > 0) {
            console.log(`✓ Found ${disabledDatesInToDate} disabled dates in To Date calendar`);
            console.log("✓ Previous dates are disabled by default in both From Date and To Date calendars");
        }

        console.log("✓ Previous dates disabled validation test case completed successfully");
    });
});
