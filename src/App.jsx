// src/App.jsx
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import "./styles/theme.css";

function App() {

  const [darkMode, setDarkMode] = useState(() => {
  return localStorage.getItem("theme") === "dark";
});

const toggleTheme = () => {
  const newTheme = !darkMode;

  setDarkMode(newTheme);

  localStorage.setItem(
    "theme",
    newTheme ? "dark" : "light"
  );
};

  return (
  <div className={darkMode ? "dark-theme" : "light-theme"}>
    <BrowserRouter>

      <Navbar
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      />

      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <Employees />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-employee"
          element={
            <ProtectedRoute>
              <AddEmployee />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  </div>
);
}

export default App;