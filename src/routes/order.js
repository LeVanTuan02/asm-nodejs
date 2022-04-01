import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/order";

const router = Router();

router.post("/orders", create);
router.get("/orders/:id", read);
router.get("/orders", list);
router.put("/orders/:id", update);
router.delete("/orders/:id", remove);

export default router;