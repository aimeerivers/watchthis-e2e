import assert from "node:assert";

import { Given, Then, When } from "@cucumber/cucumber";

import CustomWorld from "../support/world";

// Constants
const MEDIA_SERVICE_URL = process.env.MEDIA_SERVICE_URL || "http://localhost:7769";
const TEST_YOUTUBE_URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
const INVALID_URL = "not-a-valid-url";

Given("a user has created a media item", createAndStoreMediaItem);
Given("a media item already exists with a specific URL", createAndStoreMediaItem);

When("they try to add the same URL again", addMediaItemWithYouTubeUrl);
When("they add a media item with a YouTube URL", addMediaItemWithYouTubeUrl);

When("they try to add a media item with an invalid URL", async function (this: CustomWorld) {
  const response = await createMediaItem.call(this, INVALID_URL);
  await handleResponse.call(this, response);
});

When("an unauthenticated user tries to access the media service", async function (this: CustomWorld) {
  const response = await fetch(`${MEDIA_SERVICE_URL}/api/v1/media`, {
    method: "GET",
  });

  await handleResponse.call(this, response);
});

Then("the media item should be created successfully", assertSuccessfulMediaCreation);

Then("it should detect YouTube as the platform", async function (this: CustomWorld) {
  assert.strictEqual(this.lastResponseData?.platform, "youtube", "Platform should be detected as 'youtube'");
});

Then("it should have pending extraction status", async function (this: CustomWorld) {
  assert.strictEqual(this.lastResponseData?.extractionStatus, "pending", "Extraction status should be 'pending'");
});

Then("they should receive a validation error", assertValidationError);

Then("the existing media item should be returned", async function (this: CustomWorld) {
  assert.strictEqual(this.lastResponse?.status, 200, "Expected status 200 for successful response");
  assert.ok(this.lastResponseData, "Response should have data");
  assert.strictEqual(this.lastResponseData.id, this.mediaItem.id, "Should return the existing media item");
  assert.strictEqual(this.lastResponseData.url, this.mediaItem.url, "URLs should match");
});

Then("no media item should be created", function (this: CustomWorld) {
  // If we got a 400 error, no media item was created
  assert.strictEqual(this.lastResponse?.status, 400, "Expected validation to fail");
});

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

// Helper function to create a media item
async function createMediaItem(this: CustomWorld, url: string = TEST_YOUTUBE_URL): Promise<Response> {
  return makeAuthenticatedRequest.call(this, `${MEDIA_SERVICE_URL}/api/v1/media`, {
    method: "POST",
    body: JSON.stringify({ url }),
  });
}

// Helper function to handle response data
async function handleResponse(this: CustomWorld, response: Response): Promise<void> {
  this.lastResponse = response;
  if (response.ok) {
    this.lastResponseData = await response.json();
  } else if (response.headers.get("content-type")?.includes("application/json")) {
    this.lastResponseData = await response.json();
  }
}

// Helper function for common success assertions
function assertSuccessfulMediaCreation(this: CustomWorld): void {
  assert.ok(
    [200, 201].includes(this.lastResponse?.status || 0),
    `Expected status 200 or 201 for successful creation, got ${this.lastResponse?.status}`
  );
  assert.ok(this.lastResponseData, "Response should have data");
  assert.ok(this.lastResponseData.id, "Media item should have an ID");
  assert.ok(this.lastResponseData.url, "Media item should have a URL");
}

// Helper function for validation error assertions
function assertValidationError(this: CustomWorld): void {
  assert.strictEqual(this.lastResponse?.status, 400, "Expected status 400 for validation error");
  assert.ok(this.lastResponseData?.error, "Response should contain error details");
}

// Helper function for creating and storing a media item
async function createAndStoreMediaItem(this: CustomWorld): Promise<void> {
  const response = await createMediaItem.call(this);

  if (!response.ok) {
    throw new Error(`Failed to create media item: ${response.status} ${response.statusText}`);
  }

  const mediaData = await response.json();
  this.mediaItem = mediaData; // Store for later use
}

// Helper function for adding a media item (with default YouTube URL)
async function addMediaItemWithYouTubeUrl(this: CustomWorld): Promise<void> {
  const response = await createMediaItem.call(this);
  await handleResponse.call(this, response);
}
