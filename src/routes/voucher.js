import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/voucher";

const router = Router();

router.post("/voucher", create);
router.get("/voucher/:id", read);
router.get("/voucher", list);
router.put("/voucher/:id", update);
router.delete("/voucher/:id", remove);

export default router;