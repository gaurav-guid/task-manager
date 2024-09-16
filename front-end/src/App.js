import { Routes, Route } from "react-router-dom";
import Login from "./views/login";
import Signup from "./views/signup";
import EditTask from "./views/edit-task";
import Tasks from "./views/tasks";

function App() {
  return (
    <div className="Task Manager">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="task" element={<EditTask />} />
      </Routes>
    </div>
  );
}

export default App;
