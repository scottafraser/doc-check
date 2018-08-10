# Doctor Finder

#### Epicodus JavaScript Week 2 8/10/18

#### Scott Fraser

## Description

Excersise in API calls

## Specs

| Behavior | Input | Output |
|----------|-------|--------|
| A user should be able to enter a medical issue and a city  to receive a list of doctors in that city that fit the search query | portland,or ; cancer | list of doctors in portland who deal with cancer |
A user should be able to to enter a name to receive a list of doctors in that city that fit the search query. | portland,or ; james  | list of doctors in portland with james in their name |
Info should be included about each doctor | portland,or ; james |  first name, last name, address, phone number, website and whether or not the doctor is accepting new patients  |
If the API call results in an error (any message not a 200 OK), the application should return a notification that states what the error is. | 230980-832cdshclks | error message |
If the query response doesn't include any doctors (for instance, if no doctors meet the search criteria), the application should return a notification that states that no doctors meet the criteria. | doctor that doesn't exist | "no matching doctors!" |

## Setup on OSX

* Install Node.js
* Install karma-cli globally: `npm install -g karma-cli`
* Clone the repo
* `npm install` to install dependencies
* `npm run start` to build and start the dev server
* `npm run lint` to explicitly run ESLint
* `npm run test` to run the unit tests with Karma and Jasmine. Visit `localhost:9876` to view the tests.
* use https://developer.betterdoctor.com/ to find API for doctors
* use https://developer.mapquest.com/documentation/geocoding-api/address/get/ to find api for for location

## Contribution Requirements

1. Clone the repo
1. Make a new branch
1. Commit and push your changes
1. Create a PR

## Technologies Used

* JavaScript
* Node.js
* jQuery 3.3.1
* Bootstrap 4.1.3
* Babel
* Webpack
* ESLint
* Jasmine
* Karma

## Links

* Add links here

## License

This software is licensed under the MIT license.

Copyright (c) 2018 **Your Name Here**