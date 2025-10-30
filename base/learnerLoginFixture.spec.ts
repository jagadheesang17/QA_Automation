import { test } from '../customFixtures/expertusFixture';


test(`Login to Expertus`, async ({ learnerLogin }) => {
  const title = await learnerLogin.getTitle();
  console.log(title)
})