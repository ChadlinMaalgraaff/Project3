import React, { Component } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import '../sidepanel/style.css';

class Taskbar extends Component {
    state = {
        show: false,
    }

    render() {
        let menuOpen = false;

        const clicked = () => {
            const content = document.getElementById('toggle-content');
            const items = content.getElementsByClassName('content-item');
            const menuBtn = document.getElementById('menu-btn');
            console.log('clicked')

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
                                    <Button variant="primary" onClick={handleShow}>
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
                                    Search
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
                                    Filter
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
                                    Sort
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