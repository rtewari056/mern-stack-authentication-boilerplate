import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Spinner } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";

import { AuthState } from "../../context/AuthProvider";
import { Notify } from "../../utils";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setAuth } = AuthState();

  const handleCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // If any field is missing
    if (!credentials.email || !credentials.password) {
      setIsLoading(false);
      return Notify("Please Fill all the Feilds", "warn");
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

      if (data.success) {
        localStorage.setItem("auth", JSON.stringify(data)); // Save auth details in local storage
        setAuth(data);
        setIsLoading(false);
        navigate("/"); // Go to home page
        return Notify("You are successfully logged in", "success");
      } else {
        setIsLoading(false);
        return Notify(data.error, "warn");
      }
    } catch (error) {
      setIsLoading(false);
      return Notify("Internal server error", "error");
    }
  };

  return (
    <Form className="auth__form" onSubmit={loginHandler}>
      <h3 className="text-center mb-5">Login to Your Account</h3>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          tabIndex="1"
          placeholder="Enter email"
          value={credentials.email}
          onChange={(e) => handleCredentials(e)}
        />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          tabIndex="2"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => handleCredentials(e)}
        />
      </Form.Group>

      <Form.Group className="mb-3 mt-1 text-center" controlId="register">
        <Link
          to="/forgotPassword"
          tabIndex="4"
          className="d-flex flex-row-reverse text-decoration-none mb-3"
        >
          Forgot password?
        </Link>
      </Form.Group>

      <Button
        variant="success"
        type="submit"
        tabIndex="3"
        className="mb-3"
        disabled={isLoading}
      >
        {isLoading ? (
          <Spinner animation="border" role="status" size="sm" />
        ) : (
          "Continue"
        )}
      </Button>

      <Button
        variant="danger"
        type="button"
        tabIndex="4"
        className="mb-3"
        onClick={() =>
          setCredentials({ email: "guest@example.com", password: "12345678" })
        }
      >
        <FaUserAlt className="me-2" />
        Get Guest User Credentials
      </Button>

      <Form.Group className="mb-3 text-center" controlId="register">
        <span>
          Don't have an account?&nbsp;
          <Link to="/register" tabIndex="5" className="text-decoration-none">
            Register now
          </Link>
        </span>
      </Form.Group>
    </Form>
  );
};

export default LoginPage;
