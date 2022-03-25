import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/category";

const router = Router();

router.post("/category", create);
router.get("/category/:slug", read);
router.get("/category", list);
router.put("/category/:id", update);
router.delete("/category/:id", remove);

export default router;