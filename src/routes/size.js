import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/size";

const router = Router();

router.post("/size", create);
router.get("/size/:id", read);
router.get("/size", list);
router.put("/size/:id", update);
router.delete("/size/:id", remove);

export default router;