import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddTask from "./components/addTask";
import EditTask from "./components/editTask";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks/new" element={< AddTask/>} />
        <Route path="/tasks/:id" element={<EditTask />} />
      </Routes>
    </Router>
  );
}

export default App;
