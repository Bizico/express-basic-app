/**
 * Knex and bookshelf configuration file. Bookshelf plugins and other tasty stuff should go here.
 */

import bookshelf from "bookshelf";
import config from "../../../knexfile";
import k from "knex";

export const knex = k(config);
const ORM = bookshelf(knex);

ORM.plugin("visibility");
ORM.plugin("pagination");

export default ORM;
