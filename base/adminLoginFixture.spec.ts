import { test } from '../customFixtures/expertusFixture';


test(`Login to Expertus`, async ({ adminHome}) => {
  const title = await adminHome.getTitle();
  console.log(title)
})