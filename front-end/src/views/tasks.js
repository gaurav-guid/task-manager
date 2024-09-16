import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import taskService from "../services/task-service";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setError(null);
      const allTasks = await taskService.listAllTasks();
      setTasks(allTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to fetch tasks. Please try again later.");
    }
  };

  const filterTasksByStatus = (status) => {
    console.log(tasks);
    return tasks.filter(
      (task) => task.status.toLowerCase() === status.toLowerCase()
    );
  };

  const isOverdue = (dateString) => {
    if (!dateString) return false;
    const [year, month, day] = dateString.split("T")[0].split("-");
    const dueDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to beginning of day for accurate comparison
    return dueDate < today;
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "success";
      case "inprogress":
        return "warning";
      case "":
        return "info";
      default:
        return "secondary";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return "No due date";
    }
    const [year, month, day] = dateString.split("T")[0].split("-");
    const date = new Date(year, month - 1, day);
    return date.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const renderTaskColumn = (title, status) => (
    <div className="col">
      <h2 className="h4 mb-3">{title}</h2>
      <div className="lane bg-light p-2 rounded">
        {filterTasksByStatus(status).map((task) => (
          <div key={task.id} className="card mb-2">
            <div className="card-body">
              <h5 className="card-title">{task.title}</h5>
              <p className="card-text">{task.description}</p>
              <p className="card-text">
                <small className="text-muted">
                  Due: {formatDate(task.due_date)}
                </small>
              </p>
              <p className="card-text">
                <span className="badge bg-danger">
                  {isOverdue(task.due_date) && <span>Overdue</span>}
                </span>
              </p>
              <Link
                to={`/editTask?taskId=${task._id}`}
                className="btn btn-primary btn-sm"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Tasks</h1>
        <Link to="/task" className="btn btn-primary">
          Create Task
        </Link>
      </div>
      {tasks.length === 0 ? (
        <p className="alert alert-info">No tasks found.</p>
      ) : (
        <div className="row">
          {renderTaskColumn("Pending", "pending")}
          {renderTaskColumn("In Progress", "inProgress")}
          {renderTaskColumn("Completed", "completed")}
        </div>
      )}
    </div>
  );
};

export default Tasks;
