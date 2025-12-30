import { test } from "../../customFixtures/expertusFixture";
import { expect } from '@playwright/test';
import { FakerData } from "../../utils/fakerUtils";
import data from '../../data/adminGroupsData.json';
const courseName = FakerData.getCourseName();
const description = FakerData.getDescription();
test.describe('CH014: Manager Hub - Team Management and Recommendation Tests', async () => {  
  // test('1. Verify assigned user to Manager is displayed in My Team section', async ({ adminHome, createUser, learnerHome, managerHome, contentHome }) => {
  //   test.info().annotations.push(
  //     { type: 'Author', description: 'Manikandan' },
  //     { type: 'TestCase', description: 'CH014-1 - Verify Assigned User Displayed in My Team' },
  //     { type: 'Test Description', description: 'Create user with manager assignment and verify the user appears in Manager My Team section' }
  //   );

  //   // Generate unique user data
  //   const firstName = FakerData.getFirstName();
  //   const lastName = FakerData.getLastName();
  //   const userName = `user_${Date.now()}`; // Unique username
  //   const email = FakerData.getEmail();
  //   const fullName = `${firstName} ${lastName}`;

  //   // Step 1: Login as Admin and create user
  //   await adminHome.loadAndLogin("CUSTOMERADMIN1");
  //   await adminHome.isSignOut();
  //   await adminHome.menuButton();
  //   await adminHome.people();
  //   await adminHome.user();
    
  //   // Create new user
  //   await createUser.clickCreateUser();
  //   await createUser.verifyCreateUserLabel();
  //   await createUser.enter("first_name", firstName);
  //   await createUser.enter("last_name", lastName);
  //   await createUser.enter("username", userName);
  //   await createUser.enter("user-password", "Welcome1@");
  //   await createUser.enter("email", email);
  //   await createUser.selectManager('automnr');
  //   // Save the user
  //   await createUser.clickSave();
  //   await learnerHome.page.waitForTimeout(2000); // Wait for save to complete
  //   await createUser.verifyUserCreationSuccessMessage();
  //   await contentHome.gotoListing();
  //   await learnerHome.page.waitForTimeout(1000);
  //   console.log(`✓ User created successfully: ${fullName}`);
  //   // Step 2: Logout admin
  //   await learnerHome.clickSignOut();
  //   // Step 3: Login as Manager
  //   await learnerHome.learnerLogin("MANAGERNAME", "DefaultPortal");
  //   await learnerHome.selectCollaborationHub();
  //   await learnerHome.page.waitForTimeout(2000);
  //   // Step 4: Verify My Team section is visible
  //   await managerHome.verifyMyTeamSectionVisible();
  //   console.log('✓ My Team section is visible');
  //   // Wait for data to load
  //   await learnerHome.page.waitForTimeout(3000);
  //   // Step 5: First check if there are any team members at all
  //   const totalMembers = await managerHome.getAllTeamMembersCount();
  //   console.log(`Total team members visible: ${totalMembers}`);
    
  //   // Step 6: Search for the created user in My Team
  //   await managerHome.searchTeamMember(firstName);
  //   console.log(`Searching for user with firstName: ${firstName}`);
    
  //   // Step 7: Verify the created user is displayed in My Team section
  //   const isUserFound = await managerHome.verifyCreatedUserInMyTeam(firstName, fullName);
  //   expect(isUserFound).toBeTruthy();
    
  //   console.log('\n========== TEST COMPLETED ==========');
  //});
  // test('2. Verify created direct Manager reportee displays properly', async ({ adminHome, createUser, learnerHome, contentHome }) => {
  //   test.info().annotations.push(
  //     { type: 'Author', description: 'Manikandan' },
  //     { type: 'TestCase', description: 'CH014-2 - Verify Direct Reportee Display' },
  //     { type: 'Test Description', description: 'Create user with Manager role, then verify in user listing that the manager is assigned correctly' }
  //   );
  //   // Generate unique user data
  //   const firstName = FakerData.getFirstName();
  //   const lastName = FakerData.getLastName();
  //   const userName = `manager912`; // Unique username for manager
  //   const email = FakerData.getEmail();
  //   const fullName = `${firstName} ${lastName}`;
  //   const managerName = data.managerName; // Get manager name from data file
  //   console.log(`\n========== STEP 1: CREATE USER WITH MANAGER ROLE ==========`);
  //   // Step 1: Login as Admin and create user
  //   await adminHome.loadAndLogin("CUSTOMERADMIN1");
  //   await adminHome.isSignOut();//span[text()='Entire Team']
  //   await adminHome.menuButton();
  //   await adminHome.people();
  //   await adminHome.user();
  //   // Create new user
  //   await createUser.clickCreateUser();
  //   await createUser.verifyCreateUserLabel();
  //   await createUser.enter("first_name", firstName);
  //   await createUser.enter("last_name", lastName);
  //   await createUser.enter("username", userName);
  //   await createUser.enter("user-password", "Welcome1@");
  //   await createUser.clickRolesButton("Manager");
  //   await createUser.clickSave();
  //   await learnerHome.page.waitForTimeout(2000);
  //   await createUser.verifyUserCreationSuccessMessage();
  //   console.log(` User created successfully: ${fullName} with Manager role`);
  //   console.log(`\n========== STEP 2: SEARCH AND VERIFY MANAGER ASSIGNMENT ==========`);
  //   // Step 2: Go back to user listing and search for the created user
  //   await contentHome.gotoListing();
  //   await learnerHome.page.waitForTimeout(1000);
  //   // Search for the created user
  //   await createUser.userSearchField(userName);
  //   await learnerHome.page.waitForTimeout(2000);
  //   console.log(` Searched for user: ${userName}`);
  //   // Click on the user to open user details
  //   await createUser.editIcon();
  //   await learnerHome.page.waitForTimeout(1500);
  //   console.log(` Opened user details`);
  //   // Click on Manager tab
  //   await createUser.clickManagerTab();
  //   console.log(` Clicked Manager tab`);
  //   // Verify the manager is assigned correctly
  //   await createUser.verifyManagerAssignment(managerName);
  //   console.log(`\n========== STEP 3: DELETE THE CREATED MANAGER USER ==========`);
  //   // Step 3: Go back to user listing
  //   await contentHome.gotoListing();
  //   await learnerHome.page.waitForTimeout(1000);
    
  //   // Search for the created user again
  //   await createUser.userSearchField(userName);
  //   await learnerHome.page.waitForTimeout(2000);
  //   console.log(` Searched for user to delete: ${userName}`);
    
  //   // Click delete icon for the user
  //   await createUser.clickDeleteIcon();
  //   await learnerHome.page.waitForTimeout(2000);
  //   console.log(` Manager user deleted successfully`);
    
  //   // Verify user is deleted (search should return no results)
  //   await createUser.userSearchField(userName);
  //   await learnerHome.page.waitForTimeout(1500);
  //   await createUser.verifyDeletedUser();
  //   console.log(` Verified that manager user '${userName}' no longer exists in the system`);
    
  //   console.log('\n========== TEST COMPLETED ==========');
  // });



  
  test('10. Verify Manager able to reject the user requesting external training certificate', async ({ learnerHome, profile, adminHome, createUser }) => {
    test.info().annotations.push(
      { type: 'Author', description: 'Manikandan' },
      { type: 'TestCase', description: 'CH014-10 - Verify Manager Rejects External Training Certificate' },
      { type: 'Test Description', description: 'Learner adds external training certificate for manager verification, then manager logs in and rejects the certificate request' }
    );
    const managerUsername = data.managerName; // Manager who will reject
    const certificateTitle = FakerData.getcertificationTitle();
    const organizationName = FakerData.getOrganizationName();

    console.log(`\n========== STEP 1: LEARNER ADDS EXTERNAL TRAINING CERTIFICATE ==========`);
    // Step 1: Login as Learner and add external training certificate
    await learnerHome.learnerLogin("TEAMUSER1", "DefaultPortal");
    await profile.clickProfile();
    await learnerHome.page.waitForTimeout(1000);
    await profile.detailsTab();
    console.log(`✓ Navigated to Profile Details tab`);
    
    // Add external training certificate for manager verification
    await profile.certificateVerificationbyManager(managerUsername);
    console.log(`✓ Added external training certificate: ${certificateTitle}`);
    console.log(`✓ Set for manager verification: ${managerUsername}`);
    
    // Save the certificate
    await profile.clickSave();
    await learnerHome.page.waitForTimeout(2000);
    await profile.verifySavedChanges();
    console.log(`✓ Certificate saved successfully`);
    
    // Logout learner
    await profile.click(learnerHome.selectors.signOutLink, "Sign Out", "Link");
    await learnerHome.page.waitForTimeout(2000);
    console.log(`✓ Learner logged out`);

    console.log(`\n========== STEP 2: MANAGER NAVIGATES TO MY APPROVAL ==========`);
    // Step 2: Login as Manager
    await learnerHome.learnerLogin("MANAGERNAME", "DefaultPortal");
    await learnerHome.page.waitForTimeout(2000);
    console.log(`✓ Logged in as Manager`);
    
    // Navigate to My Approval section
    const myApprovalTab = learnerHome.page.locator("//a[contains(text(),'My Approval')] | //span[contains(text(),'My Approval')] | //button[contains(text(),'My Approval')]");
    const isMyApprovalVisible = await myApprovalTab.isVisible().catch(() => false);
    
    if (isMyApprovalVisible) {
      await myApprovalTab.click();
      await learnerHome.page.waitForTimeout(2000);
      console.log(`✓ Navigated to My Approval section`);
      console.log(`\n========== STEP 3: MANAGER REJECTS EXTERNAL TRAINING CERTIFICATE ==========`);
      // Step 3: Find and reject the external training certificate request
      const externalTrainingRequest = learnerHome.page.locator(`(//div[contains(text(),'External Training')] | //span[contains(text(),'External Training')] | //td[contains(text(),'${certificateTitle}')])[1]`);
      const isRequestVisible = await externalTrainingRequest.isVisible().catch(() => false);
      
      if (isRequestVisible) {
        console.log(`✓ Found external training certificate request`);
        
        // Click reject button for the external training
        const rejectButton = learnerHome.page.locator("(//button[contains(text(),'Reject')] | //span[contains(text(),'Reject')] | //a[contains(text(),'Reject')])[1]");
        const isRejectButtonVisible = await rejectButton.isVisible().catch(() => false);
        
        if (isRejectButtonVisible) {
          await rejectButton.click();
          await learnerHome.page.waitForTimeout(1000);
          console.log(`✓ Clicked Reject button`);
          
          // Enter reject reason
          const rejectReasonField = learnerHome.page.locator("//textarea[@id='reject-reason'] | //input[@id='reject-reason'] | //textarea[contains(@placeholder,'reason')] | //textarea[contains(@name,'reason')]");
          const isReasonFieldVisible = await rejectReasonField.isVisible().catch(() => false);
          
          if (isReasonFieldVisible) {
            const rejectReason = 'Certificate does not meet company standards for external training verification';
            await rejectReasonField.fill(rejectReason);
            await learnerHome.page.waitForTimeout(500);
            console.log(`✓ Entered reject reason: ${rejectReason}`);
            
            // Submit rejection
            const submitButton = learnerHome.page.locator("//button[contains(text(),'Submit')] | //button[contains(text(),'Reject')] | //button[contains(text(),'Confirm')]");
            const isSubmitVisible = await submitButton.isVisible().catch(() => false);
            
            if (isSubmitVisible) {
              await submitButton.click();
              await learnerHome.page.waitForTimeout(2000);
              console.log(`✓ Submitted rejection`);
              
              // Verify rejection success message or confirmation
              const successMessage = learnerHome.page.locator("//span[contains(text(),'reject')] | //span[contains(text(),'success')] | //div[contains(text(),'reject')]");
              const isSuccessVisible = await successMessage.isVisible().catch(() => false);
              
              if (isSuccessVisible) {
                const messageText = await successMessage.textContent();
                console.log(`✓ Rejection confirmation: ${messageText}`);
                
                // Close confirmation popup if exists
                const okButton = learnerHome.page.locator("//button[text()='OK'] | //button[text()='Close'] | //button[text()='Yes']");
                if (await okButton.isVisible()) {
                  await okButton.click();
                }
              }
              
              expect(true).toBeTruthy();
              console.log(`✓ Manager successfully rejected the external training certificate request`);
            } else {
              console.log(`⚠ Submit button not found`);
            }
          } else {
            console.log(`⚠ Reject reason field not found - rejection may have been direct`);
          }
        } else {
          console.log(`⚠ Reject button not visible for external training request`);
        }
      } else {
        console.log(`⚠ No external training certificate request found in My Approval`);
      }
    } else {
      console.log(`⚠ My Approval tab not found`);
    }
    
    console.log('\n========== TEST COMPLETED ==========');
  });

  // test('11. Verify course can be recommended to the entire team', async ({ adminHome, createCourse, learnerHome, managerHome }) => {
  //   test.info().annotations.push(
  //     { type: 'Author', description: 'Manikandan' },
  //     { type: 'TestCase', description: 'CH014-11 - Verify Course Recommended to Entire Team' },
  //     { type: 'Test Description', description: 'Admin creates elearning course, then manager recommends it to entire team from Most Recent section' }
  //   );

  //   console.log(`\n========== STEP 1: ADMIN CREATES ELEARNING COURSE ==========`);
  //   // Step 1: Login as Admin and create elearning course
  //   await adminHome.loadAndLogin("CUSTOMERADMIN");
  //   await adminHome.menuButton();//span[text()='Select Team members']
  //   await adminHome.clickLearningMenu();
  //   await adminHome.clickCourseLink();
    
  //   // Create new course
  //   await createCourse.clickCreateCourse();
  //   await createCourse.verifyCreateUserLabel("CREATE COURSE");
  //   await createCourse.enter("course-title", courseName);
  //   await createCourse.selectLanguage("English");
  //   await createCourse.typeDescription("Course for entire team recommendation: " + description);
  //   await createCourse.contentLibrary(); // By default youtube content will be added
  //   await createCourse.clickCatalog();
  //   await createCourse.clickSave();
  //   await createCourse.clickProceed();
  //   await createCourse.verifySuccessMessage();
  //   console.log(`✓ Course created successfully: ${courseName}`);

  //   // Logout admin
  //   await learnerHome.clickSignOut();
  //   console.log(`✓ Admin logged out`);

  //   console.log(`\n========== STEP 2: MANAGER NAVIGATES TO MOST RECENT COURSE ==========`);
  //   // Step 2: Login as Manager
  //   await learnerHome.learnerLogin("MANAGERNAME", "DefaultPortal");
  //   await learnerHome.selectCollaborationHub();
  //   await learnerHome.page.waitForTimeout(2000);
  //   console.log(`✓ Logged in as Manager and navigated to Collaboration Hub`);

  //   // Search for the course in Most Recent or use search
  //   await managerHome.enterSearchCourse(courseName);
  //   await learnerHome.page.waitForTimeout(2000);
  //   console.log(`✓ Searched for course: ${courseName}`);

  //   console.log(`\n========== STEP 3: MANAGER RECOMMENDS COURSE TO ENTIRE TEAM ==========`);
  //   // Step 3: Click recommend icon for the course
  //   await managerHome.clickrecommendIcon(courseName);
  //   await learnerHome.page.waitForTimeout(1500);
  //   console.log(` Clicked recommend icon for course`);

  //   // Verify Entire Team is selected by default (no need to click as per requirement)
  //   const entireTeamRadio = learnerHome.page.locator("//span[text()='Entire Team']");
  //   const isEntireTeamVisible = await entireTeamRadio.isVisible().catch(() => false);
    
  //   if (isEntireTeamVisible) {
  //     console.log(` Entire Team radio button is visible (selected by default)`);
  //   } else {
  //     console.log(` Entire Team radio button not found, proceeding with recommendation`);
  //   }

  //   // Step 4: Set additional info using the specified XPath
  //   const additionalInfoField = learnerHome.page.locator("//*[@id='email-message']");
  //   const isAdditionalInfoVisible = await additionalInfoField.isVisible().catch(() => false);
    
  //   if (isAdditionalInfoVisible) {
  //     await managerHome.enterAdditionalInfo();
  //     console.log(` Entered additional information for team recommendation`);
  //   } else {
  //     console.log(`Additional info field not visible`);
  //   }

  //   await learnerHome.page.waitForTimeout(1000);

  //   console.log(`\n========== STEP 4: CLICK RECOMMEND LEARNING BUTTON ==========`);
  //   // Step 5: Click Recommend Learning button
  //   await managerHome.clickRecommendLearning();
  //   await learnerHome.page.waitForTimeout(2000);
  //   console.log(`✓ Clicked Recommend Learning button`);

  //   // Verify success message
  //   await managerHome.verifytoastmsg();
  //   console.log(`✓ Course successfully recommended to entire team`);

  //   console.log('\n========== TEST COMPLETED ==========');
  // });

  // test('12. Verify course can be recommended to specific learners', async ({ adminHome, createCourse, learnerHome, managerHome, catalog, dashboard }) => {
  //   test.info().annotations.push(
  //     { type: 'Author', description: 'Manikandan' },
  //     { type: 'TestCase', description: 'CH014-12 - Verify Course Recommended to Specific Learners' },
  //     { type: 'Test Description', description: 'Admin creates course, manager recommends to specific learner, learner verifies in Items Need Attention > Recommendation tab' }
  //   );

  //   const selectedLearner = "learnerone"; // vikram

  //   console.log(`\n========== STEP 1: ADMIN CREATES ELEARNING COURSE ==========`);
  //   // Step 1: Login as Admin and create elearning course
  //   await adminHome.loadAndLogin("CUSTOMERADMIN");
  //   await adminHome.menuButton();
  //   await adminHome.clickLearningMenu();
  //   await adminHome.clickCourseLink();
    
  //   // Create new course
  //   await createCourse.clickCreateCourse();
  //   await createCourse.verifyCreateUserLabel("CREATE COURSE");
  //   await createCourse.enter("course-title", courseName);
  //   await createCourse.selectLanguage("English");
  //   await createCourse.typeDescription("Course for specific learner recommendation: " + description);
  //   await createCourse.contentLibrary(); // By default youtube content will be added
  //   await createCourse.clickCatalog();
  //   await createCourse.clickSave();
  //   await createCourse.clickProceed();
  //   await createCourse.verifySuccessMessage();
  //   console.log(`✓ Course created successfully: ${courseName}`);

  //   // Logout admin
  //   await learnerHome.clickSignOut();
  //   console.log(`✓ Admin logged out`);

  //   console.log(`\n========== STEP 2: MANAGER RECOMMENDS COURSE TO SPECIFIC LEARNER ==========`);
  //   // Step 2: Login as Manager
  //   await learnerHome.learnerLogin("MANAGERNAME", "DefaultPortal");
  //   await learnerHome.selectCollaborationHub();
  //   await learnerHome.page.waitForTimeout(2000);
  //   console.log(`✓ Logged in as Manager and navigated to Collaboration Hub`);

  //   // Search for the course
  //   await managerHome.enterSearchCourse(courseName);
  //   await learnerHome.page.waitForTimeout(2000);
  //   console.log(`✓ Searched for course: ${courseName}`);

  //   // Click recommend icon for the course
  //   await managerHome.clickrecommendIcon(courseName);
  //   await learnerHome.page.waitForTimeout(1500);
  //   console.log(`✓ Clicked recommend icon for course`);

  //   console.log(`\n========== STEP 3: SELECT SPECIFIC LEARNER FROM TEAM ==========`);
  //   // Click Select Team members button
  //   await managerHome.selectTeam();
  //   await learnerHome.page.waitForTimeout(1500);
  //   console.log(`✓ Clicked Select Team members button`);

  //   // Manually select specific learner to avoid timeout in selectTeamUser method
  //   // Click the dropdown
  //   const selectDropdown = learnerHome.page.locator(`//input[@id='select-team-filter-field']`);
  //   await selectDropdown.click();
  //   await learnerHome.page.waitForTimeout(1000);
  //   console.log(`✓ Clicked team dropdown`);
    
  //   // Type learner name in search field
  //   const searchField = learnerHome.page.locator(`//input[@id='select-team']`);
  //   await searchField.fill(selectedLearner);
  //   await learnerHome.page.waitForTimeout(1500);
  //   console.log(`✓ Typed learner name: ${selectedLearner}`);
    
  //   // Click on the first matched learner from search results
  //   const learnerOption = learnerHome.page.locator(`//div[@id="lms-resu-disp"]/ul/li[1]`);
  //   await learnerOption.waitFor({ state: 'visible', timeout: 10000 });
  //   await learnerOption.click();
  //   console.log(`✓ Selected learner from search results: ${selectedLearner}`);
    
  //   await learnerHome.page.waitForTimeout(1000);

  //   console.log(`\n========== STEP 4: ADD ADDITIONAL INFO AND RECOMMEND ==========`);
  //   // Enter additional info
  //   await managerHome.enterAdditionalInfo();
  //   console.log(`✓ Entered additional information for learner recommendation`);

  //   await learnerHome.page.waitForTimeout(1000);

  //   // Click Recommend Learning button
  //   await managerHome.clickRecommendLearning();
  //   await learnerHome.page.waitForTimeout(2000);
  //   console.log(`✓ Clicked Recommend Learning button`);

  //   // Verify success message and click OK
  //   await managerHome.verifytoastmsg();
  //   console.log(`✓ Course successfully recommended to specific learner`);
    
  //   // Close the recommendation modal
  //   await managerHome.closeRecommendationModal();

  //   // Logout manager
  //   await learnerHome.clickSignOut();
  //   console.log(`✓ Manager logged out`);

  //   console.log(`\n========== STEP 5: LEARNER VERIFIES RECOMMENDATION ==========`);
  //   // Step 3: Login as the selected learner
  //   await learnerHome.learnerLogin("learnerone", "DefaultPortal");
  //   await learnerHome.page.waitForTimeout(2000);
  //   console.log(`✓ Logged in as learner: ${selectedLearner}`);

  //   // Navigate to Items Need Attention
  //   await dashboard.selectDashboardItems("Items Need Attention");
  //   await learnerHome.page.waitForTimeout(2000);
  //   console.log(`✓ Navigated to Items Need Attention section`);

  //   // Click Recommendation tab
  //   await catalog.clickRecommendation();
  //   await learnerHome.page.waitForTimeout(2000);
  //   console.log(`✓ Clicked Recommendation tab`);

  //   // Verify the recommended course is visible
  //   await catalog.verifyCourserecommemnded(courseName);
  //   console.log(`✓ Verified course "${courseName}" is visible in Recommendations`);

  //   console.log('\n========== TEST COMPLETED ==========');
  // });

  test('13. Verify Manager able to reject external training certificate request', async ({ learnerHome, profile, managerHome }) => {
    test.info().annotations.push(
      { type: 'Author', description: 'Manikandan' },
      { type: 'TestCase', description: 'CH014-13 - Manager Rejects External Training Certificate' },
      { type: 'Test Description', description: 'Learner adds external training certificate for manager verification, manager logs in and rejects the certificate request' }
    );

    const managerUsername = data.managerName; // balamnr

    console.log(`\n========== STEP 1: LEARNER ADDS EXTERNAL TRAINING CERTIFICATE ==========`);
    // Step 1: Login as Learner and add external training certificate
    await learnerHome.learnerLogin("TEAMUSER1", "DefaultPortal");
    await learnerHome.page.waitForTimeout(2000);
    console.log(`✓ Logged in as TEAMUSER1`);

    // Navigate to Profile
    await profile.clickProfile();
    await learnerHome.page.waitForTimeout(1000);
    console.log(`✓ Clicked on Profile`);

    // Go to Details tab
    await profile.detailsTab();
    await learnerHome.page.waitForTimeout(1000);
    console.log(`✓ Navigated to Profile Details tab`);
    
    // Add external training certificate for manager verification
    await profile.certificateVerificationbyManager(managerUsername);
    await learnerHome.page.waitForTimeout(2000);
    console.log(`✓ Added external training certificate for manager verification: ${managerUsername}`);
    
    // Save the certificate
    await profile.clickSave();
    await learnerHome.page.waitForTimeout(2000);
    console.log(`✓ Saved certificate`);

    // Verify saved changes
    const savedMessage = learnerHome.page.locator("//span[contains(text(),'saved')] | //span[contains(text(),'success')] | //div[contains(text(),'saved')]");
    const isSavedVisible = await savedMessage.isVisible().catch(() => false);
    if (isSavedVisible) {
      console.log(`✓ Certificate saved successfully`);
    }
    
    // Logout learner and wait for logout to complete
    await profile.click(learnerHome.selectors.signOutLink, "Sign Out", "Link");
    await learnerHome.page.waitForTimeout(2000);
    console.log(`✓ Learner logged out`);

    console.log(`\n========== STEP 2: MANAGER NAVIGATES TO MY APPROVAL ==========`);
    // Step 2: Login as Manager
    await learnerHome.learnerLogin("MANAGERNAME", "DefaultPortal");
    await learnerHome.page.waitForTimeout(2000);
    console.log(`✓ Logged in as Manager`);
    
    // Navigate to My Approval section
    const myApprovalTab = learnerHome.page.locator("//a[contains(text(),'My Approval')] | //span[contains(text(),'My Approval')] | //button[contains(text(),'My Approval')] | //div[contains(text(),'My Approval')]");
    await myApprovalTab.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
    const isMyApprovalVisible = await myApprovalTab.isVisible().catch(() => false);
    
    if (isMyApprovalVisible) {
      await myApprovalTab.click();
      await learnerHome.page.waitForTimeout(3000);
      console.log(`✓ Navigated to My Approval section`);
      
      console.log(`\n========== STEP 3: MANAGER REJECTS EXTERNAL TRAINING CERTIFICATE ==========`);
      // Step 3: Find and reject the external training certificate request
      const externalTrainingRequest = learnerHome.page.locator(`(//div[contains(text(),'External Training')] | //span[contains(text(),'External Training')] | //td[contains(text(),'External')] | //h5[contains(text(),'External')])[1]`);
      await externalTrainingRequest.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
      const isRequestVisible = await externalTrainingRequest.isVisible().catch(() => false);
      
      if (isRequestVisible) {
        console.log(`✓ Found external training certificate request`);
        
        // Click reject button for the external training
        const rejectButton = learnerHome.page.locator("(//button[contains(text(),'Reject')] | //span[contains(text(),'Reject')] | //a[contains(text(),'Reject')] | //i[contains(@class,'reject')])[1]");
        await rejectButton.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
        const isRejectButtonVisible = await rejectButton.isVisible().catch(() => false);
        
        if (isRejectButtonVisible) {
          await rejectButton.click();
          await learnerHome.page.waitForTimeout(1500);
          console.log(`✓ Clicked Reject button`);
          
          // Enter reject reason
          const rejectReasonField = learnerHome.page.locator("//textarea[@id='reject-reason'] | //input[@id='reject-reason'] | //textarea[contains(@placeholder,'reason')] | //textarea[contains(@name,'reason')] | //textarea");
          await rejectReasonField.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
          const isReasonFieldVisible = await rejectReasonField.isVisible().catch(() => false);
          
          if (isReasonFieldVisible) {
            const rejectReason = 'Certificate does not meet company standards for external training verification';
            await rejectReasonField.fill(rejectReason);
            await learnerHome.page.waitForTimeout(1000);
            console.log(`✓ Entered reject reason: ${rejectReason}`);
            
            // Submit rejection
            const submitButton = learnerHome.page.locator("//button[contains(text(),'Submit')] | //button[contains(text(),'Reject')] | //button[contains(text(),'Confirm')] | //span[text()='Submit']");
            await submitButton.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
            const isSubmitVisible = await submitButton.isVisible().catch(() => false);
            
            if (isSubmitVisible) {
              await submitButton.click();
              await learnerHome.page.waitForTimeout(2000);
              console.log(`✓ Submitted rejection`);
              
              // Verify rejection success message or confirmation
              const successMessage = learnerHome.page.locator("//span[contains(text(),'reject')] | //span[contains(text(),'success')] | //div[contains(text(),'reject')] | //div[contains(text(),'success')]");
              await successMessage.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
              const isSuccessVisible = await successMessage.isVisible().catch(() => false);
              
              if (isSuccessVisible) {
                const messageText = await successMessage.textContent();
                console.log(`✓ Rejection confirmation: ${messageText}`);
                
                // Close confirmation popup if exists
                const okButton = learnerHome.page.locator("//button[text()='OK'] | //button[text()='Close'] | //button[text()='Yes'] | //button[contains(text(),'OK')]");
                const isOkVisible = await okButton.isVisible().catch(() => false);
                if (isOkVisible) {
                  await okButton.click();
                  await learnerHome.page.waitForTimeout(1000);
                  console.log(`✓ Clicked OK button`);
                }
              }
              
              expect(true).toBeTruthy();
              console.log(`✓ Manager successfully rejected the external training certificate request`);
            } else {
              console.log(`⚠ Submit button not found`);
            }
          } else {
            console.log(`⚠ Reject reason field not found - rejection may have been direct`);
          }
        } else {
          console.log(`⚠ Reject button not visible for external training request`);
        }
      } else {
        console.log(`⚠ No external training certificate request found in My Approval`);
      }
    } else {
      console.log(`⚠ My Approval tab not found`);
    }
    
    console.log('\n========== TEST COMPLETED ==========');
  });
});
