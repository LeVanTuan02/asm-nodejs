import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/slider";

const router = Router();

router.post("/slider", create);
router.get("/slider/:id", read);
router.get("/slider", list);
router.put("/slider/:id", update);
router.delete("/slider/:id", remove);

export default router;