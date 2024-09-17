import React, { useEffect, useState } from "react";
import taskService from "../services/task-service";
import { Link, useLocation } from "react-router-dom";
import { navigateTo } from "../services/navigation-service";

const EditTask = () => {
  //DEBT: replace individual useState by useState of task
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState("");

  let location = useLocation();
  const params = new URLSearchParams(location.search);
  const taskId = params.get("taskId");

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    if (isNew) {
      return;
    }
    try {
      setError(null);
      const task = await taskService.getTaskById(taskId);
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.due_date.split("T")[0]);
      setStatus(task.status);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to fetch tasks. Please try again later.");
    }
  };

  const isNew = !taskId;

  const save = async (e) => {
    setError("");
    e.preventDefault();
    let task = {};
    try {
      if (isNew) {
        task = await taskService.createTask({
          title,
          description,
          due_date: dueDate,
          status,
        });
      } else {
        task = await taskService.updateTask(taskId, {
          title,
          description,
          due_date: dueDate,
          status,
        });
      }
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.due_date.split("T")[0]);
      setStatus(task.status);

      navigateTo("/tasks");
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTask = async (e) => {
    e.preventDefault();
    await taskService.deleteTask(taskId);
    navigateTo("/tasks");
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">
                {isNew ? "Create" : "Edit"} Task
              </h2>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={save}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title:
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description:
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="dueDate" className="form-label">
                    Due Date:
                  </label>
                  <input
                    className="form-control"
                    type="date"
                    id="dueDate"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value.split("T")[0])}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    Status:
                  </label>
                  <select
                    className="form-control"
                    type="text"
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="inProgress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    {isNew ? "Create" : "Save"}
                  </button>
                  {!isNew && (
                    <button
                      type="button"
                      className="mt-4 btn btn-danger"
                      onClick={deleteTask}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
