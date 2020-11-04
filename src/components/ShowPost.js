import React from 'react'
import { connect } from 'react-redux'
import { Segment, Image, Card, Icon, Button, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { addFollowingToUser } from '../actions/user'
// import { addFollowerToOtherUser } from '../actions/allUsers'
import { addInspirationToUser } from '../actions/user'
// import { addInspiredUserToPost } from '../actions/allPosts'
import { fetchPostsSuccess } from '../actions/allPosts'
import { fetchAllUsersSuccess } from '../actions/allUsers'
import { fetchAllUserPostsSuccess } from '../actions/userPosts'
import { fetchFollowsSuccess } from '../actions/follows'
import { deleteUsersPost } from '../actions/user'
import { deleteInspirationFromUser } from '../actions/user'
import PostTile from "./PostTile.js"
import { selectPost } from '../actions/showPost'
import { selectUser } from '../actions/showUser'


class ShowPost extends React.Component { 

    sendNewDelFetch = () => {
        fetch('http://localhost:3000/posts')
        .then(resp => resp.json())
        .then(allPosts => {
            this.props.fetchPostsSuccess(allPosts)
        })
        fetch('http://localhost:3000/users')
        .then(resp => resp.json())
        .then(users => {
          this.props.fetchAllUsersSuccess(users)
        })
        fetch('http://localhost:3000/user_posts')
        .then(resp => resp.json())
        .then(userPosts => {
          this.props.fetchAllUserPostsSuccess(userPosts)
        })
    }

    sendNewFolFetch = () => {
        fetch('http://localhost:3000/follows')
        .then(resp => resp.json())
        .then(follows => {
            this.props.fetchFollowsSuccess(follows)
        })
        fetch('http://localhost:3000/users')
        .then(resp => resp.json())
        .then(users => {
          this.props.fetchAllUsersSuccess(users)
        })
    }

    sendInspireFetch = () => {
        fetch('http://localhost:3000/users')
        .then(resp => resp.json())
        .then(users => {
            this.props.fetchAllUsersSuccess(users)
        })
        fetch('http://localhost:3000/user_posts')
        .then(resp => resp.json())
        .then(userPosts => {
            this.props.fetchAllUserPostsSuccess(userPosts)
        })
        fetch('http://localhost:3000/posts')
        .then(resp => resp.json())
        .then(allPosts => {
            this.props.fetchPostsSuccess(allPosts)
        })
    }

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
            this.sendNewFolFetch()
            this.props.addFollowingToUser(this.props.showPost.user)
            alert(`You are now following ${this.props.showPost.user.first_name} ${this.props.showPost.user.last_name}`)
        })
    }

    followBtn = () => {
        const postUser = this.props.allUsers.find(userObj => userObj.id === this.props.showPost.user.id)
        const isFollowing = this.props.user.following.find(followObj => followObj.id === postUser.id)
        return isFollowing ? "Following" : <Button onClick={this.handleFollowClick}>Follow</Button>
    }

    handleDelClick = (id) => {
        console.log(id)
        const userPostArray  = this.props.userPosts.filter(userPostObj => {
            if(userPostObj.post_id === id){
                return userPostObj
            }
        })
        if (userPostArray.length !== 0){
            userPostArray.forEach(userPostObj => {
            const reqObj = {
                method: 'DELETE'
            }
            fetch(`http://localhost:3000/user_posts/${userPostObj.id}`, reqObj)
            .then(resp => resp.json())
            .then(() => {
                console.log('success')
                })
            })
            this.updatePostsWithIds() 
        } else {
            this.updatePostsWithIds()
        }
    }

    updatePostsWithIds = () => {
        const inspiredPostsIds = this.props.showPost.posts.map(postObj => postObj.id)
        if (inspiredPostsIds.length !== 0){
            inspiredPostsIds.forEach(inspiredPostId => {
                const updatedPost = {
                    post_id: null
                } 
                const reqObj = {
                    method: `PATCH`,
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(updatedPost)
                }
                fetch(`http://localhost:3000/posts/${inspiredPostId}`, reqObj)
                .then(resp => resp.json())
                .then(updatedPost => {
                    console.log(`${updatedPost.title}'s post_id is now null`)

                })
            })
            this.deletePost()
        } else {
            this.deletePost()
        }
    }
    
    deletePost = () => {
        fetch(`http://localhost:3000/posts/${this.props.showPost.id}`, {method: 'DELETE'})
        .then(resp => resp.json())
        .then(() => {
            this.props.deleteUsersPost(this.props.showPost.id)
            this.sendNewDelFetch()
            this.props.history.push('/home')
            alert('Your Post is deleted!')
        })
    } 

    renderPostsInspiredPosts = () => {
        const showingPost = this.props.allPosts.find(postObj => postObj.id === this.props.showPost.id) 
        return showingPost.posts.map(postObj => {
            return <Segment><Link to={`/home/showpost/${postObj.id}`}><PostTile post={postObj}/></Link></Segment>
        })
    }

    renderInspiredBy = () => {
        const showingPost = this.props.allPosts.find(postObj => postObj.id === this.props.showPost.id)
        if (showingPost.post){
            return <Segment><Link to={`/home/showpost/${showingPost.post.id}`}><PostTile post={showingPost.post}/></Link></Segment>
        } 
    }

    renderFeelingInspiredBtns = () => {
        const inspirationIds = this.props.user.inspirations.map(inspirationObj => inspirationObj.id)
        const showingPost = this.props.allPosts.find(postObj => postObj.id === this.props.showPost.id)
        if (inspirationIds.includes(showingPost.id)){
           return <div><div>Ready to submit your inspired Art?</div><Link to={ {pathname: `/home/newinspiredpost`, state: {post_id: this.props.showPost.id} } } ><Button>Submit my work</Button></Link><Button onClick={this.handleNoLongerInspiredClick}>I'm no longer inspired</Button></div> 
        } else {
            return <Button onClick={this.feelingInspiredClick}>Feeling Inspired?</Button>
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
            this.sendInspireFetch()
            this.props.addInspirationToUser(this.props.showPost)
            alert('This piece has been added to those that inspire you')
        })
    }

    handleNoLongerInspiredClick = () => {
        console.log("no longer inspired click")
        const thisUserPost = this.props.userPosts.find(userPostObj => {
           return userPostObj.user_id === this.props.user.id && userPostObj.post_id === this.props.showPost.id
        })
        const reqObj = {
            method: 'DELETE', 
        }
        fetch(`http://localhost:3000/user_posts/${thisUserPost.id}`, reqObj)
        .then(resp => resp.json())
        .then(() => {
            this.sendInspireFetch()
            this.props.deleteInspirationFromUser(this.props.showPost.id)
            alert('This piece has been removed from your inspirations')
        })
    }

    renderSeeProfileBtn = () => {
        const displayUser = this.props.allUsers.find(userObj => userObj.id === this.props.showPost.user.id)
        return <Button onClick={() => this.props.selectUser(displayUser)}><Link to={`/home/showuser/${displayUser.id}`}>See Profile</Link></Button>
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
                                {this.followBtn()}
                                {this.renderSeeProfileBtn()}
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
                                {this.renderFeelingInspiredBtns()}
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
      allUsers: state.allUsers,  
      showPost: state.showPost,
      userPosts: state.userPosts
    }
  }
  
const mapDispatchToProps = {
//    selectPost,
    // resetShowPost,

    deleteUsersPost,
    selectUser, 
    addFollowingToUser,
    // addFollowerToOtherUser, 
    addInspirationToUser,
    deleteInspirationFromUser,
    // addInspiredUserToPost, 
    fetchPostsSuccess,
    fetchAllUsersSuccess,
    fetchAllUserPostsSuccess,
    fetchFollowsSuccess
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPost);