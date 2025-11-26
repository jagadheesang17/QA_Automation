import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from "../../../utils/fakerUtils";
import { expect } from '@playwright/test';

test(`ML005c: Verify the Provider title should not allow duplicate`, async ({ adminHome, metadatalibrary }) => {
    test.info().annotations.push(
        { type: 'Author', description: 'Automated' },
        { type: 'TestCase', description: "ML005c Verify Provider title should not allow duplicate" },
        { type: 'Test Description', description: "Create a provider, try to create another provider with the same title and assert duplicate validation appears" }
    );

    const providerName = FakerData.getCategory();

    // Login and navigate to Metadata Library
    await adminHome.loadAndLogin("CUSTOMERADMIN1");
    await adminHome.menuButton();
    await adminHome.metadataLibrary();
    await adminHome.meta_learning();

    // Create provider
    await metadatalibrary.providerExpandButton();
    await metadatalibrary.addProvider();
    await metadatalibrary.name(providerName);
    await metadatalibrary.description(FakerData.getDescription());
    await metadatalibrary.saveButton();
    await metadatalibrary.providerSearchField(providerName);
    await metadatalibrary.verifyProvider(providerName);

    // Attempt to create provider again with the same title
    await metadatalibrary.addProvider();
    await metadatalibrary.name(providerName); // same title
    await metadatalibrary.description(FakerData.getDescription());
    await metadatalibrary.saveButton();
    // Assert duplicate validation is shown (providerDuplicateError selector covers variants of 'already exists')
    const dupLocator = metadatalibrary.page.locator(metadatalibrary.selectors.providerDuplicateError(providerName));
    await expect(dupLocator).toBeVisible({ timeout: 5000 });
    const dupText = (await dupLocator.textContent()) || '';
    expect(dupText.toLowerCase()).toContain('already');
    // Cleanup: remove the provider we created
    await metadatalibrary.providerSearchField(providerName);
    try {
        await metadatalibrary.deletefiltereditem();
        await metadatalibrary.providerSearchField(providerName);
        await metadatalibrary.verifydeleteitemProvider(providerName);
    } catch (err) {
        console.log('Cleanup failed to delete provider:', err?.message || err);
    }
});
