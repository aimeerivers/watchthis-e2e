import type { Locator, Page } from "playwright";

export class EditButtonPage {
  constructor(private readonly page: Page) {}

  async labelTextarea(): Promise<Locator> {
    return this.page.locator("#label");
  }

  async createButtonButton(): Promise<Locator> {
    return this.page.getByRole("button", { name: "Create button" });
  }
}
