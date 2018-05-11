import { ERROR_CODES, ValidationError } from "./apiError";

import _ from "lodash";

export const validate = fields => data => {
  let errors = new Map();

  _.forEach(fields, (field, key) => {
    let rules = [];
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
  });

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

export const validateEntity = async ({ get, data, message }) => {
  let err, obj;
  [err, obj] = await get(data);
  if (err || !obj) {
    throw new ValidationError("Bad request.", null, message);
  }
};
