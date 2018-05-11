/**
 * API errors. Used by interactors.
 */
export class APIError extends Error {
  constructor(message, code, meta = undefined) {
    super();

    this.message = message;
    this.meta = meta;
    this.code = code;
  }
}

export class ValidationError extends APIError {
  constructor(
    message = "Bad request.",
    code = ERROR_CODES.VALIDATION,
    fields = {}
  ) {
    super(message, code);
    this.fields = fields;
  }
}

export class AuthorizationError extends APIError {
  constructor(message, code = ERROR_CODES.AUTHORIZATION, ...meta) {
    super(message, code, meta);
  }
}

export class UnauthorizedError extends APIError {
  constructor(
    message = "Unauthorized",
    code = ERROR_CODES.AUTHORIZATION,
    ...meta
  ) {
    super(message, code, meta);
  }
}

export class QueryParseError extends APIError {
  constructor(
    message = "Query Parse failed.",
    code = ERROR_CODES.PARSE_ERROR,
    ...meta
  ) {
    super(message, code, ...meta);
  }
}

export class DoesNotExistError extends APIError {
  constructor(
    message = "Does not exist",
    code = ERROR_CODES.DOES_NOT_EXISTS,
    ...meta
  ) {
    super(message, code, meta);
  }
}

export class NotActiveUserError extends APIError {
  constructor(
    message = "Account is inactive",
    code = ERROR_CODES.INACTIVE_USER,
    ...meta
  ) {
    super(message, code, meta);
  }
}

export class AlreadyExistError extends APIError {
  constructor(
    message = "Already Exist Error.",
    code = ERROR_CODES.ALREADY_EXIST_ERROR,
    ...meta
  ) {
    super(message, code, meta);
  }
}

export class EmailServiceError extends APIError {
  constructor(
    message = "Elastic Email Error",
    code = ERROR_CODES.TWILIO_ERROR,
    meta
  ) {
    super(message, code, meta);
  }
}

export class PhoneServiceError extends APIError {
  constructor(message = "Twilio Error", code = ERROR_CODES.TWILIO_ERROR, meta) {
    super(message, code, meta);
  }
}

export class FileStorageServiceError extends APIError {
  constructor(
    message = "Amazon S3 Error",
    code = ERROR_CODES.TWILIO_ERROR,
    meta
  ) {
    super(message, code, meta);
  }
}

export const ERROR_CODES = {
  VALIDATION: "E000",
  AUTHORIZATION: "E001",
  DOES_NOT_EXISTS: "E002",
  ALREADY_EXIST_ERROR: "E003",
  INACTIVE_USER: "E004",
  PARSE_ERROR: "E005",
  EMAIL_ERROR: "E101",
  TWILIO_ERROR: "E102",
  AWS_ERROR: "E103"
};
