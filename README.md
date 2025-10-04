# playwright-cucumber-template

Some examples for running Playwright with Cucumber.

Scenarios written in Gherkin, step definitions in TypeScript.

Uses CucumberJS, TS Node and ES modules. Includes TSConfig, ESLint Prettier and Package Lint.

## Application under test

The application being tested in the examples is [aimeerivers.github.io/push-the-button](https://aimeerivers.github.io/push-the-button/)

It is a very simple web page that has a button that makes a noise when it is pushed. You can customize the button to say anything you like. The cucumber scenarios test this very simple functionality.

You can see how scenarios, step definitions and page object models work together. The scenarios should run successfully straight away, and there is also configuration to be able to run the test scenarios on GitHub Actions.

Of course you'll probably want to delete the example code and replace it with your own, but hopefully it gives you a good guide for getting started.

## Getting started

```bash
npm install
npm run playwright:install
```

## Writing Cucumber features

- Features are in the `features` folder and end with `.feature`
- Step definitions are in the `features/steps_definitions` folder and end with `.steps.ts`
- Pages are in the `features/pages` folder and end with `.page.ts`

## Running Cucumber

```bash
npm run cucumber
```

This will run cucumber headless in parallel.

This will not run cucumber scenarios tagged `@wip` (work in progress). To run `@wip` scenarios use:

```bash
npm run cucumber:wip
```

This will run in a visible browser, and not in parallel.

## Reports

An HTML report is generated in the reports folder. Use this script to open it:

```bash
npm run cucumber:report
```

## Step definitions

You can get a file of all step definitions and their usage like this:

```bash
npm run cucumber:steps
```

This generates a `steps.txt` report showing:

- All available step definitions
- How often each step is used across your feature files
- Unused step definitions that could be removed

## Linting and formatting

```bash
npm run lint
npm run format
npm run package:lint
```

- `lint` will check for errors and fix formatting in `.ts` and `.js` files.
- `format` will apply format rules to all possible files.
- `package:lint` will warn of any inconsistencies in the `package.json` file.
