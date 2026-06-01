import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/addEmployee.css";
import "../styles/theme.css";

function AddEmployee() {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    role: "",
  });

// HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  //  FORM VALIDATION
    const { fullName, email, phone, department, role } =
      formData;

    if (
      !fullName ||
      !email ||
      !phone ||
      !department ||
      !role
    ) {
      toast.error("All fields are required");
      
      return;
    }

    const existingEmployees =
    JSON.parse(localStorage.getItem("newEmployees")) || [];

    const updatedEmployees = [
    ...existingEmployees,
    formData,
    ];

  // SAVE TO LOCAL STORAGE
    localStorage.setItem(
    "newEmployees",
    JSON.stringify(updatedEmployees)
    );

    toast.success("Employee added successfully");

// RESET FORM
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      department: "",
      role: "",
    });
  };

  return (
    <>
      

      <div className="app-theme">

        <div className="container pt-5 mt-5">

        <div className="row justify-content-center">

          <div className="col-md-6">

          {/* ADD EMPLOYEE FORM */}
            <div className="card border-0 shadow-sm p-4 add-card">

              <h1 className="add-title">
                Add New Employee
              </h1>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">
                    Full Name
                  </label>

                  <input
                    type="text"
                    className="form-control custom-input"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control custom-input"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    className="form-control custom-input"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Department
                  </label>

                  <input
                    type="text"
                    className="form-control custom-input"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Role
                  </label>

                  <input
                    type="text"
                    className="form-control custom-input"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  />
                </div>

                <button className="btn btn-primary w-100 add-btn">
                  Add Employee
                </button>

              </form>
              
            {/* TOAST NOTIFICATIONS */}
              <ToastContainer
                position="top-center"
                autoClose={2000}
              />

            </div>
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
}

export default AddEmployee;