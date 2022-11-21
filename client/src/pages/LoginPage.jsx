import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
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

  const loginHandler = async (e) => {
    e.preventDefault();

    // If any field is missing
    if (!credentials.email || !credentials.password) {
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

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const data = await response.json();

      localStorage.setItem("authToken", data.token); // Save token in local storage

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
    <form onSubmit={loginHandler}>
      {alert.display && (
        <span className={`${alert.type}-message`}>{alert.message}</span>
      )}
      <h3>Login</h3>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          required
          id="email"
          name="email"
          placeholder="Email address"
          tabIndex={1}
          value={credentials.email}
          onChange={(e) => handleCredentials(e)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          required
          id="password"
          name="password"
          autoComplete="true"
          placeholder="Enter password"
          tabIndex={2}
          value={credentials.password}
          onChange={(e) => handleCredentials(e)}
        />
      </div>
      <button type="submit">Login</button>

      <br />

      <span>
        <Link to="/forgotPassword">Forgot Password?</Link>
      </span>

      <br />

      <span>
        Don't have an account? <Link to="/register">Register</Link>
      </span>
    </form>
  );
};

export default LoginPage;
