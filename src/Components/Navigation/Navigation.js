import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Nav, Navbar, OverlayTrigger, Popover, PopoverContent,Button, PopoverTitle, NavDropdown, Card, ListGroup } from 'react-bootstrap';
import  HomeSharpIcon from '@material-ui/icons/HomeSharp';
import  PersonSharpIcon from '@material-ui/icons/PersonSharp';
import  ForumSharpIcon from '@material-ui/icons/ForumSharp';
import PeopleAltSharpIcon from '@material-ui/icons/PeopleAltSharp';
import Request from '../FriendRequests/requests';
import img from '../../Images/iu.jpeg';
import SettingsIcon from '@material-ui/icons/Settings';
import auth from '../login/AuthService';
import axios from 'axios';
import logo from '../../Images/twaddle_dark_blue_circle.png';
import font from '../../fonts/hacked-font/Hacked-KerX.ttf';
import './index.css';

function Navigation() {
      function handleLogout() {
            console.log("here");
            const body = {
            };

            const headers2 = {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('token')
            };
            console.log(headers2.Authorization);
            axios.get('http://3.209.12.36:8000/logout/', { 'headers': { 'Authorization': headers2.Authorization } })
            .then((res) => {
                console.log("RESPONSE ==== : ", res);
                console.log(res.data.message)
                if (res.data.message == "Logout successful") {
                console.log("Logout successful")
                } else {
                  alert("Could not log out!");
                }
            })
            .catch((err) => {
                console.log("Logout ERROR: ====", err);
              })
              localStorage.removeItem('token');
              return <Redirect to="/login" />
              //localStorage.removeItem('token');
              //props.history.push('/login');
      }
        return (
          <Navbar expand="sm" variant="dark" style={{textAlign: 'center', width:'100%', backgroundColor: '#498ec5'}}>
          <Navbar.Brand href="/home">
            <img src={logo} width="50" height="50"/>
          </Navbar.Brand>
          <Navbar.Brand href="/home" style={{fontFamily: 'MyFont', fontSize: '30px'}}>Twaddle</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Item>
                <OverlayTrigger
                    trigger="click"
                    key="bottom-end"
                    placement="bottom-end"
                    overlay={
                      <Popover id={`popover-positioned-bottom-end`}
                      style={{minWidth: "500px"}}>
                        <Popover.Title as="h3">Friend Requests</Popover.Title>
                        <Popover.Content>
                          <Request/>
                        </Popover.Content>
                      </Popover>
                    }
                  >
                    <Nav.Link>
                    <PeopleAltSharpIcon fontSize="medium"/>
                    </Nav.Link>
                  </OverlayTrigger>{''}
                </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/home"><HomeSharpIcon fontSize="medium" /></Nav.Link>                
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/messages"><ForumSharpIcon fontSize="medium" /></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/profile"><PersonSharpIcon fontSize="medium"/></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <a onClick={handleLogout}><SettingsIcon/></a>
              </Nav.Item>
              </Nav>
          </Navbar.Collapse>
        </Navbar>
        );
    }

export default Navigation;