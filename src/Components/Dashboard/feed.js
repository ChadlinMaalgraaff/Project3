import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Post from '../posts/post';
import pp1 from '../../Images/pp1.jpg';
import pp2 from '../../Images/pp2.jpg'
import Taskbar from './taskbar';

class Feed extends Component {
/*
    Before backend sends all of the posts to frontend, backend needs to modify the Post Objects
    Set the following list of properties of each Post Object to the corresponding value of the person logging in:
    - LoggedInPersonId
    - LoggedInPersonName
    - LoggedInPersonTag
*/

    constructor(props) {
        super(props);
    
        this.state = {
            posts: [],
            LoggedInPersonName: 'Captain Jack Sparrow',
            LoggedInPersonTag: '@CaptainJackSparrow',
            LoggedInPersonGeotag: 'Tortuga, England',
            LoggedInPersonId: 1, /* Need to get a more reliable ID */
            time: '11:57 PM',
            date: ' 13 March 2020',
            LoggedInPersonPP: pp1,
            LoggedInPersonFriendIds: [1, 2],
            LoggedInPersonFollowerIds: [2],
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
    const timeSort = (array, filterOn) => {
        var newArray = [];
        for (var k = 0; k < array.length; k++) {
            newArray.push(array[k]);
        }

        if (filterOn) {
            for (var j = 0; j < newArray.length - 1; j++) {
                for (var i = 0, swapping; i < newArray.length - 1; i++) {
                    if (newArray[i].props["time"]> newArray[i + 1].props["time"]) {
                    swapping = newArray[i + 1];
                    newArray[i + 1] = newArray[i];
                    newArray[i] = swapping;
                    }; 
                }; 
            };
        }

        return newArray;
    }

    const createPost = () => {
        const post = document.getElementById('my-post');
        var today = new Date();
        // Need to get a reliable key value in the props
        this.setState({
            posts: [...this.state.posts, <Post postText={post.value} postPersonName={this.state.LoggedInPersonName} 
                postPersonTag={this.state.LoggedInPersonTag} pp={this.state.LoggedInPersonPP} geotag={this.state.LoggedInPersonGeotag} id={this.state.LoggedInPersonId} key={Math.random()} 
                date={today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()} time={today.getHours() + ":" + today.getMinutes()} followerIds={this.state.LoggedInPersonFollowerIds} friendIds={this.state.LoggedInPersonFriendIds} LoggedInPersonId={this.state.LoggedInPersonId}
                LoggedInPersonName={this.state.LoggedInPersonName} LoggedInPersonTag={this.state.LoggedInPersonTag}/>]
        })
    };

    const createPost2 = () => {
        const post = document.getElementById('my-post2');
        var today = new Date();
        // Need to get a reliable key value in the props
        this.setState({
            posts: [...this.state.posts, <Post postText={post.value} postPersonName={this.state.postPersonName2} 
                postPersonTag={this.state.postPersonTag2} pp={this.state.personPP2} geotag={this.state.LoggedInPersonGeotag} id={this.state.postPersonId2} key={Math.random()} 
                date={today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()} time={today.getHours() + ":" + today.getMinutes()} followerIds={this.state.followerIds2} friendIds={this.state.friendIds2} /*LoggedInPersonId*//>]
        })
    };

    const filterPosts = (filterType, on) =>{
        console.log('FilterType: ' + filterType);

        if (filterType === 'friends') {
            if (on) {
                this.setState({
                    friendFilter: true
                });
            }else {
                this.setState({
                    friendFilter: false
                });
            }
        }else if (filterType === 'followers') {
            if (on) {
                this.setState({
                    followerFilter: true
                });
            }else {
                this.setState({
                    followerFilter: false
                });
            }
        }else if (filterType === 'time') {
            if (on) {
                this.setState({
                    timeFilter: true
                });
            }else {
                this.setState({
                    timeFilter: false
                });
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
                            {
                                timeSort(
                                (this.state.followerFilter == true ? (this.state.posts.filter(post => this.state.LoggedInPersonFollowerIds.includes(post.props["id"]))):(this.state.posts))
                                .filter(this.state.friendFilter == true ? (post => this.state.LoggedInPersonFriendIds.includes(post.props["id"])):(post => post))
                                , this.state.timeFilter)
                                .map(post => (
                                    post
                                ))
                            }
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