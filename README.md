# TypeScript 2 + Express + Node.js + JSON Web Token (JWT)

This is a boilerplate to start creating backend APIs

## Install

Install the node packages via:

`$ npm install`

## Starting in development mode

It compiles the TypeScript using Grunt and run nodemon

`$ npm run dev`

## Starting

To start the server run:

`$ npm start`


## Client authentication API

Before to authenticate a client we **MUST** register them into the configuration file at: ``` config/default.json``` at `clients` section.

By default all endpoints under authentication validation except the login, to avoid the Auth validation register the endpoint into configuration file at `openEndpoints`.

### Login

Login a client and return the session token. 

performed with https://github.com/auth0/node-jsonwebtoken

```
POST /auth/login 
```

#### Request Body

Accepts raw Body in JSON (application/json) format.

```
{
	"client_id": string,     // Required, the same as the configuration file
	"client_secret": string  // Required, the same as the configuration file
}
```

#### Successfull response

```
{
    "auth": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRmaHNOaXV.....",
    "expire": 86400
}
```

