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

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Tasks</h1>
        <Link to="/task" className="btn btn-primary">
          Create Task
        </Link>
      </div>
      {tasks.length === 0 ? (
        <p className="alert alert-info">No tasks found.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {tasks.map((task) => (
            <div key={task.id} className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{task.title}</h5>
                  <p className="card-text">{task.description}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      Due Date: {new Date(task.dueDate).toLocaleDateString()}
                    </small>
                  </p>
                  <p className="card-text">
                    <span className={`badge bg-${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </p>
                </div>
                <div className="card-footer">
                  <Link
                    to={`/task?taskId=${task._id}`}
                    className="btn btn-primary btn-sm"
                  >
                    Edit Task
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "success";
    case "in progress":
      return "warning";
    case "":
      return "info";
    default:
      return "secondary";
  }
};

export default Tasks;
