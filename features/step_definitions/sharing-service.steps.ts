import { When } from "@cucumber/cucumber";

import CustomWorld from "../support/world";

When("an unauthenticated user tries to access the sharing service", async function (this: CustomWorld) {
  const sharingServiceUrl = process.env.SHARING_SERVICE_URL || "http://localhost:8372";

  this.lastResponse = await fetch(`${sharingServiceUrl}/api/v1/shares/stats`, {
    method: "GET",
  });

  if (this.lastResponse.ok) {
    this.lastResponseData = await this.lastResponse.json();
  } else {
    this.lastResponseData = await this.lastResponse.json();
  }
});
