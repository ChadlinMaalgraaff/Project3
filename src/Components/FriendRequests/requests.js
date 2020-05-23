import React, { useState, Component } from "react";
import {Card, Image, Container, Row, Col, Form, Button, FormGroup, FormControl} from "react-bootstrap";
import { render } from "@testing-library/react";
import img from '../../Images/iu-8.jpeg';
import '../../App.css';

export default class Requests extends Component {
    render() {
        return (
                <Container maxWidth='xs' fixed>
                    <Card width='18rem'>
                        <Card.Body>
                            <Row>
                                <Col xs={4} md={4}>
                                <div className="image">
                                    <Image src={img} roundedCircle fluid />
                                </div>
                                </Col>
                                <Col xs={4} md={4}>
                                    @username sent you a friend request
                                </Col>
                                <Col xs={4} md={4}>
                                    <Button variant="dark">
                                        Accept
                                    </Button>
                                    <Button variant="light">
                                        Reject
                                    </Button>
                                </Col>
                            </Row>
                            
                        </Card.Body>
                    </Card>           
        <Card>
            <Card.Body>
                <Row>
                    <Col xs={4} md={4}>
                    <div className="image">
                        <Image src={img} roundedCircle fluid />
                    </div>
                    </Col>
                    <Col xs={4} md={4}>
                        @username sent you a friend request
                    </Col>
                    <Col xs={4} md={4}>
                        <Button variant="dark">
                            Accept
                        </Button>
                        <Button variant="light">
                            Reject
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
        <Card>
            <Card.Body>
                <Row>
                    <Col xs={4} md={4}>
                    <div className="image">
                        <Image src={img} roundedCircle fluid />
                    </div>
                    </Col>
                    <Col xs={4} md={4}>
                        @username sent you a friend request
                    </Col>
                    <Col xs={4} md={4}>
                        <Button variant="dark">
                            Accept
                        </Button>
                        <Button variant="light">
                            Reject
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
        <Card>
            <Card.Body>
                <Row>
                    <Col xs={4} md={4}>
                        <div className="image">
                            <Image src={img} roundedCircle fluid />
                        </div>
                    </Col>
                    <Col xs={4} md={4}>
                            @username sent you a friend request
                    </Col>
                    <Col xs={4} md={4}>
                        <Button variant="dark">
                                Accept
                        </Button>
                        <Button variant="light">
                                Reject
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
        </Container> 
        );  
    }
    
}
