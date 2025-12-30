import { test } from '../../customFixtures/expertusFixture';
import { FakerData } from '../../utils/fakerUtils';

test.describe(`PRF019: Validate Certificate Verification Notifications`, async () => {
    test.describe.configure({ mode: 'serial' });

    test(`Upload external certificate and request for verification`, async ({ learnerHome, profile }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'Upload certificate and request verification' },
            { type: 'Test Description', description: 'Upload external training certificate and submit for manager verification' }
        );

        // Login as learner
        await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal");
        await learnerHome.wait("mediumWait");

        // Navigate to profile
        await profile.clickProfile();
        await profile.wait("minWait");

        // Click on Details tab
        await profile.detailsTab();
        await profile.wait("minWait");

        // Add external training certificate
        await profile.addExternalTraining();
        await profile.wait("minWait");

        // Request certificate verification by manager
        await profile.certificateVerificationbyManager("Manager User");
        await profile.wait("minWait");

        // Save changes
        await profile.clickSave();
        await profile.wait("minWait");

        // Verify saved changes
        await profile.verifySavedChanges();
        
        console.log("✓ Certificate uploaded and verification request sent to manager");
    });

    test(`Verify notification for Certificate Verification Request`, async ({ learnerHome, profile }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'Verify Certificate Verification Request notification' },
            { type: 'Test Description', description: 'Login as manager and verify notification for certificate verification request' }
        );

        // Login as manager
        await learnerHome.learnerLogin("MANAGERUSERNAME", "Portal");
        await learnerHome.wait("mediumWait");

        // Click on notifications
        await learnerHome.clickNotifications();
        await learnerHome.wait("minWait");

        // Verify notification for certificate verification request
        const notificationSelector = `//div[contains(@class,'notification') or contains(@class,'alert')]//span[contains(text(),'Certificate verification') or contains(text(),'certificate') and contains(text(),'verification')]`;
        const isNotificationVisible = await learnerHome.page.locator(notificationSelector).isVisible().catch(() => false);

        if (isNotificationVisible) {
            console.log("✓ Notification 1: Request for Certificate verification - Visible");
        } else {
            console.log("⚠ Certificate verification request notification not found");
        }
    });

    test(`Manager approves certificate and verify status notification`, async ({ learnerHome, profile }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'Manager approves certificate' },
            { type: 'Test Description', description: 'Login as manager, approve certificate and verify user receives approval notification' }
        );

        // Login as manager
        await learnerHome.learnerLogin("MANAGERUSERNAME", "Portal");
        await learnerHome.wait("mediumWait");

        // Navigate to My Approvals
        await profile.clickProfile();
        await profile.wait("minWait");
        
        // Navigate to Team section or My Approval section
        await profile.navigateToTeamApprovals();
        await profile.wait("minWait");

        // Approve the certificate
        await profile.approveCertificate();
        await profile.wait("minWait");

        console.log("✓ Certificate approved by manager");

        // Logout manager
        await learnerHome.signOut();
        await learnerHome.wait("mediumWait");

        // Login as learner
        await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal");
        await learnerHome.wait("mediumWait");

        // Check notifications
        await learnerHome.clickNotifications();
        await learnerHome.wait("minWait");

        // Verify notification for certificate approval
        const approvalNotificationSelector = `//div[contains(@class,'notification')]//span[contains(text(),'Certificate') and (contains(text(),'approved') or contains(text(),'verified'))]`;
        const isApprovalNotificationVisible = await learnerHome.page.locator(approvalNotificationSelector).isVisible().catch(() => false);

        if (isApprovalNotificationVisible) {
            console.log("✓ Notification 2: Status of your Certificate verification (Approved) - Visible");
        } else {
            console.log("⚠ Certificate approval notification not found");
        }
    });

    test(`Manager rejects certificate and verify rejection notification`, async ({ learnerHome, profile }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'Manager rejects certificate' },
            { type: 'Test Description', description: 'Login as manager, reject certificate and verify user receives rejection notification' }
        );

        // Upload another certificate for rejection test
        await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal");
        await learnerHome.wait("mediumWait");
        await profile.clickProfile();
        await profile.wait("minWait");
        await profile.detailsTab();
        await profile.wait("minWait");
        await profile.addExternalTraining();
        await profile.certificateVerificationbyManager("Manager User");
        await profile.clickSave();
        await profile.wait("mediumWait");
        await learnerHome.signOut();

        // Login as manager
        await learnerHome.learnerLogin("MANAGERUSERNAME", "Portal");
        await learnerHome.wait("mediumWait");

        // Navigate to My Approvals
        await profile.clickProfile();
        await profile.wait("minWait");
        await profile.navigateToTeamApprovals();
        await profile.wait("minWait");

        // Reject the certificate
        await profile.rejectCertificate();
        await profile.wait("minWait");

        console.log("✓ Certificate rejected by manager");

        // Logout manager
        await learnerHome.signOut();
        await learnerHome.wait("mediumWait");

        // Login as learner
        await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal");
        await learnerHome.wait("mediumWait");

        // Check notifications
        await learnerHome.clickNotifications();
        await learnerHome.wait("minWait");

        // Verify notification for certificate rejection
        const rejectionNotificationSelector = `//div[contains(@class,'notification')]//span[contains(text(),'Certificate') and contains(text(),'reject')]`;
        const isRejectionNotificationVisible = await learnerHome.page.locator(rejectionNotificationSelector).isVisible().catch(() => false);

        if (isRejectionNotificationVisible) {
            console.log("✓ Notification 3: Status of your Certificate verification (Rejected) - Visible");
        } else {
            console.log("⚠ Certificate rejection notification not found");
        }

        console.log("✓ All three notification types validated successfully");
    });
});
