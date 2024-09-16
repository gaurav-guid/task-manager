const { Task } = require("../db/initialize");

exports.createTask = async (task, userId) => {
  const { title, description, due_date, status } = task;
  const createdTask = await Task.create({
    title,
    description,
    due_date,
    status,
    user_id: userId,
  });

  if (createdTask) {
    return createdTask;
  } else {
    throw new Error("Unable to create task");
  }
};

exports.updateTask = async (taskId, task, userId) => {
  console.log(task);
  const { id, title, description, due_date, status, user_id } = task;

  if (id && id !== taskId) {
    throw new Error("Invalid update attempt");
  }

  if (user_id && userId !== user_id) {
    throw new Error("You are not authorized to update this task");
  }

  const existingTask = await Task.findById(taskId);
  if (existingTask.user_id.toString() !== userId) {
    throw new Error("Ownership of a task can not be changed");
  }

  const updatedTask = await Task.findByIdAndUpdate(taskId, {
    title,
    description,
    due_date,
    status,
  });

  if (updatedTask) {
    return updatedTask;
  } else {
    throw new Error("Unable to update task");
  }
};

exports.getTaskById = async (id, userId) => {
  const task = await Task.findById(id);

  if (!task) {
    throw new Error(`Task (${id}) not found`);
  } else if (task.user_id != userId) {
    throw new Error("You are not authorized to view this task");
  }

  return task;
};

exports.getAllTasks = async (userId) => {
  const tasks = await Task.find({ user_id: userId });
  return tasks;
};
