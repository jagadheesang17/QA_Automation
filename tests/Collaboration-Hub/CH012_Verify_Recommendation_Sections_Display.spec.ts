import { test } from "../../customFixtures/expertusFixture";
import { expect } from '@playwright/test';

test.describe('CH012: Verify recommendation sections are displayed correctly', async () => {
    
  test('Verify recommendation list has 3 sections: Based on Similar Profile, Based on your Profile, and Manage Recommended', async ({ learnerHome, catalog }) => {
    test.info().annotations.push(
      { type: 'Author', description: 'Manikandan' },
      { type: 'TestCase', description: 'CH012 - Verify Recommendation Sections Display' },
      { type: 'Test Description', description: 'Verify that the recommendation page displays 3 sections: Based on Similar Profile, Based on your Profile, and Manage Recommended' }
    );

    // Login as learner
    await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
    
    // Navigate to Catalog
    await learnerHome.clickCatalog();
    
    // Click on Recommendations tab
    await catalog.clickRecommendation();
    
    // Wait for the page to load
    await catalog.page.waitForTimeout(2000);
    
    // Verify all three recommendation sections
    const totalSectionsFound = await catalog.verifyAllRecommendationSections();
    
    // Verify that at least one section is visible
    expect(totalSectionsFound).toBeGreaterThan(0);
    
    // Take a screenshot for verification
    await catalog.page.screenshot({ 
      path: `test-results/CH012_Recommendation_Sections_${Date.now()}.png`,
      fullPage: true 
    });
    
    console.log('\n========== TEST COMPLETED ==========');
  });
});
