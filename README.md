# MEAN To Do

This is a sample ToDo application created using MEAN stack (Mongo, Express, Angular, Node). It's using a free mongo database on [mLab](https://mlab.com/).

## Getting Started

### Prerequisites

Before you run the app make sure you have the following installed:

* [Node.js](https://nodejs.org/en/download/) with npm
* [Angular CLI](https://www.npmjs.com/package/@angular/cli)

### Run

To run the project follow these steps:
0. In terminal run `npm i` in both `client` and `server` folders.
1. Go to `app.js` file under `server/config` and replace `<username>` and `<password>` in the `mongoUrl` with the corresponding values.
2. Go to the root of the project in terminal and run `npm start`. This will run the server, the client and open the web app in the browser.

## Running the tests

To run client tests use `npm test` or `ng test` in the `client` folder.
