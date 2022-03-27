import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/user";

const router = Router();

router.post("/users", create);
router.get("/users/:id", read);
router.get("/users", list);
router.put("/users/:id", update);
router.delete("/users/:id", remove);

export default router;