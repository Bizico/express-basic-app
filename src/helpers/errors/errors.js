/**
 * This module simply maps API errors to HTTP response status codes.
 */

import {
  AlreadyExistError,
  AuthorizationError,
  DoesNotExistError,
  EmailServiceError,
  FileStorageServiceError,
  PhoneServiceError,
  QueryParseError,
  UnauthorizedError,
  ValidationError
} from "./apiError";

const HTTP_STATUSES = {
  [ValidationError.name]: 400,
  [QueryParseError.name]: 400,
  [AlreadyExistError.name]: 422,
  [UnauthorizedError.name]: 401,
  [AuthorizationError.name]: 403,
  [DoesNotExistError.name]: 404,
  [PhoneServiceError.name]: 424,
  [FileStorageServiceError.name]: 424,
  [EmailServiceError.name]: 424
};

export const getStatus = error => {
  return HTTP_STATUSES[error.constructor.name] || 500;
};
