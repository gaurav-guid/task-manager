import { Routes, Route } from "react-router-dom";
import Login from "./views/login";

function App() {
  return (
    <div className="Task Manager">
      <div>Hello World from task manager!</div>
      <Routes>
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
