import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/user";
import { userById } from "../controllers/user";
import { isAdmin, isAuth, requireSignin } from "../middlewares/checkAuth";

const router = Router();

router.post("/users/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/users/:id", read);
router.get("/users", list);
router.put("/users/:id/:userId", requireSignin, isAuth, isAdmin, update);
router.put("/users/updateInfo/:myId/:userId", requireSignin, isAuth, update);
router.delete("/users/:id/:userId", requireSignin, isAuth, isAdmin, remove);

router.param("userId", userById);

export default router;