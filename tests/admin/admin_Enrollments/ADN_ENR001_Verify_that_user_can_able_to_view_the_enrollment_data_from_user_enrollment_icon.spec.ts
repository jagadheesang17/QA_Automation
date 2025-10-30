import { expect } from "@playwright/test";
import { test } from "../../../customFixtures/expertusFixture"
import { readDataFromCSV } from "../../../utils/csvUtil";
import { FakerData } from "../../../utils/fakerUtils";
import { credentials } from "../../../constants/credentialData";


const username = credentials.LEARNERUSERNAME.username


    test(`IRIS4042_Verify that user can able to view the enrollment data from user's enrollment icon`, async ({ adminHome, createUser }) => {

        test.info().annotations.push(
            { type: 'Author', description: 'Tamilvanan' },
            { type: 'TestCase', description: "Verify that user can able to view the enrollment data from user's enrollment icon" },
            { type: 'Test Description', description: "Verify that user can able to view the enrollment data from user's enrollment icon" }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.user();
        await createUser.userSearchField(username);
        await createUser.clickEnrollmentIcon();
        await createUser.verifyEnrollmentLabel();
        await createUser.clickViewEnrollmentStsIcon()
        await createUser.getEnrollmentStatus();
    })
   