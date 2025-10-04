import type { IWorldOptions } from "@cucumber/cucumber";
import { setDefaultTimeout, setWorldConstructor, World } from "@cucumber/cucumber";
import type { Browser, BrowserContext, Page } from "playwright";
import { chromium } from "playwright";

import { ButtonPage } from "./pages/button.page.js";
import { EditButtonPage } from "./pages/edit-button.page.js";

setDefaultTimeout(Number(process.env.TIMEOUT_SECONDS ?? 5) * 1000);

export default class CustomWorld extends World {
  browser: Browser | null;
  context: BrowserContext | null;
  page: Page | null;
  buttonPage: ButtonPage | null;
  editButtonPage: EditButtonPage | null;

  constructor(options: IWorldOptions<unknown>) {
    super(options);
    this.browser = null;
    this.context = null;
    this.page = null;
    this.buttonPage = null;
    this.editButtonPage = null;
  }

  async openBrowser(): Promise<void> {
    this.browser = await chromium.launch({
      headless: process.env.HEADLESS === "true",
      slowMo: 10,
    });
    this.context = await this.browser.newContext({
      baseURL: "https://aimeerivers.github.io",
    });
    this.page = await this.context.newPage();
    this.buttonPage = new ButtonPage(this.page);
    this.editButtonPage = new EditButtonPage(this.page);
  }

  async closeBrowser(): Promise<void> {
    if (this.browser !== null) {
      await this.browser.close();
    }
  }
}

setWorldConstructor(CustomWorld);
