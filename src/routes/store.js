import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/store";

const router = Router();

router.post("/store", create);
router.get("/store/:id", read);
router.get("/store", list);
router.put("/store/:id", update);
router.delete("/store/:id", remove);

export default router;