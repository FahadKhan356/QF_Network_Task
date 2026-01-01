import express from "express";
import "dotenv/config";
import authRoutes from "./src/routes/authRoutes.js";
import { connectDB } from "./lib/db.js";

import cors from "cors";

const app = express();

const PORT=process.env.PORT;




app.use(express.json());
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());


app.use("/api/authentication",authRoutes);

connectDB();
app.listen(PORT,()=>{
    console.log({PORT});
    console.log(`server is running on Port ${PORT}`);
    console.log("AUTH ROUTES:", authRoutes);
    
});