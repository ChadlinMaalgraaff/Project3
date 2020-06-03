import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, OverlayTrigger, Popover, PopoverContent, PopoverTitle, Button, NavDropdown, Card, ListGroup } from 'react-bootstrap';
import  HomeSharpIcon from '@material-ui/icons/HomeSharp';
import  PersonSharpIcon from '@material-ui/icons/PersonSharp';
import  ForumSharpIcon from '@material-ui/icons/ForumSharp';
import PeopleAltSharpIcon from '@material-ui/icons/PeopleAltSharp';
import Request from '../FriendRequests/requests';
import img from '../../Images/iu.jpeg';

export default class Navigation extends Component {
    render () {
        return (
          <Navbar bg="dark" variant="dark" expand="sm" style={{width:'100%', position:'fixed', zIndex:'999'}}>
          <Navbar.Brand href="./home">
            <img src={img} width="30" height="30"/>
          </Navbar.Brand>
          <Navbar.Brand href="./home">Project 3</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav variant="tabs">
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
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
    }
} 
