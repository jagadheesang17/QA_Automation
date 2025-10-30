import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from "../../../utils/fakerUtils";

const departmentName: any = FakerData.getCategory();
test(`1111_verify that a department can be added under Metadata Library - People - Department`, async ({ adminHome, metadatalibrary }) => {
    test.info().annotations.push(
        { type: 'Author', description: 'Manikandan' },
        { type: 'TestCase', description: 'verify that a department can be added under Metadata Library - People - Department' },
        { type: 'Test Description', description: "Creating a department in the Metadata Library within the People Category" }
    );
    await adminHome.loadAndLogin("CUSTOMERADMIN1")
    await adminHome.isSignOut();
    await adminHome.menuButton();
    await adminHome.metadataLibrary();
    await adminHome.meta_People();
    await metadatalibrary.addDepartment()
    await metadatalibrary.name(departmentName);
    await metadatalibrary.description(FakerData.getDescription());
    await metadatalibrary.saveButton();
    await metadatalibrary.department_SearchField(departmentName);
    await metadatalibrary.verify_Department(departmentName);
    //Edit the department
    await metadatalibrary.editPeople(departmentName); 
    let edited_department = departmentName + "_Edited"; 
    await metadatalibrary.name(edited_department); 
    await metadatalibrary.description(FakerData.getDescription());
    await metadatalibrary.saveButton();    
    await metadatalibrary.department_SearchField(edited_department);
    await metadatalibrary.verify_Department(edited_department);
    //Delete Department
    await metadatalibrary.deletefiltereditem();
    await metadatalibrary.verifyDeleteItem("department")

})

const EmploymentType: any = FakerData.getCategory();
test(`2222_verify that a employment type can be added under Metadata Library - People - Employment Type`, async ({ adminHome, metadatalibrary }) => {
    test.info().annotations.push(
        { type: 'Author', description: 'Manikandan' },
        { type: 'TestCase', description: 'verify that a employment type can be added under Metadata Library - People - Employment Type' },
        { type: 'Test Description', description: "Creating a employment type  in the Metadata Library within the People Category" }
    );
    await adminHome.loadAndLogin("CUSTOMERADMIN1")
    await adminHome.isSignOut();
    await adminHome.menuButton();
    await adminHome.metadataLibrary();
    await adminHome.meta_People();
    await metadatalibrary.employmentTypeExpandButton();
    await metadatalibrary.addEmploymentTypeButton();
    await metadatalibrary.name(EmploymentType);
    await metadatalibrary.description(FakerData.getDescription());
    await metadatalibrary.saveButton();
    await metadatalibrary.addEmploymentType_SearchButton(EmploymentType);
    await metadatalibrary.verify_addEmploymentType(EmploymentType);
    //Edit Employment_type
    await metadatalibrary.editPeople(EmploymentType); 
    let edited_employmentType = EmploymentType + "_Edited"; 
    await metadatalibrary.name(edited_employmentType); 
    await metadatalibrary.description(FakerData.getDescription());
    await metadatalibrary.saveButton();    
    await metadatalibrary.addEmploymentType_SearchButton(edited_employmentType);
    await metadatalibrary.verify_addEmploymentType(edited_employmentType);
    //Delete EmploymentType
    await metadatalibrary.deletefiltereditem();
    await metadatalibrary.verifyDeleteItem("employment")


})

