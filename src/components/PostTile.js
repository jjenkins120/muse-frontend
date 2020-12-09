import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Image, Icon, Segment, Header, Feed, Radio, Button, Form} from 'semantic-ui-react'
import { selectPost } from '../actions/showPost'
import { selectUser } from '../actions/showUser'
import { fetchCommentsSuccess } from '../actions/comments'
import { fetchPostsSuccess } from '../actions/allPosts'
import ReactPlayer from 'react-player'
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css"; 
import moment from 'moment'


class PostTile extends React.Component {
    
    state = {
        commentToggled: false,
        commentForm: false,
        newComment: ''
    }

    newCommentFetch = () => {
        fetch('http://localhost:3000/comments')
        .then(resp => resp.json())
        .then(comments => {
          this.props.fetchCommentsSuccess(comments)
        })
        fetch('http://localhost:3000/posts')
        .then(resp => resp.json())
        .then(allPosts => {
            this.props.fetchPostsSuccess(allPosts)
        })
    }

    deleteComment = (id) => {
        toaster.notify(`Your comment is deleted.`)
        const reqObj = {
            method: 'DELETE'
        }
        fetch(`http://localhost:3000/comments/${id}`, reqObj)
        .then(resp => resp.json())
        .then(() => {
            this.newCommentFetch()
        })
    }

    handleCommentFormSubmit = (event, id) => {
        event.preventDefault()
        if (this.state.newComment !== ''){
        toaster.notify(`Your comment "${this.state.newComment}" has been added.`)
        const newComment = {
            content: this.state.newComment,
            post_id: id, 
            user_id: this.props.user.id
        }
        const reqObj = {
             method: 'POST',
             headers: {
                'Content-Type':'application/json'
             }, 
             body: JSON.stringify(newComment)
        }
        fetch('http://localhost:3000/comments', reqObj)
        .then(resp => resp.json())
        .then(newComment => {
            this.newCommentFetch()
            this.setState({
                newComment: ''
            })
        })
        } else {
            toaster.notify(`Your comment can't be empty.`)
        }
    }

    handleCommentFormChange = (event) => {
        this.setState({
            newComment: event.target.value
        })
    }

    renderNewCommentForm = (id) => {
        return <div style={{margin: 'auto', display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
            
            <Form onSubmit={(event) => this.handleCommentFormSubmit(event, id)}>
                <Form.Group>
                <Form.Input
                    placeholder='Add Comment'
                    name='name'
                    value={this.state.newComment}
                    onChange={this.handleCommentFormChange}
                />
                <Form.Button content='+' style={{backgroundColor: '#FDD000', Color: 'white'}}/>
                </Form.Group>
            </Form>
            </div>
    }
    

    handleToggleClick = () => {
        this.setState({
            commentToggled: !this.state.commentToggled,
            commentForm: false
        })
    }
    
    handleCommentBtnClick = () => {
        this.setState({
            commentForm: !this.state.commentForm,
            newComment: ''
        })
    }

    renderCommentBtn = () => {
        if (!this.state.commentForm){
            return <Button circular icon='plus' style={{backgroundColor:'#36454F', color:'white'}} onClick={this.handleCommentBtnClick}/>
        } else if (this.state.commentForm){
            return <Button circular icon='minus' style={{backgroundColor:'#36454F', color:'white'}} onClick={this.handleCommentBtnClick}/>
        }
    }

    renderComments = (postInstance) => {
        return this.state.commentToggled ? <div>{this.renderCommentsDisplay(postInstance)}<br/>{this.renderCommentBtn()}</div> : null
    } 

    renderCommentsDisplay = (postInstance) => {
        if (postInstance.comments.length !== 0){
        return postInstance.comments.map(commentObj => {
            return this.renderIndividualComment(commentObj)
        })
        } else {
            return <div><br/>There are no comments for this post yet</div>
        }
    }

    renderIndividualComment = (commentObj) => {
        const userLinkObj = this.props.allUsers.find(userObj => userObj.id === commentObj.user.id)
        return <div>
                    <Feed>
                        <Feed.Event>
                        <Feed.Label>
                            <img src={commentObj.user.image_url} />
                        </Feed.Label>
                        <Feed.Content>
                            <Feed.Summary>
                            <Feed.User onClick={() => this.props.selectUser(userLinkObj)}><Link to={`/home/showuser/${userLinkObj.id}`}>{commentObj.user.first_name} {commentObj.user.last_name}</Link></Feed.User> 
                            <Feed.Date>{moment(commentObj.created_at).format('lll')}</Feed.Date>
                            </Feed.Summary>
                            <Feed.Meta>
                                {commentObj.content}
                            </Feed.Meta>
                            {this.props.user.id === commentObj.user.id ? <Icon name='delete' onClick={()=> this.deleteComment(commentObj.id)}/> : null}
                        </Feed.Content>
                        </Feed.Event>
                    </Feed> 
                </div> 
    }


    renderMedia = (postInstance) => {
        if(postInstance.category === 'Video'){
            return <ReactPlayer url={postInstance.link_url} controls={true} width={700} height={400} style={{ boxShadow: '2px 2px 2px gray'}}/>
        } else if (postInstance.category === 'Audio'){
            return <ReactPlayer url={postInstance.link_url} controls={false} width={700} height={150} config={{soundcloud: {options: { show_user: false, color: "#FDD100", show_artwork: false, buying: false}}}} style={{ boxShadow: '2px 2px 2px gray'}}/>
        } else if (postInstance.category === 'Image'){
            return <Image src={postInstance.link_url} verticalAlign='centered'/>
        } else if (postInstance.category === 'Writing'){
            return <a href={postInstance.link_url} target="_blank"><Card style={{backgroundColor:'#36454F', color:'white'}}>{postInstance.title}</Card></a>
        } 
    }

    render(){
        const postInstance = this.props.allPosts.find(postObj => postObj.id === this.props.post.id)
        const userInstance = this.props.allUsers.find(userObj => userObj.id === this.props.post.user_id)

        if (!postInstance || !userInstance){
            return null
        }

        return(
            <div>
                <Segment vertical style={{margin: 'auto', display: 'flex', justifyContent: 'center'}}>
                    {this.renderMedia(postInstance)}
                </Segment>
                <Segment onClick={() => this.props.selectPost(postInstance)} basic>
                    <Header as='h2' style={{margin: 'auto', display: 'flex', justifyContent: 'center'}}>
                        <Header.Content>
                        <Link to={`/home/showpost/${postInstance.id}`} style={{color: '#36454F'}}>{postInstance.title}</Link>
                        <Header.Subheader> by {postInstance.user.first_name} {postInstance.user.last_name}</Header.Subheader>
                        <Link to={`/home/showuser/${userInstance.id}`}><Image src={userInstance.image_url} circular size='tiny' onClick={() => this.props.selectUser(userInstance)} style={{margin: 'auto', justifyContent: 'center', marginTop: '10px'}}/></Link>
                        </Header.Content>
                    </Header>
                </Segment>
                    <Segment basic><Radio slider onClick={this.handleToggleClick} /></Segment>
                    {this.renderComments(postInstance)}
                    {this.state.commentForm ? this.renderNewCommentForm(postInstance.id) : null}
                    
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
      allPosts: state.allPosts,
      comments: state.comments,
      user: state.user,
      allUsers: state.allUsers
    }
  }
  
  const mapDispatchToProps = {
    selectUser,
    selectPost, 
    fetchCommentsSuccess, 
    fetchPostsSuccess,
  }

export default connect(mapStateToProps, mapDispatchToProps)(PostTile);