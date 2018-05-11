/**
 * Base(and most likely only) error for our express application.
 */
export class HTTPError extends Error {
  constructor(fields) {
    super();
    Object.assign(this, fields);
  }
}
