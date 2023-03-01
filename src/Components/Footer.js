import "./Nav.css";
import { Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  return (
    <div className="footer">
      <Row>
        <Col xs={6} sm={3}>
          <h5>Section 1</h5>
          <ul>
            <li>
              <a href="#">Link 1</a>
            </li>
            <li>
              <a href="#">Link 2</a>
            </li>
            <li>
              <a href="#">Link 3</a>
            </li>
          </ul>
        </Col>
        <Col xs={6} sm={3}>
          <h5>Section 2</h5>
          <ul>
            <li>
              <a href="#">Link 1</a>
            </li>
            <li>
              <a href="#">Link 2</a>
            </li>
            <li>
              <a href="#">Link 3</a>
            </li>
          </ul>
        </Col>
        <Col xs={6} sm={3}>
          <h5>Section 3</h5>
          <ul>
            <li>
              <a href="#">Link 1</a>
            </li>
            <li>
              <a href="#">Link 2</a>
            </li>
            <li>
              <a href="#">Link 3</a>
            </li>
          </ul>
        </Col>
        <Col xs={6} sm={3}>
          <h5>Section 4</h5>
          <ul>
            <li>
              <a href="#">Link 1</a>
            </li>
            <li>
              <a href="#">Link 2</a>
            </li>
            <li>
              <a href="#">Link 3</a>
            </li>
          </ul>
        </Col>
      </Row>
    </div>
  );
}

export default Footer;
