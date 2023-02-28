import { Navbar, Container, Nav} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import "./Nav.css";
function Navigation() {
    return (
      <Navbar className='navigation'>
        <Container>
            <Nav className="ms-auto">
              <NavLink className="nav-link" exact to="/">
                Home
              </NavLink>
              <NavLink className="nav-link" to="/about">
                About Us
              </NavLink>
              <NavLink className="nav-link" to="/products">
                Our Products
              </NavLink>
            </Nav>
        </Container>
      </Navbar>
    );
  }

  export default Navigation;
