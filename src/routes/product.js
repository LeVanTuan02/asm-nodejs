import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/product";

const router = Router();

router.post("/products", create);
router.get("/products/:slug", read);
router.get("/products", list);
router.put("/products/:id", update);
router.delete("/products/:id", remove);

export default router;