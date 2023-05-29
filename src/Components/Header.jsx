import "./Styles/Header.css"
import { useNavigate } from 'react-router-dom';
import React,{useState, useEffect} from "react";
import axios from 'axios';
import {Button} from 'react-bootstrap'
function Header() {
    const sessionCookie = sessionStorage.getItem('session_id');
    const userId = parseInt(sessionStorage.getItem('user_id'));
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn]= useState(false)

    useEffect(()=>{
      if (sessionCookie){
        setIsLoggedIn(true)

      }else{
        setIsLoggedIn(false)
      }
    },[])

    const handleAuth = async (e) => {
        e.preventDefault();

        try {
          if (sessionCookie){

            await axios.delete('http://localhost:3000/users/sign_out', {
            headers: {
              Authorization: `Bearer ${userId}`,
            },
            withCredentials: true,
          });

          sessionStorage.removeItem('session_id');
          sessionStorage.removeItem('user_id');


          navigate('/');

          }else{
            navigate(`/signin`)

          }

        } catch (error) {
          console.error(error);
        }
      };
  return (
    <div className="header">
      <h1>
        Label <span>23</span>
      </h1>

        <Button className = "button" onClick={handleAuth} > {isLoggedIn ? (<>Log Out </>):(<>Log In</>)} </Button>

    </div>
  );
}
export default Header;
