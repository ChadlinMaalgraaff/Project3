import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown, Card, ListGroup } from 'react-bootstrap';
import Request from '../FriendRequests/requests';

export default class Navigation extends Component {
    render () {
        return (
          <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="#home">Project 3</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link href="/">Home</Nav.Link>                
              </Nav.Item>
                <Nav.Item>
                <Nav.Link href="/login">Login</Nav.Link>
                </Nav.Item>
              <Nav.Item>
              <Nav.Link href="/register">Register</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/requests">Requests</Nav.Link>
                </Nav.Item>
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
    }
} 
