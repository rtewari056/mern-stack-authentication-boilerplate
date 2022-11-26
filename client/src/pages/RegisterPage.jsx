import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [alert, setAlert] = useState({
    type: "",
    display: false,
    message: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/");
    }
  }, [navigate]);

  const handleCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    // If any field is missing
    if (
      !credentials.username ||
      !credentials.email ||
      !credentials.password ||
      !credentials.confirmPassword
    ) {
      setTimeout(() => {
        setAlert({
          type: "",
          display: false,
          message: "",
        });
      }, 5000);
      return setAlert({
        type: "warning",
        display: true,
        message: "Please Fill all the Feilds",
      });
    }

    // If password and confirm password doesn't match
    if (credentials.password !== credentials.confirmPassword) {
      setTimeout(() => {
        setAlert({
          type: "",
          display: false,
          message: "",
        });
      }, 5000);
      return setAlert({
        type: "warning",
        display: true,
        message: "Passwords Do Not Match",
      });
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: credentials.username,
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const data = await response.json();

      localStorage.setItem("auth", JSON.stringify(data)); // Save auth details in local storage

      navigate("/"); // Go to home page
    } catch (error) {
      setTimeout(() => {
        setAlert({
          type: "",
          display: false,
          message: "",
        });
      }, 5000);
      return setAlert({
        type: "error",
        display: true,
        message: "Internal server error",
      });
    }
  };

  return (
    <form onSubmit={registerHandler}>
      {alert.display && (
        <span className={`${alert.type}-message`}>{alert.message}</span>
      )}
      <h3>Register</h3>
      <div>
        <label htmlFor="name">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter username"
          value={credentials.username}
          onChange={(e) => handleCredentials(e)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email address"
          value={credentials.email}
          onChange={(e) => handleCredentials(e)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="true"
          placeholder="Enter password"
          value={credentials.password}
          onChange={(e) => handleCredentials(e)}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          autoComplete="true"
          placeholder="Confirm password"
          value={credentials.confirmPassword}
          onChange={(e) => handleCredentials(e)}
        />
      </div>
      <button type="submit">Register</button>

      <br />

      <span>
        Already have an account? <Link to="/login">Login</Link>
      </span>
    </form>
  );
};

export default RegisterPage;
