import React, { Component } from "react";
import { Container, Row, Col, Modal, Button, Form,Image} from "react-bootstrap";
import {Link,Router} from 'react-router-dom';
import pp1 from '../../Images/pp1.jpg';
import pp2 from '../../Images/pp2.jpg';
import { Avatar ,IconButton} from '@material-ui/core';
import ImageUploader from "react-images-upload";
import Gravatar from 'react-gravatar';

class Profile extends Component { 

  
  state = {
    show: false,
    PersonName: 'Zizipho Gebenga',
    PersonTag: '@ZeeGebenga',
    geotag: 'Khayelitsha, Cape Town',
    personABout: "Goal Oriented person. Love Coding.",
    friends:145,
    picture:pp1,
    userProfile: '',
    src: "https://www.gravatar.com/avatar/2b3dedd1282b8980095c5c5ca3d1a1a7",
    pictures:[pp1],
    categoryImageArray : []



    

  }

  
  
   /* handleEdit (e) {

      e.preventDefault();
      const PersonName = document.getElementById('my-name');
      const geotag = document.getElementById('my-location');



      this.setState({
          PersonName:this.state,
          PersonTag:this.state,
            pp:{pp1} ,
            geotag:this.state
      })             <ImageUploader buttonText = "Upload Images"/>

  }*/

  

  render() {
    const handleClose = () => {this.setState({show:false})};
    const handleShow = () => {this.setState({show:true})};

    const onDrop = (event) => {
      this.setState(
        {
          src: URL.createObjectURL(event.target.files[0])

          }
      )
    }
    const handleEdit = () => {
      const name = document.getElementById('my-name');
      const tag = document.getElementById('my-tag');
      const loc = document.getElementById('my-location');
      const about =document.getElementById('my-bio');
      const pic = document.getElementById('myInput');
      

      this.setState({
          show:false,
          
          PersonName:name.value,
          PersonTag : tag.value,
          personABout: about.value,
          geotag : loc.value,
          friends:145,
          unfriend:false,
          text:"Unfriend",


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

        <div>
        <div className= ' text-center' style={{fontFamily:'Vision-Heavy', fontSize:'30px',fontWeight:'bold'}}>
                Profile
            </div>

            <br></br>
            <br></br>

        <Container maxWidth='xs' fixed >
            
        <Row className='profile-container'>
          <Col
            xs={3}
            sm={3}
            md={3}
            lg={2}
            xl={2}
          >
            <div>
           
            
             <Gravatar email="gebengazizipho@gmail.com" className = 'profilepic' rating="pg" default="monsterid"  />
             <div className= 'middle'>
             <div className= 'text'>Change profile picture</div>
             </div>
             </div>
          </Col>
          <Col
            xs={9}
            sm={9}
            md={9}
            lg={10}
            xl={10}
          >
            <div style={{display:'inline-block'}}>
              <p
                style={{marginBottom:'0px', fontSize:'17px', marginLeft:'5px'}}
              >
                  {this.state.PersonName}
              </p>
              <p
                style={{marginBottom:'0px', fontSize:'13px', color:'grey', marginLeft:'5px'}}
              >
                  {this.state.PersonTag}
              </p>
            </div>
            <div style={{display:'inline-block'}}>
              <p style={{fontSize:'13px'}}><i class="fas fa-map-marker-alt" style={{color:'#F83639'}}></i> {this.state.geotag}</p>
            </div>
            <div>
            <p style={{fontSize:'13px'}}><i style={{color:'#F83639',marginBottom:'0px', fontSize:'17px', marginLeft:'5px'}}></i> {this.state.personABout}</p>

            </div>
            <div>
            <p style={{fontSize:'13px' , color:'grey'}}><i style={{color:'grey'}}></i> {this.state.friends} Friends</p>

            </div>
            
             
               <Button style={{display:'inline-block'}} ><Link to ='/friends' style={{color:'white'}}>See All Friends</Link></Button>
             
            
             
            <div style={{marginBottom:'0px', fontSize:'13px', color:'grey', marginLeft:'5px',display:'inline-block'}}>
                <Button 
                variant = 'primary'
                onClick = {()=> this.setState({show:true})}
                style = {{marginLeft: '250px'}}>
                    Edit Profile
                </Button>
            </div>
          </Col>
          <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
          >
              
          </Col>
          <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
          >
           
          </Col>
        </Row>


      
      


        {/* Modal used to tedit profile */}
        <Modal show={this.state.show} onHide={handleClose} centered id='mod'>
            <Modal.Header closeButton style={{backgroundColor:'#faf6ee'}}>
                <Modal.Title style={{fontFamily:'Vision-Heavy', color:'#67a495'}}>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor:'#ffffff'}}>
                
                <div className='icons text-left'>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="my name..." id='my-name'/>
                </div>
                <div className='icons text-left'>
                <Form.Label>Bio</Form.Label>
                <Form.Control type="text" placeholder="my bio..." id='my-bio'/>
                </div>
                <div className='icons text-left'>

                <Form.Label>Handle</Form.Label>
                <Form.Control type="text" id='my-tag' placeholder="new handle..."/>
                </div>
                <div className='icons text-left'>
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" placeholder="my location..." id='my-location'/>
                <Form.Label>Change Profile picture</Form.Label>
                <Row>
                <Button className='link-button  '><a href ={'https://wordpress.com/log-in?client_id=1854&redirect_to=https%3A%2F%2Fpublic-api.wordpress.com%2Foauth2%2Fauthorize%3Fclient_id%3D1854%26response_type%3Dcode%26blog_id%3D0%26state%3D5dcd1d4841549235e173528bbde348be6866e7109bfcaccbe0232193deedbf97%26redirect_uri%3Dhttps%253A%252F%252Fen.gravatar.com%252Fconnect%252F%253Faction%253Drequest_access_token'} style={{color:'white'}}>Profile Picture</a></Button>
                </Row>
                
                </div>

            </Modal.Body>
            <Modal.Footer style={{backgroundColor:'#faf6ee'}}>
            <Button variant="primary" onClick={handleEdit}>
                Save
            </Button>
            </Modal.Footer>
        </Modal>
        {/* Modal used to edit profile */}
    </Container>
    </div>
    );
  }
}

export default Profile;