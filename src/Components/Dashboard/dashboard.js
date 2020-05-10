import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../sidepanel/style.css';
import Feed from './feed';

class Dash extends Component {

    render() {
        let menuOpen = false;

        const clicked = () => {
            const content = document.getElementById('toggle-content');
            const items = content.getElementsByClassName('content-item');
            const menuBtn = document.getElementById('menu-btn');
            console.log('clicked')

            if(!menuOpen) {
                menuBtn.classList.add('open');
                menuOpen = true;
              } else {
                menuBtn.classList.remove('open');
                menuOpen = false;
            } 

            content.classList.toggle("open");
            for (var i = 0; i < items.length; i++) {
                items[i].classList.toggle("fade");
            }
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
                        <div className='toggle' style={{zIndex:'100'}}>
                            <div className="menu-btn" id='menu-btn' onClick={clicked}>
                                <div className="menu-btn__burger"></div>
                            </div>
                            <div className='toggle-content' id='toggle-content'>
                                <div className='content-item' id='content-item'>
                                    Content item
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        xl={6}
                        style={{padding:'0px', margin:'0px', width:'100%'}}
                    >
                        <Feed style={{width:'100%'}}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Dash;