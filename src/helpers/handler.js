/**
 * This modules is responsible for error handling in adapters.
 * API itself may and will throw errors, here they're converted into
 * HTTPErrors and can be sent as a response. Error logging and formating also goes here.
 */

import { APIError } from "../errors/apiError";
import { HTTPError } from "../errors/httpError";
import Raven from "raven";
import { getStatus } from "./errors/errors";
import { json } from "./formatters";
import sendError from "./errors/sendError";

export default function(middleware) {
  return async (req, res, next) => {
    // TODO: If we will ever need other types of responses implement the logic that decides which formatter to use here
    let formatter = json;

    try {
      const result = await middleware.call(null, req, res, next);
      return formatter(res, result);
    } catch (e) {
      let error = e;

      if (!(error instanceof APIError)) {
        error = new HTTPError({
          message: error.message,
          status: 500
        });

        // Show in dev, log in prod, test, etc.
        if (process.env.NODE_ENV === "development") {
          // eslint-disable-next-line
          console.error(error);
        } else {
          Raven.captureException(error);
        }
      } else {
        error = new HTTPError({
          ...error,
          status: getStatus(error)
        });
      }

      res = sendError(res, formatter)(error);
    }
  };
}
