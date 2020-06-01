import React, { Component } from "react";
import { Container, Row, Col, Modal, Form, FormControl, Button, InputGroup, Image } from "react-bootstrap";
import Post from '../posts/post';
import pp1 from '../../Images/pp1.jpg';
import pp2 from '../../Images/pp2.jpg';
import pp3 from '../../Images/iu-2.png';
import pp4 from '../../Images/iu-8.jpeg';
import Taskbar from './taskbar';
import Person from '../Messaging/person';

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
            showGroup: false,
            showGroupDelete: false,
            posts: [],
            LoggedInPersonName: 'Captain Jack Sparrow',
            LoggedInPersonTag: '@CaptainJackSparrow',
            LoggedInPersonGeotag: 'Tortuga, England',
            LoggedInPersonId: 1, /* Need to get a more reliable ID */
            time: '11:57 PM',
            date: ' 13 March 2020',
            LoggedInPersonPP: pp1,
            LoggedInPersonFriendIds: [2, 3, 4, 5, 6, 7, 8],
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
            friendIds2: [],
            groups: [],
            selectedPeople: [],
            selected: 0,
            selectedId: '',
            personSearch: false,
            groupSearch: false,
            groupSearchInput: '',
            personSearchInput: '',
            people: [
                <Person personId={1} key={1} personName={'Captan Jack Sparrow'} personPP={pp1}/>,
                <Person personId={2} key={2} personName={'Captan Barbosa'} personPP={pp2}/>,
                <Person personId={3} key={3} personName={'3'} personPP={pp3}/>,
                <Person personId={4} key={4} personName={'4'} personPP={pp3}/>,
                <Person personId={5} key={5} personName={'5'} personPP={pp3}/>,
                <Person personId={6} key={6} personName={'6'} personPP={pp3}/>,
                <Person personId={7} key={7} personName={'7'} personPP={pp3}/>,
                <Person personId={8} key={8} personName={'8'} personPP={pp3}/>
            ]
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

    const newGroup = () => {
        const groupId = Math.random();
        const groupName = document.getElementById('groupName').value;
        const groupPP = document.getElementById('groupPP');

        /**
         * List of 2d group arrays
         * the first index contains the group id
         * the second index contains an array of the group admin Ids
         * the third index contains an array of the people in the group,
         * the fourth index contains the group name
         * the fifth index contains the group image src
         */

        this.setState({
            groups: [...this.state.groups, [groupId, [this.state.LoggedInPersonId], this.state.selectedPeople, groupName, groupPP]],
            showGroup: false,
            selectedPeople: [],
        });

        if (this.state.groups.length > 0) {
            console.log('group[0] name: ');
            console.log(this.state.groups[0][2]);
        }
    }

    const personSearch = () => {
        var searchInput = document.getElementById('personSearch').value;
        console.log('search input:');
        console.log(searchInput);
  
        if (searchInput != '') {
          this.setState({
            personSearch: true,
            personSearchInput: searchInput
          });
        }else {
          this.setState({
            personSearch: false,
            personSearchInput: searchInput
          });
        }
    }

    const groupSearch = () => {
        var searchInput = document.getElementById('groupSearch').value;
        console.log('search input:');
        console.log(searchInput);
  
        if (searchInput != '') {
          this.setState({
            groupSearch: true,
            groupSearchInput: searchInput
          });
        }else {
          this.setState({
            groupSearch: false,
            groupSearchInput: searchInput
          });
        }
      }

    const personSelect = (e) => {
        console.log(e.target.id);
  
        if (e.target.checked == true) {
          this.setState({
            selectedPeople: [...this.state.selectedPeople, this.state.people.filter(person => person.props["personId"] == e.target.id)[0]],
            selected: 1,
            selectedId: e.target.id
          });
        }else if (e.target.checked == false) {
          this.setState({
            selectedPeople: this.state.selectedPeople.filter(person => person.props["personId"] != e.target.id),
            selected: 0,
            selectedId: ''
          });
        }
    }

    const removeGroup = (e) => {
        /**
         * The backend needs to delete this groupchat from the
         * chat histories of everyone that is on this group
         * 
         * Do this before removing the chat from the admin's chat
         */

        this.setState({
            groups: this.state.groups.filter(group => group[0] != e.target.id)
        });
    }

    const handleCloseGroup = () => {this.setState({showGroup:false})};
    const handleShowGroup = () => {this.setState({showGroup:true})};
    const handleCloseGroupDelete = () => {this.setState({showGroupDelete:false})};
    const handleShowGroupDelete = () => {this.setState({showGroupDelete:true})};
         
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
                    <Taskbar createPost={createPost} createPost2={createPost2} filterPosts={filterPosts} handleShowGroup={handleShowGroup} handleShowGroupDelete={handleShowGroupDelete}/>
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

            {/* Modal used to create group */}
            <Modal show={this.state.showGroup} onHide={handleCloseGroup} centered>
                <Modal.Header closeButton style={{backgroundColor:'#faf6ee'}}>
                    Create group
                    <div className='groupChat'>
                        <Form.Label>Group Name:</Form.Label>
                        <Form.Control type="text" id='groupName' placeholder="Group name..." />
                        <Form.Label>Group Display picture:</Form.Label>
                        <Image src={pp4} id='groupPP' className='message-pp'></Image>
                    </div>
                </Modal.Header>
                <Modal.Body style={{backgroundColor:'#ffffff'}}>
                    <div className='icons text-center' style={{height:'400px', overflowY:'scroll'}}>
                        <input style={{width:'100%'}} id='personSearch' placeholder='search for a person...' onChange={personSearch}></input>
                        {this.state.people.filter(person => this.state.LoggedInPersonFriendIds.includes(person.props['personId']))
                        .filter(this.state.personSearch == true ? (p => p.props['personName'].toLowerCase().includes(this.state.personSearchInput.toLowerCase())):(p => p == p))
                        .map((person) => (
                            <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Checkbox aria-label="Checkbox for following text input" id={person.props['personId']} onClick={personSelect} />
                            </InputGroup.Prepend>
                            {person}
                            </InputGroup>
                        ))}
                    </div>
                </Modal.Body>
                <Modal.Footer style={{backgroundColor:'#faf6ee'}}>
                <Button variant="primary" onClick={newGroup}>
                    Create group
                </Button>
                </Modal.Footer>
            </Modal>
            {/* Modal used to create group */}

            {/* Modal used to delete group */}
            <Modal show={this.state.showGroupDelete} onHide={handleCloseGroupDelete} centered>
                    <Modal.Header closeButton style={{backgroundColor:'#faf6ee'}}>
                        Delete group
                    </Modal.Header>
                    <Modal.Body style={{backgroundColor:'#ffffff'}}>
                        <div className='icons text-center' style={{height:'400px', overflowY:'scroll'}}>
                        <input style={{width:'100%'}} id='groupSearch' placeholder='search for a group...' onChange={groupSearch}></input>
                        {this.state.groups.filter(group => group[1].includes(this.state.LoggedInPersonId))
                        .filter(this.state.groupSearch == true ? (g => g[3].toLowerCase().includes(this.state.groupSearchInput.toLowerCase())):(g => g == g))
                        .map((group) => (
                            <div key={group[0]}>
                                <Container fluid>
                                    <Row className='person'>
                                        <Col
                                            xs={3}
                                            sm={3}
                                            md={1}
                                            lg={1}
                                            xl={1}
                                        >
                                            <Image src={pp4} className='message-pp'></Image>
                                        </Col>
                                        <Col
                                            xs={9}
                                            sm={9}
                                            md={11}
                                            lg={11}
                                            xl={11}
                                        >
                                            <div style={{display:'inline-block'}}>
                                            <p
                                                style={{marginBottom:'0px', fontSize:'20px', marginLeft:'0px'}}
                                            >
                                            {group[3]}
                                            </p>
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                                <Button style={{width:'100%'}} id={group[0]} onClick={removeGroup}>Delete</Button>
                            </div>
                        ))}
                        </div>
                    </Modal.Body>
                </Modal>
            {/* Modal used to delete group  */}
        </Container>
    );
  }
}

export default Feed;