import { Given } from "@cucumber/cucumber";

import CustomWorld from "../support/world";

Given("they click the {string} button", async function (this: CustomWorld, buttonName: string) {
  if (!this.pageManager) {
    throw new Error("PageManager is not initialized. Be sure to call openBrowser in a Before hook.");
  }

  // Use the generic button click from BasePage (available through any page object)
  await this.pageManager.homeService.clickButton(buttonName);
});
