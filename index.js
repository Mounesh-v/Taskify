import express from "express";
import dotenv from "dotenv";
import ConnectDb from "./Config/db.js";
import router from "./Routes/UserRoute.js";
import cors from "cors";
const app = express();
dotenv.config();
ConnectDb();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/user", router);
app.use("/api/task", router);

const port = 3000;

app.listen(port, (req, res) => {
  console.log(`Server is running on http://localhost:${port}`);
});
