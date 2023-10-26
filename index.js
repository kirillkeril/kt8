import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {articleRouter, productRouter, usersRouter} from "./routes/index.js";
import cookieParser from "cookie-parser";
import mongoose from 'mongoose';
import errorsMiddleware from "./middleware/error-midlevare.js";

// configure
dotenv.config();
const app = express();
const PORT = process.env.PORT;
const DB_CONNECTION = process.env.DB_CONNECTION;


app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('build'));

app.use('/api/users', usersRouter);
app.use('/api/products', productRouter);
app.use('/api/articles', articleRouter);
app.use(errorsMiddleware);


const bootstrap = async () => {
    try {
        await mongoose.connect(DB_CONNECTION);
        app.listen(PORT, () => {
            console.log(`Server has been started on ${process.env.API_PATH}`)
        });
    } catch (e) {
        console.log(e)
    }
}

bootstrap();