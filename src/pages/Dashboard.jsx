import { useEffect, useState } from "react";

import "../styles/dashboard.css";
import "../styles/theme.css";
import api from "../services/api";

function Dashboard() {

  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);

  const fetchDashboardData = async () => {

    try {

      const response = await api.get("/users");
      const users = response.data.users;

      const localEmployees =
      JSON.parse(localStorage.getItem("newEmployees")) || [];

      setEmployees([
      ...localEmployees,
      ...users,
    ]);

    // GET UNIQUE DEPARTMENTS
      const uniqueDepartments = [
        ...new Set(
          users.map(
            (user) => user.company.department
          )
        ),
      ];
      
      setDepartments(uniqueDepartments);

    } catch (error) {

      console.log(error);

    }
  };

// FETCH DASHBOARD DATA
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDashboardData();

  }, []);

  const activeUsers = employees.filter(
    (user) => user.age > 18
  );

  return (
    <>
      <div className="app-theme">

        <div className="container mt-5 pt-5">

        <div className="row g-4">

          <div className="col-md-4">

         {/* DASHBOARD CARDS */}
            <div className="card border-0 shadow-sm p-4 text-center dashboard-card">
              <h3>Total Employees</h3>

              <h1 className="text-primary">
                {employees.length}
              </h1>
            </div>

          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4 text-center dashboard-card">

              <h3>Departments</h3>

              <h1 className="text-success">
                {departments.length}
              </h1>

            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4 text-center dashboard-card">

              <h3>Active Users</h3>

              <h1 className="text-danger">
                {activeUsers.length}
              </h1>
            </div>
          </div>

        </div>
 
      {/* WELCOME SECTION */}
        <div className="text-center card border-0 shadow-sm mt-5 p-5 welcome-card">
          <h1 className="fw-bold dashboard-heading">
            Welcome to Employee Management Dashboard
          </h1>

          <p className="mt-4 text-muted mx-auto dashboard-text">
            Manage employees, monitor records,
            and maintain employee data efficiently.
          </p>
        </div>

      </div>
      </div>
    </>
  );
}

export default Dashboard;