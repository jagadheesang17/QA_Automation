import {Page, BrowserContext, expect } from '@playwright/test';
import { AdminHomePage } from './AdminHomePage';
import { getCurrentDateFormatted, getFutureDate } from '../utils/fakerUtils';


export class LearningAssignmentPage extends AdminHomePage{
    public selectors = {
        ...this.selectors,

        
        createAssignmentButton: "//button[text()='CREATE LEARNING ASSIGNMENT']",
        assignmentTitle: "//input[@id='title']",
        assignmentDescription: "//div[@id='lnrassignment-description']//p",
        assignmentstartDate: "//input[@id='lnrassignment-start-date-input']",
        assignmentDueDate: "//input[@id='lnrassignment-end-date-input']",
        criteriadaysafter: "//input[@id='days']",        
        criteriaapply: "//button[text()='Apply']",
        addassignmentbtn: "//button[text()='add as assignment']",
        assigncheckbox:"//span[contains(text(), 'Assign learning to users')]",
        leapublishbtn:"//button[@id='assessment-btn-publish']",
        assignmentsearch: "//input[@id='lnrassign-exp-search-field']",
        searchValue:(data:string) => `(//div[text()='${data}']//following::i[contains(@class,'fa-square icon')])[1]`
        


    };
    constructor(page: Page, context: BrowserContext) {
        super(page, context)
    }
    public async createAssignmentBtn() {
        await this.wait('minWait');
        await this.click(this.selectors.createAssignmentButton, "Create Assignment Button", "Button");
        //await this.wait('mediumWait');
    }
    public async leaTitle(data: string) {
        await this.wait('mediumWait');
        await this.type(this.selectors.assignmentTitle, "Assignment Title", data);
        //await this.wait('mediumWait');
    }

    public async leaDesc(data: string) {
        await this.wait('mediumWait');
        await this.type(this.selectors.assignmentDescription, "Assignment Description", data);
        //await this.wait('mediumWait');
    
    }

    public async leaStartDate() {
        await this.wait('mediumWait');
        await this.type(this.selectors.assignmentstartDate, "Assignment Start Date", getCurrentDateFormatted());
        //await this.wait('mediumWait');
    }
    public async leaEndDate() {
        await this.wait('mediumWait');
        await this.type(this.selectors.assignmentDueDate, "Assignment Due Date", getFutureDate());
        //await this.wait('mediumWait');
    }
    public async criDaysAfter() {
        await this.wait('mediumWait');
        await this.type(this.selectors.criteriadaysafter, "Criteria Days After", '2');
        //await this.wait('mediumWait');
    
    }
    public async applyBtn() {
        await this.wait('mediumWait');
        await this.click(this.selectors.criteriaapply, "Criteria Apply Button", "Button");
        await this.wait('mediumWait');
    }
    // public async leaSearch(data: string) {
    //     await this.wait('mediumWait');
    //     await this.type(this.selectors.assignmentsearch, "Assignment Search", data);
    //     //await this.wait('mediumWait');
    // }


    public async leaSearch(clsTitle: string) {
        await this.typeAndEnter(this.selectors.assignmentsearch, "searchfield", clsTitle)
        await this.wait ("minWait")
        await this.click(this.selectors.searchValue(clsTitle),"assignmentsearch", "CheckBox")
    }

    // public async leaSearch1(TPTitle: string) {
    //     await this.typeAndEnter(this.selectors.assignmentsearch, "searchfield", TPTitle)
    //     await this.wait ("minWait")
    //     await this.click(this.selectors.searchValue(TPTitle),"assignmentsearch", "CheckBox")
    // }
    async addAssignmentBtn() {
        await this.wait('mediumWait');
        await this.click(this.selectors.addassignmentbtn, "Add Assignment Button", "Button");
        //await this.wait('mediumWait');
    }
    public async applyCheckbox() {
        await this.wait('mediumWait');
        await this.click(this.selectors.assigncheckbox, "Assign Checkbox", "Button");
        //await this.wait('mediumWait');
    }
    public async leapublish() {
        await this.wait('mediumWait');
        await this.click(this.selectors.leapublishbtn, "Leapublish Button", "Button");
        //await this.wait('mediumWait');
    }
}