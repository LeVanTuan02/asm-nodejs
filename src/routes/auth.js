import { Router } from "express";
import { checkPassword, signin, signup } from "../controllers/auth";

const router = Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/checkPassword", checkPassword);

export default router;