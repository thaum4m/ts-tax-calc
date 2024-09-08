# ts-tax-calc
Unofficial command-line calculator for Australian resident income tax.

## Configuration
Additional Australian resident income tax rates can be configured in `config/au-income-tax-rates.json`.

## Prerequisites
Node.js 21 or above should be installed.

## Usage
Install dependencies then run start script:
```
npm i
npm start
```

## Docker Usage

To run via Docker for development:
1. Install dependencies then run the container:
```
npm i
npm run start:container
```
2. Login into the container:
```
npm run start:shell
```
3. Run the app:
```
cd app
npm start
```

__NOTE__: Requires `docker-compose` command to run.

## Build
To build the application run:
```
npm run build
```
__NOTE__: Manual building is optional and may be desired for production.

## Unit Tests
To run unit tests via Jasmine:
```
npm test
```

## Formatting and Linting
To format files with `prettier`:
```
npm run format
```
To lint files with `eslint` without applying changes:
```
npm run lint
```
To lint files with `eslint` and apply changes:
```
npm run lint:fix
```