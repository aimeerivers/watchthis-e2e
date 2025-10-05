import assert from "node:assert";

import type { Page } from "playwright";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Environment variable utilities
  protected getRequiredEnv(envVarName: string): string {
    const value = process.env[envVarName];
    if (!value) {
      throw new Error(`${envVarName} is not defined in environment variables`);
    }
    return value;
  }

  // Navigation
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async waitForLoadState(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
  }

  // URL assertions
  async assertUrlStartsWith(expectedUrl: string): Promise<void> {
    const currentUrl = this.page.url();
    assert(currentUrl.startsWith(expectedUrl), `Expected URL to start with ${expectedUrl}, but was ${currentUrl}`);
  }

  async assertUrlEquals(expectedUrl: string): Promise<void> {
    const currentUrl = this.page.url();
    assert.strictEqual(currentUrl, expectedUrl, `Expected URL to be ${expectedUrl}, but was ${currentUrl}`);
  }

  // Generic button interactions
  async clickButton(buttonName: string): Promise<void> {
    await this.page.getByRole("button", { name: buttonName }).click();
  }

  // Wait for elements
  async waitForText(text: string): Promise<void> {
    await this.page.getByText(text).waitFor();
  }

  async waitForButton(buttonName: string): Promise<void> {
    await this.page.getByRole("button", { name: buttonName }).waitFor();
  }
}
