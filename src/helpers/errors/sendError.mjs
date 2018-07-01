/**
 * Sets response status code and formats error.
 */

export default function(res, formatter) {
  // TODO: In DOCs said that res.locale have to be set. But it's not.
  // res.locale = res.req.headers["accept-language"];
  return error => {
    res.status(error.status);
    formatter(res, error);
  };
}
