import React from "react";
import Button from "../Shared/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";

const ContactPage = () => {
  return (
    <div className="container my-5">
      <Helmet>
        <title>Contact Levick 23 - Your Trendy Clothing Destination</title>
        <meta
          name="description"
          content="Get in touch with Levick 23, your go-to online clothing store in Nairobi. Contact us for inquiries, support, or to find the latest fashion trends and affordable clothing options for men and women. We're here to assist you!"
        />
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
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Your Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Your Email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows="3"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                <Button type="submit" className="btn btn-primary">
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
