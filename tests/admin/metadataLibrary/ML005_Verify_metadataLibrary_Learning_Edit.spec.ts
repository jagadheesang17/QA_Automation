import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from "../../../utils/fakerUtils";
test.describe(`Verify_metadataLibrary_Learning.spec.ts`, async () => {
    let categoryNames: any = FakerData.getCategory();
    
    test(`Ensure that a new category can be edited and deleted successfully`, async ({ adminHome, metadatalibrary }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'Ensure that a new category can be edited and deleted successfully' },
            { type: 'Test Description', description: "Ensure that a new category can be edited and deleted successfully" }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN1");
        await adminHome.isSignOut();
        await adminHome.menuButton();
        await adminHome.metadataLibrary();
        await adminHome.meta_learning();
        await metadatalibrary.addCategory();
        await metadatalibrary.name(categoryNames);
        await metadatalibrary.description(FakerData.getDescription());
        await metadatalibrary.saveButton();
        await metadatalibrary.categorySearchfield(categoryNames);
        await metadatalibrary.verifyCategory(categoryNames);

        // Edit the category
        await metadatalibrary.clickEditIcon(categoryNames); // Ensure you're clicking the edit icon to enable editing
        let newcat = categoryNames + "_Edited"; 
        await metadatalibrary.name(newcat); 
        await metadatalibrary.description(FakerData.getDescription());
        await metadatalibrary.saveButton();
        await metadatalibrary.categorySearchfield(newcat);
        await metadatalibrary.verifyCategory(newcat);
        
        //delete created category
        await metadatalibrary.deletefiltereditem();
        await metadatalibrary.categorySearchfield(newcat);
        await metadatalibrary.verifydeleteitem(newcat)
    });

    const providerName = FakerData.getCategory();
    test(`Ensure that a new provider can be edited successfully`, async ({ adminHome, metadatalibrary }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'Ensure that a new provider can be created successfully' },
            { type: 'Test Description', description: "Ensure that a new provider can be created successfully" }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN1")
        await adminHome.isSignOut();
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

        // Edit the provider
        await metadatalibrary.clickEditIcon(providerName); // Ensure you're clicking the edit icon to enable editing
        // Now set the new provider name manually
        let newprovider = providerName + "_Edited"; // Create the new name
        await metadatalibrary.name(newprovider); // Set the new name
        await metadatalibrary.description(FakerData.getDescription());
        await metadatalibrary.saveButton();
        await metadatalibrary.categorySearchfield(newprovider);
        await metadatalibrary.verifyCategory(newprovider);

        //delete created Provider
        await metadatalibrary.deletefiltereditem();
        await metadatalibrary.categorySearchfield(newprovider);
        await metadatalibrary.verifydeleteitemProvider(newprovider)
    })

    const tagName = FakerData.getCategory();
    test(`Verify that a tags can be edited`, async ({ adminHome, metadatalibrary }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'Verify that a tags can be added under Metadata Library - Learning - Tags' },
            { type: 'Test Description', description: "Creaing a Tags in Metadata Library with in the Learning Tags" }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN1")
        await adminHome.menuButton();
        await adminHome.metadataLibrary();
        await adminHome.meta_learning();
        await metadatalibrary.tagsExpandButton();
        await metadatalibrary.addTags();
        await metadatalibrary.name(tagName);
        await metadatalibrary.saveButton();
        await metadatalibrary.tagsSearchField(tagName);
        await metadatalibrary.verify_Tags(tagName)

        // Edit the Tag
        await metadatalibrary.clickEditIcon(tagName); // Ensure you're clicking the edit icon to enable editing
        // Now set the new provider name manually
        let newtag = tagName + "_Edited"; // Create the new name
        await metadatalibrary.name(newtag); // Set the new name
        //await metadatalibrary.description(FakerData.getDescription());
        await metadatalibrary.saveButton();
        await metadatalibrary.tagsSearchField(newtag);
        await metadatalibrary.verify_Tags(newtag);

        //delete created Tag
        await metadatalibrary.deletefiltereditem()
        await metadatalibrary.tagsSearchField(newtag);
        await metadatalibrary.verifydeleteitemTag(newtag)
    })
    });

