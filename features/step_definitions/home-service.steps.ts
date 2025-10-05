import { Given, Then, When } from "@cucumber/cucumber";

import CustomWorld from "../support/world";

Given("a user visits the home service", async function (this: CustomWorld) {
  if (!this.pageManager) {
    throw new Error("PageManager is not initialized. Be sure to call openBrowser in a Before hook.");
  }

  await this.pageManager.homeService.visitHomeService();
});

When("they visit the home service", async function (this: CustomWorld) {
  await this.pageManager!.homeService.visitHomeService();
});

Then("they should be returned to the home service", async function (this: CustomWorld) {
  await this.pageManager!.homeService.waitForLoadState();
  await this.pageManager!.homeService.assertOnHomeService();
});

Then("they should be logged in", async function (this: CustomWorld) {
  if (!this.user) {
    throw new Error("User is not initialized");
  }

  await this.pageManager!.homeService.assertUserLoggedIn(this.user.username);
});
