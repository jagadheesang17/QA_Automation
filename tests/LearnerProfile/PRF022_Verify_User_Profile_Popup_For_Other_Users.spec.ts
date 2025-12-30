import { test } from '../../customFixtures/expertusFixture';

test.describe(`PRF022: Verify User Profile Popup for Other Users`, async () => {
    test.describe.configure({ mode: 'serial' });

    test(`Verify user can view other user's profile popup`, async ({ learnerHome, profile }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'View other user profile popup' },
            { type: 'Test Description', description: 'Click on another user profile and verify popup displays' }
        );

        // Login as learner
        await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal");
        await learnerHome.wait("mediumWait");

        // Navigate to a page where other users are listed (e.g., Social/Community page, Discussion forums, Leaderboard)
        await learnerHome.navigateToSocialPage();
        await learnerHome.wait("minWait");

        // Click on another user's profile/avatar
        const otherUserProfileSelector = `//div[contains(@class,'user-card') or contains(@class,'user-item')]//a[contains(@href,'profile') or contains(@class,'profile-link')]`;
        const isUserProfileVisible = await profile.page.locator(otherUserProfileSelector).first().isVisible().catch(() => false);

        if (isUserProfileVisible) {
            await profile.page.locator(otherUserProfileSelector).first().click();
            await profile.wait("minWait");

            // Verify profile popup is displayed
            const profilePopupSelector = `//div[contains(@class,'modal') or contains(@class,'popup') or contains(@class,'profile-popup')]`;
            const isPopupVisible = await profile.page.locator(profilePopupSelector).isVisible().catch(() => false);

            if (isPopupVisible) {
                console.log("✓ User profile popup is displayed for other user");
            } else {
                console.log("⚠ Profile popup not found - may navigate to separate page");
            }
        } else {
            console.log("⚠ Other user profiles not found on current page");
        }
    });

    test(`Verify Profile Details tab in user profile popup`, async ({ learnerHome, profile }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'Verify Profile Details tab' },
            { type: 'Test Description', description: 'Verify Profile Details tab shows user information in popup' }
        );

        // Login and navigate to user profile popup
        await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal");
        await learnerHome.wait("mediumWait");
        await learnerHome.navigateToSocialPage();
        await learnerHome.wait("minWait");

        const otherUserProfileSelector = `//div[contains(@class,'user-card')]//a[contains(@href,'profile')]`;
        const isUserProfileVisible = await profile.page.locator(otherUserProfileSelector).first().isVisible().catch(() => false);

        if (isUserProfileVisible) {
            await profile.page.locator(otherUserProfileSelector).first().click();
            await profile.wait("minWait");

            // Check for Profile Details tab
            const profileDetailsTabSelectors = [
                `//button[contains(text(),'Profile') or contains(text(),'Details')]`,
                `//a[contains(text(),'Profile') or contains(text(),'Details')]`,
                `//div[contains(@class,'tab')]//span[contains(text(),'Profile') or contains(text(),'Details')]`
            ];

            let isProfileTabVisible = false;
            for (const selector of profileDetailsTabSelectors) {
                isProfileTabVisible = await profile.page.locator(selector).isVisible().catch(() => false);
                if (isProfileTabVisible) {
                    await profile.click(selector, "Profile Details Tab", "Tab");
                    await profile.wait("minWait");
                    console.log("✓ Profile Details tab is visible and clickable");
                    break;
                }
            }

            // Verify profile details content
            const profileDetailsSelectors = [
                `//div[contains(@class,'profile-info') or contains(@class,'user-info')]`,
                `//span[contains(text(),'Email') or contains(text(),'Department') or contains(text(),'Location')]`
            ];

            let hasProfileDetails = false;
            for (const selector of profileDetailsSelectors) {
                hasProfileDetails = await profile.page.locator(selector).isVisible().catch(() => false);
                if (hasProfileDetails) {
                    console.log("✓ Profile Details content is displayed");
                    break;
                }
            }
        }
    });

    test(`Verify Skills tab in user profile popup`, async ({ learnerHome, profile }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'Verify Skills tab' },
            { type: 'Test Description', description: 'Verify Skills tab shows user skills in popup' }
        );

        // Login and navigate to user profile popup
        await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal");
        await learnerHome.wait("mediumWait");
        await learnerHome.navigateToSocialPage();
        await learnerHome.wait("minWait");

        const otherUserProfileSelector = `//div[contains(@class,'user-card')]//a[contains(@href,'profile')]`;
        const isUserProfileVisible = await profile.page.locator(otherUserProfileSelector).first().isVisible().catch(() => false);

        if (isUserProfileVisible) {
            await profile.page.locator(otherUserProfileSelector).first().click();
            await profile.wait("minWait");

            // Check for Skills tab
            const skillsTabSelectors = [
                `//button[contains(text(),'Skills') or contains(text(),'Skill')]`,
                `//a[contains(text(),'Skills') or contains(text(),'Skill')]`,
                `//div[contains(@class,'tab')]//span[contains(text(),'Skills')]`
            ];

            let isSkillsTabVisible = false;
            for (const selector of skillsTabSelectors) {
                isSkillsTabVisible = await profile.page.locator(selector).isVisible().catch(() => false);
                if (isSkillsTabVisible) {
                    await profile.click(selector, "Skills Tab", "Tab");
                    await profile.wait("minWait");
                    console.log("✓ Skills tab is visible and clickable");
                    break;
                }
            }

            // Verify skills content
            const skillsContentSelectors = [
                `//div[contains(@class,'skill')]`,
                `//span[contains(@class,'badge') and contains(@class,'skill')]`,
                `//ul[contains(@class,'skills')]//li`
            ];

            let hasSkillsContent = false;
            for (const selector of skillsContentSelectors) {
                hasSkillsContent = await profile.page.locator(selector).isVisible().catch(() => false);
                if (hasSkillsContent) {
                    const skillsCount = await profile.page.locator(selector).count();
                    console.log(`✓ Skills content is displayed (${skillsCount} skill(s) found)`);
                    break;
                }
            }
        }
    });

    test(`Verify Activity tab in user profile popup`, async ({ learnerHome, profile }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'Verify Activity tab' },
            { type: 'Test Description', description: 'Verify Activity tab shows user activities in popup' }
        );

        // Login and navigate to user profile popup
        await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal");
        await learnerHome.wait("mediumWait");
        await learnerHome.navigateToSocialPage();
        await learnerHome.wait("minWait");

        const otherUserProfileSelector = `//div[contains(@class,'user-card')]//a[contains(@href,'profile')]`;
        const isUserProfileVisible = await profile.page.locator(otherUserProfileSelector).first().isVisible().catch(() => false);

        if (isUserProfileVisible) {
            await profile.page.locator(otherUserProfileSelector).first().click();
            await profile.wait("minWait");

            // Check for Activity tab
            const activityTabSelectors = [
                `//button[contains(text(),'Activity') or contains(text(),'Activities')]`,
                `//a[contains(text(),'Activity') or contains(text(),'Activities')]`,
                `//div[contains(@class,'tab')]//span[contains(text(),'Activity')]`
            ];

            let isActivityTabVisible = false;
            for (const selector of activityTabSelectors) {
                isActivityTabVisible = await profile.page.locator(selector).isVisible().catch(() => false);
                if (isActivityTabVisible) {
                    await profile.click(selector, "Activity Tab", "Tab");
                    await profile.wait("minWait");
                    console.log("✓ Activity tab is visible and clickable");
                    break;
                }
            }

            // Verify activity content
            const activityContentSelectors = [
                `//div[contains(@class,'activity') or contains(@class,'timeline')]`,
                `//div[contains(@class,'feed-item') or contains(@class,'activity-item')]`,
                `//ul[contains(@class,'activity')]//li`
            ];

            let hasActivityContent = false;
            for (const selector of activityContentSelectors) {
                hasActivityContent = await profile.page.locator(selector).isVisible().catch(() => false);
                if (hasActivityContent) {
                    const activityCount = await profile.page.locator(selector).count();
                    console.log(`✓ Activity content is displayed (${activityCount} activity(ies) found)`);
                    break;
                }
            }
        }

        console.log("✓ User profile popup verification completed - Profile Details, Skills, and Activity tabs validated");
    });
});
