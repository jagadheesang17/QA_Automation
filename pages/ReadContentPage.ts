import { CatalogPage } from "./CatalogPage";
import { expect, Locator, Page } from "@playwright/test";

export class ReadContentPage extends CatalogPage {
  public selectors = {
    ...this.selectors,
    contentframeEle: `//frame[@name='scormdriver_content']`,
    contentNextbutton: `//div[text()='NEXT']`,
    contentPage: `//li[contains(@class,'open visited')]`,
    contentFrame: `//iframe[contains(@class,'url-content-frame')]`,
    playForwardButton: `//div[@id='playbar']//*[@title='Forward']`,
    noResultFound: `//div[text()='No results found.']`,
    questionText: (question: string) => `//a//span[text()='${question}']`,
    completedVideo: "//span[text()='100%']",
    saveLearningStatus: "//button[text()='Save Learning Status']",
    //AICC Content
    contentList: `ul[id='slide_list'] li`,

    //PDF Content:-
    totalPDFPages: `//span[@id='numPages'] `,
    pdfNextPageIcon: `//button[@id='next']`,
  };

  async readContent() {
    await this.verifyAndClickEleinFrame(
      this.selectors.playForwardButton,
      this.selectors.playForwardButton,
      "ForwardButton"
    );
  }

  //Zoho pdf content
  async readPDFContent() {
    await this.wait("maxWait");
    await this.validateElementVisibility(
      this.selectors.totalPDFPages,
      "PDF No.of.pages"
    );
    let pageCount = await this.page
      .locator(this.selectors.totalPDFPages)
      .innerHTML();
    await this.page.mouse.wheel(0, -70);
    console.log(pageCount);
    //  let splittedVariable=pageCount.split("of ");
    // let conStringtoNo=Number(splittedVariable)
    const match = pageCount?.match(/\d+/);
    const number = Number(match[0]);
    console.log(number);
    for (let index = 0; index < number; index++) {
      await this.click(this.selectors.pdfNextPageIcon, "Next Icon", "Icon");
    }
  }

