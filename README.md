# Search CLI Application

A CLI application for Search.
It has been build with NodeJs and TypeScript. The development approach was TDD and the testing framework used is Jest with high test coverage.

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

## Solutions and Tradeoffs

For this solution performance was prioritized. The data will be preprocessed to multiple maps and map of maps, to allow O(1) lookup time regardless of the data size. Note the initial preprocessing will be O(n), but after that the search lookup itself is constant time. 

This search can find all the available results with a given search value, instead of returning only the first instance. 

Example: for each user in the users.json file, for each of the keys, i.e _id, tags, active, etc, a map will be created. The map key will be value of the property i.e false for 'active' field search maps, and the values is an array of _ids that active is false, and so on. Then for showing the full result, the fullDataById map is used that the key is the _id and the value is the full user data. 

To link users, organization, and tickets, in users and tickets additional fullDataByOrganizationId maps are created as well, that they key is organization_id and the value is array of full data with that organization_id. 

### Assumptions
The machine has enough memory for the maps. 

The way to link users, organization and tickets is by organization_id only. Therefore when a result in any search type is found, all the results in the remaining two types that have the same organization_id will be shown as well. 

### Tests
Using TDD approach, I was able to constantly refactor the code to make it more readable, issues were found by writing failing tests and changing the code accordingly to fix the tests. An example of it was the maps for values that are arrays, i.e tags. 

More test could be written for the index.ts file, but because of shortness of time, the three main util functions that are for creating the search maps were prioritized and unit tests were written for them.

### Future improvements
Given additional time, these improvements can be done: 
Adding more tests for the index.ts file.
Improving the command line interface, i.e the option for viewing the full list of searchable fields is missing. 
Improving the index.ts file by more helper function to minimize duplicate code.