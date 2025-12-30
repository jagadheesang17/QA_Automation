import { credentials } from "../../../constants/credentialData";
import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";

test(`Verify learner QR code reading functionality`, async ({ page }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Manikandan` },
        { type: `TestCase`, description: `Verify learner can view and read QR code from profile` },
        { type: `Test Description`, description: `Learner logs in, navigates to My Profile section, and reads QR code` }
    );

    // Step 1: Login with custom function - pass URL, username, password
    const loginUrl = "https://newprod2.expertusoneqa.in/learner/newprod2/"; // Replace with actual URL
    const username = "learnerone";
    const password = "welcome";
    
    await customLogin(page, loginUrl, username, password);

    // Step 2: Navigate to My Profile section
    await myProfileSection(page);

    // Step 3: Read and click QR code
    const userQRImageXpath = "(//div[text()='Scan QR to view ONE-Profile'])[1]/following::img[1]";
    await readAndClickQRCode(page, userQRImageXpath);

    console.log("QR code has been successfully read and processed");
});

// Custom login function with URL, username, and password parameters
async function customLogin(page: any, url: string, username: string, password: string) {
    console.log(`Navigating to: ${url}`);
    await page.goto(url);
    await page.locator("//a[@id='signin']/span").click();
    // Wait for login page to load
    await page.waitForLoadState('networkidle');
    
    // Fill username
    await page.locator("//input[@id='username']").first().fill(username);
    
    // Fill password
    await page.locator("//input[@id='password']").first().fill(password);
    
    // Click login button
    await page.locator("//span[text()=' Forgot password? ']/following::button[1]").first().click();
    
    // Wait for navigation after login
    await page.waitForLoadState('networkidle');
    
    console.log(`Successfully logged in as: ${username}`);
}

// Function to navigate to My Profile section
async function myProfileSection(page: any) {
    const target = page.locator("//h1[text()='My Profile']");

    // Try scrolling multiple times until the element becomes visible
    for (let i = 0; i < 40; i++) {
        // Check if visible already
        if (await target.isVisible().catch(() => false)) {
            console.log("My Profile section found at bottom!");
            await target.scrollIntoViewIfNeeded();
            return;
        }

        // Scroll down towards bottom
        await page.evaluate(() => {
            window.scrollBy(0, window.innerHeight); // Scroll by one full screen
        });

        await page.waitForTimeout(400); // Small wait for content to load
    }

    throw new Error("Unable to find 'My Profile' section even at page bottom.");
}

// Import the function from UserPage
async function readAndClickQRCode(page: any, userQRImageXpath: string) {
    const Jimp = require("jimp-compact");
    const QrCode = require("qrcode-reader");

    // Step 1: Screenshot the QR image element
    const qrElement = page.locator(userQRImageXpath);
    await qrElement.waitFor({ state: 'visible' });

    const qrBuffer = await qrElement.screenshot();

    // Step 2: Decode QR code using Jimp + qrcode-reader
    const image = await Jimp.read(qrBuffer);

    const qrValue: string = await new Promise((resolve, reject) => {
        const qr = new QrCode();
        qr.callback = (err: any, value: any) => {
            if (err) reject(err);
            else resolve(value.result);
        };
        qr.decode(image.bitmap);
    });

    console.log("QR Value:", qrValue);

    // Step 3: If the QR contains a URL → navigate or click
    if (qrValue.startsWith("http")) {
        await page.goto(qrValue);
    } else {
        throw new Error("QR code does not contain a valid URL");
    }
}
