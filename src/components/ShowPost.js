import React from 'react'
import { connect } from 'react-redux'
import { Segment, Image, Card, Icon, Button, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { addFollowingToUser } from '../actions/user'
import { addFollowerToOtherUser } from '../actions/allUsers'
import { addInspirationToUser } from '../actions/user'
import { addInspiredUserToPost } from '../actions/allPosts'
import { deletePost } from '../actions/allPosts'
import { deleteUserPost } from '../actions/userPosts'
import { deleteShowUserPost } from '../actions/showUser'
import { deletePostInCertainUser } from '../actions/allUsers'
import PostTile from "./PostTile.js"
import { selectPost } from '../actions/showPost'
import { selectUser } from '../actions/showUser'
import user from '../reducers/user'

class ShowPost extends React.Component { 

    // componentDidMount(){
    //     const postToSend = this.props.allPosts.find(postObj => postObj.id === parseInt(this.props.match.params.id))   
    //     this.props.selectPost(postToSend)
    // }
    
    handleFollowClick = () => {
        console.log('handle follow click')
        const newFollow = {
            follower_id: this.props.user.id,
            following_id: this.props.showPost.user.id
        }
        const reqObj = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFollow)
        }
        fetch('http://localhost:3000/follows', reqObj)
        .then(resp => resp.json())
        .then(newFollow => {
            console.log(newFollow)
            this.props.addFollowingToUser(this.props.showPost.user)
            this.props.addFollowerToOtherUser(this.props.user, this.props.showPost.user.id)
        })
        // this.setState({
        //     isFollowing: !this.state.isFollowing
        // })
    }

    handleUnfollowClick = () => {
        console.log('handle UNfollow click')
        // send a delete request to follows in the backend 
    }

    // followBtn = () => {
    //     const isFollowing = this.props.showPost.user.following.find(followObj => followObj.id === this.props.showPost.user.id)
    //     return isFollowing ? <Button onClick={this.handleUnfollowClick}>Unfollow</Button> : <Button onClick={this.handleFollowClick}>Follow</Button>
    // }

    handleDelClick = (id) => {
        console.log(id)
        const userPostArray  = this.props.userPosts.filter(userPostObj => {
            if(userPostObj.post_id === id){
                return userPostObj
            }
        })
        if (userPostArray.length !== 0){
            userPostArray.forEach(userPostObj => {
            fetch(`http://localhost:3000/user_posts/${userPostObj.id}`, {method: 'DELETE'})
            .then(resp => resp.json())
            .then(() => {
                console.log('success')
                this.props.deleteUserPost(userPostObj.id)
                })
            })
            this.deletePost(id) 
        } else {
            this.deletePost(id)
        }
    }
    
    deletePost = (id) => {
        fetch(`http://localhost:3000/posts/${id}`, {method: 'DELETE'})
        .then(resp => resp.json())
        .then(() => {
            this.props.deletePost(id)
            this.props.deleteShowUserPost(id)
            this.props.history.push('/home')
            alert('Your Post is deleted!')
        })
    } 

    renderPostsInspiredPosts = () => {
        // const postArray = this.state.posts.map(postObj => postObj.id)
        // const postToDisplay = this.props.posts.filter(postObj => {
        //    return postArray.includes(postObj.id) 
        // })
        return this.props.showPost.posts.map(postObj => {
            return <Segment><Link to={`/home/showpost/${postObj.id}`}><PostTile post={postObj}/></Link></Segment>
        })
    }

    renderInspiredBy = () => {
        if (this.props.showPost.post){
            const foundPost = this.props.allPosts.find(postObj => postObj.id === this.props.showPost.post.id)
            return <Segment><Link to={`/home/showpost/${foundPost.id}`}><PostTile post={foundPost}/></Link></Segment>
        } 
    }

    feelingInspiredClick = () => {
        const newInspire = {
            user_id: this.props.user.id, 
            post_id: this.props.showPost.id
        }
        const reqObj = {
            method: 'POST', 
            headers: {
                'Content-Type':'application/json'
            }, 
            body: JSON.stringify(newInspire)
        }
        fetch(`http://localhost:3000/user_posts`, reqObj)
        .then(resp => resp.json())
        .then(new_user_post => {
            console.log(new_user_post)
            this.props.addInspirationToUser(this.props.showPost)
            this.props.addInspiredUserToPost(this.props.user, this.props.showPost.id)
            alert('This piece has been added to those that inspire you')
        })
    }

    render(){
        return(
            <div>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Card>
                            <Image src={this.props.showPost.user.image_url} wrapped ui={false}/>
                            <Card.Content>
                            <Card.Header>{this.props.showPost.user.first_name} {this.props.showPost.user.last_name}</Card.Header>
                            <Card.Meta>{this.props.showPost.user.location}</Card.Meta>
                            <Card.Description>
                                    {this.props.showPost.user.bio}
                            </Card.Description>
                            </Card.Content>
                            
                            <Card.Content extra>
                                {/* {this.followBtn()} */}
                                <Button onClick={() => this.props.selectUser(this.props.showPost.user)}><Link to={`/home/showuser/${this.props.showPost.user.id}`}>See Profile</Link></Button>
                            </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column width={10}>
                        <Segment.Group>
                            <Segment>{this.props.showPost.title}</Segment>
                            <Segment.Group>
                                <Segment>ShowPost Media goes here</Segment>
                            </Segment.Group>
                            <Segment.Group>
                                <Segment>ShowPost Information goes here</Segment>
                            </Segment.Group>
                            {this.props.showPost.user.id === this.props.user.id ? <Button onClick={() => this.handleDelClick(this.props.showPost.id)}>Delete this Post</Button> : null }
                            <Segment>
                            This work was inspired by:
                            {this.renderInspiredBy()}
                            </Segment>
                            <Segment>
                            This work has inspired the following:
                            {this.renderPostsInspiredPosts()}
                            </Segment>
                            {/* create boolean function that if there are no inspire works, displays a message that says yet to inspire, otherwise tile all of the works it has inspired */}
                        </Segment.Group>
                        </Grid.Column>
                        <Grid.Column width={3}>
                        <Card>
                            <Card.Content extra>
                                {/* {this.followBtn()} */}
                                {/* THIS BUTTON BELOW SHOULD BE HIDDEN IF A USER IS ALREADY INSPIRED BY THIS WORK AND SHOULD SHOW IF THEY HAVEN'T*/}
                                <Button onClick={this.feelingInspiredClick}>Feeling Inspired?</Button>
                                {/* THIS BUTTON BELOW SHOULD BE RENDERED IF THE USER IS ALREADY INSPIRED BY THIS WORK*/}
                                Ready to submit your inspired Art?
                                {/* Link to new work page (may need to create another new work page that upon submission adds the post to the inspiring post's posts and deletes the post_user inspiration instance between the two... or not) */}
                                <Button>Submit my work</Button> 
                            </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
      allPosts: state.allPosts,
      user: state.user, 
      showPost: state.showPost,
      userPosts: state.userPosts
    }
  }
  
const mapDispatchToProps = {
//    selectPost,
    deletePostInCertainUser,
    deleteShowUserPost,
    deletePost,
    deleteUserPost,
    selectUser, 
    addFollowingToUser,
    addFollowerToOtherUser, 
    addInspirationToUser,
    addInspiredUserToPost,  
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPost);