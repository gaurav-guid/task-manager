import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import authService from "../services/auth-service";

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(authService.isLoggedIn());
  });

  return (
    <div className="home-page">
      <h1>Welcome to Task Manager</h1>

      {isLoggedIn ? (
        <div>
          <p>Start managing your tasks!</p>
          <Link className="btn btn-primary" to="/tasks">
            View Tasks
          </Link>
        </div>
      ) : (
        <div>
          <p>Please log in or sign up to start managing your tasks.</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
