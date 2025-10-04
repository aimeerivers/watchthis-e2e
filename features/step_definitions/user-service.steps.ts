import assert from "node:assert";

import { Given, Then, When } from "@cucumber/cucumber";
import { faker } from "@faker-js/faker";

import CustomWorld from "../support/world";

Given("a user visits the user service", async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error("Page is not initialized. Make sure to call openBrowser() in a Before hook.");
  }

  if (!process.env.USER_SERVICE_URL) {
    throw new Error("USER_SERVICE_URL is not defined in environment variables");
  }

  await this.page?.goto(process.env.USER_SERVICE_URL);
});

When("they visit the user service", async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error("Page is not initialized. Make sure to call openBrowser() in a Before hook.");
  }

  if (!process.env.USER_SERVICE_URL) {
    throw new Error("USER_SERVICE_URL is not defined in environment variables");
  }

  await this.page?.goto(process.env.USER_SERVICE_URL);
});

When("they enter valid sign up details", async function (this: CustomWorld) {
  this.user = newUser();

  await this.page?.getByRole("textbox", { name: "Username:" }).fill(this.user.username);
  await this.page?.getByRole("textbox", { name: "Password:" }).fill(this.user.password);
  await this.page?.getByRole("button", { name: "Submit" }).click();
});

Then("they should stay on the user service", async function (this: CustomWorld) {
  if (!process.env.USER_SERVICE_URL) {
    throw new Error("USER_SERVICE_URL is not defined in environment variables");
  }

  const currentUrl = this.page?.url();
  assert(
    currentUrl?.startsWith(process.env.USER_SERVICE_URL),
    `Expected to be at home service URL ${process.env.USER_SERVICE_URL}, but was at ${currentUrl}`
  );
});

Then("they should see a welcome message", async function (this: CustomWorld) {
  await this.page?.getByText(`Welcome, ${this.user?.username}!`).waitFor();
});

function newUser() {
  return {
    username: faker.internet.username().replaceAll(/[.-]/g, "_"),
    password: faker.internet.password({ length: 8, memorable: true, pattern: /[A-Za-z0-9]/ }) + "1aA",
  };
}
