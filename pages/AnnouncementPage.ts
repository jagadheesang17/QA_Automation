import { getCurrentDateFormatted, getnextMonthFormatted } from "../utils/fakerUtils";
import { AdminHomePage } from "./AdminHomePage";

export class AnnouncementPage extends AdminHomePage {

    public selectors = {
        ...this.selectors,
        announcemnt_desc:`//div[@id='announcement-description']//p`,
        priority:`//label[text()='Priority']/following::button[@data-id='announcement-priority']`,
        priorityOption:(index:number)=>`(//a[@class='dropdown-item']//span)[${index}]`,
        dateFromInput:`//div[@id='announcement-from-date']/input`,      
        dateToInput:`//div[@id='announcement-to-date']/input`,
        publishButton: `//button[@id='announcement-btn-publish']`,
    };


    public async enterDesc(data:string){
        await this.type(this.selectors.announcemnt_desc,"Description", data)
    }

    public async clickPriority(){
        await this.click(this.selectors.priority,"Priority","dropdown")
        const index=await this.page.locator("//a[@class='dropdown-item']//span").count();
        const randomIndex = Math.floor(Math.random() * (index)) + 1;
        await this.click(this.selectors.priorityOption(index), "Priority", "option");
    }

    public async dateFromTo(){
         await this.keyboardType(this.selectors.dateFromInput,getCurrentDateFormatted())
         await this .wait("minWait")
         await this.keyboardType(this.selectors.dateToInput,getCurrentDateFormatted())
    }
    public async clickPublish() {       
       
        await this.validateElementVisibility(this.selectors.publishButton, "Publish");
        await this.page.locator(this.selectors.publishButton).scrollIntoViewIfNeeded();
        await this.click(this.selectors.publishButton, "Publish", "Button")
        }

}