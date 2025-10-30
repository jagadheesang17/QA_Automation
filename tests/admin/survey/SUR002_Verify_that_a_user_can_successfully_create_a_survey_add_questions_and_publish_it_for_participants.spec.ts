import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from "../../../utils/fakerUtils";

let title = FakerData.getRandomTitle();

test(`Verify_that_a_user_can_successfully_create_a_survey_add_questions_and_publish_it_for_participants.spec.ts`, async ({ adminHome, SurveyAssessment }) => {
    test.info().annotations.push(
        { type: 'Author', description: 'Ajay Michael' },
        { type: 'TestCase', description: 'Verify_that_a_user_can_successfully_create_a_survey_add_questions_and_publish_it_for_participants.spec.ts' },
        { type: 'Test Description', description: `Verify_that_a_user_can_successfully_create_a_survey_add_questions_and_publish_it_for_participants.spec.ts`}
    );
    await adminHome.loadAndLogin("LEARNERADMIN")
    await adminHome.isSignOut();
    await adminHome.menuButton();
    await adminHome.survey();
    await adminHome.clickOnsurveyLink();
    await SurveyAssessment.clickCreateSurvey();
    await SurveyAssessment.fillSurveyTitle(title);
    await SurveyAssessment.selectLanguage();
    await SurveyAssessment.fillDescription();
    await SurveyAssessment.clickSaveDraft();
    await SurveyAssessment.clickProceed();
    await SurveyAssessment.importQuestion();
    await SurveyAssessment.clickAddSelectedQuestion();
    await SurveyAssessment.clickImportQuestion();
    await SurveyAssessment.clickPublish();
    await SurveyAssessment.verifySuccessMessage();
});