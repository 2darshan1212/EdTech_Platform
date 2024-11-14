import express from 'express';
import {connectDB} from './config/db.js';
import {} from "dotenv/config.js";

const app = express();

// Connect Database
connectDB();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
}); 


