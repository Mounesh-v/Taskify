import express from "express";
import { dashboard, login, signup } from "../Controller/User.js";
import protect from "../MiddleWare/authMiddleware.js";
import { completeTask, createTask, deleteTask, getAllTask } from "../Controller/TaskController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/dashboard", protect, dashboard);
router.post("/add", protect, createTask);
router.get("/my-tasks", protect, getAllTask);
router.put("/complete/:id",protect,completeTask);
router.delete("/delete/:id",protect,deleteTask);

export default router;
