import assert from "node:assert";

import { Given, Then, When } from "@cucumber/cucumber";

import CustomWorld from "../support/world";

Given("a user visits the home service", async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error("Page is not initialized. Make sure to call openBrowser() in a Before hook.");
  }

  if (!process.env.HOME_SERVICE_URL) {
    throw new Error("HOME_SERVICE_URL is not defined in environment variables");
  }

  await this.page?.goto(process.env.HOME_SERVICE_URL);
});

When("they visit the home service", async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error("Page is not initialized. Make sure to call openBrowser() in a Before hook.");
  }

  if (!process.env.HOME_SERVICE_URL) {
    throw new Error("HOME_SERVICE_URL is not defined in environment variables");
  }

  await this.page?.goto(process.env.HOME_SERVICE_URL);
});

Then("they should be returned to the home service", async function (this: CustomWorld) {
  if (!process.env.HOME_SERVICE_URL) {
    throw new Error("HOME_SERVICE_URL is not defined in environment variables");
  }

  await this.page?.waitForLoadState("networkidle");

  const currentUrl = this.page?.url();
  assert(
    currentUrl?.startsWith(process.env.HOME_SERVICE_URL),
    `Expected to be at home service URL ${process.env.HOME_SERVICE_URL}, but was at ${currentUrl}`
  );
});

Then("they should be logged in", async function (this: CustomWorld) {
  await this.page?.getByText(`You are logged in as ${this.user?.username}`).waitFor();
});
