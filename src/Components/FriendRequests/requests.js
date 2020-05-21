import React, { useState, Component } from "react";
import {Card, Image, Container, Row, Col, Form, Button, FormGroup, FormControl} from "react-bootstrap";
import { render } from "@testing-library/react";
import img from '../../Images/iu-8.jpeg';
import styles from './mystyles.module.css';

function Requests () {
    return (
        <div>
        <Card>
            <Card.Body>
                <Row>
                    <Col xs={4} md={4}>
                    <div className={styles.image}>
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
                <div className={styles.image}>
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
                <div className={styles.image}>
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
                    <div className={styles.image}>
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
            </Row>ia
        </Card.Body>
    </Card>
    </div>
    );  
}

export default Requests;