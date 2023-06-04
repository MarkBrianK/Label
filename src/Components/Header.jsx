import "./Styles/Header.css";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button } from 'react-bootstrap';
import levick from "./Image/Levick.png";

function Header() {
  const sessionCookie = sessionStorage.getItem('session_id');
  const userId = parseInt(sessionStorage.getItem('user_id'));
  const navigate = useNavigate();




  const handleAuth = async (e) => {
    e.preventDefault();
    navigate('/signin')
  };

  return (
    <header className="header">
      <h1>
        Levick<span>23</span>
      </h1>
      <img className="image" src={levick} alt="" />

      <Button className="button" onClick={handleAuth}>
         <p>Log In</p>
      </Button>
    </header>
  );
}

export default Header;
