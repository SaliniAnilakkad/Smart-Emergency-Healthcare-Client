

import React, { useState } from "react";
import { Container, Row, Col, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaHome,
  FaCalendarCheck,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import MyAccount from "./MyAccount";
import MyBooking from "./MyBooking";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <MyAccount />;
      case "bookings":
        return <MyBooking />;
      default:
        return <h2>Welcome to Patient Dashboard</h2>;
    }
  };

  const handleLogout = () => {
      localStorage.clear();
      toast.success("Successfully logged out!", { position: "top-right", autoClose: 3000 });
      navigate("/login");
    };

  return (
    <Container fluid className="dashboard-container">
      <Row>
        {/* Sidebar */}
        <Col
          md={isSidebarOpen ? 3 : 0}
          lg={isSidebarOpen ? 2 : 0}
          className={`bg-dark text-white vh-100 sidebar transition ${
            isSidebarOpen ? "d-block" : "d-none d-md-block"
          }`}
        >
          <div className="text-center py-4 border-bottom border-secondary">
            <h4>User Dashboard</h4>
          </div>
          <Nav className="flex-column px-3 py-4">
            <Nav.Link
              className={`text-white nav-item d-flex align-items-center mb-3 ${
                activeTab === "home" ? "active-nav" : ""
              }`}
              onClick={() => setActiveTab("home")}
            >
              <FaHome className="me-2" />
              Profile
            </Nav.Link>
            <Nav.Link
              className={`text-white nav-item d-flex align-items-center mb-3 ${
                activeTab === "bookings" ? "active-nav" : ""
              }`}
              onClick={() => setActiveTab("bookings")}
            >
              <FaCalendarCheck className="me-2" />
              Bookings
            </Nav.Link>
          </Nav>

          {/* Logout Button */}
          <div className="mt-auto px-3 pb-4">
            <Button
              variant="danger"
              className="w-100 d-flex align-items-center justify-content-center"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="me-2" />
              Logout
            </Button>
          </div>
        </Col>

        {/* Main Content */}
        <Col
          md={isSidebarOpen ? 9 : 12}
          lg={isSidebarOpen ? 10 : 12}
          className="p-4 content-area"
        >
          {/* Sidebar Toggle Button */}
          <Button
            variant="outline-dark"
            className="mb-4 d-md-none"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FaBars />
          </Button>
          {renderContent()}
        </Col>
      </Row>

      {/* Custom Styles */}
      <style jsx="true">{`
        .sidebar {
          transition: all 0.3s ease-in-out;
        }

        .nav-item {
          padding: 10px 15px;
          border-radius: 8px;
          transition: 0.3s ease;
          cursor: pointer;
        }

        .nav-item:hover {
          background-color: #343a40;
        }

        .active-nav {
          background-color: #495057 !important;
          font-weight: bold;
        }

        .content-area {
          background-color: #f8f9fa;
          min-height: 100vh;
          border-left: 1px solid #dee2e6;
          border-radius: 8px;
        }

        @media (max-width: 768px) {
          .sidebar {
            position: absolute;
            z-index: 1000;
            width: 60%;
          }

          .content-area {
            padding-top: 20px;
          }
        }
      `}</style>
    </Container>
  );
};

export default Dashboard;
