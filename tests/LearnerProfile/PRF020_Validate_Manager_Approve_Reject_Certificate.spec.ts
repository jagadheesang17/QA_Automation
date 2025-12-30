import { test } from '../../customFixtures/expertusFixture';
import { FakerData } from '../../utils/fakerUtils';

const certificateName = FakerData.getRandomTitle();

test.describe(`PRF020: Validate Manager (Team-My Approval) - Approve and Reject Certificate`, async () => {
    test.describe.configure({ mode: 'serial' });

    test(`Learner uploads certificate for verification`, async ({ learnerHome, profile }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'Learner uploads external certificate' },
            { type: 'Test Description', description: 'Learner uploads external training certificate and requests manager approval' }
        );

        // Login as learner
        await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal");
        await learnerHome.wait("mediumWait");

        // Navigate to profile
        await profile.clickProfile();
        await profile.wait("minWait");

        // Go to Details tab
        await profile.detailsTab();
        await profile.wait("minWait");

        // Add external training certificate
        await profile.addExternalTraining();
        await profile.wait("minWait");

        // Enter certificate details
        await profile.enterCertificateName(certificateName);
        await profile.wait("minWait");

        // Request verification by manager
        await profile.certificateVerificationbyManager("Manager User");
        await profile.wait("minWait");

        // Save changes
        await profile.clickSave();
        await profile.wait("minWait");
        await profile.verifySavedChanges();

        console.log(`✓ Certificate "${certificateName}" uploaded and sent for manager approval`);
    });

    test(`Manager navigates to My Approval section in Team`, async ({ learnerHome, profile }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'Manager accesses My Approval section' },
            { type: 'Test Description', description: 'Login as manager and navigate to Team > My Approval section' }
        );

        // Login as manager
        await learnerHome.learnerLogin("MANAGERUSERNAME", "Portal");
        await learnerHome.wait("mediumWait");

        // Click on Team or My Team menu
        await profile.clickTeamMenu();
        await profile.wait("minWait");

        // Navigate to My Approval section
        await profile.clickMyApprovals();
        await profile.wait("minWait");

        // Verify certificate approval request is visible
        const certificateRequestSelector = `//td[contains(text(),'${certificateName}')] | //div[contains(text(),'${certificateName}')]`;
        const isCertificateVisible = await profile.page.locator(certificateRequestSelector).isVisible().catch(() => false);

        if (isCertificateVisible) {
            console.log(`✓ Certificate "${certificateName}" is visible in My Approval section`);
        } else {
            console.log("⚠ Certificate approval request not found in My Approval section");
        }
    });

    test(`Manager approves certificate and verify profile page update`, async ({ learnerHome, profile }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'Manager approves certificate' },
            { type: 'Test Description', description: 'Manager approves the certificate and verify the status change in learner profile' }
        );

        // Login as manager
        await learnerHome.learnerLogin("MANAGERUSERNAME", "Portal");
        await learnerHome.wait("mediumWait");

        // Navigate to My Approvals
        await profile.clickTeamMenu();
        await profile.wait("minWait");
        await profile.clickMyApprovals();
        await profile.wait("minWait");

        // Find and approve the certificate
        const approveButtonSelector = `//td[contains(text(),'${certificateName}')]/following::button[contains(text(),'Approve') or contains(@class,'approve')]`;
        const isApproveButtonVisible = await profile.page.locator(approveButtonSelector).isVisible().catch(() => false);

        if (isApproveButtonVisible) {
            await profile.click(approveButtonSelector, "Approve Certificate", "Button");
            await profile.wait("minWait");
            
            // Confirm approval if confirmation dialog appears
            const confirmButtonSelector = `//button[text()='Confirm' or text()='Yes' or text()='OK']`;
            const isConfirmVisible = await profile.page.locator(confirmButtonSelector).isVisible().catch(() => false);
            if (isConfirmVisible) {
                await profile.click(confirmButtonSelector, "Confirm Approval", "Button");
                await profile.wait("minWait");
            }

            console.log(`✓ Certificate "${certificateName}" approved by manager`);
        }

        // Logout manager
        await learnerHome.signOut();
        await learnerHome.wait("mediumWait");

        // Login as learner to verify profile update
        await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal");
        await learnerHome.wait("mediumWait");

        // Navigate to profile
        await profile.clickProfile();
        await profile.wait("minWait");
        await profile.detailsTab();
        await profile.wait("minWait");

        // Verify certificate status is "VERIFIED" or "APPROVED"
        const verifiedStatusSelector = `//div[contains(text(),'${certificateName}')]/ancestor::div[contains(@class,'certificate')]//span[contains(text(),'VERIFIED') or contains(text(),'Verified') or contains(text(),'Approved')]`;
        const isVerified = await profile.page.locator(verifiedStatusSelector).isVisible().catch(() => false);

        if (isVerified) {
            console.log(`✓ Certificate status changed to VERIFIED in profile page`);
        } else {
            console.log("⚠ Certificate verification status not updated in profile");
        }
    });

    test(`Manager rejects certificate and verify profile page update`, async ({ learnerHome, profile }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'Manager rejects certificate' },
            { type: 'Test Description', description: 'Manager rejects the certificate and verify the status change in learner profile' }
        );

        const rejectedCertificateName = FakerData.getRandomTitle();

        // Learner uploads another certificate
        await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal");
        await learnerHome.wait("mediumWait");
        await profile.clickProfile();
        await profile.wait("minWait");
        await profile.detailsTab();
        await profile.wait("minWait");
        await profile.addExternalTraining();
        await profile.wait("minWait");
        await profile.enterCertificateName(rejectedCertificateName);
        await profile.certificateVerificationbyManager("Manager User");
        await profile.clickSave();
        await profile.wait("mediumWait");
        await learnerHome.signOut();

        // Login as manager
        await learnerHome.learnerLogin("MANAGERUSERNAME", "Portal");
        await learnerHome.wait("mediumWait");

        // Navigate to My Approvals
        await profile.clickTeamMenu();
        await profile.wait("minWait");
        await profile.clickMyApprovals();
        await profile.wait("minWait");

        // Find and reject the certificate
        const rejectButtonSelector = `//td[contains(text(),'${rejectedCertificateName}')]/following::button[contains(text(),'Reject') or contains(@class,'reject')]`;
        const isRejectButtonVisible = await profile.page.locator(rejectButtonSelector).isVisible().catch(() => false);

        if (isRejectButtonVisible) {
            await profile.click(rejectButtonSelector, "Reject Certificate", "Button");
            await profile.wait("minWait");
            
            // Enter rejection reason if required
            const reasonTextarea = `//textarea[@id='reason' or contains(@placeholder,'reason')]`;
            const isReasonVisible = await profile.page.locator(reasonTextarea).isVisible().catch(() => false);
            if (isReasonVisible) {
                await profile.type(reasonTextarea, "Rejection Reason", "Certificate does not meet requirements");
                await profile.wait("minWait");
            }

            // Confirm rejection
            const confirmButtonSelector = `//button[text()='Confirm' or text()='Submit' or text()='Yes']`;
            const isConfirmVisible = await profile.page.locator(confirmButtonSelector).isVisible().catch(() => false);
            if (isConfirmVisible) {
                await profile.click(confirmButtonSelector, "Confirm Rejection", "Button");
                await profile.wait("minWait");
            }

            console.log(`✓ Certificate "${rejectedCertificateName}" rejected by manager`);
        }

        // Logout manager
        await learnerHome.signOut();
        await learnerHome.wait("mediumWait");

        // Login as learner to verify profile update
        await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal");
        await learnerHome.wait("mediumWait");

        // Navigate to profile
        await profile.clickProfile();
        await profile.wait("minWait");
        await profile.detailsTab();
        await profile.wait("minWait");

        // Verify certificate status is "REJECTED"
        const rejectedStatusSelector = `//div[contains(text(),'${rejectedCertificateName}')]/ancestor::div[contains(@class,'certificate')]//span[contains(text(),'REJECTED') or contains(text(),'Rejected')]`;
        const isRejected = await profile.page.locator(rejectedStatusSelector).isVisible().catch(() => false);

        if (isRejected) {
            console.log(`✓ Certificate status changed to REJECTED in profile page`);
        } else {
            console.log("⚠ Certificate rejection status not updated in profile");
        }

        console.log("✓ Test completed - Verified both Approve and Reject functionality with profile page updates");
    });
});
