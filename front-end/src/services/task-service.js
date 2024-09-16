import { fetchWithAuth } from "../utils/api";

async function createTask({ title, description, due_date, status }) {
  try {
    const res = await fetchWithAuth("/api/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, due_date, status }),
    });

    console.log(res);
    if (!res.success) {
      throw new Error(res.errorMessage);
    }
    return res.data.task;
  } catch (error) {
    console.error("Error while creating task", error);
    throw new Error(error);
  }
}

async function listAllTasks() {
  try {
    const res = await fetchWithAuth("/api/task", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.success) {
      throw new Error(res.errorMessage);
    }
    return res.data.tasks;
  } catch (error) {
    console.error("Error while listing tasks", error);
    throw new Error(error);
  }
}

const taskService = {
  createTask,
  listAllTasks,
};

export default taskService;
