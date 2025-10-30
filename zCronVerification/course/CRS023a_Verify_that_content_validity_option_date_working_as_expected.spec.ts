import { test } from "../../customFixtures/expertusFixture";
import data from "../../data/cronjob.json"

//const courseName="ContentValidity_Date";

test(`Verify that whether the content expired based on given date via searching titile via my learning`, async ({ learnerHome, catalog }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Divya B` },
        { type: `TestCase`, description: `Confirm that whether the content expired based on given criteria` },
        { type: `Test Description`, description: `Verify that whether the content expired based on given date via searching titile via my learning` }
    );
    const title=data.CRS023a;
    await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
    await learnerHome.clickMyLearning();
    await catalog.searchMyLearning(title);
    await catalog.mylearningViewClassDetails(title);
    await catalog.verifyFailedMessage();
    await catalog.launchContentFromMylearning();
    await catalog.verifyFailedMessage();



})
test(`Verify that whether the content expired based on given date by clicking playbutton on thumbnail`, async ({ learnerHome, catalog }) => {
  test.info().annotations.push(
      { type: `Author`, description: `Divya B` },
      { type: `TestCase`, description: `Confirm that whether the content expired based on given criteria` },
      { type: `Test Description`, description: `Verify that whether the content expired based on given date by clicking playbutton on thumbnail` }
  );
  const title=data.CRS023a;
  await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
  await learnerHome.clickMyLearning();
  await catalog.searchMyLearning(title);
  await catalog.launchContentFromMylearning();
  await catalog.verifyFailedMessage();
  await catalog.launchContentFromMylearning();
  await catalog.verifyFailedMessage();
})

