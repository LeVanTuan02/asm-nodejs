import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/contact";

const router = Router();

router.post("/contact", create);
router.get("/contact/:id", read);
router.get("/contact", list);
router.put("/contact/:id", update);
router.delete("/contact/:id", remove);

export default router;