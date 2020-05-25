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
            postsTemp: [],
            postPersonName: 'Captain Jack Sparrow',
            postPersonTag: '@CaptainJackSparrow',
            geotag: 'Tortuga, England',
            postPersonId: 1, /* Need to get a more reliable ID */
            time: '11:57 PM',
            date: ' 13 March 2020',
            personPP: pp1,
            friendIds: [],
            followerIds: [2],
            followerFilter: false,
            friendFilter: false,
            timeFilter: false,
            posts2: [],
            postPersonName2: 'Captain Barbosa',
            postPersonTag2: '@CaptainBarbosa',
            personPP2: pp2,
            postPersonId2: 2,
            followerIds2: [1],
            friendIds2: []

        };
      }

  render() {
    const createPost = () => {
        const post = document.getElementById('my-post');
        // Need to get a solid key value in the props
        this.setState({
            posts: [...this.state.posts, <Post postText={post.value} postPersonName={this.state.postPersonName} 
                postPersonTag={this.state.postPersonTag} pp={this.state.personPP} geotag={this.state.geotag} id={this.state.postPersonId} key={Math.random()} 
                date={this.state.date} time={1} followerIds={this.state.followerIds} friendIds={this.state.friendIds}/>]
        })
    };

    const createPost2 = () => {
        const post = document.getElementById('my-post2');
        // Need to get a solid key value in the props
        this.setState({
            posts: [...this.state.posts, <Post postText={post.value} postPersonName={this.state.postPersonName2} 
                postPersonTag={this.state.postPersonTag2} pp={this.state.personPP2} geotag={this.state.geotag} id={this.state.postPersonId2} key={Math.random()} 
                date={this.state.date} time={2} followerIds={this.state.followerIds2} friendIds={this.state.friendIds2}/>]
        })
       
    };

    const undo = (filter) => {
        if (filter == 'followers') {
            console.log('undo followers');
            console.log('timeFilter:');
            console.log(this.state.timeFilter);
            var t1 = [];
            for (var i = 0; i < this.state.posts.length; i++) {
                t1.push(this.state.posts[i]);
            }
            this.setState({
                postsTemp: t1
            });

            if (this.state.friendFilter == true) {
                this.setState({
                    postsTemp: this.state.postsTemp.filter(person => this.state.friendIds.includes(person.props["id"]))
                })
            }
            if (this.state.timeFilter == true) {
                this.setState({
                    postsTemp: this.state.postsTemp.sort(((p1, p2) => (p1.props["time"] > p2.props.time ) ? 1 : -1))
                })
            }
        }else if (filter == 'friends') {
            console.log('undo freinds');
            var t1 = [];
            for (var i = 0; i < this.state.posts.length; i++) {
                t1.push(this.state.posts[i]);
            }
            this.setState({
                postsTemp: t1
            });

            if (this.state.followerFilter == true) {
                this.setState({
                    postsTemp: this.state.postsTemp.filter(person => this.state.followerIds.includes(person.props["id"]))
                })
            }
            if (this.state.timeFilter == true) {
                this.setState({
                    postsTemp: this.state.postsTemp.sort(((p1, p2) => (p1.props["time"] > p2.props.time ) ? 1 : -1))
                })
            }
        }else if (filter == 'time') {
            console.log('undo time');
            console.log('followersFilter:');
            console.log(this.state.followerFilter);
            var t1 = [];
            for (var i = 0; i < this.state.posts.length; i++) {
                t1.push(this.state.posts[i]);
            }
            this.setState({
                postsTemp: t1
            });

            if (this.state.followerFilter == true) {
                this.setState({
                    postsTemp: this.state.postsTemp.filter(person => this.state.followerIds.includes(person.props["id"]))
                })
            }
            if (this.state.friendFilter == true) {
                this.setState({
                    postsTemp: this.state.postsTemp.filter(person => this.state.friendIds.includes(person.props["id"]))
                })
            }
        }
        console.log('posts: ')
        console.log(this.state.posts)
    }

    const filterPosts = (filterType, on) =>{
        console.log('FilterType: ' + filterType);

        if (filterType === 'friends') {
            if (on) {
                this.setState({
                    postsTemp: this.state.postsTemp.filter(person => this.state.friendIds.includes(person.props["id"])),
                    friendFilter: true
                });
            }else {
                this.setState({
                    friendFilter: false
                });
                undo('friends');
            }
        }else if (filterType === 'followers') {
            if (on) {
                this.setState({
                    postsTemp: this.state.postsTemp.filter(person => this.state.followerIds.includes(person.props["id"])),
                    followerFilter: true
                });
            }else {
                this.setState({
                    followerFilter: false
                });
                undo('followers');
            }
        }else if (filterType === 'time') {
            if (on) {
                this.setState({
                    postsTemp: this.state.postsTemp.sort(((p1, p2) => (p1.props["time"] > p2.props.time ) ? 1 : -1)),
                    timeFilter: true
                });
            }else {
                this.setState({
                    timeFilter: false
                });
                undo('time');
            }
        }else if (filterType === 'check-location') {
            
        }else if (filterType === 'check-category') {
            
        }else if (filterType === 'check-user-group') {
            
        }
        console.log('posts: ')
        console.log(this.state.posts)
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
                            {this.state.postsTemp.map(post => (
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