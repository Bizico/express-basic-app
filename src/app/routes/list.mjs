import { getAll, get } from "../../feature/list/handler";

export default router => {
  router.get("/list", getAll);
  router.get("/list/:id", get);
};
