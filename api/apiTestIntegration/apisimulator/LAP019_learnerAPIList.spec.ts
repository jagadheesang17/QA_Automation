import { expect, test } from "@playwright/test";
import { getAdminAPI, getLearnerAPI } from "./enabledAPIList";

import * as fs from 'fs';
import * as path from 'path';


test.describe.configure({ mode: "serial" });
test('Fetch all the enabled Learner APIs in simulator and store to the json file', async () => {
  test.info().annotations.push(
    { type: `Author`, description: `Arivazhagan P` },
    { type: `TestCase`, description: `Fetch all the enabled Learner APIs in simulator and store to the json file` },
    { type: `Test Description`, description: `Fetch all the enabled Learner APIs in simulator and store to the json file` }
);

  await getLearnerAPI();
});



function compareJSON(json1, json2) {
  // Check if they are identical (ignores formatting differences)
  return JSON.stringify(json1) === JSON.stringify(json2);
}

test('Verify all the enabled Learner APIs are listed in the simulator', async () => {
  test.info().annotations.push(
    { type: `Author`, description: `Arivazhagan P` },
    { type: `TestCase`, description: `Verify all the enabled Learner APIs are listed in the simulator` },
    { type: `Test Description`, description: `Verify all the enabled Learner APIs are listed in the simulator` }
);

  // Read the JSON files
const filePath1 = path.join(__dirname, '../../../data/apiData/learnerAPIList.json');
const jsonFile1 = fs.readFileSync(filePath1, 'utf-8');
const filePath2 = path.join(__dirname, '../../../data/apiData/learnerAPIListog.json');
const jsonFile2 = fs.readFileSync(filePath2, 'utf-8');
// Parse JSON (these should be arrays)
const json1: string[] = JSON.parse(jsonFile1);
const json2: string[] = JSON.parse(jsonFile2);
// Find APIs in json2 (expected) that are missing from json1 (actual)
const missingAPIs = json1.filter(api => !json2.includes(api));
if (missingAPIs.length > 0) {
  console.log('\n Missing APIs in simulator:\n', missingAPIs.join('\n'));
} else {
  console.log('\n All expected APIs are present.');
}

  // Compare the two JSON objects
  const areIdentical = compareJSON(json1, json2);
  expect(jsonFile1).toContain(jsonFile2);
  // Output result
  if (areIdentical) {
    console.log(`'${json1}' and '${json2}' are identical`);
  } else {
    console.log('The JSON files are different');
  }
});





