import { Routes, Route } from "react-router-dom";
import Login from "./views/login";

function App() {
  return (
    <div className="Task Manager">
      <Routes>
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
