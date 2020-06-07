import React, { useState, Component } from "react";
import {Card, Image, Container, Row, Col, Form, Button, FormGroup, FormControl} from "react-bootstrap";
import { Avatar } from '@material-ui/core';
import LinearProgress  from '@material-ui/core/LinearProgress';
import { render } from "@testing-library/react";
import img from '../../Images/iu-8.jpeg';
import '../../App.css';
import axios from 'axios';

var names = [];
var temp = [];

export default class Requests extends Component {
    constructor(props) {
        super(props);
        this.state = {
             usernames: [],
             loading: true,
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

   acceptRequest = id => {
       this.setState({
           loading: true
       })
       console.log("loading" + this.state.loading)
        const data = {
            to_user: localStorage.getItem('id'),
            from_user: id
        }

        const options = {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token')
            }
        }
        axios.post('http://3.209.12.36:8000/api/account/accept_request', data, options)
        .then((res) => {
            console.log("response (accept) ===>" + res.data.response);
            console.log("usernames 2 ..." + this.state.usernames)
            this.get_data();
        })
        .catch((error) => {
            console.log("error ====>" + error);
        })
   }

   rejectRequest = id => {
        this.setState({
            loading: true
        })
        console.log("loading" + this.state.loading)
        const data = {
            to_user: localStorage.getItem('id'),
            from_user: id
        }

        const options = {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token')
            }
        }
        axios.post('http://3.209.12.36:8000/api/account/reject_request', data, options)
        .then((res) => {
            console.log("response (accept) ===>" + res.data.response);
            console.log("usernames 2 ..." + this.state.usernames)
            this.get_data();
        })
        .catch((error) => {
            console.log("error ====>" + error);
        })
   }
   
   addItem = item => {
    this.setState({
      usernames: [
        ...this.state.usernames,
        item 
      ]
    })
  }

  get_data() {
    const data = {
        to_user: localStorage.getItem('id'),
    }
    const options = {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('token')
        }
    }
    axios.post('http://3.209.12.36:8000/api/account/get_friend_requests', data, options)
    .then((res) => {
        names = res.data.friends;
        this.setState({
            usernames: names,
            loading: false,
        });
        console.log(this.state.loading)
        console.log("usernames 2 ..." + this.state.usernames)
    })
    .catch((error) => {
        console.log('id' + localStorage.getItem('id'))
        console.log("error ====>" + error);
    })
  }
   componentDidMount() {
       //console.log("wtf")
        this.get_data();
   }

   render() {  
        var result = []
        const isLoading = this.state.loading;
        let button;
        if (isLoading) {
           button = <LinearProgress />;
           console.log("loading")
        } else {
            console.log("done loading")
            if (!this.state.username) {
                button = <div> <h4> No friend requests</h4></div>
            } else {
                button =  this.state.usernames.map((username, index) => (
                    <Container maxWidth='xs' fixed>
                        <Card width='8rem'>
                            <Card.Body>
                                <Row>
                                    <Col md="auto">
                                        <Avatar alt="person" src={'https://www.gravatar.com/avatar/' + username.Avatar} />
                                    </Col>
                                    <Col style={{alignContent: "center"}}>
                                        @{username.username}
                                    </Col>
                                    <Col>
                                        <Button variant="dark" size="sm" onClick={() => this.acceptRequest(username.id)}>
                                            Accept
                                        </Button>
                                        <Button variant="light" size="sm" onClick={() => this.rejectRequest(username.id)}>
                                            Reject
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card> 
                    </Container>))
            }  
        };
    return (
        <div>
            {button}
        </div>
    );
   }
}
