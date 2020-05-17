import React, { Component } from 'react';
import { Container, Row, Col, Button, Modal, Form, FormControl } from 'react-bootstrap';
import '../sidepanel/style.css';

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
        checkUserGroup: false
    }

    check = (e) => {

        if (e.target.id === 'check-most-liked') {
            if (this.state.checkMostLiked == false) {
                this.setState({
                    checkMostLiked: true
                })
                this.props.filterPosts('most-liked');
            }else {
                this.setState({
                    checkMostLiked: false
                })
            }
        }else if (e.target.id === 'check-most-reposted') {
            if (this.state.checkMostReposted == false) {
                this.setState({
                    checkMostReposted: true
                })
                this.props.filterPosts('most-reposted');
            }else {
                this.setState({
                    checkMostReposted: false
                })
            }
        }else if (e.target.id === 'check-most-recent') {
            if (this.state.checkMostRecent == false) {
                this.setState({
                    checkMostRecent: true
                })
                this.props.filterPosts('most-recent');
            }else {
                this.setState({
                    checkMostRecent: false
                })
            }
        }else if (e.target.id === 'check-friends') {
            if (this.state.checkFriends == false) {
                this.setState({
                    checkFriends: true
                })
                this.props.filterPosts('friends');
            }else {
                this.setState({
                    checkFriends: false
                })
            }
        }else if (e.target.id === 'check-followers') {
            if (this.state.checkFollowers == false) {
                this.setState({
                    checkFollowers: true
                })
                this.props.filterPosts('followers');
            }else {
                this.setState({
                    checkFollowers: false
                })
            }
        }else if (e.target.id === 'check-time') {
            if (this.state.checkTime == false) {
                this.setState({
                    checkTime: true
                })
                this.props.filterPosts('time');
            }else {
                this.setState({
                    checkTime: false
                })
            }
        }else if (e.target.id === 'check-location') {
            if (this.state.checkLocation == false) {
                this.setState({
                    checkLocation: true
                })
            }else {
                this.setState({
                    checkLocation: false
                })
            }
        }else if (e.target.id === 'check-category') {
            if (this.state.checkCategory == false) {
                this.setState({
                    checkCategory: true
                })
            }else {
                this.setState({
                    checkCategory: false
                })
            }
        }else if (e.target.id === 'check-user-group') {
            if (this.state.checkUserGroup == false) {
                this.setState({
                    checkUserGroup: true
                })
            }else {
                this.setState({
                    checkUserGroup: false
                })
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

        const handleClose = () => {this.setState({show:false})};
        const handleShow = () => {this.setState({show:true})};

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
                            <Row  style={{padding:'0px', margin:'0px', width:'100%'}}>
                                <Col
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    xl={12}
                                    style={{padding:'0px', margin:'0px', width:'100%'}}
                                    className='content-item' id='content-item'
                                >
                                    <Button variant="dark" onClick={handleShow} style={{padding:'0px', margin:'0px', width:'100%'}}>
                                        Create new post
                                    </Button>
                                </Col>
                                <Col
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    xl={12}
                                    style={{padding:'0px', margin:'0px', width:'100%'}}
                                    className='content-item' id='content-item'
                                >
                                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                    <Button variant="outline-light" style={{width:'100%'}}>Search</Button>
                                </Col>
                                <Col
                                    xs={12}
                                    sm={12}
                                    md={6}
                                    lg={6}
                                    xl={6}
                                    style={{padding:'0px', margin:'0px', width:'100%'}}
                                    className='content-item' id='content-item'
                                >
                                    <h3>Filter</h3>
                                    <Form.Group controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Most Liked" id='check-most-liked' onClick={this.check}/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Most Reposted" id='check-most-reposted' onClick={this.check}/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Most Recent" id='check-most-recent' onClick={this.check}/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Friends" id='check-friends' onClick={this.check}/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Followers" id='check-followers' onClick={this.check}/>
                                    </Form.Group>
                                </Col>
                                <Col
                                    xs={12}
                                    sm={12}
                                    md={6}
                                    lg={6}
                                    xl={6}
                                    style={{padding:'0px', margin:'0px', width:'100%'}}
                                    className='content-item' id='content-item'
                                >
                                    <h3>Sort</h3>
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
                                </Col>
                            </Row>
                        </Col>
                    </div>
                </Row>
            
            {/* Modal used to type post */}
                <Modal show={this.state.show} onHide={handleClose} centered>
                    <Modal.Header closeButton style={{backgroundColor:'#faf6ee'}}>
                        <Modal.Title style={{fontFamily:'Vision-Heavy', color:'#67a495'}}>You can contact us via:</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{backgroundColor:'#ffffff'}}>
                        <div className='icons text-center'>
                        <Form.Label>Enter post here</Form.Label>
                        <Form.Control type="text" placeholder="my post..." id='my-post'/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer style={{backgroundColor:'#faf6ee'}}>
                    <Button variant="primary" onClick={this.props.createPost}>
                        Post
                    </Button>
                    </Modal.Footer>
                </Modal>
            {/* Modal used to type post */}
            </Container>
        );
    }
}

export default Taskbar;