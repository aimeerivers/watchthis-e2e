# WatchThis E2E

End-to-end test scenarios for the WatchThis microservices architecture, using Docker Compose, Cucumber and Playwright.

Scenarios written in Gherkin, step definitions in TypeScript.

Uses CucumberJS, TS Node and ES modules. Includes TSConfig, ESLint Prettier and Package Lint.

## WatchThis Services Architecture

WatchThis is built as a microservices architecture with the following services:

- **watchthis-home-service** - Main application frontend and routing
- **watchthis-user-service** - User authentication and profile management
- **watchthis-media-service** - Media content management and streaming
- **watchthis-sharing-service** - Social sharing and recommendations

## Docker Compose Test Environment

This E2E testing suite uses Docker Compose to orchestrate a complete test environment where all WatchThis services can communicate with each other. This allows us to:

- **Isolated Testing Environment**: Each test run gets a fresh, consistent environment
- **Service Communication**: Test real inter-service communication and API interactions
- **Database Integration**: Test with actual databases and data persistence
- **Network Simulation**: Test network conditions, timeouts, and service discovery
- **Scalability Testing**: Easily scale services up/down to test load scenarios

The Docker Compose configuration will spin up all required services, databases, and networking to create a production-like environment for comprehensive end-to-end testing.

## Getting started

### Prerequisites

- Docker and Docker Compose installed
- Node.js installed

### Setup

```bash
# Install dependencies
npm install
npm run playwright:install

# Start the WatchThis services test environment
docker-compose up -d

# Verify all services are running
docker-compose ps
```

### Stopping the test environment

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (clean slate)
docker-compose down -v
```

## Writing Cucumber features

- Features are in the `features` folder and end with `.feature`
- Step definitions are in the `features/steps_definitions` folder and end with `.steps.ts`
- Pages are in the `features/pages` folder and end with `.page.ts`
- Service helpers are in the `features/services` folder for API interactions

## Running Cucumber

```bash
# Run all tests against Docker environment
npm run cucumber
```

This will run cucumber headless in parallel against the Docker Compose services.

### Test Execution Options

```bash
# Run work-in-progress scenarios (visible browser, no parallel)
npm run cucumber:wip

# Run tests with specific tags
npm run cucumber -- --tags "@smoke"
npm run cucumber -- --tags "@user-service"
```

### Service Health Checks

```bash
# Check if all services are healthy
docker-compose ps

# View logs for all services
docker-compose logs

# View logs for specific service
docker-compose logs watchthis-user-service

# Follow logs in real-time
docker-compose logs -f
```

### Test Debugging

```bash
# Run work-in-progress scenarios in headed mode for debugging
npm run cucumber:wip
```

### Common Issues

- **Services not starting**: Check `docker-compose logs` for startup errors
- **Network connectivity**: Ensure all services are on the same Docker network
- **Database migrations**: Services may need time to initialize databases
- **Port conflicts**: Make sure the ports are not used by other applications

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

## Development Workflow

### Adding New Tests

1. **Write Feature**: Create `.feature` file in appropriate folder
2. **Generate Steps**: Run `npm run cucumber:steps` to see undefined steps
3. **Implement Steps**: Add step definitions in corresponding `.steps.ts` file
4. **Create Page Objects**: Add page interactions in `.page.ts` files
5. **Service Integration**: Add API helpers in `features/services/` if needed
