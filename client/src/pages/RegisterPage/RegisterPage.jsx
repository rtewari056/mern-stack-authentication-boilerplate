import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Button } from "react-bootstrap";

import { AuthState } from "../../context/AuthProvider";

const RegisterPage = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { setAuth } = AuthState();

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
      return toast.warn("Please Fill all the Feilds", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    // If password and confirm password doesn't match
    if (credentials.password !== credentials.confirmPassword) {
      return toast.warn("Passwords Do Not Match", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
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
      setAuth(data);

      navigate("/"); // Go to home page
    } catch (error) {
      return toast.error("Internal server error", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <Form className="auth__form" onSubmit={registerHandler}>
      <h2 className="text-center mb-5">Create new account</h2>

      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="username"
          name="username"
          tabIndex="1"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => handleCredentials(e)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          tabIndex="2"
          placeholder="Enter email"
          value={credentials.email}
          onChange={(e) => handleCredentials(e)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          tabIndex="3"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => handleCredentials(e)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="confirmPassword">
        <Form.Label>confirmPassword</Form.Label>
        <Form.Control
          type="confirmPassword"
          name="confirmPassword"
          tabIndex="4"
          placeholder="Confirm password"
          value={credentials.confirmPassword}
          onChange={(e) => handleCredentials(e)}
        />
      </Form.Group>

      <Button tabIndex="5" variant="success" type="submit" className="mb-3">
        Create Account
      </Button>

      <Form.Group className="mb-3 text-center" controlId="register">
        <span>
          Already have an account?&nbsp;
          <Link to="/login" className="text-decoration-none">
            Log in
          </Link>
        </span>
      </Form.Group>
    </Form>
  );
};

export default RegisterPage;
