import { Routes, Route, useNavigate, useState, Link } from "react-router-dom";
import HomePage from "./views/home-page";
import Login from "./views/login";
import Signup from "./views/signup";
import EditTask from "./views/edit-task";
import Tasks from "./views/tasks";
import { useEffect } from "react";
import { setNavigateFunction } from "./services/navigation-service";

function App() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("jwt");

  useEffect(() => {
    setNavigateFunction(navigate);
  }, [navigate]);

  return (
    <div className="container-fluid mt-4">
      <div
        className="d-flex justify-content-between align-items-center p-2"
        style={{ backgroundColor: "grey", borderRadius: 8 }}
      >
        <Link to="/">
          <span className="badge bg-dark">
            <h4 class="mb-0">Task Manager</h4>
          </span>
        </Link>
        {isLoggedIn ? (
          <input
            type="button"
            class="btn btn-primary"
            value="Logout"
            onClick={() => {
              localStorage.removeItem("jwt");
              navigate("/login");
            }}
          />
        ) : (
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="task" element={<EditTask />} />
      </Routes>
    </div>
  );
}

export default App;
