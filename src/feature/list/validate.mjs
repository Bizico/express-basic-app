// import { isNumeric } from "validator";

export const id = {
  id: {
    required: true,
    with: id => +id >= 0,
    else: "ID have to be a Number greater or equal to 0."
  }
};
