import "./Styles/Header.css"
import { useNavigate } from 'react-router-dom';
import React from "react";
import axios from 'axios';
import {Button} from 'react-bootstrap'
function Header() {
    const sessionCookie = sessionStorage.getItem('session_id');
    const userId = parseInt(sessionStorage.getItem('user_id'));
    const navigate = useNavigate();

    const handleSignOut = async (e) => {
        e.preventDefault();

        try {
          await axios.delete('http://localhost:3000/users/sign_out', {
            headers: {
              Authorization: `Bearer ${userId}`,
            },
            withCredentials: true,
          });

          sessionStorage.removeItem('session_id');
          sessionStorage.removeItem('user_id');

          navigate('/');
        } catch (error) {
          console.error(error);
        }
      };
  return (
    <div className="header">
      <h1>
        Label <span>23</span>
      </h1>
      <Button className = "button" onClick={handleSignOut}> Log out </Button>
    </div>
  );
}
export default Header;
