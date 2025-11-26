import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from "../../../utils/fakerUtils";
import { expect } from '@playwright/test';

test(`ML005a: Verify adding an existing provider shows '<provider> already exists' error`, async ({ adminHome, metadatalibrary }) => {
    test.info().annotations.push(
        { type: 'Author', description: 'Automated' },
        { type: 'TestCase', description: "Verify error when adding an existing provider" },
        { type: 'Test Description', description: "Attempt to add a provider that already exists and assert the duplicate error message" }
    );

    const providerName = FakerData.getCategory();

    // Create provider first time
    await adminHome.loadAndLogin("CUSTOMERADMIN1");
    await adminHome.menuButton();
    await adminHome.metadataLibrary();
    await adminHome.meta_learning();
    await metadatalibrary.providerExpandButton();
    await metadatalibrary.addProvider();
    await metadatalibrary.name(providerName);
    await metadatalibrary.description(FakerData.getDescription());
    await metadatalibrary.saveButton();
    await metadatalibrary.providerSearchField(providerName);
    await metadatalibrary.verifyProvider(providerName);

    // Try to add same provider again
    await metadatalibrary.addProvider();
    await metadatalibrary.name(providerName);
    await metadatalibrary.description(FakerData.getDescription());
    await metadatalibrary.saveButton();

    // Check duplicate error message is visible and mentions provider name / already exists
    const dupLocator = metadatalibrary.page.locator(metadatalibrary.selectors.providerDuplicateError(providerName));
    await expect(dupLocator).toBeVisible({ timeout: 5000 });
    const dupText = (await dupLocator.textContent()) || '';
    expect(dupText.toLowerCase()).toContain('already');

    // Cleanup: delete the provider we created
    await metadatalibrary.providerSearchField(providerName);
    await metadatalibrary.deletefiltereditem();
    // verify deletion (best-effort)
    await metadatalibrary.providerSearchField(providerName);
    await metadatalibrary.verifydeleteitemProvider(providerName);
});
