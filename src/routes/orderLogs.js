import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/orderLog";
import { userById } from "../controllers/user";

const router = Router();

router.post("/orderLogs", create);
router.get("/orderLogs/:id", read);
router.get("/orderLogs", list);
router.put("/orderLogs/:id", update);
router.delete("/orderLogs/:id", remove);

router.param("userId", userById);

export default router;