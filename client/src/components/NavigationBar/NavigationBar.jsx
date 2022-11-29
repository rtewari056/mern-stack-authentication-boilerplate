import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import IMAGES from "../../assets"; // Importing images from single "IMAGES" object
import "./NavigationBar.css";
import { AuthState } from "../../context/AuthProvider";

const NavigationBar = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = AuthState();

  const logoutHandler = () => {
    localStorage.removeItem("auth");
    setAuth(null);
    navigate("/login");
  };

  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            alt="Advanced Node Authentication Logo"
            src={IMAGES.logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          &nbsp;Advanced Node Authentication
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
          </Nav>

          <Nav className="d-flex justify-content-start">
            {auth ? (
              <Nav.Item>
                <Button variant="primary" size="sm" onClick={logoutHandler}>
                  Log out
                </Button>
              </Nav.Item>
            ) : (
              <Nav.Item>
                <Link to="/login">
                  <Button className="me-2" variant="outline-primary" size="sm">
                    Log in
                  </Button>
                </Link>

                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Register
                  </Button>
                </Link>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
