import { useEffect, useState } from "react";

import api from "../services/api";
import "../styles/theme.css";

function Employees() {

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const employeesPerPage = 6;

 // FETCH EMPLOYEES
  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {

    try {

      setLoading(true);

      const response = await api.get("/users");

      const apiEmployees = response.data.users;

    const localEmployees =
    JSON.parse(localStorage.getItem("newEmployees")) || [];

    const formattedLocalEmployees = localEmployees.map(
    (employee, index) => ({
        id: Date.now() + index,
        firstName: employee.fullName,
        lastName: "",
        email: employee.email,
        phone: employee.phone,
        image:
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    })
    );

    setEmployees([
    ...formattedLocalEmployees,
    ...apiEmployees,
    ]);

    } catch (error) {

      console.log("Error fetching employees", error);

    } finally {

      setLoading(false);

    }
  };

  // FILTER EMPLOYEES
  const filteredEmployees = employees.filter((employee) =>
    `${employee.firstName} ${employee.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // PAGINATION LOGIC
  const indexOfLastEmployee =
  currentPage * employeesPerPage;

  const indexOfFirstEmployee =
  indexOfLastEmployee - employeesPerPage;

  const currentEmployees =
  filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

const totalPages = Math.ceil(
  filteredEmployees.length / employeesPerPage
);

  return (
    <>
     
      <div className="app-theme employees-page d-flex flex-column">

        <div className="container mt-4 pt-5 flex-grow-1">

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">

          <h2 className="fw-bold">
            Employees
          </h2>

        {/* SEARCH BAR */}
          <input
            type="text"
            placeholder="Search employee..."
            className="form-control employee-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        {
          loading ? (

            <div className="text-center mt-5">

              <div className="spinner-border text-primary"></div>

            </div>

          ) : (

  <>
  
    {
      filteredEmployees.length === 0 && (

        <h5 className="text-center mt-5 text-muted">
          No employees found
        </h5>

      )
    }

    <div className="row">

      {currentEmployees.map((employee) => (

        <div
          className="col-lg-4 col-md-6 mb-4"
          key={employee.id}
        >
          <div
            className={`card shadow-sm border-0 h-100 employee-card ${
                employee.email.includes("@gmail.com")
                ? "border border-primary"
                : ""
            }`}>

            <img
              src={employee.image}
              className="card-img-top p-3 employee-image"
              alt="employee"
            />

            <div className="card-body">

              <h5 className="fw-bold">
                {employee.firstName} {employee.lastName}
                {
                employee.email.includes("@gmail.com") && (
                    <span className="badge bg-primary mb-2">
                    New
                    </span>
                )
                }
              </h5>

              <p className="mb-2">
                <strong>Email:</strong> {employee.email}
              </p>

              <p className="mb-0">
                <strong>Phone:</strong> {employee.phone}
              </p>

            </div>

          </div>

        </div>

      ))}

    </div>

    {/* PAGINATION */}
    <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 mt-4">
    <button
      className="btn btn-primary mb-2 px-4 pagination-btn"
      disabled={currentPage === 1}
      onClick={() =>
        setCurrentPage(currentPage - 1)
      }
    >
      Previous
    </button>

    <span className="fw-semibold"
      >
      Page {currentPage} of {totalPages}
      
    </span>

    <button
      className="btn btn-primary mb-2 px-4 pagination-btn"
      disabled={currentPage === totalPages}
      onClick={() =>
        setCurrentPage(currentPage + 1)
      }
    >
      Next
    </button>
  </div>
  {/* PAGINATION END */}

  </>

)
        }

      </div>
      </div>
    </>
  );
}

export default Employees;