  async readTinCan() {
    // Wait for iframe to be present and load
    await this.page.waitForLoadState("load");
    await this.page
      .locator("iframe")
      .waitFor({ state: "visible", timeout: 30000 });

    let iframe = this.page.locator("iframe").contentFrame();

    // Wait for iframe content to load
    await this.page.waitForTimeout(5000);

    let startCourseBtn = iframe.getByLabel("START COURSE");
    let nextBtn = iframe.locator("button").filter({ hasText: "NEXT" });
    let startQuizBtn = iframe.getByLabel("START Quiz");
    let submitBtn = iframe.locator("button").filter({ hasText: /^SUBMIT$/ });
    let continueBtn = iframe.getByLabel("Continue");
    let dodgeBannerBtn = iframe.locator("div[class^='menu-icon-wrapper'] svg");

    // Wait for the START COURSE button to be visible before interacting
    await startCourseBtn.waitFor({ state: "visible", timeout: 60000 });

    // Use a more reliable approach - wait for element to be visible first
    await startCourseBtn.scrollIntoViewIfNeeded({ timeout: 30000 });
    await this.page.waitForTimeout(1000);
    await startCourseBtn.click({ force: true });
    await this.page.waitForTimeout(2000);

    // Wait for next button to be available before clicking
    await nextBtn.waitFor({ state: "visible", timeout: 15000 });
    await nextBtn.click();

    //await this.page.keyboard.press('PageUp');
    await this.page.waitForTimeout(2000);

    await startQuizBtn.scrollIntoViewIfNeeded({ timeout: 5000 });
    await startQuizBtn.click({ force: true });

    await this.page.waitForTimeout(1000);
    await iframe.getByLabel("B", { exact: true }).click({ force: true });
    await submitBtn.click();
    await continueBtn.click();
    await this.page.waitForTimeout(2000);

    for (let num = 1; num <= 3; num++) {
      const draggableElement = iframe.locator(
        `//div[@aria-label='${num}' and contains(@class, 'draggable')]`
      );
      const targetElement = iframe.locator(
        `//div[@aria-label='${num}' and not(contains(@class, 'draggable'))]`
      );
      await draggableElement.dragTo(targetElement);
      await this.page.waitForTimeout(1000);
    }
    let column1 = ["A", "B", "C"];
    let column2 = ["a", "b", "c"];

    for (let num = 0; num < column1.length; num++) {
      const draggableElement = iframe.locator(
        `//div[@aria-label='${column1[num]}' and contains(@class, 'draggable')]`
      );
      const targetElement = iframe.locator(
        `//div[@aria-label='${column2[num]}' and not(contains(@class, 'draggable'))]`
      );

      await draggableElement.dragTo(targetElement);
      await this.page.waitForTimeout(1000);
    }
    await submitBtn.click();
    await continueBtn.click();

    await iframe.getByLabel("Agree", { exact: true }).nth(2).click();
    await iframe.getByLabel("Agree", { exact: true }).nth(1).click();
    await iframe.getByLabel("Agree", { exact: true }).first().click();
    await submitBtn.click();
    await continueBtn.click();

    await iframe.getByLabel("True", { exact: true }).click();
    await submitBtn.click();
    await continueBtn.click();

    let donald = iframe.locator("svg").filter({ hasText: "Donald Trump" });
    let box = iframe.locator(
      "//div[contains(@class,'slide-object slide-object-droparea shown')]"
    );
    await donald.dragTo(box);
    await submitBtn.click();
    await continueBtn.click();

    await iframe.getByPlaceholder("type your answer here").click();
    await iframe.getByPlaceholder("type your answer here").fill("Red");
    await submitBtn.click();
    await continueBtn.click();

    // await this.page.waitForTimeout(2000);
    // await this.page.locator("//span[contains(text(),'Content')]").click();

    // await this.page.keyboard.press('PageUp');

    // await dodgeBannerBtn.hover({ force: true, position: { x: 0, y: 0 } });
    // await this.page.waitForTimeout(2000);
    // await dodgeBannerBtn.click({ force: true });
    // await this.page.waitForTimeout(2000);
    // await this.page.locator("//span[contains(text(),'Content')]").click();
    // await this.page.keyboard.press('PageDown');
    let banana = iframe.locator("svg").filter({ hasText: "Banana" });
    let Yellow = iframe.locator("svg").filter({ hasText: "Yellow" });
    let Apple = iframe.locator("svg").filter({ hasText: "Apple" });
    let Red = iframe.locator("svg").filter({ hasText: "Red" });
    let Grapes = iframe.locator("svg").filter({ hasText: "Grapes" });
    let Green = iframe.locator("svg").filter({ hasText: "Green" });

    await Apple.dragTo(Red);
    await banana.dragTo(Yellow);
    await Grapes.dragTo(Green);
    await submitBtn.click();
    await continueBtn.click();

    let This = iframe.locator("svg").filter({ hasText: "This" });
    let is = iframe.locator("svg").filter({ hasText: "is" }).nth(1);
    let a = iframe.locator("svg").filter({ hasText: "a" }).first();
    let cat = iframe.locator("svg").filter({ hasText: "ca." }).first();
    let First = iframe.locator("text=1.");
    let Second = iframe.locator("text=2.");
    let Third = iframe.locator("text=3.");
    let Fourth = iframe.locator("text=4.");
    // let First = iframe.locator('(//div[@class="sequence-ctrl-drop"])[1]')
    // let Second = iframe.locator('(//div[@class="sequence-ctrl-drop"])[2]')
    // let Third = iframe.locator('(//div[@class="sequence-ctrl-drop"])[3]')
    // let Fourth = iframe.locator('(//div[@class="sequence-ctrl-drop"])[4]')

    async function dragInIframe(
      page: Page,
      sourceLocator: Locator,
      targetLocator: Locator
    ) {
      await sourceLocator.waitFor({ state: "visible", timeout: 5000 });
      await targetLocator.waitFor({ state: "visible", timeout: 5000 });

      const sourceHandle = await sourceLocator.elementHandle();
      const targetHandle = await targetLocator.elementHandle();

      const sourceBox = await sourceHandle?.boundingBox();
      const targetBox = await targetHandle?.boundingBox();
      console.log(sourceBox, targetBox);

      if (!sourceBox || !targetBox) {
        throw new Error("Could not find bounding box for source or target");
      }

      await sourceLocator.scrollIntoViewIfNeeded();
      await targetLocator.scrollIntoViewIfNeeded();

      await page.mouse.move(
        sourceBox.x + sourceBox.width / 2,
        sourceBox.y + sourceBox.height / 2
      );
      await page.mouse.down();
      await page.waitForTimeout(1000); // help trigger drag start
      await page.mouse.move(
        targetBox.x + targetBox.width / 2,
        targetBox.y + 10,
        { steps: 25 }
      );
      await page.waitForTimeout(1000); // simulate realistic drop
      await page.mouse.up();
    }
    // Perform all drag and drops
    await dragInIframe(this.page, This, First);
    await dragInIframe(this.page, is, Second);
    await dragInIframe(this.page, a, Third);
    await dragInIframe(this.page, cat, Fourth);

    await submitBtn.click();
    await continueBtn.click();

    await iframe.locator("//input[@type='text']").click();
    await iframe.locator("//input[@type='text']").fill("4");

    await submitBtn.click();
    await continueBtn.click();

    await this.page.waitForTimeout(2000);
    await iframe.locator("div[aria-label^='Oval Hotspot']").click();
    await this.page.waitForTimeout(1000);
    await submitBtn.click();
    await continueBtn.click();
  }

