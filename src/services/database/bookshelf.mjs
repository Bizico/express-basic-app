/**
 * Knex and bookshelf configuration file. Bookshelf plugins and other tasty stuff should go here.
 */

import bookshelf from "bookshelf";
import config from "../../../knexfile";
import k from "knex";

import bcqm from "bookshelf-collection-querystring-mutation";

export const knex = k(config);
const ORM = bookshelf(knex);

ORM.plugin("visibility");
ORM.plugin("pagination");
ORM.plugin(bcqm);

export default ORM;
