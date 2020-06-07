import React,{ Component } from "react";
import Profile from './profile';
import { Card, Container, Row, Col, Modal, Button, Form,Image } from "react-bootstrap";
import pp1 from '../../Images/pp1.jpg';
import pp2 from '../../Images/pp2.jpg';
import { Avatar } from '@material-ui/core';
import axios from 'axios';




class Friends extends Component{
  constructor(props){
    super(props);
  

    this.state = { 
      show:false,
        usernames: [
           
         ],
         followerIDs: [1,2,3,4,5],
         profilePersonId: 6,
         loggedInPerson: '',
         selectedFriend: '',
         Isfriend:true

    
    }
  }
componentDidMount(){
  const options = {
    headers: {
      'Content-Type' : 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token') 
    }
  }
  axios.get('http://3.209.12.36:8000/api/account/properties',options)
  .then((res) =>{
    this.setState({
      loggedInPerson:res.data.first_name
    })
  })

  axios.post('http://3.209.12.36:8000/api/account/friends_list',{'user':localStorage.getItem('user')},options)
  .then((res) => {
    console.log("Response: got friends list",res)
    this.setState({
      friends:res.data.count,
      usernames:res.data.friends

    })
  })
  .catch((err) => {
    console.log("couldn't get friends list",err)
    console.log("state user",this.state.user)
  })
}

sendRequest = index => {
  const username = '';
  const id = this.state.usernames.map((username,j) => username.pk) 
  const to_id = id[index]

  const options = {
    headers: {
      'Content-Type' : 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token') 
    }
  }
  axios.post('http://3.209.12.36:8000/api/account/send_request',{to_user:to_id,from_user:localStorage.getItem('id')},options)
  .then((res) => {
    console.log("Response: request sent",res)
    
      this.setState(state => {
        const usernames = this.state.usernames.filter((item, j) => index != j);
        this.setState({show:false})
        return {
            usernames,
        };

      })
  })
  .catch((err) => {
    console.log("couldn't send request",err)
  })

}

removeItem = index => {
  const username = '';
  const id = this.state.usernames.map((username,j) => username.pk) 
  const to_id = id[index]

  const options = {
    headers: {
      'Content-Type' : 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token') 
    }
  }

  console.log("selected friend",to_id)


  axios.post('http://3.209.12.36:8000/api/account/unfriend',{to_user:to_id,from_user:localStorage.getItem('id')},options)
  .then((res) => {
    console.log("Response: unfriended",res)
    this.setState({
      show:false,

    })
    this.get_data()
  })
  .catch((err) => {
    console.log("couldn't unfriend",err)
  })


  /*this.setState(state => {
      const usernames = this.state.usernames.filter((item, j) => index != j);
      this.setState({show:false})
      return {
          usernames,
      };
  });*/
}; 
get_data() {
  const options = {
    headers: {
      'Content-Type' : 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token') 
    }
  }
  axios.get('http://3.209.12.36:8000/api/account/properties',options)
  .then((res) =>{
    this.setState({
      loggedInPerson:res.data.first_name
    })
  })

  axios.post('http://3.209.12.36:8000/api/account/friends_list',{'user':localStorage.getItem('user')},options)
  .then((res) => {
    console.log("Response: got friends list",res)
    this.setState({
      friends:res.data.count,
      usernames:res.data.friends,
      Isfriend:true

    })
  })
  .catch((err) => {
    console.log("couldn't get friends list",err)
    console.log("state user",this.state.user)
  })
}


render() {
  const handleClose = () => {this.setState({show:false})};
  const handleShow = () => {this.setState({show:true})};
  const handleYes = () => {
        this.setState({show:false})
}
const follow = () => {
    
    if ( (this.state.profilePersonId != null)) {
      /* Unfollow */
      var i = this.state.followerIDs.indexOf(this.state.usernames.id);
      if (i > -1) {
        this.setState({
          followerIDs: this.state.followerIDs.filter(item => item == this.state.usernames.id[i])
        })
      }
    }else if ((this.state.profilePersonId != null) ) {
      /* Follow */
     this.setState({
        followerIDs: [...this.state.followerIDs,this.state.usernames.id]
      });
    }
  }

return (
    <div>
        <div className= ' text-center' style={{fontFamily:'Vision-Heavy', fontSize:'30px',fontWeight:'bold'}}>
                {this.state.loggedInPerson}'s Friends
            </div>
        {this.state.usernames.map((username,index) => (
          
        <Container maxWidth='xs' fixed>
            <Card width='8rem'  >
                <Card.Body className = 'cont' >
                    <Row  >
                        <Col md="auto">
                            <Avatar alt="person" src={'https://www.gravatar.com/avatar/'+username.avatar+'?s=500'}/>

                        </Col>
                        <Col style={{alignContent: "center"}}>
                        <div
                          style={{ display:'inline'}}
                        >
                            {username.first_name} {username.last_name}
                       
                        
                        <div style= {{fontSize:'13px', color:'grey'}}>
                         @{username.username}
                         </div>
                      </div>
                      </Col>
                        <Col> 
                            <div>{this.state.Isfriend ?
                            <Button className='myButton' onClick ={() => this.removeItem(index)} >
                              Unfriend
                            </Button> :
                            <Button className= 'myButton1' onClick ={()=> this.sendRequest(index)}>
                              Send request
                              </Button>}
                            </div>
                          <Modal show={this.state.show} onHide={handleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>Unfriend</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to Unfriend? {username.first_name}</Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                Cancel
                              </Button>
                              <Button variant="primary" onClick={() => this.removeItem(username.id)}>
                                Unfriend
                              </Button>
                            </Modal.Footer>
                          </Modal>
                               
                            
                        </Col>
                    </Row>
                </Card.Body>
            </Card> 

            
        </Container>))}      
    </div>
)
}
}

export default Friends;