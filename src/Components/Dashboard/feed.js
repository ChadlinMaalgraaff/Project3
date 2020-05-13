import React, { Component } from "react";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import Post from '../posts/post';
import pp1 from '../../Images/pp1.jpg';
import Taskbar from './taskbar';

class Feed extends Component {
    state = {
        posts: [],
        postPersonName: 'Captain Jack Sparrow',
        postPersonTag: '@CaptainJackSparrow',
        geotag: 'Tortuga, England',
        postPersonID: Math.random(), /* Need to get a more reliable ID */
        time: '11:57 PM',
        date: ' 13 March 2020',
        personPP: pp1
    }

  render() {
    const createPost = () => {
        const post = document.getElementById('my-post');

        this.setState({
            posts: [...this.state.posts, <Post postText={post.value} postPersonName={this.state.postPersonName} 
                postPersonTag={this.state.postPersonTag} pp={this.state.personPP} geotag={this.state.geotag} id={this.state.postPersonID} 
                date={this.state.date} time={this.state.time} filterMostLiked={filterLiked}/>]
        })
    };

    const filterLiked = () =>{
        console.log('Most liked.')
    }
         
    return( 
        <Container fluid style={{padding:'0px', margin:'0px', width:'100%'}}>
            <Row style={{padding:'0px', margin:'0px', width:'100%'}}>
                <Col
                    xs={0}
                    sm={0}
                    md={6}
                    lg={6}
                    xl={6}
                    style={{padding:'0px', margin:'0px', width:'100%'}}
                >
                    <Taskbar createPost={createPost}/>
                </Col>
                <Col 
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    xl={6}
                    style={{padding:'0px', margin:'0px', height:'100vh', overflowY:'scroll'}}
                >
                    <Row style={{padding:'0px', margin:'0px', width:'100%'}}>
                        <Col
                            xs={0}
                            sm={0}
                            md={0}
                            lg={1}
                            xl={1}
                            style={{padding:'5px', margin:'0px', width:'100%'}}
                        ></Col>
                        <Col
                            xs={12}
                            sm={12}
                            md={12}
                            lg={10}
                            xl={10}
                            style={{padding:'5px', margin:'0px', width:'100%'}}
                        >
                            {this.state.posts.map(post => (
                                post
                            ))}
                        </Col>
                        <Col
                            xs={0}
                            sm={0}
                            md={0}
                            lg={1}
                            xl={1}
                            style={{padding:'5px', margin:'0px', width:'100%'}}
                        ></Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
  }
}

export default Feed;