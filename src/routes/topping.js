import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/topping";
import { userById } from "../controllers/user";
import { isAdmin, isAuth, requireSignin } from "../middlewares/checkAuth";

const router = Router();

router.post("/toppings/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/toppings/:id", read);
router.get("/toppings", list);
router.put("/toppings/:id/:userId", requireSignin, isAuth, isAdmin, update);
router.delete("/toppings/:id/:userId", requireSignin, isAuth, isAdmin, remove);

router.param("userId", userById);

export default router;