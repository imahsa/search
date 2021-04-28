# Search CLI Application

A CLI application for Search.
It has been build with NodeJs and TypeScript. The development approach was TDD and the testing framework used is Jest with 100% unit tests coverage.

## Running the application

### Create the application instance and bootstrap the search application
This will build the app and install the `search` application package to make it globally installed.

```
cd search
npm install
npm run create
```

## Developing the application

### Install refreshed project dependencies
```
npm run refresh
```

### Start local development server with hot-reloading
```
npm start
```

### Compile and build the application, and run the application
```
npm run build
npm i -g
search
```

### Run unit tests, with coverage report
```
npm run test
```