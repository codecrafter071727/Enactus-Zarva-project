import express from "express";
import dotenv from "dotenv";
import SafeRouter from "./Routes/FetchRoutes.js";
import cors from "cors"; // ✅ Already using ES module import

dotenv.config();
console.log("Environment variables loaded.");

const app = express();
const PORT = process.env.PORT || 3000; // ✅ Default to 3000 if PORT is undefined

// ✅ Enable CORS BEFORE defining any routes
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(express.static("public"));

app.use("/v1/api/", SafeRouter); // ✅ Register routes after middleware

app.get("/", (req, res) => {
    res.send("working...");
    console.log("working...");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
