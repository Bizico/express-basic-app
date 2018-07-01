import Raven from "raven";
import app from "./app";
import debug from "debug";
import dotenv from "dotenv";
import http from "http";

/**
 * Module dependencies.
 */

dotenv.config();

Raven.config(process.env.SENTRY_DSN).install();

let dbg = debug("app:server");

/**
 * Get port from environment and store in Express.
 */

let port = normalizePort(process.env.PORT || "8888");
app.set("port", port);

/**
 * Create HTTP server.
 */
let server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      dbg(bind + " requires elevated privileges");
      // eslint-disable-next-line
      process.exit(1);
    case "EADDRINUSE":
      dbg(bind + " is already in use");
      // eslint-disable-next-line
      process.exit(1);
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  dbg("Listening on " + bind);
}
