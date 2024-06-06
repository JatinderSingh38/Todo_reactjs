import mongoose from "mongoose";
import express from "express";
import authRouter from "./routes/auth.js";
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
const app = express();
//const port = 5000;
dotenv.config();
const port = process.env.PORT;   //import dotenv
app.use(cors());
app.use(express.json())
app.use("/", authRouter)

mongoose.connect(process.env.CONNECTION_STRING, {

    useNewUrlParser: true,
    useUnifiedTopology: true
}
).then(() => {
    console.log("_________________name:todolist______DATABASE CONNECTED______________________________")
}).catch((error) => {
    console.log("Database is not connected", error);
})
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})

