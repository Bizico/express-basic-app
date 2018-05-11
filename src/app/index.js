/**
 * This is our express app. It's purpose is to provide HTTP based interface between client applications and API.
 */

import { HTTPError } from "../helpers/errors/httpError";
import Raven from "raven";
import YAML from "yamljs";
import api from "./routes";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import { json } from "../helpers/formatters";
import logger from "morgan";
import path from "path";
import sendError from "../helpers/errors/sendError";
import swaggerUi from "swagger-ui-express";

dotenv.load();

const swaggerDocument = YAML.load("./public/doc.yaml");

const app = express();

const CORSMiddleware = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "PUT, GET, POST, DELETE, OPTIONS, PATCH"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, Accept, X-Requested-With, Content-Type, \
    Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  next();
};

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ======================================================================
app.use(Raven.requestHandler());
app.use(logger("dev"));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));

app.use(express.static(path.resolve(process.env.PUBLIC_ROOT)));

app.use("/api", CORSMiddleware, api);

app.use(Raven.errorHandler());

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new HTTPError({ message: "Not Found", status: 404 });
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.name === "UnauthorizedError") {
    err = new HTTPError({ message: err.message, status: err.status });
  }
  sendError(res, json)(err);
});

module.exports = app;
