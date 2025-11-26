import { test } from '../../../customFixtures/expertusFixture';
import { FakerData } from '../../../utils/fakerUtils';

test('ML001-SC: Verify Tag title allows special characters', async ({ adminHome, metadatalibrary }) => {
  test.info().annotations.push(
    { type: 'Author', description: 'Manikandan' },
    { type: 'TestCase', description: 'ML001-SC - Tag allows special characters' },
    { type: 'Test Description', description: "Create a tag containing special characters '@&*' and verify it is created and listed" }
  );

  // prepare a tag name with the required special characters plus a small unique suffix
  const specialTag = `@&*${FakerData.getCategory().slice(0, 6)}`;

  await adminHome.loadAndLogin('CUSTOMERADMIN1');
  await adminHome.isSignOut();
  await adminHome.menuButton();
  await adminHome.metadataLibrary();
  await adminHome.meta_learning();

  // Navigate to Tags and create
  await metadatalibrary.tagsExpandButton();
  await metadatalibrary.addTags();
  await metadatalibrary.name(specialTag);
  await metadatalibrary.saveButton();

  // Search and verify the tag exists
  await metadatalibrary.tagsSearchField(specialTag);
  await metadatalibrary.verify_Tags(specialTag);

});
