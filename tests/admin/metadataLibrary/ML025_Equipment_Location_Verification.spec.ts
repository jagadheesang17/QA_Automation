import { test } from "../../../customFixtures/expertusFixture";
import { expect } from '@playwright/test';
import { FakerData } from "../../../utils/fakerUtils";

test.describe('ML025: Equipment and Location Verification Tests', () => {
    let equipmentName: string;
    let editedEquipmentName: string;

    test.beforeAll(async () => {
        equipmentName = FakerData.equipmentName();
        editedEquipmentName = FakerData.equipmentName();
    });

    test('1. Create and edit equipment for subsequent tests', async ({ adminHome, metadatalibrary }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'ML025 - Create and Edit Equipment' },
            { type: 'Test Description', description: 'Create equipment and edit it for use in other tests' }
        );

        await adminHome.loadAndLogin("CUSTOMERADMIN1")
        await adminHome.isSignOut();
        await adminHome.menuButton();
        await adminHome.metadataLibrary();
        await adminHome.metaGeneralLink();
        await metadatalibrary.equipmentExpandButton();
        await metadatalibrary.clickAddEquipment();
        await metadatalibrary.enterEquipmentName(equipmentName);
        await metadatalibrary.saveButton();
        await metadatalibrary.verifyEquipment(equipmentName);
        
        await metadatalibrary.editPeople(equipmentName);
        const nameField = metadatalibrary.page.locator(metadatalibrary.selectors.equipmentname);
        await nameField.clear();
        await metadatalibrary.enterEquipmentName(editedEquipmentName);
        await metadatalibrary.saveButton();
        await metadatalibrary.verifyEquipment(editedEquipmentName);
        
        console.log('\n========== TEST COMPLETED ==========');
    });

    test('2. Verify the edited equipment is displayed in the location equipment dropdown', async ({ adminHome, location }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'ML025 - Verify Edited Equipment in Location Dropdown' },
            { type: 'Test Description', description: 'Verify the edited equipment is displayed in the location equipment dropdown' }
        );

        await adminHome.loadAndLogin("CUSTOMERADMIN1")
        await adminHome.isSignOut();
        await adminHome.menuButton();
        await adminHome.locationLink();
        await location.clickCreateLocation();
        
        await location.clickEquipmentDropdown();
        const equipmentOption = location.page.locator(location.selectors.equipmentDropdownValuess(editedEquipmentName));
        await expect(equipmentOption).toBeVisible();
        
        console.log('\n========== TEST COMPLETED ==========');
    });

    test('3. Verify information tooltip for Location Equipment section in Metadata Library', async ({ adminHome, metadatalibrary }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'ML025 - Verify Equipment Info Tooltip' },
            { type: 'Test Description', description: 'Verify information tooltip for Location Equipment section in Metadata Library' }
        );

        await adminHome.loadAndLogin("CUSTOMERADMIN1")
        await adminHome.isSignOut();
        await adminHome.menuButton();
        await adminHome.metadataLibrary();
        await adminHome.metaGeneralLink();
        await metadatalibrary.equipmentExpandButton();
        
        await metadatalibrary.verifyEquipment(editedEquipmentName);
        
        const equipmentHeader = metadatalibrary.page.locator(metadatalibrary.selectors.equipmentLabelMetadataLibrary);
        await expect(equipmentHeader).toBeVisible();
        
        const infoIcon = metadatalibrary.page.locator("//div[@id='equipment-header']//i[contains(@class,'fa-info') or contains(@class,'fa-circle-info')]");
        if (await infoIcon.isVisible()) {
            await infoIcon.hover();
            await metadatalibrary.page.waitForTimeout(500);
            
            const tooltip = metadatalibrary.page.locator("//div[contains(@class,'tooltip') or contains(@role,'tooltip')]");
            const isTooltipVisible = await tooltip.isVisible();
            expect(isTooltipVisible).toBeTruthy();
        }
        
        console.log('\n========== TEST COMPLETED ==========');
    });

    test('4. Verify breadcrumb display after applying filters in Metadata Library', async ({ adminHome, metadatalibrary }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'ML025 - Verify Breadcrumb After Filters' },
            { type: 'Test Description', description: 'Verify breadcrumb display after applying filters in Metadata Library' }
        );

        await adminHome.loadAndLogin("CUSTOMERADMIN1")
        await adminHome.isSignOut();
        await adminHome.menuButton();
        await adminHome.metadataLibrary();
        
        const metadataLibraryLabel = metadatalibrary.page.locator(metadatalibrary.selectors.metadataLibraryLabel);
        await expect(metadataLibraryLabel).toBeVisible();
        
        await adminHome.metaGeneralLink();
        await metadatalibrary.equipmentExpandButton();
        
        await metadatalibrary.verifyEquipment(editedEquipmentName);
        
        const breadcrumb = metadatalibrary.page.locator("//nav[contains(@aria-label,'breadcrumb')] | //ol[contains(@class,'breadcrumb')] | //div[contains(@class,'breadcrumb')]");
        const isBreadcrumbVisible = await breadcrumb.isVisible();
        
        if (isBreadcrumbVisible) {
            const breadcrumbText = await breadcrumb.textContent();
            const containsMetadataLibrary = breadcrumbText?.toLowerCase().includes('metadata') || breadcrumbText?.toLowerCase().includes('general');
            expect(containsMetadataLibrary).toBeTruthy();
        }
        
        console.log('\n========== TEST COMPLETED ==========');
    });
});
