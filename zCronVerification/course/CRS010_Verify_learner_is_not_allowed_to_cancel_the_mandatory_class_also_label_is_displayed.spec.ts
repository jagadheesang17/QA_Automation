
import { test } from "../../customFixtures/expertusFixture";
import data from "../../data/cronjob.json"

//Username based enrollment:-
test(`Validate that the learner is successfully enrolled in the eLearning mandatory course through the execution of the auto-register cron job.spec.ts`, async ({ learnerHome, catalog }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Arivazhagan P` },
        { type: `TestCase`, description: `Validate that the learner is successfully enrolled in the eLearning mandatory course through the execution of the auto-register cron job.` },
        { type: `Test Description`, description: `Validate that the learner is successfully enrolled in the eLearning mandatory course through the execution of the auto-register cron job.` }
    );
    const title = data.CRS010
    await learnerHome.learnerLogin("LEARNERUSERNAME", "default");
    await learnerHome.clickMyLearning();
    await learnerHome.clickMyLearning();
    await catalog.searchMyLearning(title);
    await catalog.verifyCompletedCourse(title);  
    await catalog.mandatoryTextVerification(); //Mylearning list page
    await catalog.mylearningViewClassDetails(title); //Navigate to the class details from mylearning
    await catalog.mylearningMandatoryClassCancel();
    await catalog.clickOkButton();
    await catalog.mandatoryTextVerification(); //Course Details page

})

//Group based enrollment:-
test(`Validate that the learner is successfully enrolled (Group) in the eLearning mandatory course through the execution of the auto-register cron job.spec.ts`, async ({ learnerHome, catalog,dashboard }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Arivazhagan P` },
        { type: `TestCase`, description: `Validate that the learner is successfully enrolled in the eLearning mandatory course through the execution of the auto-register cron job.` },
        { type: `Test Description`, description: `Validate that the learner is successfully enrolled in the eLearning mandatory course through the execution of the auto-register cron job.` }
    );
    const title = data.CRS010
    await learnerHome.learnerLogin("LearnerGroup1user", "default");
    await learnerHome.clickMyLearning();
    await learnerHome.clickMyLearning();
    await catalog.searchMyLearning(title);
    await catalog.verifyCompletedCourse(title);  
    await catalog.mandatoryTextVerification(); //Mylearning list page
    await catalog.mylearningViewClassDetails(title); //Navigate to the class details from mylearning
    await catalog.mylearningMandatoryClassCancel();
    await catalog.clickOkButton();
    await catalog.mandatoryTextVerification(); //Course Details page

})

//Group based enrollment
//Learner user is belongs to the another group
test(`Validate that the learner is not enrolled in the eLearning compliance course through the execution of the auto-register cron job.spec.ts`, async ({ learnerHome, catalog }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Arivazhagan P` },
        { type: `TestCase`, description: `Validate that the learner is not enrolled in the eLearning mandatory course through the execution of the auto-register cron job.` },
        { type: `Test Description`, description: `Validate that the learner is not enrolled in the eLearning mandatory course through the execution of the auto-register cron job.` }
    );
   
    const title = data.CRS010
    await learnerHome.learnerLogin("LearnerGroup2user", "default");
    await learnerHome.clickMyLearning();
    await learnerHome.clickMyLearning();
    await catalog.searchMyLearning(title);
    await catalog.mylearningNoResultsFound();


})
