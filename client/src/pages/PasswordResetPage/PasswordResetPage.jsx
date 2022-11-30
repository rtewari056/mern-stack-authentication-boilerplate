import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Button, Spinner, Container } from "react-bootstrap";

import IMAGES from "../../assets";

const PasswordResetPage = () => {
  const [credentials, setCredentials] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  const { resetToken } = useParams(); // Get "resetToken" from URL parameters

  const handleCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const passwordResetHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // If any field is missing
    if (!credentials.password || !credentials.confirmPassword) {
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

    // If password and confirm password doesn't match
    if (credentials.password !== credentials.confirmPassword) {
      setIsLoading(false);
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

    // If password is less than 8 characters
    if (credentials.password.length < 8) {
      setIsLoading(false);
      return toast.warn("Password must be at least 8 characters", {
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
      const response = await fetch(`/api/auth/resetPassword/${resetToken}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: credentials.password,
        }),
      });
      const data = await response.json();

      if (data.success) {
        setIsLoading(false);
        setIsPasswordReset(true);
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
        return toast.error(data.error, {
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
    <>
      {isPasswordReset ? (
        <Container>
          <img
            src={IMAGES.green_check}
            className="mx-auto d-block mt-5 mb-3"
            width="100px"
            alt="password changed successfully"
          />

          <p className="email__heading text-center fs-2">Password Changed!</p>
          <p className="text-center text-muted fs-5">
            Your password has been changed successfully.
          </p>
        </Container>
      ) : (
        <Form className="auth__form" onSubmit={passwordResetHandler}>
          <h4 className="mb-3">Create new password</h4>
          <p className="text-muted mb-4">
            Your new password must be different from previous used passwords.
          </p>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>New password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              tabIndex="1"
              placeholder="Enter new password"
              value={credentials.password}
              onChange={(e) => handleCredentials(e)}
            />
            <Form.Text className="text-muted">
              Must be at least 8 characters.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              tabIndex="2"
              placeholder="Confirm new password"
              value={credentials.confirmPassword}
              onChange={(e) => handleCredentials(e)}
            />
            <Form.Text className="text-muted">
              Both passwords must match.
            </Form.Text>
          </Form.Group>

          <Button
            tabIndex="3"
            variant="success"
            type="submit"
            className="mb-3"
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner animation="border" role="status" size="sm" />
            ) : (
              "Reset password"
            )}
          </Button>
        </Form>
      )}
    </>
  );
};

export default PasswordResetPage;
