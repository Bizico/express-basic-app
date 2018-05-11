import { QueryParseError } from "../../helpers/errors/apiError";
import bookshelf from "./bookshelf";
import jsep from "jsep";

const FILTER_OPERATORS = {
  eq: "=",
  ne: "!=",
  gt: ">",
  ge: ">=",
  lt: "<",
  le: "<=",
  lk: "like",
  il: "ilike"
};
for (let i in FILTER_OPERATORS) {
  jsep.addBinaryOp(i, 6);
}

const ORDER_DIRECTION = {
  desc: "DESC",
  asc: "ASC"
};

export class Entity extends bookshelf.Model {
  constructor(fields) {
    super(fields);
    this.property = {};
    this.props.forEach(property => {
      Object.defineProperty(this.property, property, {
        get: () => {
          return this.get(property);
        },
        set: value => {
          this.set(property, value);
        }
      });
    });
  }

  filter(expression) {
    if (!expression) {
      return this;
    }

    // Replacing proper logical operations
    expression = expression.replace(/ and /g, " && ");
    expression = expression.replace(/ or /g, " || ");
    const props = this.props;
    const hidden = this.hidden;

    function split(node) {
      if (node.type === "BinaryExpression") {
        let field = node.left.name;
        let operation = FILTER_OPERATORS[node.operator];
        let value = node.right.value;

        if (!props.includes(field)) {
          throw new QueryParseError(
            "No such property `" + field + "` to filter."
          );
        }

        if (hidden.includes(field)) {
          throw new QueryParseError("Property `" + field + "` is private.");
        }

        if (!operation) {
          throw new QueryParseError("This operation is not available.");
        }

        return qb => {
          qb.where(field, operation, value);
        };
      } else if (node.type === "LogicalExpression") {
        return qb => {
          qb.where(split(node.left));
          if (node.operator === "&&") {
            qb.andWhere(split(node.right));
          } else if (node.operator === "||") {
            qb.orWhere(split(node.right));
          }
        };
      } else {
        throw new QueryParseError("Failed to parse to Logical Expression.");
      }
    }

    let tree = jsep(expression);

    return this.query(split(tree));
  }

  order(expression) {
    if (!expression) {
      return this;
    }
    const props = this.props;
    const hidden = this.hidden;
    expression = expression.split(", ");
    for (let part of expression) {
      part = part.split(" ");
      let field = part[0];
      if (!props.includes(field)) {
        throw new QueryParseError(
          "No such property `" + field + "` to orderBy."
        );
      }

      if (hidden.includes(field)) {
        throw new QueryParseError("Property `" + field + "` is private.");
      }

      let direction =
        (part[1] && ORDER_DIRECTION[part[1]]) || ORDER_DIRECTION.asc;
      this.query(qb => qb.orderBy(field, direction));
    }
    return this;
  }
}
