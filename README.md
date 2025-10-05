# WatchThis E2E Environment

A complete, working end-to-end environment for the WatchThis microservices architecture. This setup provides a fully orchestrated development and testing environment using Docker Compose, with automated testing capabilities powered by Cucumber and Playwright.

Provides a ready-to-use, isolated environment where all WatchThis services can run and communicate together.

Also provides comprehensive test automation with scenarios written in Gherkin and step definitions in TypeScript.

## WatchThis Services Architecture

WatchThis is built as a microservices architecture with the following services:

- **watchthis-home-service** - Main application frontend and routing
- **watchthis-user-service** - User authentication and profile management
- **watchthis-media-service** - Media content management and streaming
- **watchthis-sharing-service** - Social sharing and recommendations

## Complete Environment Setup

This project provides a complete, working environment for the entire WatchThis microservices ecosystem. Using Docker Compose, it orchestrates all services so they can communicate with each other just like in production. The setup supports two deployment modes:

### 🚀 Published Images (Default)

Uses pre-built Docker images from GitHub Container Registry (GHCR) for faster startup and consistent testing:

- **Fast Startup**: No build time required
- **Consistent Environment**: Uses the same images across all environments
- **CI/CD Ready**: Perfect for automated testing pipelines
- **Latest Stable**: Always uses the latest published versions

### 🛠️ Local Development Mode

Builds services from local source code for development and debugging:

- **Live Development**: Test local changes immediately
- **Debugging**: Full access to source code and debugging tools
- **Custom Builds**: Test experimental features or fixes
- **Development Workflow**: Ideal for service development

### Key Benefits

- **Complete Working Environment**: Full WatchThis ecosystem running together
- **Isolated & Consistent**: Each environment spin-up is fresh and reproducible
- **Real Service Communication**: Authentic inter-service communication and API interactions
- **Production-Like Setup**: Includes databases, networking, and service discovery
- **Development Ready**: Perfect for development, debugging, and demonstration
- **Testing Capable**: Built-in automated testing with Cucumber and Playwright

## Getting started

### Prerequisites

- Docker and Docker Compose installed
- Node.js installed

### Quick Start

```bash
# Install dependencies
npm install
npm run playwright:install

# Setup environment variables (first time only)
cp .env.local .env
# Edit .env if needed for your local setup

# Pull latest published images (recommended)
npm run docker:pull

# Start the complete WatchThis environment
npm run docker:up

# Verify all services are running and healthy
npm run docker:status
```

Your WatchThis environment is now running! All services are connected and ready to use.

### Environment Management

#### Using Published Images (Recommended for Demos/Testing)

```bash
# Pull latest stable images from GHCR
npm run docker:pull

# Start the complete environment
npm run docker:up

# Update to latest published versions
npm run docker:pull
```

#### Using Local Development Mode (For Active Development)

```bash
# Build services from local source code
npm run docker:build

# Start environment with your local changes
npm run docker:dev
```

#### Managing Your Environment

```bash
# Stop all services
npm run docker:down

# Check service health and status
npm run docker:status

# View service logs
npm run docker:logs
npm run docker:logs watchthis-user-service  # specific service

# Clean restart (removes all data)
npm run docker:clean
```

## Using Your WatchThis Environment

Once your environment is running, you have a complete WatchThis ecosystem at your disposal:

### Available Services

All services are accessible and fully connected:

- **Home Service**: Main application frontend and routing
- **User Service**: Authentication and profile management
- **Media Service**: Content management and streaming
- **Sharing Service**: Social features and recommendations

### Use Cases

- **Development**: Develop and test new features across services
- **Integration Testing**: Verify service-to-service communication
- **Demonstrations**: Show the complete WatchThis application
- **Debugging**: Troubleshoot issues in a controlled environment
- **API Testing**: Test endpoints and data flows between services

## Automated Testing

The environment includes comprehensive automated testing capabilities using Cucumber and Playwright. This is completely optional - you can use the environment without running any tests.

## Writing Cucumber features

- Features are in the `features` folder and end with `.feature`
- Step definitions are in the `features/steps_definitions` folder and end with `.steps.ts`
- Pages are in the `features/pages` folder and end with `.page.ts`
- Service helpers are in the `features/services` folder for API interactions

## Running Cucumber

If you want to run the automated test suite against your environment:

```bash
# Run all automated tests
npm run cucumber
```

This runs the complete test suite headless in parallel against your running environment.

### Test Execution Options

```bash
# Run work-in-progress scenarios (visible browser, no parallel)
npm run cucumber:wip

# Run tests with specific tags
npm run cucumber -- --tags "@smoke"
npm run cucumber -- --tags "@user-service"
```

### Published Images

The services are published as Docker images to GitHub Container Registry:

- **watchthis-home-service**: `ghcr.io/aimeerivers/watchthis-home-service:latest`
- **watchthis-user-service**: `ghcr.io/aimeerivers/watchthis-user-service:latest`

These images are automatically built and published when changes are merged to the main branch of each service repository.

### Environment Configuration

The project uses different environment files for different contexts:

- **`.env`** - Your local environment (git-ignored, create from template)
- **`.env.local`** - Template for local development
- **`.env.github`** - Environment for GitHub Actions CI (committed to repo)

### Troubleshooting

- **Services not starting**: Check `docker-compose logs` for startup errors
- **Network connectivity**: Ensure all services are on the same Docker network
- **Database initialization**: Services may need time to set up databases
- **Port conflicts**: Ensure required ports are not in use by other applications
- **Environment not responding**: Try `npm run docker:clean` for a fresh start

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

### Adding New Tests

1. **Write Feature**: Create `.feature` file in appropriate folder
2. **Generate Steps**: Run `npm run cucumber:steps` to see undefined steps
3. **Implement Steps**: Add step definitions in corresponding `.steps.ts` file
4. **Create Page Objects**: Add page interactions in `.page.ts` files
5. **Service Integration**: Add API helpers in `features/services/` if needed
