import React,{ Component } from "react";
import Profile from './profile';
import { Card, Container, Row, Col, Modal, Button, Form,Image } from "react-bootstrap";
import pp1 from '../../Images/pp1.jpg';
import pp2 from '../../Images/pp2.jpg';
import { Avatar } from '@material-ui/core';




class Friends extends Component{

    state = {
        usernames: [
            {
                name:'Fay-yaaz',
                avatar: pp1, 
                id: 1
             }, 
             {
                 name: 'Thauren',
                 avatar: pp2 ,
                 id:2
             }, 
             {
                 name: 'Barbra',
                 avatar: pp1,
                 id:3
             }, 
             {
                 name: 'Zee',
                 avatar: pp2 ,
                 id:4
             }, 
             {
                 name: 'Chadlin',
                 avatar: pp1 ,
                 id:5
     
             }
         ],
         followerIDs: [1,2,3,4,5],
         profilePersonId: 6
    
    }
  

removeItem = index => {
  this.setState(state => {
      const usernames = this.state.usernames.filter((item, j) => index != j);

      return {
          usernames,
      };
  });
}; 


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
        {this.state.usernames.map((username, index) => (
        <Container maxWidth='xs' fixed>
            <Card width='8rem'  >
                <Card.Body className = 'cont' >
                    <Row  >
                        <Col md="auto">
                            <Avatar alt="person" src={username.avatar} />
                        </Col>
                        <Col style={{alignContent: "center"}}>
                            @{username.name}
                        </Col>
                        <Col> 
                            
                            <Button className='myButton' onClick = {follow } >
                            {!(this.state.followerIDs.includes(username.id)) ? ('follow'):('Unfollow')}

                            </Button>
                            
                               
                            
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