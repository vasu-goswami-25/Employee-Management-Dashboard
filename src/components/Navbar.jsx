import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/navbar.css";

function Navbar({ darkMode, toggleTheme }) {

  const navigate = useNavigate();

  // LOGOUT USER
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

// HIDE NAVBAR ON LOGIN PAGE
  const location = useLocation();
    if (location.pathname === "/") {
      return null;
    }

  return (
    <nav className="navbar navbar-expand-lg custom-navbar fixed-top ">

      <Link className="ms-3 navbar-brand" to="/dashboard">
        Employee Dashboard
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">

      {/* NAVIGATION LINKS */}
        <ul className="navbar-nav ms-auto align-items-center">
          <li className="nav-item mt-1">
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          </li>

          <li className="nav-item mt-1">
            <Link className="nav-link" to="/employees">
              Employees
            </Link>
          </li>

          <li className="nav-item mt-1">
            <Link className="nav-link" to="/add-employee">
              Add Employee
            </Link>
          </li>
        </ul> 
        
        {/* Toggle or Logout Button */}
          <div className="d-flex  gap-3 me-3 navbar-actions">
            <button
              className={`theme-toggle-switch ${
                darkMode ? "active" : ""
              }`}
              onClick={toggleTheme}
            >
              <span className="toggle-thumb">
                {darkMode ? "🌙" : "☀"}
              </span>
            </button>

            <button
              className="btn btn-danger btn-sm px-3"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
          
      </div>
    </nav>
  );
}

export default Navbar;