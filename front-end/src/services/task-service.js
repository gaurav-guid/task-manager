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

async function updateTask(taskId, { title, description, due_date, status }) {
  try {
    const res = await fetchWithAuth(`/api/task/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, due_date, status }),
    });

    if (!res.success) {
      throw new Error(res.errorMessage);
    }
    return res.data.task;
  } catch (error) {
    console.error("Error while updating task", error);
    throw new Error(error);
  }
}

async function deleteTask(taskId) {
  try {
    const res = await fetchWithAuth(`/api/task/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.success) {
      throw new Error(res.errorMessage);
    }
  } catch (error) {
    console.error("Error while deleting task", error);
    throw new Error(error);
  }
}

async function getTaskById(taskId) {
  try {
    const res = await fetchWithAuth(`/api/task/${taskId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

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
    }
    return res.data.tasks;
  } catch (error) {
    console.error("Error while listing tasks", error);
    throw new Error(error);
  }
}

const taskService = {
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
  listAllTasks,
};

export default taskService;
