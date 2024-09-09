const taskService = require("../services/task-service");

exports.createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body, req.user.id);
    res.status(201).json({ task });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const task = await taskService.updateTask(taskId, req.body, req.user.id);
    res.status(200).json({ task });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTask = (req, res) => {
  res.json({ message: "Task fetched successfully" });
};

exports.listTasks = (req, res) => {
  res.json({ message: "Task listed successfully" });
};

exports.queryTasks = (req, res) => {
  res.json({ message: "Task queries successfully" });
};
