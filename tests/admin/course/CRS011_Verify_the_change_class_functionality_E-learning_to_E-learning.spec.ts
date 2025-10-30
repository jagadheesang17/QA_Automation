import { create } from "domain";
import { credentialConstants } from "../../../constants/credentialConstants";
import { credentials } from "../../../constants/credentialData";
import { test } from "../../../customFixtures/expertusFixture"
import { LearnerCoursePage } from "../../../pages/LearnerCoursePage";
import { FakerData, getRandomSeat } from '../../../utils/fakerUtils';

const courseName = FakerData.getCourseName();
const sessionName = FakerData.getSession();
const elCourseName = ("Elearning" + " " + FakerData.getCourseName());
//const elCourseName1 = ("Elearning" + " " + FakerData.getCourseName());
const description = FakerData.getDescription();
const maxSeat = getRandomSeat()
let tag: any
const instructorName = credentials.INSTRUCTORNAME.username
test.describe(`Verify_the_change_class_functionality_E-learning_to_E-learning.spec.ts`, () => {
    test.describe.configure({ mode: "serial" });
    test(`Verify_the_change_class_functionality_E-learning_to_E-learning.spec.ts`, async ({ adminHome, createCourse, editCourse, contentHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Arivazhagan P` },
            { type: `TestCase`, description: `CRS003_Verify_the_change_class_functionality_E-learning_to_E-learning.spec.ts` },
            { type: `Test Description`, description: `CRS003_Verify_the_change_class_functionality_E-learning_to_E-learning.spec.ts` }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.clickMenu("Course");
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", courseName);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription(description);
        await createCourse.selectdeliveryType("E-Learning")
        await createCourse.handleCategoryADropdown();
        await createCourse.providerDropdown()
        await createCourse.selectTotalDuration();
        await createCourse.typeAdditionalInfo();
        //Creating as a multi instance--------
        await createCourse.selectInstanceType("Multi Instance/Class");
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.editcourse();
        await editCourse.clickClose();
        await editCourse.clickTagMenu();
        tag = await editCourse.selectTags();
        await editCourse.clickClose();
        await createCourse.clickCompletionCertificate();
        await createCourse.clickCertificateCheckBox();
        await createCourse.clickAdd();
        //         await createCourse.typeDescription(description);
        // await createCourse.clickCatalog();
        // await createCourse.clickUpdate();
        // await createCourse.verifySuccessMessage();
        // await createCourse.clickEditCourseTabs();
        await createCourse.addInstances();

        async function addinstance(deliveryType: string) {
            await createCourse.selectInstanceDeliveryType(deliveryType);
            await createCourse.clickCreateInstance();
        }
        await addinstance("E-Learning");
        await createCourse.enter("course-title", courseName);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription("This is a new course by name :" + description);
        await createCourse.contentLibrary();//Youtube content is attached here
        await createCourse.clickCatalog();
        await createCourse.clickUpdate();
        await createCourse.editcourse();
        //Adding 2nd instance------
        await createCourse.clickinstanceClass();
        await createCourse.addInstances();
        await addinstance("E-Learning");
        await createCourse.enter("course-title", elCourseName);
        await createCourse.contentLibrary();
        await createCourse.clickCatalog();
        await createCourse.clickUpdate();
        await createCourse.verifySuccessMessage();
        console.log(courseName);
        console.log(elCourseName);
    })


    test(`Learner_verification_change_class_functionality_E-learning_to_E-learning.`, async ({ learnerHome, catalog, learnerCourse }) => {
        test.info().slow(true)
        test.info().annotations.push(
            { type: `Author`, description: `Arivazhagan P` },
            { type: `TestCase`, description: `Learner_verification_change_class_functionality_E-learning_to_E-learning.` },
            { type: `Test Description`, description: `Learner_verification_change_class_functionality_E-learning_to_E-learning.` }
        );

       // let courseName="Mobile Card Transmit";
    //    let elCourseName=" Elearning Mobile System Reboot";
     //   let tag="E-enable Networks";

        await learnerHome.learnerLogin("LEARNERUSERNAME", "LearnerPortal");
        await learnerHome.clickCatalog();
        await catalog.clickFilter();
        await catalog.selectresultantTags(tag);
        await catalog.clickApply();
       // await learnerHome.clickCatalog();
        await catalog.clickMoreonCourse(courseName);
        await catalog.clickSelectcourse(courseName);
        console.log(courseName);
        console.log(elCourseName);
        await catalog.clickEnroll();
        await catalog.changeClass();
        await catalog.clickSelectcourse(courseName);
        console.log(courseName);
        await catalog.clickEnroll();
       // await catalog.verifyChangeClass();
        
    })
})