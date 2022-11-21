import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const PasswordResetPage = ({ match }) => {
  const [credentials, setCredentials] = useState({
    password: "",
    confirmPassword: "",
  });
  const [alert, setAlert] = useState({
    type: "",
    display: false,
    message: "",
  });
  const { resetToken } = useParams();

  const handleCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const passwordResetHandler = async (e) => {
    e.preventDefault();

    console.log(credentials);
    console.log(resetToken);

    // If any field is missing
    if (!credentials.password || !credentials.confirmPassword) {
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
      const response = await fetch(`/api/auth/resetPassword/${resetToken}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: credentials.password,
          confirmPassword: credentials.confirmPassword,
        }),
      });
      const data = await response.json();

      if (data.success) {
        setTimeout(() => {
          setAlert({
            type: "",
            display: false,
            message: "",
          });
        }, 5000);
        return setAlert({
          type: "success",
          display: true,
          message: "Password reset success",
        });
      } else {
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
          message: "Invalid reset token",
        });
      }
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

  <span className={`${alert.type}-message`}>{`${alert.message} ${
    alert.type === "success" ? <Link to="/login">Login</Link> : ""
  }`}</span>;

  // <span className="success-message">`${alert.message}<span>

  return (
    <form onSubmit={passwordResetHandler}>
      {alert.display &&
        (alert.type === "success" ? (
          <span className="success-message">{alert.message} <Link to="/login">Login</Link></span>
        ) : (
          <span className="error-message">{alert.message}</span>
        ))}
      <h3>Forgot Password</h3>
      <div>
        <label htmlFor="password">New Password:</label>
        <input
          type="password"
          required
          id="password"
          name="password"
          placeholder="Enter new password"
          autoComplete="true"
          value={credentials.password}
          onChange={(e) => handleCredentials(e)}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm New Password:</label>
        <input
          type="password"
          required
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm new password"
          autoComplete="true"
          value={credentials.confirmPassword}
          onChange={(e) => handleCredentials(e)}
        />
      </div>
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default PasswordResetPage;
