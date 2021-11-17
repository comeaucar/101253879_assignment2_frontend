import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom';

export default function CustomNavbar() {
    return (
        
        <Navbar fixed="top" bg="light" expand="lg" variant="light">
  <Container>
    <Navbar.Brand href="/employees">Employee Manager</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/employees">All Employees</Nav.Link>
        <NavDropdown title="More" id="basic-nav-dropdown">
          <NavDropdown.Item><Link to="/employees/add">Add Employee</Link></NavDropdown.Item>
          <NavDropdown.Divider />
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

    )
}
