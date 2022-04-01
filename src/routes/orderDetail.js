import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/orderDetail";

const router = Router();

router.post("/orderDetail", create);
router.get("/orderDetail/:id", read);
router.get("/orderDetail", list);
router.put("/orderDetail/:id", update);
router.delete("/orderDetail/:id", remove);

export default router;