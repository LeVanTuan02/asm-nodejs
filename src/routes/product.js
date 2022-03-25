import { Router } from "express";
import { list } from "../controllers/product";

const productRouter = Router();

productRouter.get("/products", list);

export default productRouter;