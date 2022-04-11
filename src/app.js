import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

// routes
import categoryRouter from "./routes/category";
import productRouter from "./routes/product";
import sliderRouter from "./routes/slider";
import sizeRouter from "./routes/size";
import toppingRouter from "./routes/topping";
import storeRouter from "./routes/store";
import voucherRouter from "./routes/voucher";
import cateNewsRouter from "./routes/cateNews";
import newsRouter from "./routes/news";
import contactRouter from "./routes/contact";
import userRouter from "./routes/users";
import authRouter from "./routes/auth";
import orderRouter from "./routes/order";
import orderDetailRouter from "./routes/orderDetail";
import addressRouter from "./routes/address";
import cmtRouter from "./routes/comment";
import ratingRouter from "./routes/rating";
import favoritesRouter from "./routes/favoritesProduct";
import orderLogRouter from "./routes/orderLogs";
import sendMailRouter from "./routes/sendMail";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Library API",
            version: "1.0.0",
            description: "A simple Express Library API"
        },
        servers: [
            {
                url: "http://localhost:8080"
            }
        ]
    },
    apis: ["./src/controllers/*.js", "./src/models/*.js", "./src/routes/*.js"]
};
  
const specs = swaggerJsDoc(options);

const app = express();
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.use("/api", categoryRouter);
app.use("/api", productRouter);
app.use("/api", sliderRouter);
app.use("/api", sizeRouter);
app.use("/api", toppingRouter);
app.use("/api", storeRouter);
app.use("/api", voucherRouter);
app.use("/api", cateNewsRouter);
app.use("/api", newsRouter);
app.use("/api", contactRouter);
app.use("/api", userRouter);
app.use("/api", authRouter);
app.use("/api", orderRouter);
app.use("/api", orderDetailRouter);
app.use("/api", addressRouter);
app.use("/api", cmtRouter);
app.use("/api", ratingRouter);
app.use("/api", favoritesRouter);
app.use("/api", orderLogRouter);
app.use("/api", sendMailRouter);

// connect db
mongoose.connect("mongodb://localhost:27017/asm-nodejs")
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.log(error));

// connect
const PORT = 8080;
app.listen(PORT, () => console.log(`App is running on port: ${PORT}`));