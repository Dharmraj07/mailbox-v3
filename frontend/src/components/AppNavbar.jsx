import React, { useState } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import ComposeModal from "./ComposeModal";

const AppNavbar = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showComposeModal, setShowComposeModal] = useState(false);
  const [shouldUpdateSentBox, setShouldUpdateSentBox] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleOpenCompose = () => setShowComposeModal(true);

  const handleCloseCompose = () => {
    setShowComposeModal(false);
    if (shouldUpdateSentBox) {
      navigate("/sent");
      setShouldUpdateSentBox(false);
    }
  };

  const handleComposeSuccess = () => setShouldUpdateSentBox(true);

  return (
    <>
      <Navbar expand="lg" className="bg-dark shadow-sm fixed-top">
        <Container fluid>
          <Navbar.Brand href="#" className="text-light fw-bold fs-3">
            MailBox
          </Navbar.Brand>

          {isLoggedIn && (
            <Form className="d-flex ms-auto w-50">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 rounded-pill"
                aria-label="Search"
                style={{ borderColor: "#007bff" }}
              />
              <Button variant="outline-success" className="rounded-pill">
                Search
              </Button>
            </Form>
          )}

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            {isLoggedIn ? (
              <Button variant="outline-danger" className="ms-auto rounded-pill" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <div className="ms-auto d-flex">
                <Button variant="outline-primary" className="me-2 rounded-pill">
                  <Link to="/" className="text-decoration-none text-primary">
                    Sign In
                  </Link>
                </Button>
                <Button variant="outline-secondary" className="rounded-pill">
                  <Link to="/signup" className="text-decoration-none text-secondary">
                    Sign Up
                  </Link>
                </Button>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid className="mt-5 pt-5">
        <div className="d-flex">
          {isLoggedIn && (
            <div
              className="sidebar bg-dark text-light p-4"
              style={{
                width: "200px",
                height: "calc(100vh - 70px)",
                position: "fixed",
                top: "70px",
                left: "0",
              }}
            >
              <Nav className="flex-column">
                <Nav.Link className="text-light mb-3" onClick={handleOpenCompose}>
                  Compose
                </Nav.Link>
                <Nav.Link as={Link} to="/inbox" className="text-light mb-3">
                  Inbox
                </Nav.Link>
                <Nav.Link as={Link} to="/sent" className="text-light mb-3">
                  Sent
                </Nav.Link>
              </Nav>
            </div>
          )}
        </div>
      </Container>

      <ComposeModal
        show={showComposeModal}
        handleClose={handleCloseCompose}
        onComposeSuccess={handleComposeSuccess}
      />
    </>
  );
};

export default React.memo(AppNavbar);
