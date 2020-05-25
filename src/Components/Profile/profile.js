import React, { Component } from "react";
import { Container, Row, Col, Modal, Button, Form,Image } from "react-bootstrap";
import {Link,Router} from 'react-router-dom';
import pp1 from '../../Images/pp1.jpg';
import pp2 from '../../Images/pp2.jpg';

class Profile extends Component {
  
    
  state = {
    show: false,
    PersonName: 'Zizipho Gebenga',
    PersonTag: '@ZeeGebenga',
    geotag: 'Khayelitsha, Cape Town',
    personABout: "Goal Oriented person. Love Coding.",
    friends:145,

    

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
      })
  }*/

  render() {
    const handleClose = () => {this.setState({show:false})};
    const handleShow = () => {this.setState({show:true})};
     
    const handleEdit = () => {
      const name = document.getElementById('my-name');
      const tag = document.getElementById('my-tag');
      const loc = document.getElementById('my-location');
      const about =document.getElementById('my-bio');
      

      this.setState({
          show:false,
          
          PersonName:name.value,
          PersonTag : tag.value,
          personABout: about.value,
          geotag : loc.value,
          friends:145,
          unfriend:false,
          text:"Unfriend"


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
        <div className = 'p'>
        <div className= ' text-center' style={{fontFamily:'Vision-Heavy', fontSize:'30px',fontWeight:'bold'}}>
                Profile
            </div>

            <br></br>
            <br></br>

        <Container  >
            
        <Row className='post-top'>
          <Col
            xs={3}
            sm={3}
            md={3}
            lg={2}
            xl={2}
          >
            <Image src={pp1} className='profilepic'></Image>
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
      
      


        {/* Modal used to type post */}
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
                </div>

            </Modal.Body>
            <Modal.Footer style={{backgroundColor:'#faf6ee'}}>
            <Button variant="primary" onClick={handleEdit}>
                Save
            </Button>
            </Modal.Footer>
        </Modal>
        {/* Modal used to type post */}
    </Container>
    </div>
    );
  }
}

export default Profile;