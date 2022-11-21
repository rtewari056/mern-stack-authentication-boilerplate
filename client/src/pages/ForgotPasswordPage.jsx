import { useState } from "react";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({
    type: "",
    display: false,
    message: "",
  });

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    // If any field is missing
    if (!email) {
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
      const response = await fetch("/api/auth/forgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      const data = await response.json();

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
        message: `${data.data}`,
      });
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
    <form onSubmit={forgotPasswordHandler}>
      {alert.display && (
        <span className={`${alert.type}-message`}>{alert.message}</span>
      )}
      <h3>Forgot Password</h3>
      <div>
        <p>
          Please enter the email address you register your account with. We will
          send you reset password confirmation to this email
        </p>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit">Send Email</button>
    </form>
  );
};

export default ForgotPasswordScreen;
