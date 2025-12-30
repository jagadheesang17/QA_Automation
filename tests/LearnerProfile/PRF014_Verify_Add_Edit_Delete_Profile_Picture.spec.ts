import { test } from "../../customFixtures/expertusFixture";

test.describe(`PRF014: Verify the Add/Edit/Delete profile picture`, async () => {
    test.describe.configure({ mode: 'serial' });

    test(`Add Profile Picture - Upload and verify success message`, async ({ learnerHome, profile }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'Add Profile Picture' },
            { type: 'Test Description', description: 'Verify that learner can add profile picture successfully' }
        );

        // Login as learner
        await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal");
        await learnerHome.wait("mediumWait");

        // Click profile picture
        await profile.clickProfile();
        await profile.wait("minWait");

        // Click Name and Details Edit icon
        await learnerHome.nameAndDetailsEdit(learnerHome.page);
        await learnerHome.wait("minWait");

        // Upload profile image
        await learnerHome.uploadProfileImage(learnerHome.page);
        await learnerHome.wait("minWait");

        // Click Upload button
        await learnerHome.clickUploadButton(learnerHome.page);
        await learnerHome.wait("mediumWait");

        // Click Save button
        await learnerHome.clickSaveButton(learnerHome.page);
        await learnerHome.wait("minWait");

        // Verify success message
        await learnerHome.profileUploadSuccessMessage(learnerHome.page);
        console.log("✓ Profile picture uploaded successfully");
    });

    test(`Edit Profile Picture - Upload new image and verify`, async ({ learnerHome, profile }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'Edit Profile Picture' },
            { type: 'Test Description', description: 'Verify that learner can edit profile picture successfully' }
        );

        // Login as learner
        await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal");
        await learnerHome.wait("mediumWait");

        // Click profile picture
        await profile.clickProfile();
        await profile.wait("minWait");

        // Click Name and Details Edit icon
        await learnerHome.nameAndDetailsEdit(learnerHome.page);
        await learnerHome.wait("minWait");

        // Upload new profile image
        await learnerHome.uploadProfileImage(learnerHome.page);
        await learnerHome.wait("minWait");

        // Click Upload button
        await learnerHome.clickUploadButton(learnerHome.page);
        await learnerHome.wait("mediumWait");

        // Click Save button
        await learnerHome.clickSaveButton(learnerHome.page);
        await learnerHome.wait("minWait");

        // Verify success message
        await learnerHome.profileUploadSuccessMessage(learnerHome.page);
        console.log("✓ Profile picture edited successfully");
    });

    test(`Delete Profile Picture - Remove image and verify`, async ({ learnerHome, profile }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'Delete Profile Picture' },
            { type: 'Test Description', description: 'Verify that learner can delete profile picture successfully' }
        );

        // Login as learner
        await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal");
        await learnerHome.wait("mediumWait");

        // Click profile picture
        await profile.clickProfile();
        await profile.wait("minWait");

        // Click Name and Details Edit icon
        await learnerHome.nameAndDetailsEdit(learnerHome.page);
        await learnerHome.wait("minWait");

        // Click Remove Image button
        await learnerHome.clickRemoveImage(learnerHome.page);
        await learnerHome.wait("minWait");

        // Click Save button
        await learnerHome.clickSaveButton(learnerHome.page);
        await learnerHome.wait("minWait");

        // Verify success message
        await learnerHome.profileUploadSuccessMessage(learnerHome.page);
        console.log("✓ Profile picture deleted successfully");
    });
});
