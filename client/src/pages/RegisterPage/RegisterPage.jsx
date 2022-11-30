import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Spinner } from "react-bootstrap";

import { AuthState } from "../../context/AuthProvider";
import { Notify } from "../../utils";

const RegisterPage = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setAuth } = AuthState();

  const handleCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // If any field is missing
    if (
      !credentials.username ||
      !credentials.email ||
      !credentials.password ||
      !credentials.confirmPassword
    ) {
      setIsLoading(false);
      return Notify("Please Fill all the Feilds", "warn");
    }

    // If password and confirm password doesn't match
    if (credentials.password !== credentials.confirmPassword) {
      setIsLoading(false);
      return Notify("Passwords Do Not Match", "warn");
    }

    // If password is less than 8 characters
    if (credentials.password.length < 8) {
      setIsLoading(false);
      return Notify("Password must be at least 8 characters", "warn");
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

      if (data.success) {
        localStorage.setItem("auth", JSON.stringify(data)); // Save auth details in local storage
        setAuth(data);
        setIsLoading(false);
        navigate("/"); // Go to home page
        return Notify("Your account has been successfully created", "success");
      } else {
        setIsLoading(false);
        return Notify(data.error, "error");
      }
    } catch (error) {
      setIsLoading(false);
      return Notify("Internal server error", "error");
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
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          name="confirmPassword"
          tabIndex="4"
          placeholder="Confirm password"
          value={credentials.confirmPassword}
          onChange={(e) => handleCredentials(e)}
        />
      </Form.Group>

      <Button
        tabIndex="5"
        variant="success"
        type="submit"
        className="mb-3"
        disabled={isLoading}
      >
        {isLoading ? (
          <Spinner animation="border" role="status" size="sm" />
        ) : (
          "Create Account"
        )}
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
