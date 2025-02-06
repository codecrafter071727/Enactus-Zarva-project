import express from "express";
import dotenv from "dotenv";
import SafeRouter from "./Routes/FetchRoutes.js";

dotenv.config();
console.log("Environment variables loaded.");

import cors from "cors"

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/v1/api/", SafeRouter);
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));


app.use(express.static("public"));


app.get("/", (req, res)=>{
    res.send("working...");
    console.log("working...");
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
