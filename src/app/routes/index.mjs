/**
 * Routers are ment to be passed in route modules that define new endpoints in our application.
 * This way we can create multiple routes and configurations simply passing new routers to route modules.
 * Route modules define endpoints and bind adapters to them(see adapters module).
 */

import express from "express";

import list from "./list";

let router = express.Router();

list(router);

export default router;
