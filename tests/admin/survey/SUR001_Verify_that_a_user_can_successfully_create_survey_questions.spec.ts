import {test} from"../../../customFixtures/expertusFixture"
import { FakerData } from "../../../utils/fakerUtils";

test(`Verify_that_a_user_can_successfully_create_survey_questions.spec.ts`,async({ adminHome,SurveyAssessment})=>{
    test.info().annotations.push(
        { type: 'Author', description: 'Ajay Michael' },
        { type: 'TestCase', description: 'Verify_that_a_user_can_successfully_create_survey_questions.spec.ts' },
        { type:'Test Description', description:'Verify_that_a_user_can_successfully_create_survey_questions.spec.ts'}
    );
    await adminHome.loadAndLogin("LEARNERADMIN")
    await adminHome.isSignOut();
    await adminHome.menuButton();
    await adminHome.survey();
    await adminHome.clickOnSurveyQuestionLink();
    await SurveyAssessment.clickCreateQuestions();
    await SurveyAssessment.enterQuestions();
    await SurveyAssessment.selectLanguage();
    await SurveyAssessment.selectingType();
    await SurveyAssessment. clickSave();    
   
})