import { Given } from "@cucumber/cucumber";

import CustomWorld from "../support/world";

Given("they click the {string} button", async function (this: CustomWorld, buttonName: string) {
  await this.page?.getByRole("button", { name: buttonName }).click();
});
