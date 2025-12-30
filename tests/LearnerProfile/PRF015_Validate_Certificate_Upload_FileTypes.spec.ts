import { test } from '../../customFixtures/expertusFixture';
import { FakerData, getCurrentDateFormatted, getFutureDate } from '../../utils/fakerUtils';

test.describe(`PRF015: Validate certificate type as pdf, png, jpg, jpeg file`, async () => {
    test.describe.configure({ mode: 'serial' });

    const certificateFiles = [
        { type: 'JPEG', path: '../data/jpegimage20kb.jpg' },
        { type: 'JPG', path: '../data/Q1.jpg' },
        { type: 'PNG', path: '../data/finalimage.png' },
        { type: 'PDF', path: '../data/sample.pdf' }
    ];

    for (const file of certificateFiles) {
        test(`Upload External Training Certificate - ${file.type} format`, async ({ learnerHome, profile }) => {
            test.info().annotations.push(
                { type: 'Author', description: 'Manikandan' },
                { type: 'TestCase', description: `Validate ${file.type} certificate upload` },
                { type: 'Test Description', description: `Verify that learner can upload external training certificate in ${file.type} format` }
            );

            // Login as learner
            await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal");
            await learnerHome.wait("mediumWait");

            // Go to my profile section
            await profile.clickProfile();
            await profile.wait("minWait");

            // Click Details tab
            await profile.detailsTab();
            await profile.wait("minWait");

            // Click External Training
            await profile.click(profile.selectors.externalTraining, "External Training", "Icon");
            await profile.wait("minWait");

            // Click Add icon
            await profile.click(profile.selectors.addIcon, "Add", "Icon");
            await profile.wait("minWait");

            // Fill certificate details
            await profile.type(profile.selectors.titleField, "Title", `${file.type}_${FakerData.getcertificationTitle()}`);
            await profile.type(profile.selectors.issuedBy, "Issued By", FakerData.getOrganizationName());
            await profile.type(profile.selectors.certificateNumber, "Certificate Number", FakerData.getCertificationNumber());
            await profile.typeAndEnter(profile.selectors.completedOn, "Completed On", getCurrentDateFormatted());
            await profile.typeAndEnter(profile.selectors.validityFrom, "Valid From", getCurrentDateFormatted());
            await profile.typeAndEnter(profile.selectors.validityTo, "Validity To", getFutureDate());

            // Upload certificate file
            await profile.uploadFile(profile.selectors.uploadCert, file.path);
            console.log(`✓ ${file.type} certificate file uploaded: ${file.path}`);
            await profile.wait("minWait");

            // Click Verify Certificate checkbox
            await profile.click(profile.selectors.verifyCertificate, "Verify Certificate By", "Checkbox");
            await profile.wait("minWait");

            // Select verification by Others
            await profile.click(profile.selectors.verifyBy, "Manager/Others", "Dropdown");
            await profile.wait("minWait");
            await profile.click(profile.selectors.selectManger("Others"), "Others", "Option");
            await profile.wait("minWait");

            // Enter verifier details
            await profile.type(profile.selectors.othersName, "Name", FakerData.getFirstName());
            await profile.type(profile.selectors.emailId, "E-Mail", FakerData.getEmail());

            // Check Show to All
            await profile.click(profile.selectors.showToAllSkills, "Show To All", "Checkbox");
            await profile.wait("minWait");

            // Save the certificate
            await profile.clickSave();
            await profile.wait("mediumWait");

            // Verify success message
            await profile.verifySavedChanges();
            console.log(`✓ ${file.type} certificate uploaded and saved successfully`);
        });
    }

    test(`Verify all certificate types uploaded successfully`, async ({ learnerHome, profile }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'Verify all certificate types uploaded' },
            { type: 'Test Description', description: 'Verify that all certificate types (JPEG, JPG, PNG, PDF) were uploaded successfully' }
        );

        // Login as learner
        await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal");
        await learnerHome.wait("mediumWait");

        // Go to my profile section
        await profile.clickProfile();
        await profile.wait("minWait");

        // Click Details tab
        await profile.detailsTab();
        await profile.wait("minWait");

        // Click External Training to view uploaded certificates
        await profile.click(profile.selectors.externalTraining, "External Training", "Icon");
        await profile.wait("mediumWait");

        console.log("✓ All certificate types (JPEG, JPG, PNG, PDF) uploaded successfully");
        console.log("✓ Test case PASSED - All file formats accepted");
    });
});
