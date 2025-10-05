import type { Page } from "playwright";

export class AuthPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  get usernameInput() {
    return this.page.getByRole("textbox", { name: "Username:" });
  }

  get passwordInput() {
    return this.page.getByRole("textbox", { name: "Password:" });
  }

  get submitButton() {
    return this.page.getByRole("button", { name: "Submit" });
  }

  get loginButton() {
    return this.page.getByRole("button", { name: "Log in" });
  }

  get signUpButton() {
    return this.page.getByRole("button", { name: "Sign up" });
  }

  get logoutButton() {
    return this.page.getByRole("button", { name: "Log out" });
  }

  // Actions
  async fillUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickSubmit(): Promise<void> {
    await this.submitButton.click();
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async clickSignUp(): Promise<void> {
    await this.signUpButton.click();
  }

  async clickLogout(): Promise<void> {
    await this.logoutButton.click();
  }

  // Combined actions
  async fillCredentials(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
  }

  async submitCredentials(username: string, password: string): Promise<void> {
    await this.fillCredentials(username, password);
    await this.clickSubmit();
  }

  async performLogin(username: string, password: string): Promise<void> {
    await this.clickLogin();
    await this.submitCredentials(username, password);
  }

  async performSignUp(username: string, password: string): Promise<void> {
    await this.clickSignUp();
    await this.submitCredentials(username, password);
  }

  // Assertions/Verifications
  async waitForWelcomeMessage(username: string): Promise<void> {
    await this.page.getByText(`Welcome, ${username}!`).waitFor();
  }

  async waitForLoggedInMessage(username: string): Promise<void> {
    await this.page.getByText(`You are logged in as ${username}`).waitFor();
  }

  async waitForLoginButton(): Promise<void> {
    await this.loginButton.waitFor();
  }

  async isLoggedIn(username: string): Promise<boolean> {
    try {
      await this.page.getByText(`You are logged in as ${username}`).waitFor({ timeout: 1000 });
      return true;
    } catch {
      return false;
    }
  }

  async isLoggedOut(): Promise<boolean> {
    try {
      await this.loginButton.waitFor({ timeout: 1000 });
      return true;
    } catch {
      return false;
    }
  }
}
