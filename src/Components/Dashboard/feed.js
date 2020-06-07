import React, { Component } from "react";
import { Spinner, Container, Row, Col, Modal, Form, Button, InputGroup, Image, ListGroup, DropdownButton, Dropdown } from "react-bootstrap";
import Post from '../posts/post';
import pp1 from '../../Images/pp1.jpg';
import pp2 from '../../Images/pp2.jpg';
import pp3 from '../../Images/iu-2.png';
import pp4 from '../../Images/iu-8.jpeg';
import Taskbar from './taskbar';
import Person from '../Messaging/person';
import './feed.css';
import axios from 'axios';

class Feed extends Component {
/*
    Before backend sends all of the posts to frontend, backend needs to modify the Post Objects
    Set the following list of properties of each Post Object to the corresponding value of the person logging in:
    - LoggedInPersonId
    - LoggedInPersonName
    - LoggedInPersonTag

    This is used for commenting purposes
*/

    constructor(props) {
        super(props);
    
        this.state = {
            show: false,
            showGroup: false,
            showGroupDelete: false,
            showGroupFilter: false,
            showCategoryFilter: false,
            showGroupJoin: false,
            posts: [],
            LoggedInPersonName: 'Captain Jack Sparrow',
            LoggedInPersonTag: '@CaptainJackSparrow',
            LoggedInPersonGeotag: 'Tortuga, England',
            LoggedInPersonId: 1, /* Need to get a more reliable ID */
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
            ],
            selectedGroup: [],
            selectedGroupMemberIds: [],
            groupFilter: false,
            categories: ['a', 'b', 'c', 'd', 'e', 'awe'],
            categoryFilter: false,
            categoryFilterText: '',
            selectedCategory: '',
            postSearch: false,
            postSearchText: '',
            postDB: [],
            token: '7ac7e8c9b85410ec2481f2c2c239a6037748f610',
            loadPosts: true,
            users: []
        };
    }

    componentDidMount() {
        console.log('mounted component');
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + this.state.token
            }
        };

        (async () => {
            await axios.get('http://3.209.12.36:8000/api/account/list_users', options)
                .then((res) => {
                    this.setState({
                        users: res.data
                    })
                })
                .catch((err) => {
                    console.log("ERROR: ====", err);
                })

                console.log('Users:');
                console.log(this.state.users);

                var people = []
                for (var k = 0; k < this.state.users.length; k++) {
                    var person = <Person personId={this.state.users[k].pk} key={Math.random()} personName={this.state.users[k].first_name + ' ' + this.state.users[k].last_name} personPP={pp3}/>
                    people.push(person);
                }
                console.log('people: ');
                console.log(people)
                this.setState({
                    people: people
                })
        })();

        /**
         * List of 2d group arrays
         * the first index contains the group id
         * the second index contains an array of the group admin Ids
         * the third index contains an array of the people in the group,
         * the fourth index contains the group name
         * the fifth index contains the group image src
         */
        (async () => {
            await axios.get('http://3.209.12.36:8000/api/group', options)
            .then((res) => {
                console.log("RESPONSE ==== : ", res);
                console.log('groups: ');
                console.log(res.data.results)

                var groups = [];
                for (var l = 0; l < res.data.results.length; l++) {
                    var people = [];
                    for (var m = 0; m < res.data.results[l].members.length; m++) {
                        for (var u = 0; u < this.state.users.length; u++) {
                            if (res.data.results[l].members[m] == this.state.users[u].pk) {
                                var person = <Person personId={this.state.users[u].pk} key={Math.random()} personName={this.state.users[u].first_name + ' ' + this.state.users[u].last_name} personPP={pp3}/>
                                people.push(person);
                                u = this.state.users.length;
                            }
                        }
                    }

                    var group = [res.data.results[l].id, [res.data.results[l].admin], people, res.data.results[l].title, <Image src={pp3}></Image>];
                    groups.push(group);
                }

                this.setState({
                    groups: groups
                })

            })
            .catch((err) => {
                console.log("ERROR: ====", err);
            })
        })();
        
        (async () => {

           await axios.get('http://3.209.12.36:8000/api/post', options)
            .then((res) => {
                console.log("RESPONSE ==== : ", res);
                this.setState({
                    postDB: res.data.results
                })
                console.log('postDB:')
                console.log(this.state.postDB);

                var postComponents = [];
                for (var i = 0; i < res.data.results.length; i++) {

                    var name = 'Not a registered user';
                    var surname = '';
                    for (var j = 0; j < this.state.users.length; j++) {
                        if (res.data.results[i].user == this.state.users[j].pk) {
                            name = this.state.users[j].first_name;
                            surname = this.state.users[j].last_name;
                            j = this.state.users.length;
                        }
                    }

                    var post = <Post postText={res.data.results[i].body} postPersonName={name + ' ' + surname} postPersonId={res.data.results[i].user}
                    postPersonTag={'@' + name + surname} pp={this.state.LoggedInPersonPP} geotag={this.state.LoggedInPersonGeotag} id={res.data.results[i].id} key={Math.random()} 
                    date={res.data.results[i].pub_date} followerIds={this.state.LoggedInPersonFollowerIds} friendIds={this.state.LoggedInPersonFriendIds} LoggedInPersonId={this.state.LoggedInPersonId}
                    LoggedInPersonName={this.state.LoggedInPersonName} LoggedInPersonTag={this.state.LoggedInPersonTag} category={res.data.results[i].cat}/>
                    
                    postComponents.push(post);
                }
                console.log('postComponents: ');
                console.log(postComponents);
                this.setState({
                    posts: postComponents,
                    loadPosts: false
                })
                console.log('this.state.people:');
                console.log(this.state.people);
            })
            .catch((err) => {
                console.log("ERROR: ====", err);
            })
        })();
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
                    if (newArray[i].props["date"] < newArray[i + 1].props["date"]) {
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
        var otherCategory = document.getElementById('otherCategoryText').value;
        
        // Need to get a reliable key value in the props
        {/*this.setState({
            posts: [...this.state.posts, <Post postText={post.value} postPersonName={this.state.LoggedInPersonName} 
                postPersonTag={this.state.LoggedInPersonTag} pp={this.state.LoggedInPersonPP} geotag={this.state.LoggedInPersonGeotag} id={this.state.LoggedInPersonId} key={Math.random()} 
                date={today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()} time={today.getHours() + ":" + today.getMinutes()} followerIds={this.state.LoggedInPersonFollowerIds} friendIds={this.state.LoggedInPersonFriendIds} LoggedInPersonId={this.state.LoggedInPersonId}
                LoggedInPersonName={this.state.LoggedInPersonName} LoggedInPersonTag={this.state.LoggedInPersonTag} category={this.state.selectedCategory == 'Other' ? (otherCategory):(this.state.selectedCategory)}/>]
        })*/}

        if (this.state.selectedCategory == 'Other') {
            this.setState({
                categories: [...this.state.categories.filter(category => category != otherCategory), otherCategory]
            })
        }
        this.setState({
            selectedCategory: '',
            show: false
        })

        const data = {
            body: post.value,
            cat: this.state.selectedCategory == 'Other' ? (otherCategory):(this.state.selectedCategory),
            lat: "noloc",
            lon: "noloc",
            user: 39 /** Need to get user id from Kiara */
        };
        
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Token ' + this.state.token
            }
        };

        (async () => {
            this.setState({
                loadPosts: true
            })
            await axios.get('http://3.209.12.36:8000/api/account/list_users', options)
                .then((res) => {
                    this.setState({
                        users: res.data
                    })
                })
                .catch((err) => {
                    console.log("ERROR: ====", err);
                })

                console.log('Users:');
                console.log(this.state.users);
        })();

        (async () => {
            this.setState({
                loadPosts: true
            })
            await axios.post('http://3.209.12.36:8000/api/post/', data, options)

            axios.get('http://3.209.12.36:8000/api/post', options)
            .then((res) => {
                console.log("RESPONSE ==== : ", res);
                var postComponents = [];
                for (var i = 0; i < res.data.results.length; i++) {

                    var name = 'Not a registered user';
                    var surname = '';
                    for (var j = 0; j < this.state.users.length; j++) {
                        if (res.data.results[i].user == this.state.users[j].pk) {
                            name = this.state.users[j].first_name;
                            surname = this.state.users[j].last_name;
                            j = this.state.users.length;
                        }
                    }

                    var post = <Post postText={res.data.results[i].body} postPersonName={name + ' ' + surname} postPersonId={res.data.results[i].user}
                    postPersonTag={'@' + name + surname} pp={this.state.LoggedInPersonPP} geotag={this.state.LoggedInPersonGeotag} id={res.data.results[i].id} key={Math.random()} 
                    date={res.data.results[i].pub_date} followerIds={this.state.LoggedInPersonFollowerIds} friendIds={this.state.LoggedInPersonFriendIds} LoggedInPersonId={res.data.results[i].user}
                    LoggedInPersonName={this.state.LoggedInPersonName} LoggedInPersonTag={this.state.LoggedInPersonTag} category={res.data.results[i].cat}/>
                    
                    postComponents.push(post);
                }
                console.log('postComponents: ');
                console.log(postComponents);
                this.setState({
                    posts: postComponents,
                    loadPosts: false
                })
            })
            .catch((err) => {
                console.log("ERROR: ====", err);
            })
        })();
        
    };

    const createPost2 = () => {
        const post = document.getElementById('my-post2');
        var today = new Date();
        var otherCategory = document.getElementById('otherCategoryText').value;
        console.log('otherCategory2:');
        console.log(otherCategory);

        // Need to get a reliable key value in the props
        this.setState({
            posts: [...this.state.posts, <Post postText={post.value} postPersonName={this.state.postPersonName2} 
                postPersonTag={this.state.postPersonTag2} pp={this.state.personPP2} geotag={this.state.LoggedInPersonGeotag} id={this.state.postPersonId2} key={Math.random()} 
                date={today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()} time={today.getHours() + ":" + today.getMinutes()} 
                followerIds={this.state.followerIds2} friendIds={this.state.friendIds2} /*LoggedInPersonId*/ category={this.state.selectedCategory == 'Other' ? (otherCategory):(this.state.selectedCategory)}/>]
        })

        if (this.state.selectedCategory == 'Other') {
            this.setState({
                categories: [...this.state.categories.filter(category => category != otherCategory), otherCategory]
            })
        }
        this.setState({
            selectedCategory: '',
            show: false
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
            if (on) {
                this.setState({
                    categoryFilter: true,
                    showCategoryFilter: true,
                    categoryFilterText: ''
                });
            }else {
                this.setState({
                    categoryFilter: false,
                    showCategoryFilter: false,
                    categoryFilterText: ''
                });
            }
        }else if (filterType === 'check-user-group') {
            if (on) {
                this.setState({
                    groupFilter: true,
                    showGroupFilter: true
                });
            }else {
                this.setState({
                    groupFilter: false,
                    showGroupFilter: false,
                    groupFilter: false,
                    selectedGroupMemberIds: [],
                    selectedGroup: []
                });
            }
        }
        console.log('posts: ')
        console.log(this.state.posts)
    }

    const selectCategory = (e) => {
        var selected = e.target.id;
        console.log('selected');
        console.log(selected);

        this.setState({
            selectedCategory: selected
        });
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

        var memberIds = [];
        for (var i = 0; i < this.state.selectedPeople.length; i++) {
            memberIds.push(this.state.selectedPeople[i].props.personId);
        }
        memberIds.push(39/** Need to get user id from Kiara */);

        console.log('member ids:');
        console.log(memberIds);

        /*memberIds = [39]*/

        const data = {
            title: groupName,
            desc: 'my group',
            admin: 39, /** Need to get user id from Kiara */
            members: memberIds,
            create_date:  "2020-06-06T04:12:19+02:00" /** Doesnt really matter */
        };

        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + this.state.token
            }
        };

        (async () => {
            await axios.post('http://3.209.12.36:8000/api/group/', data, options)

            await axios.get('http://3.209.12.36:8000/api/group', options)
            .then((res) => {
                console.log("RESPONSE ==== : ", res);
                console.log('groups: ');
                console.log(res.data.results)

                var groups = [];
                for (var l = 0; l < res.data.results.length; l++) {
                    var people = [];
                    for (var m = 0; m < res.data.results[l].members.length; m++) {
                        for (var u = 0; u < this.state.users.length; u++) {
                            
                            if (res.data.results[l].members[m] == this.state.users[u].pk) {
                                console.log('member id: ');
                                console.log(res.data.results[l].members[m])
                                var person = <Person personId={this.state.users[u].pk} key={Math.random()} personName={this.state.users[u].first_name + ' ' + this.state.users[u].last_name} personPP={pp3}/>
                                people.push(person);
                                console.log('person ');
                                console.log(person);
                                u = this.state.users.length;
                            }
                        }
                    }
                    console.log('people ');
                    console.log(people);
                    var group = [res.data.results[l].id, [res.data.results[l].admin], people, res.data.results[l].title, <Image src={pp3}></Image>];
                    groups.push(group);

                }

                this.setState({
                    groups: groups,
                    showGroup: false,
                    selectedPeople: [],
                })

            })
            .catch((err) => {
                console.log("ERROR: ====", err);
            })
        })();

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


        console.log('selected people:');
        console.log(this.state.selectedPeople);
    }

    const removeGroup = (e) => {
        /**
         * The backend needs to delete this groupchat from the
         * chat histories of everyone that is on this group
         * 
         * Do this before removing the chat from the admin's chat
         */

        this.setState({
            groups: this.state.groups.filter(group => group[0] != e.target.id),
            groupSearch: false
        });
    }

    const joinGroup = (e) => {
        var group = this.state.groups.filter(group => group[0] == e.target.id)[0];
        console.log('group:');
        console.log(group);
        var groupMemberIds = [];
        for (var i = 0; i < group[2].length; i++) {
            groupMemberIds.push(group[2][i].props['personId']);
        }
        groupMemberIds.push(39/** Need to get user id from Kiara */);
        console.log('groupMemberIds: ');
        console.log(groupMemberIds);

        console.log('title');
        console.log(group[3]);
        console.log('admin:');
        console.log(group[1][0]);

        const data = {
            title: group[3],
            desc: 'my group',
            admin: group[1][0], /** Need to get user id from Kiara */
            members: groupMemberIds,
            create_date:  "2020-06-06T04:12:19+02:00" /** Doesnt really matter */
        };

        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + this.state.token
            }
        };

        var api = 'http://3.209.12.36:8000/api/group/' + group[0] + '/';
        console.log('api: ' + api)

        if (!groupMemberIds.includes(39/** Need to get from Kiara*/)) {
            /*var updatedGroup = this.state.groups.filter(group => group[0] == e.target.id)[0];
            console.log('updatedGroup:');
            console.log(updatedGroup);
            updatedGroup[2] = [...updatedGroup[2], <Person personId={this.state.LoggedInPersonId} key={this.state.LoggedInPersonId} personName={this.state.LoggedInPersonName} personPP={this.state.LoggedInPersonPP}/>]
            */

            (async () => {
                await axios.put(api, data, options)
                .catch((err) => {
                    console.log("ERROR: ====", err);
                })

                await axios.get('http://3.209.12.36:8000/api/group', options)
                .then((res) => {
                    console.log("RESPONSE ==== : ", res);
                    console.log('groups: ');
                    console.log(res.data.results)
    
                    var groups = [];
                    for (var l = 0; l < res.data.results.length; l++) {
                        var people = [];
                        for (var m = 0; m < res.data.results[l].members.length; m++) {
                            for (var u = 0; u < this.state.users.length; u++) {
                                if (res.data.results[l].members[m] == this.state.users[u].pk) {
                                    var person = <Person personId={this.state.users[u].pk} key={Math.random()} personName={this.state.users[u].first_name + ' ' + this.state.users[u].last_name} personPP={pp3}/>
                                    people.push(person);
                                    u = this.state.users.length;
                                }
                            }
                        }
    
                        var group = [res.data.results[l].id, [res.data.results[l].admin], people, res.data.results[l].title, <Image src={pp3}></Image>];
                        groups.push(group);
                    }
    
                    this.setState({
                        groups: groups,
                        showGroup: false,
                        selectedPeople: [],
                        groupSearch: false
                    })
    
                })
                .catch((err) => {
                    console.log("ERROR: ====", err);
                })
            })();

            /*this.setState({
                groups: [...this.state.groups.filter(group => group[0] != e.target.id), updatedGroup],
                groupSearch: false
            });*/

        }else {
            alert('You are already in this group.');
        }
    }

    const filterGroup = (e) => {
        var group = [];
        var groupMemberIds = [];
        console.log('selectedGroyp id: ');
        console.log(e.target.id)
        for (var i = 0; i < this.state.groups.length; i++) {
            if (this.state.groups[i][0] == e.target.id) {
                group = this.state.groups[i];
                i = this.state.groups.length;
            }
        }
        console.log('group after for:');
        console.log(group);
        if (group.length > 0) {
            for (var j = 0; j < group[2].length; j++) {
                groupMemberIds.push(group[2][j].props['personId']);
            }
        }

        this.setState({
            selectedGroup: group,
            selectedGroupMemberIds: groupMemberIds,
            showGroupFilter: false
        })

        console.log('selected group member Ids: ');
        console.log(groupMemberIds);
    }

    const filterCategory = (e) => {
        this.setState({
            categoryFilterText: e.target.id,
            showCategoryFilter: false
        });
    }

    const postSearch = (e, inputedText) => {
        console.log(inputedText.value);
        if (inputedText != null && inputedText != '' && this.state.posts.length > 0) {
            if (inputedText.value != '') {
                this.setState({
                    postSearch: true,
                    postSearchText: inputedText.value
                })
            }else {
                this.setState({
                    postSearch: false,
                    postSearchText: ''
                })
            }
        }
    }

    const handleCloseGroup = () => {this.setState({showGroup:false, groupSearch: false})};
    const handleShowGroup = () => {this.setState({showGroup:true, groupSearch: false})};
    const handleCloseGroupDelete = () => {this.setState({showGroupDelete:false, groupSearch: false})};
    const handleShowGroupDelete = () => {this.setState({showGroupDelete:true, groupSearch: false})};
    const handleCloseGroupFilter = () => {this.setState({showGroupFilter:false, groupSearch: false})};
    const handleShowGroupFilter = () => {this.setState({showGroupFilter:true, groupSearch: false})};
    const handleCloseCategoryFilter = () => {this.setState({showCategoryFilter:false})};
    const handleShowCategoryFilter = () => {this.setState({showCategoryFilter:true})};
    const handleCloseGroupJoin = () => {this.setState({showGroupJoin:false, groupSearch: false})};
    const handleShowGroupJoin = () => {this.setState({showGroupJoin:true, groupSearch: false})};
    const handleClose = () => {this.setState({show:false})};
    const handleShow = () => {this.setState({show:true})};
         
    return( 
        <Container fluid className='backdrop center' style={{padding:'0px', margin:'0px', width:'100%', height:'100vh'}}>
            <Col
                xs={12}
                sm={12}
                md={10}
                lg={10}
                xl={10}
                style={{margin:'auto', minHeight:'600px'}}
                className='centerMe'
            >
                <Row className='shadow center-row' style={{padding:'0px', margin:'0px', width:'100%', backgroundColor:'#9CC3D5FF', borderRadius:'20px'}}>
                    <Col
                        xs={0}
                        sm={0}
                        md={0}
                        lg={6}
                        xl={6}
                        style={{padding:'0px', margin:'0px', width:'100%'}}
                    >
                        <Taskbar filterPosts={filterPosts} postSearch={postSearch} handleShow={handleShow} handleShowGroup={handleShowGroup} handleShowGroupDelete={handleShowGroupDelete} handleShowGroupFilter={handleShowGroupFilter} handleShowGroupJoin={handleShowGroupJoin} handleShowCategoryFilter={handleShowCategoryFilter}/>
                    </Col>
                    <Col 
                        xs={12}
                        sm={12}
                        md={12}
                        lg={6}
                        xl={6}
                        className='post-panel'
                        style={{padding:'0px', margin:'0px', borderRadius:'20px'}}
                    >
                        <Row className='post-panel-posts' style={{padding:'0px', margin:'0px', width:'100%'}}>
                            <Col
                                xs={0}
                                sm={0}
                                md={0}
                                lg={1}
                                xl={1}
                                style={{padding:'5px', margin:'0px', width:'100%', backgroundColor:'transparent'}}
                            ></Col>
                            <Col
                                xs={12}
                                sm={12}
                                md={12}
                                lg={10}
                                xl={10}
                                style={{padding:'5px', margin:'0px', width:'100%', backgroundColor:'transparent'}}
                            >
                                <Button variant="primary" style={{display: this.state.loadPosts == true ? ('block'):('none')}} disabled>
                                    <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    />
                                    Loading...
                                </Button>
                                {
                                    timeSort(
                                    (this.state.followerFilter == true ? (this.state.posts.filter(post => this.state.LoggedInPersonFollowerIds.includes(post.props["id"]))):(this.state.posts))
                                    .filter(this.state.groupFilter == true ? (post => this.state.selectedGroupMemberIds.includes(post.props['postPersonId'])):(post => post))
                                    .filter(this.state.friendFilter == true ? (post => this.state.LoggedInPersonFriendIds.includes(post.props["id"])):(post => post))
                                    .filter(this.state.categoryFilter == true ? (post => post.props['category'] == this.state.categoryFilterText):(post => post))
                                    .filter(this.state.postSearch == true ? (post => post.props['postPersonName'].toLowerCase().includes(this.state.postSearchText.toLowerCase()) || post.props['postText'].toLowerCase().includes(this.state.postSearchText.toLowerCase())):(post => post))
                                    , /*this.state.timeFilter*/true)
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
                                style={{padding:'5px', margin:'0px', width:'100%', backgroundColor:'transparent'}}
                            ></Col>
                        </Row>
                    </Col>
                </Row>
            </Col>

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
                        {this.state.people/*.filter(person => this.state.LoggedInPersonFriendIds.includes(person.props['personId']))*/
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

            {/* Modal used to join group */}
            <Modal show={this.state.showGroupJoin} onHide={handleCloseGroupJoin} centered>
                    <Modal.Header closeButton style={{backgroundColor:'#faf6ee'}}>
                        Join group
                    </Modal.Header>
                    <Modal.Body style={{backgroundColor:'#ffffff'}}>
                        <div className='icons text-center' style={{height:'400px', overflowY:'scroll'}}>
                        <input style={{width:'100%'}} id='groupSearch' placeholder='search for a group...' onChange={groupSearch}></input>
                        {this.state.groups
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
                                <Button style={{width:'100%'}} id={group[0]} onClick={joinGroup}>Join</Button>
                            </div>
                        ))}
                        </div>
                    </Modal.Body>
                </Modal>
            {/* Modal used to join group  */}

            {/* Modal used to filter by a group */}
            <Modal show={this.state.showGroupFilter} onHide={handleCloseGroupFilter} centered>
                    <Modal.Header closeButton style={{backgroundColor:'#faf6ee'}}>
                        Filter posts by group
                    </Modal.Header>
                    <Modal.Body style={{backgroundColor:'#ffffff'}}>
                        <div className='icons text-center' style={{height:'400px', overflowY:'scroll'}}>
                        <input style={{width:'100%'}} id='groupSearch' placeholder='search for a group...' onChange={groupSearch}></input>
                        {this.state.groups
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
                                <Button style={{width:'100%'}} id={group[0]} onClick={filterGroup}>Select</Button>
                            </div>
                        ))}
                        </div>
                    </Modal.Body>
                </Modal>
            {/* Modal used to filter by a group  */}

            {/* Modal used to filter by a category */}
            <Modal show={this.state.showCategoryFilter} onHide={handleCloseCategoryFilter} centered>
                    <Modal.Header closeButton style={{backgroundColor:'#faf6ee'}}>
                        Filter posts by category
                    </Modal.Header>
                    <Modal.Body style={{backgroundColor:'#ffffff'}}>
                        <div className='icons text-center' style={{height:'400px', overflowY:'scroll'}}>
                        {/*<input style={{width:'100%'}} id='groupSearch' placeholder='search for a group...' onChange={groupSearch}></input>*/}
                        {this.state.categories
                        /*.filter(this.state.groupSearch == true ? (g => g[3].toLowerCase().includes(this.state.groupSearchInput.toLowerCase())):(g => g == g))*/
                        .map((category) => (
                            <div key={category}>
                                <Button style={{width:'100%'}} id={category} onClick={filterCategory}>{category}</Button>
                            </div>
                        ))}
                        </div>
                    </Modal.Body>
                </Modal>
            {/* Modal used to filter by a category*/}

            {/* Modal used to type post */}
            <Modal show={this.state.show} onHide={handleClose} centered>
                    <Modal.Header closeButton style={{backgroundColor:'#faf6ee'}}>
                        <Modal.Title style={{fontFamily:'Vision-Heavy', color:'#67a495'}}>You can contact us via:</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{backgroundColor:'#ffffff'}}>
                        <div className='icons text-center'>
                        <Form.Label>Enter post here</Form.Label>
                        <Form.Control type="text" placeholder="my post..." id='my-post'/>
                        <Form.Control type="text" placeholder="my post2..." id='my-post2'/>
                        </div>
                        <Form.Group>
                            <InputGroup>
                                <DropdownButton
                                    as={InputGroup.Prepend}
                                    variant='outline-secondary'
                                    title='Post Category'
                                >
                                    <Dropdown.Item id={'Other'} onClick={selectCategory}>
                                        Other
                                    </Dropdown.Item>
                                    <div
                                    style={{
                                        height: '100px',
                                        width: '100%',
                                        overflowY: 'scroll'
                                    }}
                                    >
                                        {this.state.categories.map( (category) => (
                                            <Dropdown.Item id={category} onClick={selectCategory}>
                                                {category}
                                            </Dropdown.Item>
                                        ))}
                                    </div>
                                </DropdownButton>
                                <Form.Control
                                    placeholder="Enter other category..."
                                    type='text'
                                    value={this.state.selectedCategory}
                                    disabled
                                />
                            </InputGroup>
                            <Form.Control
                                id='otherCategoryText'
                                style={{
                                    display: this.state.selectedCategory == 'Other' ? 'block' : 'none'
                                }}
                                type='text'
                                placeholder='Insert category here'
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer style={{backgroundColor:'#faf6ee'}}>
                    <Button variant="primary" onClick={createPost}>
                        Post 1
                    </Button>
                    <Button variant="primary" onClick={createPost2}>
                        Post 2
                    </Button>
                    </Modal.Footer>
                </Modal>
            {/* Modal used to type post */}
        </Container>
    );
  }
}

export default Feed;