import mongoose from "mongoose";
import Task from "../Model/Task.js";

export const createTask = async (req, res) => {
  try {
    console.log(req.body);
    const { title, description, dueDate, completedAt } = req.body;
    if (!completedAt || !title)
      return res.status(402).json({ msg: "Filed is Required" });
    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      dueDate,
      completedAt,
    });
    res.status(200).json({ msg: "Task Created Sucessfully", task });
  } catch (error) {
    console.log("Error is ", error);
  }
};

export const getAllTask = async (req, res) => {
  try {
    const task = await Task.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      msg: "Tasks fetched successfully",
      task,
    });
  } catch (error) {
    console.log("Error fetching tasks:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

export const completeTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        isComplete: true,
        completedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json({
      msg: "Task marked as completed",
      task: updatedTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params; 

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json({ msg: "Task deleted successfully", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};
