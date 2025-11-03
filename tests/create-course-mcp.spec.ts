import { test, expect } from '@playwright/test';

test.describe('Course Creation Automation via MCP Server', () => {
  
  test('Create course with random title and video upload', async ({ page }) => {
    // Navigate to the learning platform
    await page.goto('https://newprod.expertusoneqa.in/learner/newprod/');
    
    // Login with provided credentials
    await page.fill('input[name="username"]', 'qanewprod@nomail.com');
    await page.fill('input[name="password"]', 'Welcome1@');
    await page.click('button[type="submit"]');
    
    // Wait for login to complete and navigate to admin area
    await page.waitForURL('**/learner/newprod/dashboard');
    
    // Navigate to course creation through menu
    await page.click('[data-testid="side-menu"]');
    await page.click('text=Learning');
    await page.click('text=Course');
    await page.click('text=Create Course');
    
    // Generate random course title using Faker-like algorithm
    const courseTitle = generateRandomCourseTitle();
    await page.fill('input[name="title"]', courseTitle);
    
    // Upload sample video file from data folder
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles('data/samplevideo.mp4');
    
    // Wait for file upload to complete
    await page.waitForSelector('text=Attached Content');
    await expect(page.locator('text=samplevideo')).toBeVisible();
    
    // Enable Show in Catalog option
    await page.check('input[name="showInCatalog"]');
    
    // Save the course
    await page.click('button:has-text("Save")');
    
    // Handle confirmation dialog if appears
    const proceedButton = page.locator('button:has-text("Yes, Proceed")');
    if (await proceedButton.isVisible()) {
      await proceedButton.click();
    }
    
    // Verify course creation success
    await expect(page.locator(`text="${courseTitle}" has been saved to draft successfully.`)).toBeVisible();
    
    // Navigate to course listing to verify
    await page.click('text=Go to Listing');
    await expect(page.locator(`text=${courseTitle}`)).toBeVisible();
    
    console.log(`Course created successfully: ${courseTitle}`);
  });
});

/**
 * Generate a random course title using Faker-like algorithm
 * @returns {string} Random course title
 */
function generateRandomCourseTitle(): string {
  const adjectives = [
    'Interactive', 'Advanced', 'Comprehensive', 'Professional', 'Essential',
    'Strategic', 'Dynamic', 'Innovative', 'Practical', 'Foundational'
  ];
  
  const nouns = [
    'Course', 'Training', 'Program', 'Workshop', 'Certification',
    'Skills', 'Development', 'Learning', 'Education', 'Study'
  ];
  
  const verbs = [
    'Mastery', 'Excellence', 'Success', 'Achievement', 'Growth',
    'Progress', 'Development', 'Enhancement', 'Advancement', 'Improvement'
  ];
  
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
  const timestamp = Date.now();
  
  return `${randomAdjective} ${randomNoun} ${randomVerb} ${timestamp}`;
}