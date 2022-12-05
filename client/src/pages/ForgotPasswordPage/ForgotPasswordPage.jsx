import { useState } from "react";
import { Form, Button, Spinner, Container } from "react-bootstrap";

import IMAGES from "../../assets";
import { Notify } from "../../utils";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // If any field is missing
    if (!email) {
      setIsLoading(false);
      return Notify("Please Fill all the Feilds", "warn");
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

      if (data.success) {
        setIsLoading(false);
        setIsEmailSent(true);
        return Notify(data.data, "success");
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
    <>
      {isEmailSent ? (
        <Container>
          <img
            src={IMAGES.email}
            className="mx-auto d-block mt-5 mb-3"
            width="100px"
            alt="email sent successfully"
          />

          <p className="email__heading text-center fs-2">Check your mail</p>
          <p className="text-center text-muted fs-5">
            We have sent a password recover instructions to your email.
          </p>
        </Container>
      ) : (
        <Form className="auth__form" onSubmit={forgotPasswordHandler}>
          <h4 className="mb-3">Forgot your password?</h4>
          <p className="text-muted mb-4">
            Enter a email associated with your account and we'll send an email
            with instructions to reset your password.
          </p>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              tabIndex="1"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Button
            variant="success"
            type="submit"
            className="mb-3"
            tabIndex="2"
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner animation="border" role="status" size="sm" />
            ) : (
              "Send me reset password instructions"
            )}
          </Button>
        </Form>
      )}
    </>
  );
};

export default ForgotPasswordScreen;
