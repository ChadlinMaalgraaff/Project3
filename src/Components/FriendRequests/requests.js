import React, { useState, Component } from "react";
import {Card, Image, Container, Row, Col, Form, Button, FormGroup, FormControl} from "react-bootstrap";
import { Avatar } from '@material-ui/core';
import { render } from "@testing-library/react";
import img from '../../Images/iu-8.jpeg';
import '../../App.css';


export default class Requests extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usernames: [
                {
                    name:'Fay-yaaz',
                    /*avatar: */ 
                 }, 
                 {
                     name: 'Thauren',
                     /*avatar: */ 
                 }, 
                 {
                     name: 'Barbra',
                     /*avatar: */ 
                 }, 
                 {
                     name: 'Zee',
                     /*avatar: */ 
                 }, 
                 {
                     name: 'Chadlin',
                     /*avatar: */ 
         
                 }
             ]
        }
    }

    removeItem = index => {
        this.setState(state => {
            const usernames = state.usernames.filter((item, j) => index != j);

            return {
                usernames,
            };
        });
   }; 

   render() {
    return (
        <div>
            {this.state.usernames.map((username, index) => (
            <Container maxWidth='xs' fixed>
                <Card width='8rem'>
                    <Card.Body>
                        <Row>
                            <Col md="auto">
                                <Avatar alt="person" src={img} />
                            </Col>
                            <Col>
                                @{username.name} sent a friend request
                            </Col>
                            <Col>
                                <Button variant="dark" onClick={() => this.removeItem(index)}>
                                    Accept
                                </Button>
                                <Button variant="light" onClick={() => this.removeItem(index)}>
                                    Reject
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card> 
            </Container>))}      
        </div>
    )
   }
}
