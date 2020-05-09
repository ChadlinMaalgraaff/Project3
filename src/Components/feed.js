import React, { Component } from "react";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import Post from './post';
import pp1 from '../Images/pp1.jpg';

class Feed extends Component {
    state = {
        show: false,
        posts: []
    }

  render() {
    const handleClose = () => {this.setState({show:false})};
    const handleShow = () => {this.setState({show:true})};
    const createPost = () => {
        const post = document.getElementById('my-post');

        this.setState({
            posts: [...this.state.posts, <Post postText={post.value} postPersonName={'Captain Jack Sparrow'} postPersonTag={'@CaptainJackSparrow'} pp={pp1} geotag={'Tortuga, England'}/>]
        })
    };

    const animateButton = () => {
        const button = document.getElementById('awe');
          //reset animation
          button.classList.remove('animate');
           
          button.classList.add('animate');
          console.log(button);
          setTimeout(function(){
            button.classList.remove('animate');
          },700);
    };
         
    return( 
    <Container>
        <Row>
            <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
            >
                <div className='text-center' style={{margin:'auto', marginTop:'50px'}}>
                    <Button variant="primary" onClick={handleShow}>
                        Create new post
                    </Button>
                </div>
            </Col>
        </Row>
        <Row>
            <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
            >
                <div className='text-center' style={{margin:'auto', marginTop:'50px'}}>
                    <h1>Posts</h1>
                </div>
            </Col>
            <Col
                xs={0}
                sm={0}
                md={3}
                lg={3}
                xl={3}
            ></Col>
            <Col
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={6}
            >
                {this.state.posts.map(post => (
                    post
                ))}
            </Col>
            <Col
                xs={0}
                sm={0}
                md={3}
                lg={3}
                xl={3}
            ></Col>
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
            <Button variant="primary" onClick={createPost}>
                Post
            </Button>
            </Modal.Footer>
        </Modal>
        {/* Modal used to type post */}
    </Container>
    );
  }
}

export default Feed;