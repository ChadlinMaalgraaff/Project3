import React, { Component } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import './messaging.css';

class Person extends Component {
  state = {
    personId: this.props.personId,
    personName: this.props.personName,
    personPP: this.props.personPP
  };

  render() {
    return (
      <Container fluid>
        <Row className='person'>
            <Col
                xs={3}
                sm={3}
                md={1}
                lg={1}
                xl={1}
            >
                <Image src={this.state.personPP} className='message-pp'></Image>
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
                   {this.state.personName}
                </p>
                </div>
            </Col>
        </Row>
      </Container>
    );
  }
}

export default Person;