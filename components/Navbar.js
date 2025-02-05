import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import '../css/StylesNav.css';
import { Link, useNavigate } from 'react-router-dom';
import { NavDropdown } from "react-bootstrap";


function BrandExample() {
  let user = JSON.parse(localStorage.getItem('user-info'));
  console.log(user);
  const navigate = useNavigate();
  function logout(){
    localStorage.clear();
    navigate('/');
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/AdminProcess">
                  Admin Process
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/OrganizationDetail">
                  Organization
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/EmployeeDetail">
                  Employee
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/ServerDetail">
                  Server
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Notification">
                  Notification
                </Link>
              </li>
              <li className="nav-item">
            <NavDropdown title="Admin">
        <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default BrandExample;
