import React from "react";
import "./Nav.css";
import { Carousel } from "react-bootstrap";

function Footer() {
  return (
    <footer className="footer">
      <div className="container" >
        <div className="row" >
          <div className="col-sm-6 col-md-3" style={{ marginTop: "30px" }}>
            <h6> INFORMATION</h6>
            <li>
              <ul>
                <a href="#"> About us</a> <br></br><br></br>
                <a href="#"> Terms and Conditions </a><br></br><br></br>
                <a href="#"> Delivery Policies </a><br></br><br></br>
                <a href="#"> Privacy Policies</a><br></br><br></br>
              </ul>

            </li>
          </div>
          <div className="col-sm-6 col-md-3" style={{ marginTop: "30px" }}>
            <h6> CUSTOMER SUPPORT</h6>
            <li>
              <ul>
                <a href="#"> Payment Policies</a> <br></br><br></br>
                <a href="#"> Cancellation Policies </a><br></br><br></br>
                <a href="#"> Contact Us</a><br></br><br></br>
              </ul>
            </li>
          </div>
          <div className="col-sm-6 col-md-3" style={{ marginTop: "30px" }}>
            <h6>CONTACT US</h6>
            <li>
              <ul>
                <p>P.O Box</p> <br></br>
                <p>Kenya</p><br></br>
                <p>+254741242922</p> <br></br>
                <li><ul>
                  <a href=""></a>
                  <a href=""></a>
                  <a href=""></a>
                </ul>
                </li>

              </ul>
            </li>

          </div>
          <div className="col-sm-6 col-md-3" style={{ marginTop: "30px" }}>
            <h6>SUBSCRIBE US</h6>

          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
