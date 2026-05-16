const Task = require("../models/taskModel");


// CREATE TASK
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);

    res.status(201).json(task);

  } catch (error) {

    
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Task title already exists",
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL TASKS
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE TASK
const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE TASK
const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Task deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
