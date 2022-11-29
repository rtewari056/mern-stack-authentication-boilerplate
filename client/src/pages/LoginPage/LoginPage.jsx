import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Button, Spinner } from "react-bootstrap";

import { AuthState } from "../../context/AuthProvider";

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
        return toast.success(data.data, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        setIsLoading(false);
        return toast.warn(data.error, {
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
    } catch (error) {
      setIsLoading(false);
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
    <Form className="auth__form" onSubmit={loginHandler}>
      <h2 className="text-center mb-5">Hello Again!</h2>
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
          className="d-flex flex-row-reverse text-decoration-none mb-3"
        >
          Forgot password?
        </Link>
      </Form.Group>

      <Button variant="success" type="submit" className="mb-3" disabled={isLoading}>
        {isLoading ? <Spinner animation="border" role="status" size="sm" /> : "Continue"}
      </Button>

      <Form.Group className="mb-3 text-center" controlId="register">
        <span>
          Don't have an account?&nbsp;
          <Link to="/register" className="text-decoration-none">
            Register now
          </Link>
        </span>
      </Form.Group>
    </Form>
  );
};

export default LoginPage;
