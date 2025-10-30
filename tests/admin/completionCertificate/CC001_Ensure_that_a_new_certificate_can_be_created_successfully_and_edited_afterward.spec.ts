import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';


const title = FakerData.getcertificationTitle();
test(`Ensure that a new certificate can be created successfully and edited afterward`, async ({ adminHome, CompletionCertification }) => {

    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `Ensure that a new certificate can be created successfully and edited afterward` },
        { type: `Test Description`, description: `Ensure that a new certificate can be created successfully and edited afterward` }
    );
    await adminHome.loadAndLogin("CUSTOMERADMIN")
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickCompletionCertification();
    await CompletionCertification.clickCreateCompletionCertificate();
    await CompletionCertification.verify_CompletionCertificateLabel();
    await CompletionCertification.clickTemplateType();
    await CompletionCertification.title(title);
    await CompletionCertification.designCertificate(FakerData.getDescription());
    await CompletionCertification.clickPublish();
    await CompletionCertification.clickProceed();
    await CompletionCertification.clickEditCertificate();
    await CompletionCertification.title(title+" "+"test");
    await CompletionCertification.designCertificate(FakerData.getDescription());
    await CompletionCertification.clickUpdate();
    await CompletionCertification.verifyCeritificateSuccessMessage();
})