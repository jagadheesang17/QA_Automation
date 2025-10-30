import { credentials } from "../../constants/credentialData";
import { test } from "../../customFixtures/expertusFixture";


const dataSets = [
    { user:credentials.TEAMUSER2.username, reportee: "Virtual" },
    { user: credentials.TEAMUSER1.username, reportee: "Direct" }
];

for(const value of dataSets){
test(`Ensure_that_users_are_retrieved_accurately_based_on_the_applied_filter ${value.user}`,async({learnerHome,managerHome})=>{
    test.info().annotations.push(
        { type: `Author`, description: `vidya` },
        { type: `TestCase`, description: `Ensure_that_users_are_retrieved_accurately_based_on_the_applied_filter` },
        { type: `Test Description`, description: `Ensure_that_users_are_retrieved_accurately_based_on_the_applied_filter` }
    );
    await learnerHome.learnerLogin("MANAGERNAME", "DefaultPortal");
   await learnerHome.selectCollaborationHub();
    await managerHome.clickFilter(value.reportee);
    await managerHome.verifyReportee(value.user,value.reportee) 
    })
    }

