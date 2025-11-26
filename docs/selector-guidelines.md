# Selector / Locator Guidelines

Purpose
-------
This short guideline documents the project's mandatory convention for selectors and locators. Follow it on all new edits and when refactoring existing code.

Rule (required)
----------------
- All selectors (XPath, CSS, ID, etc.) MUST be stored at the page-object level in the `selectors` map (or equivalent constant) inside each Page class (for example, `pages/MetaLibraryPage.ts`).
- Functions and methods inside page objects must reference those selectors via `this.selectors.<name>` or a well-named getter. Do NOT hard-code XPath/CSS strings inside functions.
- Tests should call page-object methods and should not include raw locators. If a test must read a locator, prefer exposing a named getter on the page object.

Rationale
---------
- Single source of truth for locators improves maintainability.
- Makes bulk updates to selectors (due to UI changes) straightforward.
- Improves readability of page methods and tests.

Example — correct
------------------
// pages/ExamplePage.ts
public selectors = {
  submitButton: `//button[@id='submit']`,
}

public async clickSubmit() {
  await this.click(this.selectors.submitButton, 'Submit', 'Button');
}

Example — incorrect
--------------------
public async clickSubmit() {
  // ❌ Avoid this: raw XPath inside function
  await this.click("//button[@id='submit']", 'Submit', 'Button');
}

How to migrate existing code
----------------------------
- Move any raw locators inside functions into the page `selectors` map and update function calls to reference `this.selectors`.
- Keep changes minimal per file and run tests after migrating to catch regressions.

Enforcement
-----------
- Follow this rule for all future edits. When submitting patches, prefer small commits that relocate locators to selectors first, then update function bodies.

Contact
-------
If a selector must be computed dynamically, add a small named helper in the page object that returns the locator string. Discuss exceptions in code review.

— QA Automation Team Guideline (added automatically)
