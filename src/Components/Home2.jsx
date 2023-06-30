import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "./Styles/Home.css";
import Header from "./Header";
const HomePage = () => {

  return (
    <div>
      <div>
      <p className="head"> Levick<span>23</span></p>
      <Header />
      </div>

    </div>
  );
};

export default HomePage;
