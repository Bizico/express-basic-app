import { ERROR_CODES, ValidationError } from "./errors/apiError";

import _ from "lodash";

export const validate = fields => data => {
  let errors = new Map();

  for (let key in fields) {
    let field = fields[key];
    let rules = [];

    //If field have several validation rules and messages
    if (Array.isArray(field)) {
      rules = field;
    } else {
      rules = [field];
    }

    for (let rule of rules) {
      if (
        rule.required
          ? data[key] === undefined ||
            data[key] === null ||
            !rule.with(data[key])
          : data[key] !== undefined &&
            data[key] !== null &&
            !rule.with(data[key])
      ) {
        errors.set(key, { message: rule.else });
      }
    }
  }

  if (errors.size) {
    throw new ValidationError(
      "Bad request.",
      ERROR_CODES.VALIDATION,
      [...errors].reduce((acc, [name, err]) => {
        acc[name] = err;
        return acc;
      }, {})
    );
  }
};

export default validate;
