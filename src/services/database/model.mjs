import bookshelf from "./bookshelf";

export default class Entity extends bookshelf.Model {
  constructor(fields) {
    super(fields);
    //TODO: Think about it...
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
