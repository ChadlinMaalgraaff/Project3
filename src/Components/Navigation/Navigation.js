import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown, Card, ListGroup } from 'react-bootstrap';
import  HomeSharpIcon from '@material-ui/icons/HomeSharp';
import  PersonSharpIcon from '@material-ui/icons/PersonSharp';
import  ForumSharpIcon from '@material-ui/icons/ForumSharp';
import PeopleAltSharpIcon from '@material-ui/icons/PeopleAltSharp';
import Request from '../FriendRequests/requests';

export default class Navigation extends Component {
    render () {
        return (
          <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="./home">Project 3</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav variant="tabs">
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
                    <Nav.Link href="/requests"><PeopleAltSharpIcon fontSize="medium"/></Nav.Link>
                </Nav.Item>
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
    }
} 
