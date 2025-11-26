import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from "../../../utils/fakerUtils";
import { expect } from '@playwright/test';

test(`ML006: Verify able to create and delete the CEU Type`, async ({ adminHome, metadatalibrary }) => {
    test.info().annotations.push(
        { type: 'Author', description: 'Automated' },
        { type: 'TestCase', description: "ML006 Verify able to create and delete the CEU Type" },
        { type: 'Test Description', description: "Create a CEU Type, verify it exists, delete it and verify deletion" }
    );

    const ceuTypeName = FakerData.getCategory();

    // Navigate to Metadata Library -> Learning -> CEU Type
    await adminHome.loadAndLogin("CUSTOMERADMIN1");
    await adminHome.menuButton();
    await adminHome.metadataLibrary();
    await adminHome.meta_learning();

    // Expand CEU Type and create a new CEU Type
    await metadatalibrary.CEU_TypeExpandButton();
    await metadatalibrary.addCEU_Type();
    await metadatalibrary.name(ceuTypeName);
    await metadatalibrary.saveButton();

    // Verify creation
    await metadatalibrary.ceuTypeSearchField(ceuTypeName);
    await metadatalibrary.verify_ceuType(ceuTypeName);

    // Delete the created CEU Type
    await metadatalibrary.deletefiltereditem();

    // Verify deletion (best-effort)
    await metadatalibrary.ceuTypeSearchField(ceuTypeName);
    await metadatalibrary.verifyDeleteItem('ceu-type');
});
