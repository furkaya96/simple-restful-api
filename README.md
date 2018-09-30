# simple-restful-api

A simple NodeJS server that responds to GET, POST, PUT and DELETE request with JSON.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.

### Prerequisites

NodeJs and npm (node package manager).

* [NodeJs](https://nodejs.org/en/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.

### Installing

Clone the repository.

```
git clone https://github.com/furkaya06/simple-restful-api.git
cd simple-restful-api
```

Install the dependencies.

```
npm install
```

## Starting Server

You should first enter your MongoDb server URI to config.js file. If you have not you can use mLab (Sandbox options -free 500Mb storage-).

```
npm start
```

The API server is listening on port 3000 if it is available. http://localhost:3000

## Example Get Request URLs

```
http://localhost:3000/api/v1/users
http://localhost:3000/api/v1/users?active=true
http://localhost:3000/api/v1/users?active=true&gender=female
http://localhost:3000/api/v1/users?limit=10&skip=5
```
