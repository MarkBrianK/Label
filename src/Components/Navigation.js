import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from "./Image/label.png";
import "./Nav.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function Navigation() {
  return (
    <Navbar expand="md" className='navigation' collapseOnSelect >
      <Container fluid>
        <Navbar.Brand href="/">
          <h1 className='logo-title'> Label <span>23</span></h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" >
          <Nav className="ms-auto">
            <NavLink className="nav-link" exact="true" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/about">
              About Us
            </NavLink>
            <NavLink className="nav-link" to="/products">
              Our Products
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
