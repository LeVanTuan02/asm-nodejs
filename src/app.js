import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';

// routes

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

// connect db
mongoose.connect("mongodb://localhost:27017/asm-nodejs")
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.log(error));

// connect
const PORT = 8080;
app.listen(PORT, () => console.log(`App is running on port: ${PORT}`));