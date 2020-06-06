import React, { Component } from "react";
import { Container, Row, Col, Modal, Button, Form,Image} from "react-bootstrap";
import {Link,Router} from 'react-router-dom';
import pp1 from '../../Images/pp1.jpg';
import pp2 from '../../Images/pp2.jpg';
import { Avatar ,IconButton} from '@material-ui/core';
import ImageUploader from "react-images-upload";
import Gravatar from 'react-gravatar';
import axios from 'axios';
import Iframe from 'react-iframe'

class Profile extends Component { 
  
 
  state = {
    show: false,
    
    friends:145,
    picture:pp1,
    userProfile: '',
    pictures:[pp1],
    categoryImageArray : [],
    username: '',
    password:''



    

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
 /*  const data = {
      username:"zizi",
      password: "1234"
    };
    axios.post('http://3.209.12.36:8000/api/account/login',data)
      .then((res) => {
        this.setState({token:res.data.token})
    })
    .catch((err) => {
      console.log("Error: Couldn't log in",err);
    })*/

    const options = {
      headers: {
        'Content-Type' : 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('token') 
      }
    }

    axios.get('http://3.209.12.36:8000/api/account/properties',options)
    .then((res) => {
      console.log("Response: retrieved data",res);
      this.setState({
        
        PersonName:res.data.first_name,
        PersonTag :res.data.username,
        personABout: res.data.bio,
        geotag : res.data.city,
        friends:145,
        unfriend:false,
        text:"Unfriend",
        PersonLast: res.data.last_name,
        Birthdate: res.data.birthday,
        src: 'https://www.gravatar.com/avatar/'+res.data.avatar,
        email: res.data.email


      });
    })
  .catch((err) => {
    console.log("Error: Couldn't retrieve data",err);
  })
    
   /* const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);*/
    const handleClose = () => {this.setState({show:false})};
    const handleShow = () => {this.setState({show:true})};
    
  
    const handleImageUpload = e => {
      const [file] = e.target.files;
      if (file) {
        const reader = new FileReader();
        /*const { current } = uploadedImage;*/
       /* current.file = file;*/
        reader.onload = e => {
         // current.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };

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
      const lastN = document.getElementById('my-lastname');
      const birthD = document.getElementById('my-birthdate');
      
      
      const data = {
      city:loc.value,
      first_name:name.value,
      username:tag.value
    };
    
    
    axios.patch('http://3.209.12.36:8000/api/account/properties/update',{city:loc.value,
    first_name : name.value,
    last_name : lastN.value,
    username : tag.value,
    bio: about.value,
    birthday:birthD.value
      
      },options)
    
      .then((res) => {
        console.log("Response: updated",res)
       this.setState({  show :false,
       })
    })
    axios.get('http://3.209.12.36:8000/api/account/properties',options)

    .then((res) => {
      console.log("Response: retrieved data",res);
      this.setState({
        show:false,
        PersonName:res.data.first_name,
        PersonTag :res.data.username,
        personABout: res.data.bio,
        geotag : res.data.city,
        friends:145,
        unfriend:false,
        text:"Unfriend",
        PersonLast: res.data.last_name,
        Birthdate: res.data.birthday,
        src: 'https://www.gravatar.com/avatar/'+res.data.avatar

      });
    })
   
  .catch((err) => {
    console.log("Error: Couldn't retrieve data",err);
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
           
            <Image src= {this.state.src } className='profilepic'></Image>
            
            
             <div className= 'middle'>
             <div className= 'text'>Change Profile picture</div>
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
            <div style = {{float: "right"}}>
            <button class="btn"><i class="fa fa-trash" style={{color:'#0063B2FF'}}></i> Delete account</button>
            </div>
            <div style={{display:'inline-block'}}>
              <p
                style={{marginBottom:'0px', fontSize:'17px', marginLeft:'5px'}}
              >
                  {this.state.PersonName} {this.state.PersonLast}
              </p>
              <p
                style={{marginBottom:'0px', fontSize:'13px', color:'grey', marginLeft:'5px'}}
              >
                  @{this.state.PersonTag}
              </p>
            </div>
            <div style={{display:'inline-block'}}>
              <p style={{fontSize:'13px'}}><i class="fas fa-map-marker-alt" style={{color:'#F83639'}}></i> {this.state.geotag}</p>
            </div>
            <div >
              <p style={{fontSize:'13px'}}><i class="fa fa-calendar" style={{color:'#0063B2FF'}}></i> {this.state.Birthdate}</p>
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
                <Form.Control type="text" placeholder={this.state.PersonName} id='my-name'/>
                </div>
                <div className='icons text-left'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder={this.state.PersonLast} id='my-lastname'/>
                </div>
                <div className='icons text-left'>
                <Form.Label>Birthdate</Form.Label>
                <Form.Control type="date" placeholder={this.state.Birthdate} id='my-birthdate'/>
                </div>
                <div className='icons text-left'>
                <Form.Label>Bio</Form.Label>
                <Form.Control type="text" placeholder={this.state.personABout} id='my-bio'/>
                </div>
                <div className='icons text-left'>

                <Form.Label>Handle</Form.Label>
                <Form.Control type="text" id='my-tag' placeholder={this.state.PersonTag}/>
                </div>
                <div className='icons text-left'>
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" placeholder={this.state.geotag} id='my-location'/>
                <Form.Label>Change Profile picture</Form.Label>
                <Row>
                <Iframe url="http://en.gravatar.com/emails/"
            position="absolute"
            width="50%"
            id="myId"
            className="myClassname"
            height="100%"
            styles={{height: "25px"}}/>
            
                </Row>
                <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        /*ref={imageUploader}*/
        style={{
          display: "none"
        }}/>                
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