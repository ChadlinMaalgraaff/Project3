import React, { Component } from 'react';
import { Container, Row, Col, Button, Modal, Form, FormControl, InputGroup } from 'react-bootstrap';
import '../sidepanel/style.css';
import './feed.css';

class Taskbar extends Component {
    state = {
        show: false,
        checkMostLiked: false,
        checkMostReposted: false,
        checkMostRecent: false,
        checkFriends: false,
        checkFollowers: false,
        checkTime: false,
        checkLocation: false,
        checkCategory: false,
        checkUserGroup: false,
        searchInput: ''
    }

    check = (e) => {

        if (e.target.id === 'check-friends') {
            if (this.state.checkFriends == false) {
                this.setState({
                    checkFriends: true
                })
                this.props.filterPosts('friends', true);
            }else {
                this.setState({
                    checkFriends: false
                })
                this.props.filterPosts('friends', false);
            }
        }else if (e.target.id === 'check-followers') {
            if (this.state.checkFollowers == false) {
                this.setState({
                    checkFollowers: true
                })
                this.props.filterPosts('followers', true);
            }else {
                this.setState({
                    checkFollowers: false
                })
                this.props.filterPosts('followers', false);
            }
        }else if (e.target.id === 'check-time') {
            if (this.state.checkTime == false) {
                this.setState({
                    checkTime: true
                })
                this.props.filterPosts('time', true);
            }else {
                this.setState({
                    checkTime: false
                })
                this.props.filterPosts('time', false);
            }
        }else if (e.target.id === 'check-location') {
            if (this.state.checkLocation == false) {
                this.setState({
                    checkLocation: true
                })
                this.props.filterPosts('check-location', true);
            }else {
                this.setState({
                    checkLocation: false
                })
                this.props.filterPosts('check-location', false);
            }
        }else if (e.target.id === 'check-category') {
            if (this.state.checkCategory == false) {
                this.setState({
                    checkCategory: true
                })
                this.props.filterPosts('check-category', true);
            }else {
                this.setState({
                    checkCategory: false
                })
                this.props.filterPosts('check-category', false);
            }
        }else if (e.target.id === 'check-user-group') {
            if (this.state.checkUserGroup == false) {
                this.setState({
                    checkUserGroup: true
                })
                this.props.filterPosts('check-user-group', true);
            }else {
                this.setState({
                    checkUserGroup: false
                })
                this.props.filterPosts('check-user-group', false);
            }
        }

    }

