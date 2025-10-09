import assert from "node:assert";

import { Given, Then, When } from "@cucumber/cucumber";

import CustomWorld from "../support/world";

// Helper function to make authenticated API calls
async function makeAuthenticatedRequest(this: CustomWorld, url: string, options: RequestInit = {}): Promise<Response> {
  if (!this.accessToken) {
    throw new Error("User must be authenticated first. Use 'Given a user is authenticated' step.");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${this.accessToken}`,
    ...options.headers,
  };

  return fetch(url, {
    ...options,
    headers,
  });
}

Given("a user has created a media item", async function (this: CustomWorld) {
  const mediaServiceUrl = process.env.MEDIA_SERVICE_URL || "http://localhost:7769";
  const testUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  const response = await makeAuthenticatedRequest.call(this, `${mediaServiceUrl}/api/v1/media`, {
    method: "POST",
    body: JSON.stringify({ url: testUrl }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create media item: ${response.status} ${response.statusText}`);
  }

  const mediaData = await response.json();
  this.mediaItem = mediaData; // Store for later use
});

When("they add a media item with a YouTube URL", async function (this: CustomWorld) {
  const mediaServiceUrl = process.env.MEDIA_SERVICE_URL || "http://localhost:7769";
  const testUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  this.lastResponse = await makeAuthenticatedRequest.call(this, `${mediaServiceUrl}/api/v1/media`, {
    method: "POST",
    body: JSON.stringify({ url: testUrl }),
  });

  if (this.lastResponse.ok) {
    this.lastResponseData = await this.lastResponse.json();
  }
});

When("they try to add a media item with an invalid URL", async function (this: CustomWorld) {
  const mediaServiceUrl = process.env.MEDIA_SERVICE_URL || "http://localhost:7769";
  const invalidUrl = "not-a-valid-url";

  this.lastResponse = await makeAuthenticatedRequest.call(this, `${mediaServiceUrl}/api/v1/media`, {
    method: "POST",
    body: JSON.stringify({ url: invalidUrl }),
  });

  if (this.lastResponse.ok) {
    this.lastResponseData = await this.lastResponse.json();
  } else {
    // Store error response for assertions
    this.lastResponseData = await this.lastResponse.json();
  }
});

Then("the media item should be created successfully", async function (this: CustomWorld) {
  assert.strictEqual(this.lastResponse?.status, 201, "Expected status 201 for successful creation");
  assert.ok(this.lastResponseData, "Response should have data");
  assert.ok(this.lastResponseData.id, "Media item should have an ID");
  assert.ok(this.lastResponseData.url, "Media item should have a URL");
});

Then("it should detect YouTube as the platform", async function (this: CustomWorld) {
  assert.strictEqual(this.lastResponseData?.platform, "youtube", "Platform should be detected as 'youtube'");
});

Then("it should have pending extraction status", async function (this: CustomWorld) {
  assert.strictEqual(this.lastResponseData?.extractionStatus, "pending", "Extraction status should be 'pending'");
});

Then("they should receive a validation error", async function (this: CustomWorld) {
  assert.strictEqual(this.lastResponse?.status, 400, "Expected status 400 for validation error");
  assert.ok(this.lastResponseData?.error, "Response should contain error details");
});

Then("no media item should be created", async function (this: CustomWorld) {
  // If we got a 400 error, no media item was created
  assert.strictEqual(this.lastResponse?.status, 400, "Expected validation to fail");
});
