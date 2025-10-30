import { create } from "node:domain";
import { credentialConstants } from "../../../constants/credentialConstants";
import { credentials } from "../../../constants/credentialData";
import { test } from "../../../customFixtures/expertusFixture"
import { LearnerCoursePage } from "../../../pages/LearnerCoursePage";
import { FakerData, getRandomSeat } from '../../../utils/fakerUtils';


const courseName = FakerData.getCourseName();
const sessionName = FakerData.getSession();
const elCourseName = ("Elearning" + " " + FakerData.getCourseName());
const description = FakerData.getDescription();
const maxSeat = getRandomSeat()
let tag: any
const instructorName = credentials.INSTRUCTORNAME.username
test.describe(`TC053 Confirm that the admin can manually create multiple classes in bulk by entering class details individually`, () => {
    test.describe.configure({ mode: "serial" });
    test(`Multiple Course Creation for Classroom`, async ({ adminHome, createCourse, editCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Divya` },
            { type: `TestCase`, description: `Create multiple classes via bulk class creation manually` },
            { type: `Test Description`, description: `Confirm that the admin can manually create multiple classes in bulk by entering class details individually` }
        );
        await adminHome.loadAndLogin("SUPERADMIN");
        await adminHome.clickMenu("Course");
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", courseName);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription(description);
        await createCourse.selectdeliveryType("Classroom")
        await createCourse.handleCategoryADropdown();
        await createCourse.providerDropdown()
        await createCourse.selectTotalDuration();
        await createCourse.typeAdditionalInfo();
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.editcourse();
        await createCourse.addInstances();

        async function addinstance(deliveryType: string) {
            await createCourse.selectInstanceDeliveryType(deliveryType);
        
        }
        await addinstance("Classroom");
        await createCourse.bulkClassCreation("3","manual");
      
    })


})