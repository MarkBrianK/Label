import React from 'react';
import Button from "../Shared/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';

const ContactPage = () => {
  return (
    <div className="container my-5">
      <Helmet>
        <title>Contact Us - Your Website</title>
        <meta name="description" content="Contact us for inquiries and support." />
      </Helmet>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card text-white bg-dark">
            <div className="card-header">
              <h2 className="text-center">Contact Us</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" className="form-control" id="name" placeholder="Your Name" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" className="form-control" id="email" placeholder="Your Email" />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea className="form-control" id="message" rows="3" placeholder="Your Message"></textarea>
                </div>
                <Button type="submit" className="btn btn-primary">Submit</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
