import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Image, Button } from 'react-bootstrap';
import { CDBSidebar, CDBSidebarContent, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenuItem, CDBSidebarMenu } from 'cdbreact';
import axios from 'axios';
import logo from './Image/Levick.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/Nav.css';

function Navigation() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const userId = sessionStorage.getItem('userId');
  const navigate = useNavigate();

  const openSidebar = () => {
    setSidebarIsOpen(true);
  };

  const closeSidebar = () => {
    setSidebarIsOpen(false);
  };

  const handleAuth = async () => {
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
    <div className='sidebar'>
      <CDBSidebar textColor="white" backgroundColor="black" isOpen={sidebarIsOpen} onOverlayClick={closeSidebar}>
        <CDBSidebarHeader prefix={<Image src={logo} height='70' alt='logo' />} onClick={closeSidebar}>
          <p>Levick <span>23</span></p>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeRoute" onClick={closeSidebar}>
              <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
            </NavLink>

            <NavLink to="/about" activeClassName="activeRoute" onClick={closeSidebar}>
              <CDBSidebarMenuItem icon="info-circle">About</CDBSidebarMenuItem>
            </NavLink>

            <NavLink to="/services" activeClassName="activeRoute" onClick={closeSidebar}>
              <CDBSidebarMenuItem icon="cogs">Services</CDBSidebarMenuItem>
            </NavLink>

            <NavLink to="/contact" activeClassName="activeRoute" onClick={closeSidebar}>
              <CDBSidebarMenuItem icon="envelope">Contact</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter>
          <div className="sidebar-btn-wrapper">
            <Button className='button' onClick={handleAuth}> Log Out</Button>
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>

      {!sidebarIsOpen && (
        <div className="sidebar-toggle" onClick={openSidebar}>
          <i className="fa fa-bars" />
        </div>
      )}
    </div>
  );
}

export default Navigation;
