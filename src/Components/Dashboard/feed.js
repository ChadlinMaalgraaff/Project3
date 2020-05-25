import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Post from '../posts/post';
import pp1 from '../../Images/pp1.jpg';
import pp2 from '../../Images/pp2.jpg'
import Taskbar from './taskbar';

class Feed extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            posts: [],
            postPersonName: 'Captain Jack Sparrow',
            postPersonTag: '@CaptainJackSparrow',
            geotag: 'Tortuga, England',
            postPersonID: 1, /* Need to get a more reliable ID */
            time: '11:57 PM',
            date: ' 13 March 2020',
            personPP: pp1,
            friendIDs: [],
            followerIDs: [2],
            followerFilter: false,
            posts2: [],
            postPersonName2: 'Captain Barbosa',
            postPersonTag2: '@CaptainBarbosa',
            personPP2: pp2,
            postPersonID2: 2,
            followerIDs2: []
        };
      }

  render() {
    const createPost = () => {
        const post = document.getElementById('my-post');
        // Need to get a solid key value in the props
        this.setState({
            posts: [...this.state.posts, <Post postText={post.value} postPersonName={this.state.postPersonName} 
                postPersonTag={this.state.postPersonTag} pp={this.state.personPP} geotag={this.state.geotag} id={1} key={Math.random()} 
                date={this.state.date} time={1} followerIDs={this.state.followerIDs}/>]
        })
        if (this.state.posts[0] != null) {
            console.log(this.state.posts[0]);
        }
    };

    const createPost2 = () => {
        const post = document.getElementById('my-post2');
        // Need to get a solid key value in the props
        this.setState({
            posts: [...this.state.posts, <Post postText={post.value} postPersonName={this.state.postPersonName2} 
                postPersonTag={this.state.postPersonTag2} pp={this.state.personPP2} geotag={this.state.geotag} id={2} key={Math.random()} 
                date={this.state.date} time={2} followerIDs={this.state.followerIDs2}/>]
        })
       
    };

    const filterPosts = (filterType, on) =>{
        console.log('FilterType: ' + filterType);

        if (filterType === 'check-most-recent') {
            
        }else if (filterType === 'friends') {

        }else if (filterType === 'followers') {
            var t1 = this.state.posts;
            this.setState({
                posts: t1.filter(person => person.props.id == 2)
            });
            console.log(this.state.posts)
        }else if (filterType === 'time') {
            var t1 = this.state.posts;
            this.setState({
                posts: t1.sort(((p1, p2) => (p1.props["time"] > p2.props.time ) ? 1 : -1))
            });
            console.log(this.state.posts)
        }else if (filterType === 'check-location') {
            
        }else if (filterType === 'check-category') {
            
        }else if (filterType === 'check-user-group') {
            
        }
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
                    <Taskbar createPost={createPost} createPost2={createPost2} filterPosts={filterPosts}/>
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