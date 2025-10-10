import assert from "node:assert";

import { Then } from "@cucumber/cucumber";

import CustomWorld from "../support/world";

// HTTP status codes with descriptions
const HTTP_STATUS_CODES = {
  200: "OK",
  201: "Created",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
  422: "Unprocessable Entity",
  500: "Internal Server Error",
} as const;

// Success responses (2xx)
Then("they should receive a 200 OK response", function (this: CustomWorld) {
  assertHttpStatus.call(this, 200);
});

Then("they should receive a 201 Created response", function (this: CustomWorld) {
  assertHttpStatus.call(this, 201);
});

Then("they should receive a successful response", function (this: CustomWorld) {
  const status = this.lastResponse?.status || 0;
  assert.ok(status >= 200 && status < 300, `Expected successful response (2xx), but received ${status}`);
});

// Client error responses (4xx)
Then("they should receive a 400 Bad Request response", function (this: CustomWorld) {
  assertHttpStatus.call(this, 400);
  assertResponseHasError.call(this);
});

Then("they should receive a 401 Unauthorized response", function (this: CustomWorld) {
  assertHttpStatus.call(this, 401);
  assertResponseHasError.call(this);
});

Then("they should receive a 403 Forbidden response", function (this: CustomWorld) {
  assertHttpStatus.call(this, 403);
  assertResponseHasError.call(this);
});

Then("they should receive a 404 Not Found response", function (this: CustomWorld) {
  assertHttpStatus.call(this, 404);
  assertResponseHasError.call(this);
});

Then("they should receive a 409 Conflict response", function (this: CustomWorld) {
  assertHttpStatus.call(this, 409);
  assertResponseHasError.call(this);
});

Then("they should receive a 422 Unprocessable Entity response", function (this: CustomWorld) {
  assertHttpStatus.call(this, 422);
  assertResponseHasError.call(this);
});

// Server error responses (5xx)
Then("they should receive a 500 Internal Server Error response", function (this: CustomWorld) {
  assertHttpStatus.call(this, 500);
});

// Generic status code matcher
Then("they should receive a {int} response", function (this: CustomWorld, statusCode: number) {
  assertHttpStatus.call(this, statusCode);
});

// Response body validation
Then("the response should contain error details", assertResponseHasError);

Then("the response should contain data", assertResponseHasData);

Then("the response should be empty", function (this: CustomWorld) {
  assert.ok(!this.lastResponseData || Object.keys(this.lastResponseData).length === 0, "Response should be empty");
});

// Content type validation
Then("the response should be JSON", function (this: CustomWorld) {
  const contentType = this.lastResponse?.headers.get("content-type");
  assert.ok(contentType?.includes("application/json"), `Expected JSON content type, but received: ${contentType}`);
});

// Helper function to assert HTTP status with better error messages
function assertHttpStatus(this: CustomWorld, expectedStatus: number): void {
  const actualStatus = this.lastResponse?.status;
  const statusName =
    expectedStatus in HTTP_STATUS_CODES
      ? HTTP_STATUS_CODES[expectedStatus as keyof typeof HTTP_STATUS_CODES]
      : "Unknown";
  const actualStatusName =
    typeof actualStatus === "number" && actualStatus in HTTP_STATUS_CODES
      ? HTTP_STATUS_CODES[actualStatus as keyof typeof HTTP_STATUS_CODES]
      : "Unknown";

  assert.strictEqual(
    actualStatus,
    expectedStatus,
    `Expected ${expectedStatus} ${statusName}, but received ${actualStatus} ${actualStatusName}`
  );
}

// Helper function to assert response has error details
function assertResponseHasError(this: CustomWorld): void {
  assert.ok(this.lastResponseData?.error, "Response should contain error details");
}

// Helper function to assert response has data
function assertResponseHasData(this: CustomWorld): void {
  assert.ok(this.lastResponseData, "Response should contain data");
}
