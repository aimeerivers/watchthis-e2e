import { Given, Then, When } from "@cucumber/cucumber";

import { PageObjectManager } from "../support/pages/page-manager.js";
import CustomWorld from "../support/world";

Given("a user is authenticated", async function (this: CustomWorld) {
  // Use admin user for API testing
  const adminUser = PageObjectManager.getAdminUser();

  // Login via API to get JWT token
  const userServiceUrl = process.env.USER_SERVICE_URL || "http://localhost:8583";
  const loginResponse = await fetch(`${userServiceUrl}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: adminUser.username,
      password: adminUser.password,
    }),
  });

  if (!loginResponse.ok) {
    throw new Error(`Login failed: ${loginResponse.status} ${loginResponse.statusText}`);
  }

  const loginData = (await loginResponse.json()) as {
    success: boolean;
    data?: {
      accessToken: string;
      user: { _id: string; username: string };
    };
  };

  if (!loginData.success || !loginData.data?.accessToken) {
    throw new Error(`Login failed: ${JSON.stringify(loginData)}`);
  }

  // Store user info and token for use in other steps
  this.user = adminUser;
  this.accessToken = loginData.data.accessToken;
  this.userId = loginData.data.user._id;
});

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
