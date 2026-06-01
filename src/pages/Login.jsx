import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/login.css";
import "../styles/theme.css";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

  {/* LOGIN FORM */}
    if (!username || !password) {
 
      // FORM VALIDATION
      toast.error("Please fill all fields");
      return;

    }

    try {

      // LOGIN API CALL
      const response = await fetch(
        "https://dummyjson.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {

      // STORE TOKEN
        localStorage.setItem(
          "token",
          data.accessToken || data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(data)
        );

      // SHOW SUCCESS MESSAGE
        toast.success("Login Successful");

      // REDIRECT USER
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);

      } else {
        toast.error( "Invalid username or password");
      }

    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (

    <div className="login-page container-fluid d-flex justify-content-center align-items-center">
      <div className="row w-100 justify-content-center">

        <div className="col-lg-4 col-md-6 col-sm-10">

          <div className="card p-4 shadow border-0 login-card">

            <h2 className="text-center mb-4">
              Login
            </h2>
            
            <form onSubmit={handleLogin}>

            {/* USERNAME FIELD */}
              <div className="mb-3">

                <label className="form-label">
                  Username
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter username or email"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                />
              </div>

            {/* PASSWORD FIELD */}
              <div className="mb-4">

                <label className="form-label">
                  Password
                </label>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />
              </div>

              {/* LOGIN BUTTON */}
              <button className="btn btn-primary w-100 py-2">
                Login
              </button>
            </form>

          {/* TOAST NOTIFICATIONS */}
            <ToastContainer
              position="top-center"
              autoClose={1500}
            />
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;