import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/news";

const router = Router();

router.post("/news", create);
router.get("/news/:slug", read);
router.get("/news", list);
router.put("/news/:id", update);
router.delete("/news/:id", remove);

export default router;