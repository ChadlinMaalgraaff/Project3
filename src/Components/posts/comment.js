import React, { Component } from "react";
import {Row, Col, Image} from "react-bootstrap";

class Comment extends Component {
    state = {
        commenterName: this.props.commenterName,
        commenterTag: this.props.commenterTag,
        commentText: this.props.commentText,
        pp: this.props.pp,
        likes: 419,
        dislikes: 364,
        likedByYou: 'false',
        dislikedByYou: 'false'
    }

  render() {
    const randoLike = Math.random();
    const like = () => {
        const icon = document.getElementById('like'+ randoLike);

        if (this.state.likedByYou == 'false') {
          this.setState({
            likedByYou: 'true',
            likes: this.state.likes + 1
          });
          icon.style.color = '#212529';
        }else {
          this.setState({
            likedByYou: 'false',
            likes: this.state.likes - 1
          });
          icon.style.color = '#8080A1';
        }
    }
    const dislike = () => {
        const icon = document.getElementById('dislike'+ randoLike);

        if (this.state.dislikedByYou == 'false') {
          this.setState({
            dislikedByYou: 'true',
            dislikes: this.state.dislikes + 1
          });
          icon.style.color = '#212529';
        }else {
          this.setState({
            dislikedByYou: 'false',
            dislikes: this.state.dislikes - 1
          });
          icon.style.color = '#8080A1';
        }
    }

    return(
        <div className='comment-container'>
            <Row>
                <Col
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    xl={6}
                >
                    <Image src={this.state.pp} className='comment-pp'></Image>
                    <p
                    style={{display:'inline-block', margin:'0px', marginRight: '5px'}}
                    >
                        {this.state.commenterName}
                    </p>
                    <p
                    style={{display:'inline-block', color:'grey', margin:'0px'}}
                    >
                        {this.state.commenterTag}
                    </p>
                </Col>
            </Row>
            <Row>
                <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                >
                    <div style={{width:'100%', marginTop:'10px', marginBottom:'5px'}}>
                        <p
                            style={{marginBottom:'5px', width:'100%'}}
                        >
                            {this.state.commentText}
                        </p>
                        <p style={{display:'inline-block', color:'grey', marginRight:'10px'}}><i class="far fa-thumbs-up comment-icon icon-like" id={'like'+ randoLike} onClick={like} />{this.state.likes}</p>
                        <p style={{display:'inline-block', color:'grey'}}><i class="far fa-thumbs-down comment-icon fa-flip-horizontal icon-dislike" id={'dislike'+ randoLike} onClick={dislike} />{this.state.dislikes}</p>
                    </div>
                </Col>
            </Row>
        </div>
    );
  }
}

export default Comment;