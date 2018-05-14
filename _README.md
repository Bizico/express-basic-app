## Express Basic App Repository

---

#### Dependencies

Use one of the following to install dependencies

Node Version `v10.0`

```
yarn
```

or if you don't have yarn

```
npm install
```

also you might need global cli-s of babel, nodemon, webpack, knex.
In such case try this

```
npm -g install babel-cli knex nodemon webpack multi-file-swagger
```

---

#### Environment

Create `.env` file with following values

    # Environment name in case you didn't provide one.
    NODE_ENV=production

    # The port on which app will run. Don't set this if you run something like IIS.
    PORT=3000

    HOST_NAME=http://localhost:3000

    # DB configs.
    DB_HOST=127.0.0.1
    DB_USER=bizico
    DB_PASSWORD=1234
    DB_NAME=my_db
    DB_PORT=5432

**Note:** This is an example use your own values.

**Note:** We are using PostgreSQL. For now.

**Note:** Make sure you PostgreSQL DB exists and you port is free.

---

#### Database

After setup of `.env` variables you cant run latest migrations by:

```
knex migrate:latest
```

In development process you can also run provided seed files by:

```
knex seed:run
```

---

#### Development

Use the following to start development server with auto-reload. The server will be available on `PORT` or 8888 in case of `development` or `test` environment.

```
yarn run start:dev
```

**Note:** Use this only for development.

---

#### Build and deployment

To build the project use

```
yarn run build
```

a result of the build is inside the `build` directory. Should look like this

```
.
├── public/
|   └── doc.yaml
├── package.json
├── server.js
└── server.js.map
```

To run the build install dependencies with `yarn` or `npm` inside the build folder and run it with node

```
node server.js
```

**Note:** Don't forget to set `NODE_ENV=production` and `PORT`.

---