const usertypeName: any = FakerData.getCategory();
test(`3333_verify that a user_type can be added under Metadata Library - People - User Type`, async ({ adminHome, metadatalibrary }) => {
    test.info().annotations.push(
        { type: 'Author', description: 'Manikandan' },
        { type: 'TestCase', description: 'verify that a user type can be added under Metadata Library - People - User Type' },
        { type: 'Test Description', description: "Creating a UserType in the Metadata Library within the People Category" }
    );
    await adminHome.loadAndLogin("SUPERADMIN")
    await adminHome.isSignOut();
    await adminHome.menuButton();
    await adminHome.metadataLibrary();
    await adminHome.meta_People();
    await metadatalibrary.userTypesExpandButton();    
    await metadatalibrary.addUserTypeButton();
    await metadatalibrary.name(usertypeName);
    await metadatalibrary.description(usertypeName);
    await metadatalibrary.saveButton();
    await metadatalibrary.userType_SearchButton(usertypeName);
    await metadatalibrary.verify_UserType(usertypeName);
    //Edit the user type
    await metadatalibrary.editPeople(usertypeName); 
    let edited_userType = usertypeName + "_Edited"; 
    await metadatalibrary.name(edited_userType); 
    await metadatalibrary.description(FakerData.getDescription());
    await metadatalibrary.saveButton();
    await metadatalibrary.userType_SearchButton(edited_userType);
    await metadatalibrary.verify_UserType(edited_userType);
    //Delete usertypeName
    await metadatalibrary.deletefiltereditem();
    await metadatalibrary.verifyDeleteItem("usertypes")

 });

const jobRole: any = FakerData.getCategory();
test(`4444_verify that a job role can be added under Metadata Library - People - Job Role`, async ({ adminHome, metadatalibrary }) => {
    test.info().annotations.push(
        { type: 'Author', description: 'Manikandan' },
        { type: 'TestCase', description: 'verify that a job role can be added under Metadata Library - People - Job Role' },
        { type: 'Test Description', description: "Creating a Job Role in the Metadata Library within the People Category" }
    );

    await adminHome.loadAndLogin("SUPERADMIN")
    await adminHome.isSignOut();
    await adminHome.menuButton();
    await adminHome.metadataLibrary();
    await adminHome.meta_People();
    await metadatalibrary.jobRolesExpandButton();
    await metadatalibrary.addJobRole();
    await metadatalibrary.name(jobRole);
    await metadatalibrary.description(FakerData.getDescription());
    await metadatalibrary.saveButton();
    await metadatalibrary.addJobRole_SearchField(jobRole);
    await metadatalibrary.verify_JobRole(jobRole);
    //Edit jobRole
    await metadatalibrary.editPeople(jobRole);
    let edited_jobRole = jobRole + "_Edited"; 
    await metadatalibrary.name(edited_jobRole); 
    await metadatalibrary.description(FakerData.getDescription());
    await metadatalibrary.saveButton();    
    await metadatalibrary.addJobRole_SearchField(edited_jobRole);
    await metadatalibrary.verify_JobRole(edited_jobRole);
    //delete jobrole
    await metadatalibrary.deletefiltereditem();
   await metadatalibrary.verifyDeleteItem("jobroles")
 });


const jobTitle: any = FakerData.jobRole();

test(`5555_verify that a job title can be added under Metadata Library - People - Job Title`, async ({ adminHome, metadatalibrary }) => {
    test.info().annotations.push(
        { type: 'Author', description: 'Manikandan' },
        { type: 'TestCase', description: 'verify that a job title can be added under Metadata Library - People - Job Title' },
        { type: 'Test Description', description: "Creating a Job title in the Metadata Library within the People Category" }
    );
    await adminHome.loadAndLogin("SUPERADMIN")
    await adminHome.menuButton();
    await adminHome.metadataLibrary();
    await adminHome.meta_People();
    await metadatalibrary.jobTitleExpandButton();
    await metadatalibrary.addJobTitle_Button();
    await metadatalibrary.name(jobTitle);
    await metadatalibrary.description(FakerData.getDescription());
    await metadatalibrary.saveButton();
    await metadatalibrary.jobtitle_SearchField(jobTitle);
    await metadatalibrary.verify_JobTitile(jobTitle);
    //Edit jobTitle
    await metadatalibrary.editPeople(jobTitle); 
    let edited_jobtitle = jobTitle + "_Edited"; 
    await metadatalibrary.name(edited_jobtitle); 
    await metadatalibrary.description(FakerData.getDescription());
    await metadatalibrary.saveButton();    
    await metadatalibrary.jobtitle_SearchField(edited_jobtitle);
    await metadatalibrary.verify_JobTitile(edited_jobtitle);
    //delete jobtitle
    await metadatalibrary.deletefiltereditem();
    await metadatalibrary.verifyDeleteItem("jobtitle")
});



