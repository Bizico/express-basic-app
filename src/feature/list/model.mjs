import Model from "../../services/database/model";

export default class List extends Model {
  constructor(fields) {
    super(fields);
  }

  get props() {
    return ["id", "name", "qty", "price", "barcode"];
  }

  get tableName() {
    return "shopping_list";
  }

  get hidden() {
    return ["barcode"];
  }

  get defaults() {
    return {};
  }
}
