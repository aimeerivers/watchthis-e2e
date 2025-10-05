import { faker } from "@faker-js/faker";
import type { Page } from "playwright";

import { HomeServicePage } from "./home-service.page.js";
import { UserServicePage } from "./user-service.page.js";

export class PageObjectManager {
  private page: Page;
  public homeService: HomeServicePage;
  public userService: UserServicePage;

  constructor(page: Page) {
    this.page = page;
    this.homeService = new HomeServicePage(page);
    this.userService = new UserServicePage(page);
  }

  // Utility methods for generating test data
  static generateUser(): { username: string; password: string } {
    return {
      username: faker.internet.username().replaceAll(/[.-]/g, "_"),
      password: faker.internet.password({ length: 8, memorable: true, pattern: /[A-Za-z0-9]/ }) + "1aA",
    };
  }

  static getAdminUser(): { username: string; password: string } {
    if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
      throw new Error("ADMIN_USERNAME or ADMIN_PASSWORD is not defined in environment variables");
    }
    return {
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    };
  }

  // Cross-service workflows
  async setupLoggedInUser(): Promise<{ username: string; password: string }> {
    const user = PageObjectManager.getAdminUser();
    await this.homeService.visitHomeService();
    await this.homeService.performCompleteLogin(user.username, user.password);
    return user;
  }

  async verifyUserLoggedInAcrossServices(username: string): Promise<void> {
    // Verify on home service
    await this.homeService.visitHomeService();
    await this.homeService.assertUserLoggedIn(username);

    // Verify on user service
    await this.userService.visitUserService();
    await this.userService.auth.waitForWelcomeMessage(username);
  }

  async verifyUserLoggedOutAcrossServices(): Promise<void> {
    // Verify on home service
    await this.homeService.visitHomeService();
    await this.homeService.assertUserLoggedOut();

    // Verify on user service
    await this.userService.visitUserService();
    await this.userService.auth.waitForLoginButton();
  }
}
