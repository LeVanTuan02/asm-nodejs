import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/favoritesProduct";
import { userById } from "../controllers/user";
import { isAuth, requireSignin } from "../middlewares/checkAuth";

const router = Router();

router.post("/favoritesProduct/:userId", requireSignin, isAuth, create);
router.get("/favoritesProduct/:id", read);
router.get("/favoritesProduct", list);
router.put("/favoritesProduct/:id/:userId", requireSignin, isAuth, update);
router.delete("/favoritesProduct/:id/:userId", requireSignin, isAuth, remove);

router.param("userId", userById);

export default router;