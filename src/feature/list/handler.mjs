import handler from "../../helpers/handler";
import validate from "../../helpers/validate";
import { id as idValidation } from "./validate";
import ERROR_CODES from "./error";
import List from "./model";
import { DoesNotExistError } from "../../helpers/errors/apiError";

export const getAll = handler(async req => {
  let data = {
    pagination: {
      page: req.query.page,
      pageSize: req.query.pageSize
    }
  };
  return new List()
    .filter(req.query.filter)
    .orderBy(req.query.orderBy)
    .fetchAll(data.pagiation);
});

export const get = handler(async req => {
  validate(idValidation)({ id: req.params.id });

  let item = await new List({ id: req.params.id }).fetch();

  if (!item) {
    throw new DoesNotExistError(
      "Item Does Not Exist.",
      ERROR_CODES.DOES_NOT_EXIST
    );
  }

  return item;
});
