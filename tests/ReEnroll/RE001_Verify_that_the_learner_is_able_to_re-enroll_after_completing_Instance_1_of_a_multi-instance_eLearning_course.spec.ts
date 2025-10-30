import { credentials } from "../../constants/credentialData";
import { test } from "../../customFixtures/expertusFixture";
import { FakerData } from "../../utils/fakerUtils";



const courseName = FakerData.getCourseName();
const description = FakerData.getDescription()
const elCourseName = ("Elearning" + " " + FakerData.getCourseName());
const elCourseName2 = ("Elearning" + " " + FakerData.getCourseName());

    test.describe.configure({ mode: 'serial' })
    test(`Verify_that_the_learner_is_able_to_re-enroll_after_completing_Instance_1_of_a_multi-instance_eLearning_course`, async ({ adminHome, createCourse, editCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Verify_that_the_learner_is_able_to_re-enroll_after_completing_Instance_1_of_a_multi-instance_eLearning_course` },
            { type: `Test Description`, description: `Verify_that_the_learner_is_able_to_re-enroll_after_completing_Instance_1_of_a_multi-instance_eLearning_course` }
        );          

        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.clickMenu("Course");
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", courseName);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription(description);
        await createCourse.selectInstance();
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.editcourse();
        async function addinstance(deliveryType: string) {
            await createCourse.selectInstanceDeliveryType(deliveryType);
            await createCourse.clickCreateInstance();
        }
        await createCourse.addInstances();
        await addinstance("E-Learning");
        //await editCourse.clickBusinessRule()
        //await editCourse.verifycheckAllowRecReg()
        //await editCourse.clickcheckAllowRecReg()
        await createCourse.enter("course-title", elCourseName);
        await createCourse.contentLibrary();
        await createCourse.clickCatalog();
        await createCourse.clickUpdate();
        await createCourse.verifySuccessMessage();
        await createCourse.editcourse();
        await editCourse.clickBusinessRule();
        await editCourse.clickcheckAllowRecReg();
        // await createCourse.clickUpdate();
        // await createCourse.editcourse();
        await createCourse.clickinstanceClass();
        await createCourse.addInstances();
        await addinstance("E-Learning");
        //await editCourse.clickBusinessRule()
        //await editCourse.verifycheckAllowRecReg()
        //await editCourse.clickcheckAllowRecReg()
        await createCourse.enter("course-title", elCourseName2);
        await createCourse.contentLibrary();
        await createCourse.clickCatalog();
        await createCourse.clickUpdate();
        await createCourse.verifySuccessMessage();
        await createCourse.editcourse();
        await editCourse.clickBusinessRule();
        await editCourse.clickcheckAllowRecReg();
        await createCourse.clickUpdate();
        console.log(courseName);
        console.log(elCourseName);
        console.log(elCourseName2);
    })


    test(`Verification from learner site`, async ({ learnerHome, learnerCourse, catalog }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Verify that learner can able to reenroll the by clicking reenroll button after completing instance 1` },
            { type: `Test Description`, description: `Verify that learner can able to reenroll the by clicking reenroll button after completing instance 1` }
        );
        await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal");
        await learnerHome.clickCatalog();
        await catalog.mostRecent();
        await catalog.searchCatalog(courseName);
        await catalog.clickMoreonCourse(courseName);
        await catalog.clickSelectcourse(elCourseName);
        await catalog.clickEnroll();
        await catalog.clickLaunchButton();
        await catalog.saveLearningStatus();
        await learnerCourse.clickReEnroll();
        await catalog.clickSelectcourse(elCourseName2);
        await catalog.clickEnroll();
        await learnerCourse.reEnrollPopup();
        await catalog.clickLaunchButton();
        await catalog.saveLearningStatus();
    })