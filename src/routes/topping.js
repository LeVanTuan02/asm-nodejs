import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/topping";

const router = Router();

router.post("/toppings", create);
router.get("/toppings/:id", read);
router.get("/toppings", list);
router.put("/toppings/:id", update);
router.delete("/toppings/:id", remove);

export default router;