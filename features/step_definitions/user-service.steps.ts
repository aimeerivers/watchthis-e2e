import { Given, Then, When } from "@cucumber/cucumber";

import { PageObjectManager } from "../support/pages/page-manager.js";
import CustomWorld from "../support/world";

Given("a user is logged in", async function (this: CustomWorld) {
  if (!this.pageManager) {
    throw new Error("PageManager is not initialized. Be sure to call openBrowser in a Before hook.");
  }

  this.user = await this.pageManager.setupLoggedInUser();
});

Given("a user visits the user service", async function (this: CustomWorld) {
  if (!this.pageManager) {
    throw new Error("PageManager is not initialized. Be sure to call openBrowser in a Before hook.");
  }

  await this.pageManager.userService.visitUserService();
});

When("they visit the user service", async function (this: CustomWorld) {
  await this.pageManager!.userService.visitUserService();
});

When("they enter valid log in details", async function (this: CustomWorld) {
  this.user = PageObjectManager.getAdminUser();

  await this.pageManager!.userService.auth.submitCredentials(this.user.username, this.user.password);
});

When("they enter valid sign up details", async function (this: CustomWorld) {
  this.user = PageObjectManager.generateUser();

  await this.pageManager!.userService.auth.submitCredentials(this.user.username, this.user.password);
});

Then("they should stay on the user service", async function (this: CustomWorld) {
  await this.pageManager!.userService.assertOnUserService();
});

Then("they should see a welcome message", async function (this: CustomWorld) {
  if (!this.user) {
    throw new Error("User is not initialized");
  }

  await this.pageManager!.userService.auth.waitForWelcomeMessage(this.user.username);
});

Then("they should not be logged in", async function (this: CustomWorld) {
  await this.pageManager!.userService.auth.waitForLoginButton();
});
