import React from "react";
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link, Routes, Route } from 'react-router-dom';
import Inbox from "../components/Inbox";
import SentBox from "../components/SentBox";
import Compose from "../components/Compose";
import '../App.css';

const Dashboard = () => {
  return (
    <div className="container mt-5">
      <h1>Welcome to the Dashboard!</h1>

      {/* Main Dashboard Layout */}
      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col xs={2} className="bg-light p-3">
            <Nav className="flex-column">
              <Nav.Link as={Link} to="compose">Compose</Nav.Link>
              <Nav.Link as={Link} to="inbox">Inbox</Nav.Link>
              <Nav.Link as={Link} to="sent">Sent</Nav.Link>
            </Nav>
          </Col>

          {/* Main Content */}
          <Col xs={10} className="p-4">
            <Routes>
              <Route path="/dashboard/compose" element={<Compose />} />
              <Route path="/dashboard/inbox" element={<Inbox />} />
              <Route path="/dashboard/sent" element={<SentBox />} />
              {/* Optionally, you can add a default route for the Dashboard's home screen */}
              <Route path="/" element={<h2>Please select a menu item</h2>} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
