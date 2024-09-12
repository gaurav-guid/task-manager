import { Routes, Route } from "react-router-dom";
import Login from "./views/login";
import Signup from "./views/signup";

function App() {
  return (
    <div className="Task Manager">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
