import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db-config";
import shortUrl from "./routes/short-url.route";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: [
        "https://nanourl-1.onrender.com",
        "http://localhost:5173",
        "http://localhost:3000"
    ],
    credentials: true,
    optionsSuccessStatus: 200
}));
app.options("*", cors());
app.use("/api", shortUrl);

connectDB();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
});