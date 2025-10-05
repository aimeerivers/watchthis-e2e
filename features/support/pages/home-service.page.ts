import type { Page } from "playwright";

import { AuthPage } from "./auth.page.js";
import { BasePage } from "./base.page.js";

export class HomeServicePage extends BasePage {
  public auth: AuthPage;

  constructor(page: Page) {
    super(page);
    this.auth = new AuthPage(page);
  }

  async visitHomeService(): Promise<void> {
    if (!process.env.HOME_SERVICE_URL) {
      throw new Error("HOME_SERVICE_URL is not defined in environment variables");
    }
    await this.goto(process.env.HOME_SERVICE_URL);
  }

  async assertOnHomeService(): Promise<void> {
    if (!process.env.HOME_SERVICE_URL) {
      throw new Error("HOME_SERVICE_URL is not defined in environment variables");
    }
    await this.assertUrlStartsWith(process.env.HOME_SERVICE_URL);
  }

  // Home service specific actions
  async performCompleteLogin(username: string, password: string): Promise<void> {
    await this.auth.performLogin(username, password);
    await this.page.waitForLoadState("networkidle");
    await this.assertOnHomeService();
    await this.auth.waitForLoggedInMessage(username);
  }

  async performCompleteSignUp(username: string, password: string): Promise<void> {
    await this.auth.performSignUp(username, password);
    await this.assertOnHomeService();
    await this.auth.waitForLoggedInMessage(username);
  }

  async performLogout(): Promise<void> {
    await this.auth.clickLogout();
    await this.assertOnHomeService();
    await this.auth.waitForLoginButton();
  }

  async assertUserLoggedIn(username: string): Promise<void> {
    await this.auth.waitForLoggedInMessage(username);
  }

  async assertUserLoggedOut(): Promise<void> {
    await this.auth.waitForLoginButton();
  }
}
