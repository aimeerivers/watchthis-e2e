import type { IWorldOptions } from "@cucumber/cucumber";
import { setDefaultTimeout, setWorldConstructor, World } from "@cucumber/cucumber";
import dotenv from "dotenv";
import type { Browser, BrowserContext, Page } from "playwright";
import { chromium } from "playwright";

import { PageObjectManager } from "./pages/page-manager.js";

dotenv.config();

setDefaultTimeout(Number(process.env.TIMEOUT_SECONDS ?? 5) * 1000);

export default class CustomWorld extends World {
  accessToken?: string;
  browser: Browser | null;
  context: BrowserContext | null;
  lastResponse?: Response;
  lastResponseData?: any;
  mediaItem?: any;
  page: Page | null;
  pageManager?: PageObjectManager;
  user?: { username: string; password: string };
  userId?: string;

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
    this.pageManager = new PageObjectManager(this.page);
  }

  async closeBrowser(): Promise<void> {
    if (this.browser !== null) {
      await this.browser.close();
    }
  }
}

setWorldConstructor(CustomWorld);
