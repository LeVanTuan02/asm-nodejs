import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/address";

const router = Router();

router.post("/address", create);
router.get("/address/:id", read);
router.get("/address", list);
router.put("/address/:id", update);
router.delete("/address/:id", remove);

export default router;