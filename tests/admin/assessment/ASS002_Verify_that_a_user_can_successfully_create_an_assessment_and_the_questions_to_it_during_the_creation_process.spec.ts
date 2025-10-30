import {test} from"../../../customFixtures/expertusFixture"
import { FakerData } from "../../../utils/fakerUtils";
let title=FakerData.getRandomTitle()
test(`Verify_that_a_user_can_successfully_create_an_assessment_and_the_questions_to_it_during_the_creation_process`,async({ adminHome,SurveyAssessment})=>{
    test.info().annotations.push(
        { type: 'Author', description: 'Ajay Michael' },
        { type: 'TestCase', description: 'Verify_that_a_user_can_successfully_create_an_assessment_and_the_questions_to_it_during_the_creation_process' },
        { type:'Test Description', description:`Verify_that_a_user_can_successfully_create_an_assessment_and_the_questions_to_it_during_the_creation_process`}
    );
    await adminHome.loadAndLogin("LEARNERADMIN")
    await adminHome.isSignOut();
    await adminHome.menuButton();
    await adminHome.assessmentMenu();
    await adminHome.clickOnAssessmentLink();
    await SurveyAssessment.clickCreateAssessment();
    await SurveyAssessment.fillAssessmentTitle(title);
    await SurveyAssessment.selectLanguage();
    await SurveyAssessment.fillDescription();
    await SurveyAssessment.enterPasspercentage("50")
    await SurveyAssessment.selectRandomizeOption("No")
    await SurveyAssessment.enterNofAttempts("2")
    await SurveyAssessment.clickSaveDraft();
    await SurveyAssessment.clickProceed();
    await SurveyAssessment.enterQuestions();
    await SurveyAssessment.displayOption();    
    await SurveyAssessment.selectingType();
    await SurveyAssessment.importQuestion();
    await SurveyAssessment.clickAddSelectedQuestion();
    await SurveyAssessment.clickImportQuestion();
    await SurveyAssessment.clickPublish();
    await SurveyAssessment.verifySuccessMessage();
})