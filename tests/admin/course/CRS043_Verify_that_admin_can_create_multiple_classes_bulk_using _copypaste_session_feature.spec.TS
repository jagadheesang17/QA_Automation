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
test.describe(`TC035 Verify that the admin can create multiple classes in bulk using the copy/paste session feature`, () => {
    test.describe.configure({ mode: "serial" });
    test(`Multiple Course Creation for Classroom`, async ({ adminHome, createCourse, editCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Divya` },
            { type: `TestCase`, description: `Create multiple classes via bulk class via copy/paste` },
            { type: `Test Description`, description: `Verify that the admin can create multiple classes in bulk using the copy/paste session feature` }
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
        await createCourse.bulkClassCreation("3","copy/paste");
      
    })


})