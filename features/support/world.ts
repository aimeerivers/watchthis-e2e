import type { IWorldOptions } from "@cucumber/cucumber";
import { setDefaultTimeout, setWorldConstructor, World } from "@cucumber/cucumber";
import dotenv from "dotenv";
import type { Browser, BrowserContext, Page } from "playwright";
import { chromium } from "playwright";

dotenv.config();

setDefaultTimeout(Number(process.env.TIMEOUT_SECONDS ?? 5) * 1000);

export default class CustomWorld extends World {
  browser: Browser | null;
  context: BrowserContext | null;
  page: Page | null;
  user?: { username: string; password: string };

  constructor(options: IWorldOptions<unknown>) {
    super(options);
    this.browser = null;
    this.context = null;
    this.page = null;
  }

  async openBrowser(): Promise<void> {
    this.browser = await chromium.launch({
      headless: process.env.HEADLESS === "true",
      slowMo: 10,
    });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async closeBrowser(): Promise<void> {
    if (this.browser !== null) {
      await this.browser.close();
    }
  }
}

setWorldConstructor(CustomWorld);
