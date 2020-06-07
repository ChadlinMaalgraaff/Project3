import React, { Component } from "react";
import { Container, Row, Col, Button, Form, Image, Tooltip, OverlayTrigger, Spinner } from "react-bootstrap";
import Comment from './comment';
import pp2 from '../../Images/pp2.jpg';
import axios from 'axios';

class Post extends Component {
  state = {
    commenterName: this.props.LoggedInPersonName,
    commenterTag: this.props.LoggedInPersonTag,
    commenterId: this.props.LoggedInPersonId,
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
    followerIDs: this.props.followerIds,
    commentDB: [],
    token: localStorage.getItem('token'),
    loadComments: true,
    users: this.props.users
  }

  componentDidMount() {
    console.log('user id: ');
    console.log(localStorage.getItem('id'));

    const options = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Token ' + this.state.token
      }
    };

    (async () => {
      await axios.get('http://3.209.12.36:8000/api/account/list_users', options)
      .then((res) => {
          console.log("RESPONSE ==== : ", res);
          this.setState({
            users: res.data
          })
      })
      .catch((err) => {
          console.log("ERROR: ====", err);
      })
    })();
  }

  render() {
    const rando = Math.random(); {/* used as a unique id, should probably get a more reliable unique id method */}
    
    const comment = () => {
      const comment = document.getElementById('my-comment' + rando);

      const data = {
        body: comment.value,
        author: this.state.commenterId,
        post: this.state.postPersonID
      };
    
      const options = {
          headers: {
              'Content-Type': 'application/json',
              'Authorization' : 'Token ' + this.state.token
          }
      };

      (async () => {
          this.setState({
            loadComments: true
          })
          await axios.post('http://3.209.12.36:8000/api/comment/', data, options)

          axios.get('http://3.209.12.36:8000/api/comment', options)
          .then((res) => {
              console.log("RESPONSE ==== : ", res);
              var commentComponents = [];
              var name = '';
              var surname = '';
              for (var i = 0; i < res.data.results.length; i++) {
                if (res.data.results[i].post == this.state.postPersonID) {

                  for (var j = 0; j < this.state.users.length; j++) {
                    if (this.state.users[j].pk == res.data.results[i].author) {
                      name = this.state.users[j].first_name;
                      surname = this.state.users[j].last_name;
                    }
                  }

                  var comment = <Comment commentText={res.data.results[i].body} commenterName={name + ' ' + surname} commenterTag={'@' + name + surname} commenterId={res.data.results[i].author} pp={'https://www.gravatar.com/avatar/'+ res.data.avatar} key={Math.random()}/>
                  commentComponents.push(comment);
                }
              }
              console.log('comentComponents: ');
              console.log(commentComponents);
              this.setState({
                  comments: commentComponents,
                  loadComments: false
              })
          })
          .catch((err) => {
              console.log("ERROR: ====", err);
          })
      })();
    }

    const follow = () => {
      if (this.state.followerIDs.includes(this.props.LoggedInPersonId) && (this.props.LoggedInPersonId != null)) {
        /* Unfollow */
        var i = this.state.followerIDs.indexOf(this.props.LoggedInPersonId);
        if (i > -1) {
          this.setState({
            followerIDs: this.state.followerIDs.filter(item => item != this.state.followerIDs[i])
          })
        }
      }else if ((this.props.LoggedInPersonId != null) && (!this.state.followerIDs.includes(this.props.LoggedInPersonId))) {
        /* Follow */
        this.setState({
          followerIDs: [...this.state.followerIDs, this.props.LoggedInPersonId]
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

      const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.state.token
        }
      };

      (async () => {
        this.setState({
          loadComments: true
        })
        await axios.get('http://3.209.12.36:8000/api/comment', options)
        .then((res) => {
            console.log("RESPONSE ==== : ", res);
            this.setState({
                commentDB: res.data.results
            })
            console.log('commentDB:')
            console.log(this.state.commentDB);
    
            var commentComponents = [];
            var name = '';
            var surname = '';
            for (var i = 0; i < res.data.results.length; i++) {
              if (res.data.results[i].post == this.state.postPersonID) {

                for (var j = 0; j < this.state.users.length; j++) {
                  if (this.state.users[j].pk == res.data.results[i].author) {
                    name = this.state.users[j].first_name;
                    surname = this.state.users[j].last_name;
                  }
                }

                var comment = <Comment commentText={res.data.results[i].body} commenterName={name + ' ' + surname} commenterTag={'@' + name + surname} commenterId={res.data.results[i].author} pp={'https://www.gravatar.com/avatar/'+ res.data.avatar} key={Math.random()}/>
                commentComponents.push(comment);
              }
            }
            console.log('commentComponents: ');
            console.log(commentComponents);
            this.setState({
              comments: commentComponents,
              loadComments: false
            })
        })
        .catch((err) => {
            console.log("ERROR: ====", err);
        })
      })();

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
                  {this.state.postPersonTag}
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
                {this.state.time} {'   '}   {this.state.date}
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
            <Button variant="primary" style={{display: this.state.loadComments == true ? ('block'):('none')}} disabled>
                <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
                />
                Loading...
            </Button>
            <ul style={{maxHeight:'200px', padding:'0px', overflowY:'scroll', width:'100%'}}>
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  style={{margin:'0px', padding:'0px', display: this.state.loadComments == false ? ('block'):('none')}}
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
