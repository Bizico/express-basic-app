import bookshelf from "./bookshelf";

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
}
