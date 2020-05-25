import React, { Component } from "react";
import { Container, Row, Col, Button, Form, Image, Tooltip, OverlayTrigger } from "react-bootstrap";
import Comment from './comment';
import pp2 from '../../Images/pp2.jpg';

class Post extends Component {
  state = {
    commenterName: 'Barbossa',
    commenterTag: '@Barbossa',
    comments: [],
    open: 'true',
    pp: this.props.pp,
    heartPost: 'false',
    likes: 1069,
    reposts: 10,
    time: this.props.time,
    date: this.props.date,
    location: this.props.geotag,
    postText: this.props.postText,
    postPersonName: this.props.postPersonName,
    postPersonTag: this.props.postPersonTag,
    postPersonID: this.props.id,
    followerIDs: this.props.followerIDs
  }

  render() {
    const rando = Math.random(); {/* used as a unique id, should probably get a more reliable unique id method */}
    const comment = () => {
      const comment = document.getElementById('my-comment' + rando);
      this.setState({
        comments: [...this.state.comments, <Comment commentText={comment.value} commenterName={this.state.commenterName} commenterTag={this.state.commenterTag} pp={pp2} key={rando}/>]
      })
      comment.value = '';
    }

    const follow = () => {

      if (this.state.followerIDs.includes(this.state.postPersonID) && (this.state.postPersonID != null)) {
        var i = this.state.followerIDs.indexOf(this.state.postPersonID);
        if (i > -1) {
          this.setState({
            followerIDs: this.state.followerIDs.filter(item => item != this.state.followerIDs[i])
          })
        }
      }else if ((this.state.postPersonID != null) && (!this.state.followerIDs.includes(this.state.postPersonID))) {
        this.setState({
          followerIDs: [...this.state.followerIDs, this.state.postPersonID]
        });
      }
    }

    const openBottom = () => {
      const bottom = document.getElementById(rando); 
  
      if (this.state.open == 'false') {
          this.setState({
              open: 'true'
          })
      }else {
          this.setState({
              open: 'false'
          })
      }   
  
      if (this.state.open == 'true') {
          bottom.style.maxHeight = '500px';
          bottom.style.height = '300px';
          bottom.style.opacity  = '1';
      }else {
          bottom.style.maxHeight = '0px';
          bottom.style.opacity  = '0';
      }
    }

    const heart = () => {
      const icon = document.getElementById('icon-heart' + rando);
      if (this.state.heartPost == 'false') {
        this.setState({
          heartPost: 'true',
          likes: this.state.likes + 1
        });
      }else {
        this.setState({
          heartPost: 'false',
          likes: this.state.likes - 1
        });
      }

      if (this.state.heartPost == 'false') { {/* Change the condition to true after having connected to backend */}
        icon.style.color = 'red';
        icon.style.animation = 'pulse 0.5s linear';
      }else {
        icon.style.color = '#212529';
        icon.style.animation = '';
      }
    }

    return(
      <Container className='post-container'>
        <Row className='post-top'>
          <Col
            xs={3}
            sm={3}
            md={3}
            lg={2}
            xl={2}
          >
            <Image src={this.state.pp} className='post-pp'></Image>
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
                  {this.state.postPersonName}
              </p>
              <p
                style={{marginBottom:'0px', fontSize:'13px', color:'grey', marginLeft:'5px'}}
              >
                  {this.state.postPersonTag} id: {this.props.id}
              </p>
            </div>
            <div style={{display:'inline-block', marginLeft:'auto'}}>
              <p><Button className='follow-button' onClick={follow}>
                {this.state.followerIDs.includes(this.state.postPersonID) ? ('unfollow'):('follow')}
              </Button></p>
            </div>
          </Col>
          <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              style={{width:'100%'}}
          >
              <div style={{width:'100%'}} className='post-text-div'>
                  <p style={{width:'100%', margin:'0px'}}>
                      {this.state.postText}
                  </p>
              </div>
          </Col>
          <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
          >
            <div style={{width:'100%'}}>
              <p style={{fontSize:'11px', color:'grey', marginBottom:'0px', display:'inline-block'}} >
                {this.state.time} - {this.state.date}
              </p>
              <div>
              <p style={{fontSize:'11px'}}><i class="fas fa-map-marker-alt" style={{color:'#F83639'}}></i> {this.state.location}</p>
              </div>
              <hr/>
            </div>
            </Col>
          <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
          >
            <div className='icons-div'>
              <>
              <OverlayTrigger
                key={'top'}
                placement={'top'}
                overlay={
                  <Tooltip id={`tooltip-${'top'}`}>
                    {this.state.open == 'true' ? ('Comments') : ('Close comment section')}
                  </Tooltip>
                }
              >
                <i className="fas fa-comment-alt post-icon icon-comment" onClick={openBottom}></i>
              </OverlayTrigger>{' '}
            </>
            <>
              <OverlayTrigger
                key={'top'}
                placement={'top'}
                overlay={
                  <Tooltip id={`tooltip-${'top'}`}>
                    {this.state.heartPost == 'false' ? ('Like') : ('Unlike')}
                  </Tooltip>
                }
              >
                <i className="fas fa-heart post-icon icon-heart" id={'icon-heart' + rando} onClick={heart}></i>
              </OverlayTrigger>{' '}
            </>
            <>
              <OverlayTrigger
                key={'top'}
                placement={'top'}
                overlay={
                  <Tooltip id={`tooltip-${'top'}`}>
                    Repost
                  </Tooltip>
                }
              >
                <i className="fas fa-retweet post-icon icon-retweet"></i>
              </OverlayTrigger>{' '}
            </>
            <>
              <OverlayTrigger
                key={'top'}
                placement={'top'}
                overlay={
                  <Tooltip id={`tooltip-${'top'}`}>
                    Send Friend request to {this.state.postPersonName}
                  </Tooltip>
                }
              >
                <i className="fas fa-user-friends post-icon icon-friends"></i>
              </OverlayTrigger>{' '}
            </>
            <p align='right' style={{fontSize:'11px', color:'grey', marginBottom:'0px', display:'inline-block'}} >
                {this.state.likes + ' likes' + '  ' +  this.state.reposts + ' reposts'}
            </p>
            </div>
          </Col>
        </Row>
        <Row className='post-bottom' id={rando} style={{position:'relative'}}>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
          >
            <ul style={{maxHeight:'200px', overflowY:'scroll', width:'100%'}}>
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                >
                    {this.state.comments.map(comment => (
                        comment
                    ))}
                </Col>
            </ul>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            style={{position:'absolute', bottom: '0px', width:'100%'}}
          >
            <Form.Control type="text" placeholder="my comment..." id={'my-comment' + rando}/>
            <Button variant="dark" onClick={comment} style={{marginTop:'5px'}}>
                Submit comment
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Post;
