
import { test } from "../../customFixtures/expertusFixture";
import data from "../../data/cronjob.json"



test(`Verify_that_the_user_is_able_to_log_in_once_the_password_status_is_changed_to_1.spec.ts.`, async ({ learnerHome, catalog }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Arivazhagan P` },
        { type: `TestCase`, description: `Verify_that_the_user_is_able_to_log_in_once_the_password_status_is_changed_to_1.spec.ts.` },
        { type: `Test Description`, description: `Verify_that_the_user_is_able_to_log_in_once_the_password_status_is_changed_to_1.spec.ts.` }
    );
   
    const userName = data.passwordHistoryStatusUpdateUsername
    await learnerHome.basicLogin(userName, "default");
    


})
