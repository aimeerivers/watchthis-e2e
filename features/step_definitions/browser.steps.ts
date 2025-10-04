import type { ITestCaseHookParameter } from "@cucumber/cucumber";
import { After, Before, Status } from "@cucumber/cucumber";

import type CustomWorld from "../support/world.js";

Before(async function (this: CustomWorld) {
  await this.openBrowser();
});

After(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
  if (this.browser !== null && this.page !== null) {
    if (scenario.result?.status === Status.FAILED) {
      const screenshot = await this.page.screenshot({
        path: `./screenshots/${scenario.pickle.name}.png`,
        fullPage: true,
      });
      this.attach(screenshot, "image/png");
    }
    await this.closeBrowser();
  }
});
