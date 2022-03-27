import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/cateNews";

const router = Router();

router.post("/cateNews", create);
router.get("/cateNews/:slug", read);
router.get("/cateNews", list);
router.put("/cateNews/:id", update);
router.delete("/cateNews/:id", remove);

export default router;