  async saveLearningAICC() {
    await this.click(this.selectors.saveLearningStatus, "save", "button");
    const completed = this.page.locator(this.selectors.completedVideo);
    try {
      if (await completed.isVisible()) {
        console.log("Task Completed");
      }
    } catch (error) {
      await this.AICCFilecontainingaPPT_Storyline();
      await this.saveLearningAICC();
    }
  }
  async readPassed_FailedScrom2004() {
    await this.spinnerDisappear();
    await this.wait("maxWait");
    const iframe = this.page
      .locator(this.selectors.contentFrame)
      .contentFrame();

    (
      await (
        await this.page.waitForSelector(this.selectors.contentFrame)
      ).contentFrame()
    ).locator("#preso");

    let submitAndContinue = async () => {
      await iframe
        .getByRole("button", { name: "SUBMIT" })
        .hover({ force: true, timeout: 5000 });
      await iframe
        .getByRole("button", { name: "SUBMIT" })
        .click({ force: true });
      await iframe.getByLabel("Continue").click();
    };

    let answerQuestion = async (questionText: string, answerLabel: string) => {
      this.page
        .locator(this.selectors.contentLabel)
        .scrollIntoViewIfNeeded({ timeout: 5000 });
      const iframe = this.page
        .locator(this.selectors.contentFrame)
        .contentFrame();
      await iframe
        .locator(this.selectors.questionText(questionText))
        .hover({ force: true });
      await iframe
        .locator(this.selectors.questionText(questionText))
        .click({ force: true });
      await iframe.getByLabel(answerLabel, { exact: true }).nth(0).click();
      await this.page.waitForTimeout(1000);
      await submitAndContinue();
      await this.page.waitForTimeout(1000);
    };

    let main = async () => {
      await answerQuestion("Test Question 1", "True (Correct)");
      await answerQuestion("Test Question 2", "Correct");
      await answerQuestion("Test Question 3", "True (Correct)");
    };

    await main();
  }

  async Completed_Incomplete_SCORM12() {
    await this.spinnerDisappear();
    await this.wait("maxWait");
    const iframe = this.page
      .locator(this.selectors.contentFrame)
      .contentFrame();
    const nextButn = async () => {
      await this.page.waitForTimeout(1000);
      await iframe.getByRole("button", { name: "NEXT" }).hover({ force: true });
      await iframe.getByRole("button", { name: "NEXT" }).click();
      await this.page
        .locator(this.selectors.contentLabel)
        .scrollIntoViewIfNeeded({ timeout: 5000 });
      await this.page.waitForTimeout(1000);
    };
    await iframe.getByLabel("Slide 1, 2 of").click();
    await nextButn();
    await iframe.getByLabel("Slide 2, 3 of").click();
    await nextButn();
    await iframe.getByLabel("Slide 4, 4 of").click();
    await nextButn();
  }
  async AICCFilecontainingaPPT_Storyline() {
    await this.wait("maxWait");
    let content = this.page.locator(this.selectors.contentLabel);
    if (await content.isVisible({ timeout: 10000 })) {
      await content.scrollIntoViewIfNeeded();
    }
    await this.wait("mediumWait");
    // await this.verifyEleinFrame(this.selectors.contentFrame, this.selectors.contentframeEle, "Thank you Link");
    /*    const frame = this.page.frameLocator(this.selectors.contentFrame);
           const list = frame.locator(this.selectors.contentList); */
    const list = this.page
      .locator("iframe")
      .contentFrame()
      .locator('frame[name="scormdriver_content"]')
      .contentFrame()
      .locator(this.selectors.contentList);
    await list.nth(0).waitFor({ state: "visible" });
    const count = await list.count();
    console.log(`Count of list items: ${count}`);
    for (let index = 1; index <= count; index++) {
      await this.wait("minWait");
      await this.page
        .locator("iframe")
        .contentFrame()
        .locator('frame[name="scormdriver_content"]')
        .contentFrame()
        .locator(this.selectors.contentNextbutton)
        .click({ force: true, delay: 2000 });
    }
  }

  //This method will move the video playback nearly to the end.
  async skipToVideoEnd() {
    const videoPlayer = this.page.locator("#vjs_video_3_html5_api");
    await expect(videoPlayer).toBeVisible({ timeout: 30000 });
    await videoPlayer.evaluate((video) => (video as HTMLVideoElement).play());
    await this.page
      .locator("//span[contains(text(),'Content(s):')]")
      .scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(5000);
    await videoPlayer.evaluate((video) => {
      const videoElement = video as HTMLVideoElement;
      videoElement.currentTime = videoElement.duration - 1;
    });
    await videoPlayer.evaluate((video) => {
      return new Promise<void>((resolve) => {
        const videoElement = video as HTMLVideoElement;
        videoElement.onended = () => resolve();
      });
    });
    const isEnded = await videoPlayer.evaluate(
      (video) => (video as HTMLVideoElement).ended
    );
    expect(isEnded).toBe(true);
    await this.wait("minWait");
  }
}
