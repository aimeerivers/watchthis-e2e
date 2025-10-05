import type { Page } from "playwright";

import { AuthPage } from "./auth.page.js";
import { BasePage } from "./base.page.js";

export class UserServicePage extends BasePage {
  public auth: AuthPage;

  constructor(page: Page) {
    super(page);
    this.auth = new AuthPage(page);
  }

  private getUserServiceUrl(): string {
    if (!process.env.USER_SERVICE_URL) {
      throw new Error("USER_SERVICE_URL is not defined in environment variables");
    }
    return process.env.USER_SERVICE_URL;
  }

  async visitUserService(): Promise<void> {
    const url = this.getUserServiceUrl();
    await this.goto(url);
  }

  async assertOnUserService(): Promise<void> {
    const url = this.getUserServiceUrl();
    await this.assertUrlStartsWith(url);
  }

  // User service specific actions
  async performCompleteLogin(username: string, password: string): Promise<void> {
    await this.auth.performLogin(username, password);
    await this.assertOnUserService();
    await this.auth.waitForWelcomeMessage(username);
  }

  async performCompleteSignUp(username: string, password: string): Promise<void> {
    await this.auth.performSignUp(username, password);
    await this.assertOnUserService();
    await this.auth.waitForWelcomeMessage(username);
  }

  async performLogout(): Promise<void> {
    await this.auth.clickLogout();
    await this.assertOnUserService();
    await this.auth.waitForLoginButton();
  }
}