    render() {
        let menuOpen = false;

        const clicked = () => {
            const content = document.getElementById('toggle-content');
            const items = content.getElementsByClassName('content-item');
            const menuBtn = document.getElementById('menu-btn');

            if(!menuOpen) {
                menuBtn.classList.add('open');
                menuOpen = true;
              } else {
                menuBtn.classList.remove('open');
                menuOpen = false;
            } 

            content.classList.toggle("open");
            for (var i = 0; i < items.length; i++) {
                items[i].classList.toggle("fade");
            }
        }

        const searchInput = () => {
            var textValue = document.getElementById('searchInput')
            this.setState({
                searchInput: textValue
            })
        }

        return(
            <Container style={{padding:'0px', margin:'0px', width:'100%'}}>
                <Row  style={{padding:'0px', margin:'0px', width:'100%'}}>
                    <div className='toggle' style={{zIndex:'100'}}>
                        <div className="menu-btn" id='menu-btn' onClick={clicked}>
                            <div className="menu-btn__burger"></div>
                        </div>
                        
                        <Col 
                            className='toggle-content' 
                            id='toggle-content'
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                        >
                            <Row  style={{padding:'0px', margin:'0px', marginBottom:'10px', marginTop:'50px'}}>
                                <Col
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    xl={12}
                                    className='content-item' id='content-item'
                                >
                                    <InputGroup className="mb-3">
                                        <FormControl type="text" placeholder="Search by name or text" className="search text-center" id='searchInput' onChange={searchInput}/>
                                        <InputGroup.Append>
                                        <Button variant="outline-light" style={{width:'100%', borderTopRightRadius:'1.5rem', borderBottomRightRadius:'1.5rem'}} onClick={e => this.props.postSearch(e, this.state.searchInput)}>
                                        <i className="fa fa-search icon" style={{color:'black', width:'30px'}}></i>
                                        </Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row  style={{padding:'0px', margin:'0px', marginBottom:'20px'}}>
                                <Col
                                    xs={12}
                                    sm={12}
                                    md={6}
                                    lg={6}
                                    xl={6}
                                    className='content-item' id='content-item'
                                >
                                    <Button variant="dark" onClick={this.props.handleShow} style={{padding:'0px', margin:'0px', width:'100%'}}>
                                        Create new post
                                    </Button>
                                </Col>
                                <Col
                                    xs={12}
                                    sm={12}
                                    md={6}
                                    lg={6}
                                    xl={6}
                                    className='content-item' id='content-item'
                                >
                                    <Button variant="dark" onClick={this.props.handleShowGroup} style={{padding:'0px', margin:'0px', width:'100%'}}>
                                        Create new group
                                    </Button>
                                </Col>
                                <Col
                                    xs={12}
                                    sm={12}
                                    md={6}
                                    lg={6}
                                    xl={6}
                                    className='content-item' id='content-item'
                                >
                                    <Button variant="dark" onClick={this.props.handleShowGroupDelete} style={{padding:'0px', margin:'0px', width:'100%'}}>
                                        Delete group
                                    </Button>
                                </Col><Col
                                    xs={12}
                                    sm={12}
                                    md={6}
                                    lg={6}
                                    xl={6}
                                    className='content-item' id='content-item'
                                >
                                    <Button variant="dark" onClick={this.props.handleShowGroupJoin} style={{padding:'0px', margin:'0px', width:'100%'}}>
                                        Join group
                                    </Button>
                                </Col>
                            </Row>
                            <Row  style={{padding:'0px', margin:'0px'}}>
                                <Col
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    xl={12}
                                    className='content-item' id='content-item'
                                >
                                    <div style={{width:'200px', margin:'0px', margin:'auto'}}>
                                        <h3>Filter Posts</h3>
                                        <div style={{width:'150px', margin:'0px', margin:'auto'}}>
                                            <Form.Group controlId="formBasicCheckbox">
                                                <Form.Check type="checkbox" label="Friends" id='check-friends' onClick={this.check}/>
                                            </Form.Group>
                                            <Form.Group controlId="formBasicCheckbox">
                                                <Form.Check type="checkbox" label="Followers" id='check-followers' onClick={this.check}/>
                                            </Form.Group>
                                        </div>
                                    </div>
                                </Col>
                                <Col
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    xl={12}
                                    className='content-item' id='content-item'
                                >
                                    <div style={{width:'200px', margin:'0px', margin:'auto'}}>
                                        <h3>Sort Posts By</h3>
                                        <div style={{width:'150px', margin:'0px', margin:'auto'}}>
                                            <Form.Group controlId="formBasicCheckbox">
                                                <Form.Check type="checkbox" label="Time" id='check-time' onClick={this.check}/>
                                            </Form.Group>
                                            <Form.Group controlId="formBasicCheckbox">
                                                <Form.Check type="checkbox" label="Location" id='check-location' onClick={this.check}/>
                                            </Form.Group>
                                            <Form.Group controlId="formBasicCheckbox">
                                                <Form.Check type="checkbox" label="Category" id='check-category' onClick={this.check}/>
                                            </Form.Group>
                                            <Form.Group controlId="formBasicCheckbox">
                                                <Form.Check type="checkbox" label="User/Group" id='check-user-group' onClick={this.check}/>
                                            </Form.Group>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </div>
                </Row>
            
    
            </Container>
        );
    }
}

export default Taskbar;