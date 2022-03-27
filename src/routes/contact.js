import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/contact";
import { userById } from "../controllers/user";
import { isAdmin, isAuth, requireSignin } from "../middlewares/checkAuth";

const router = Router();

router.post("/contact/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/contact/:id", read);
router.get("/contact", list);
router.put("/contact/:id/:userId", requireSignin, isAuth, isAdmin, update);
router.delete("/contact/:id/:userId", requireSignin, isAuth, isAdmin, remove);

router.param("userId", userById)

export default router;