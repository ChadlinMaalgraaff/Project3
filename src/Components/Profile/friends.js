import React,{ Component } from "react";
import Profile from './profile';
import { Container, Row, Col, Modal, Button, Form,Image } from "react-bootstrap";
import pp1 from '../../Images/pp1.jpg';
import pp2 from '../../Images/pp2.jpg';



class Friends extends Component{

    state = {

        friends:145,
        unfriend:false,
        text:"Unfriend"

    }
   
    
    render(){

      const createTable = () => {
        let listP = []
        let sources = [pp1,pp2,pp1,pp2]
        let friendsL = ["Cebisa Jordaan","Zizipho Gebenga","Pinda Fortuin","Onele Gebenga"]
        let tags = ["@CebisaJordaan","@ZiziphoGebenga","@PindaFortuin","@OneleGebenga"]
    
        for (let i = 0; i < friendsL.length; i++) {
          listP.push( <Container className='post-container' >

          <li style={{ overflowY:"scroll"}}>
              <Row>

                <Col
                      xs={3}
                      sm={3}
                      md={3}
                     lg={2}
                     xl={2}
                    >
                  <Image src={sources[i]} className='post-pp'></Image>
                </Col>
                    <div style={{display:'inline-block'}}>
                        <p
                            style={{marginBottom:'0px', fontSize:'17px', marginLeft:'5px'}}
                           >
                              {friendsL[i]}
                       </p>
                           <p
                             style={{marginBottom:'0px', fontSize:'13px', color:'grey', marginLeft:'5px', display:'inline-block'}}
                              >
                           {tags[i]}
                        </p>
                                       <Button onClick={unfriend} id = 'unf' style = {{display:'inline-block',marginLeft: '250px'}}>{this.state.text}</Button>


                      </div>
                </Row>

             </li>
          </Container>)
        }
        return listP
      }
        const unfriend = () => {
            const icon = document.getElementById('unf');
              this.setState({
                
                text: "Unfollowed",
                friends:this.state.friends - 1
              })
              icon.style.backgroundColor = 'grey';
            
          }
    return(
        <div className = 'p'>
        <div className='icon text-center' style={{fontFamily:'Vision-Heavy', fontSize:'30px',fontWeight:'bold'}}>

            {this.props.PersonName}Zizipho's Friends
            </div>
        <div>
           
                {createTable()}
        </div>
        </div>
        
    );
    }
}

export default Friends;