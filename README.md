## Get Started

### 1. Prerequisites

- [NodeJs](https://nodejs.org/en/)
- [NPM](https://npmjs.org/) - Node package manager
- [MySQL](https://www.mysql.com/downloads/) - Relational database management system (RDBMS)
- [Java](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) - Java 11 SDK
- [Gradle](https://gradle.org/install/)

### 2. Installation

On the command prompt run the following commands:

``` 
 $ git clone https://github.com/hariprasads/ipl-auction.git
 $ cd ipl-auction
 $ cp .env.example .env (edit it with your secret key and database information)
 $ npm install
 $ npm run migrate
 ```
 Finally, start and build the application:
 
 ```
 $ npm run build (For development)
 $ npm run build:prod (For production)
```

List of NPM Commands:
 
  ```
  $ npm run lint       # linting
  $ npm run clean      # remove dist and node_modules folder and install dependencies
 ```

 Build jcrud - (java based springboot app)

```
$ cd jcrud
$ .\gradlew clean build
```

Run jcrud app - (java based springboot app)

```
$ cd jcrud
$ .\gradlew bootRun
```

### 3. Usage

URL : http://localhost:3000/

Navigate to http://localhost:3000/swagger/ for the API documentation.

### 4. Running Java and NodeJs service together

Run jcrud springboot app

```
$ cd jcrud
$ .\gradlew bootRun
```

Open new cmd prompt (windows) or terminal (unix) to run node app

```
 $ npm run build
```

Eg. node server calling java api
https://localhost:3000/api/test

Eg. node client calling service which calls java api
https://localhost:3000/message

Eg. jcrud springboot endpoint
https://localhost:8080/greeting

### 5. Useful Link
- Web framework for Node.js - [Express](http://expressjs.com/)
- JavaScript ORM  for Node.js - [Bookshelf](http://bookshelfjs.org/)
- SQL Query Builder for Postgres, MSSQL, MySQL, MariaDB, SQLite3, and Oracle - [Knex](http://knexjs.org/)
- JSON Web Tokens(jwt) - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- Logging Library - [Winston](https://www.npmjs.com/package/winston)
- Object schema validation  - [Joi](https://www.npmjs.com/package/joi)
- API documentation using [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc) and [swagger-ui](https://www.npmjs.com/package/swagger-ui)
- JavaScript library for building user interfaces - [React](https://facebook.github.io/react/)
- Predictable state container - [Redux](http://redux.js.org/)
- A React component library implementing Google's Material Design - [Material-UI](https://material-ui-1dab0.firebaseapp.com/)
- Redux Form - [Redux Form](http://redux-form.com/8.3.0/)
- Declarative routing for React - [React-Router](https://reacttraining.com/react-router/)
- Promise based HTTP client - [Axios](https://github.com/mzabriskie/axios)
- Environment configuration - [dotenv](https://www.npmjs.com/package/dotenv)
- Code linting tool - [ESLint](http://eslint.org/)
- Code formatter - [Prettier](https://www.npmjs.com/package/prettier)
- SprintBoot - [Getting started](https://spring.io/guides/gs/rest-service/#scratch)