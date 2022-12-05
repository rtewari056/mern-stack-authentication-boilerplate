import { useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  DropdownButton,
  Image,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import IMAGES from "../../assets"; // Importing images from single "IMAGES" object
import "./NavigationBar.css";
import { AuthState } from "../../context/AuthProvider";
import ProfileModal from "../ProfileModal/ProfileModal";

const NavigationBar = () => {
  const [modalShow, setModalShow] = useState(false);

  const navigate = useNavigate();
  const { auth, setAuth } = AuthState();

  const logoutHandler = () => {
    localStorage.removeItem("auth");
    setAuth(null);
    return navigate("/login");
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

          <Nav>
            {auth ? (
              <DropdownButton
                variant="dark"
                align="end"
                title={
                  <Image
                    id="profileDropdownIcon"
                    src={auth.profilePic}
                    alt="Navbar profile image"
                    roundedCircle
                  />
                }
              >
                <Dropdown.Item as="button" onClick={() => setModalShow(true)}>
                  Profile
                </Dropdown.Item>
                <ProfileModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />

                <Dropdown.Divider />

                <Dropdown.Item as="button" onClick={logoutHandler}>
                  Log out
                </Dropdown.Item>
              </DropdownButton>
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
