import assert from "node:assert";

import { Then } from "@cucumber/cucumber";

import CustomWorld from "../support/world";

Then("they should receive a 401 Unauthorized response", async function (this: CustomWorld) {
  assert.strictEqual(this.lastResponse?.status, 401, "Expected status 401 for unauthorized response");
  assert.ok(this.lastResponseData?.error, "Response should contain error details");
});
