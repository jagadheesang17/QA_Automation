import { defineConfig, devices } from '@playwright/test';
import { channel } from 'diagnostics_channel';


const timestamp = Date.now();
const reportDir = `./reporter/playwright-reports-${timestamp}`;
//const match: string | undefined = 'tomorrow';
const match = process.env.TEST_STAGE || '';
export default defineConfig({
  timeout: 550000,

  expect: {
    timeout: 30000
  },
  testDir: './tests',
  //globalSetup: require.resolve('./global-setup'),
  // globalSetup: require.resolve('utils/jiraReport.ts'),

  fullyParallel: false,
  retries: 0,
  workers: 1,
  repeatEach: 1,
  //reporter: [['html', { open: 'always' }], ['line'], ["allure-playwright"]]
  reporter: [['html', { outputFolder: reportDir, open: 'always' }]],
  //reporter: [['html', { open: 'always' }], ['line']],
  use: {
    actionTimeout: 30000,
    trace: 'on',
    headless: false,
    screenshot: "on",
    browserName: 'chromium',
    video: 'on',
    ignoreHTTPSErrors: true,
    bypassCSP: true,

  },


  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium', ...devices['Desktop Chromium'], channel: 'chrome', headless: false,
        trace: 'on',
        screenshot: "on",
        video: 'on',
        viewport: null,
        launchOptions: {
          slowMo: 400,
          args: ["--start-maximized", "--disable-web-security",]

        }

      }
    },
    ...(
      false ? [{
        name: 'Verification',
        testDir: './zCronVerification',
        use: {

          headless: false,
          channel: 'chrome',
          viewport: null,
          launchOptions: {
            slowMo: 300,
            args: ["--start-maximized", "--disable-web-security"]
          }
        }
      },] : []
    ), ...(
      true ? [{
        name: 'API Testing',
        testDir: './api/apiTestIntegration',

        use: {

          headless: false,
          channel: 'chrome',
          ...devices['Desktop Chromium'],
          viewport: null,
          launchOptions: {
            slowMo: 300,
            args: ["--start-maximized", "--disable-web-security"]
          }

        }
      },] : []
    ),
  ],

  //commandLinetoRun
  //$env:TEST_STAGE="preCondition"; npx playwright test
  //$env:TEST_STAGE="currentTest"; npx playwright test
  //$env:TEST_STAGE="cronVerification"; npx playwright test


  testMatch: [
    ...(match === 'preCondition'
      ? [
        <!-- '*tests/admin/adminGroups_CustomerAdminGroupUserCreation/**/*.spec.ts',
        '*/tests/admin/adminGroups_Users_Creation/**/*.spec.ts',
        '*/tests/admin/customrolecreation/**/*.spec.ts',
        '*/tests/admin/metadataLibrary/**/*.spec.ts',
        '*/tests/admin/location/**/*.spec.ts',
        '*/tests/content/content/**/*.spec.ts',
        '*/tests/admin/completionCertificate/**/*.spec.ts',
        '*/tests/admin/assessment/**/*.spec.ts',
        '*/tests/admin/survey/**/*.spec.ts',
        '*/tests/admin/peoplemodule_user/**/*.spec.ts',
        '*/tests/admin/quickaccess/**/*.spec.ts',
        '*/tests/admin/communication/**/*.spec.ts',
        '*/tests/admin/learnerGroup/**/*.spec.ts',
        '*/tests/admin/announcement/**/*.spec.ts',
      ]
      : match === 'currentTest'
        ? [
          '*/tests/admin/course/**/*.spec.ts',
          '*/tests/admin/certification/**/*.spec.ts',
          '*/tests/admin/managerApproval/**/*.spec.ts',
          '*/tests/LearnerProfile/**/*.spec.ts',
          '*/tests/peoplemodule_user/**/*.spec.ts',
        ]
        : match === 'cronVerification'
          ? [
            '*/zCronVerification/certification/**/*.spec.ts',
            '*/zCronVerification/course/**/*.spec.ts',
          ]
          : []), // Default to an empty array if no match condition is provided -->
  ],


});
