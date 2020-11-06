import React from 'react'
import { connect } from 'react-redux'
import { Grid, Image, Segment, Button, Header, Label} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { selectUser } from '../actions/showUser'
import { selectPost } from '../actions/showPost'
import { userLogout } from '../actions/user'
import { fetchFollowsSuccess } from '../actions/follows'
import { fetchAllUsersSuccess } from '../actions/allUsers'
import { addFollowingToUser } from '../actions/user'
import { deleteFollowingFromUser } from '../actions/user'
import PostTile from './PostTile'

class ShowUser extends React.Component {

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

    handleFollowClick = () => {
        console.log('handle follow click')
        const newFollow = {
            follower_id: this.props.user.id,
            following_id: this.props.showUser.id
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
            this.props.addFollowingToUser(this.props.showUser)
            alert(`You are now following ${this.props.showUser.first_name} ${this.props.showUser.last_name}`)
        })
    }

    handleUnfollowClick = () => {
        console.log("hit unfollow click")
        const foundFollow = this.props.follows.find(followObj => {
            return followObj.follower_id === this.props.user.id && followObj.following_id === this.props.showUser.id
        })
        console.log(foundFollow)
        const reqObj = {
            method: 'DELETE'
        }
        fetch(`http://localhost:3000/follows/${foundFollow.id}`, reqObj)
        .then(resp => resp.json())
        .then(() => {
            this.sendNewFolFetch()
            this.props.deleteFollowingFromUser(this.props.showUser.id)
            alert(`You are no longer following ${this.props.showUser.first_name} ${this.props.showUser.last_name}`)
        })
    }

    handlePostClick = (id) => {
        const foundPost = this.props.allPosts.find(postObj => postObj.id === id)
        this.props.selectPost(foundPost)
    }

    handleDelClick = () => {
        console.log("handle Del button clicked")
        const followArray = this.props.follows.filter(followObj => {
            if (followObj.follower_id === this.props.user.id || followObj.following_id === this.props.user.id){
                return followObj
            } 
        })
        if (followArray.length !== 0){
                followArray.forEach(followObj => {
                    const reqObj = {
                        method: 'DELETE'
                    }
                    fetch(`http://localhost:3000/follows/${followObj.id}`, reqObj)
                    .then(resp => resp.json())
                    .then(() => {
                        console.log('delete follows success')
                    })
                })
            this.delUserPosts()
        } else {
            this.delUserPosts()
        }
    }

    delUserPosts = () => {
        const userPostArray  = this.props.userPosts.filter(userPostObj => {
        if(userPostObj.user_id === this.props.user.id){
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
                console.log('delete userposts success')
                })
            })
            this.updatePostsWithIds() 
        } else {
            this.updatePostsWithIds()
        }
    }

    updatePostsWithIds = () => {
        const inspiredPosts = this.props.allPosts.filter(postObj => {
        return postObj.user_id === this.props.user.id && postObj.posts.length !== 0
        })
        if (inspiredPosts.length !== 0){
            const inspiredPostsNestedPostsArray = inspiredPosts.map(inspiredPostObj => inspiredPostObj.posts)
            const nestedinspiredPostsIds = inspiredPostsNestedPostsArray.map(nestedArray => {
                return nestedArray.map(nestObj => nestObj.id)
            })
            const inspiredPostsIds = nestedinspiredPostsIds.flat()
            debugger
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
                this.deleteTheUsersPosts()
            } else {
                this.deleteTheUsersPosts()
            }
        } else {
            this.deleteTheUsersPosts()
        }
    }

    deleteTheUsersPosts = () => {
        const theUsersPostsIds = this.props.user.posts.map(usersPostObj => usersPostObj.id)
        if (theUsersPostsIds.length !== 0){
            theUsersPostsIds.forEach(usersPostsId => {
                const reqObj = {
                    method: 'DELETE'
                }
                fetch(`http://localhost:3000/posts/${usersPostsId}`, reqObj)
                .then(resp => resp.json())
                .then(() => {
                    console.log(`deleted post ${usersPostsId} success`)
                })
            })
            this.deleteUser()
        } else {
            this.deleteUser()
        }
    }

    deleteUser = () => {
        const reqObj = {
            method: 'DELETE'
        }
        fetch(`http://localhost:3000/users/${this.props.user.id}`, reqObj)
        .then(resp => resp.json())
        .then(() => {
            console.log('User deleted')
            this.props.userLogout()
            localStorage.removeItem('app_token')
            this.props.history.push('/')
        })
    }

    renderPosts = (posts) => {
        return posts.map(postObj =>{
            return <Segment style={{backgroundColor: 'white'}}><PostTile post={postObj}/></Segment>
    })
    }

    renderBtns = () => {
        if(this.props.showUser.id === this.props.user.id){
            return <div><Link to={`/home/edituser/${this.props.user.id}`}><Button>Edit My Profile</Button></Link><Button onClick={this.handleDelClick}>Delete My Profile</Button></div>
        } else {
            return this.renderFollowBtns()
        }
    }

    renderFollowBtns = () => {
        const showingUser = this.props.allUsers.find(userObj => userObj.id === this.props.showUser.id)
        const isFollowing = showingUser.followers.find(followObj => followObj.id === this.props.user.id)
        return isFollowing ? <Button onClick={this.handleUnfollowClick}>Unfollow</Button> : <Button onClick={this.handleFollowClick}>Follow</Button>
    }

    renderFollowerInfo = () => {
        const followUser = this.props.allUsers.find(userObj => userObj.id === this.props.showUser.id)
       return <Segment> 
        Followers: {followUser.followers.length === 0 ? "0" : <Link to={ {pathname: `/home/showfollow/${followUser.id}`, state: {activeItem: 'Followers'} } } ><Button> Followers <Label floating>{followUser.followers.length}</Label></Button></Link>}
        <br/>                    
        Following: {followUser.following.length === 0 ? "0" : <Link to={ {pathname: `/home/showfollow/${followUser.id}`, state: {activeItem: 'Following'} } } >{followUser.following.length}</Link>}
        </Segment>
    }

    render(){
        return (
            <div>
                <Grid columns={3}>
                    <Grid.Row>
                        <Grid.Column verticalAlign='center' style={{ padding: '50px'}}>
                            {this.props.showUser.bio}
                            {/* </Grid.Column> */}
                            {/* <Grid.Column width={5}> */}
                            {/* </Segment> */}

                        </Grid.Column>
                        <Grid.Column verticalAlign='center' style={{ padding: '50px'}}>
                            {/* <Grid.Column width={5}> */}
                            <Segment style={{ padding: '50px'}} >
                            <Image src={this.props.showUser.image_url} size='medium' circular style={{ boxShadow: '1px 1px grey' }}/>
                            {/* </Grid.Column> */}
                            {/* <Grid.Column width={5}> */}
                            <br/>
                            <Header>{this.props.showUser.first_name} {this.props.showUser.last_name}</Header>
                            {this.props.showUser.location}
                            {/* </Segment> */}
                            </Segment>
                        </Grid.Column>
                        <Grid.Column verticalAlign='center' style={{ padding: '50px'}}>
                        {this.renderFollowerInfo()}
                        {this.renderBtns()}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid verticalAlign='left'>
                    <Grid.Row>
                        <Grid.Column width={7} >
                            My Artwork
                            {this.renderPosts(this.props.showUser.posts).reverse()}
                        </Grid.Column>    
                    </Grid.Row>
                </Grid>
                <Grid verticalAlign='right'>  
                    <Grid.Row>    
                        <Grid.Column width={7}>
                            Artwork that has inspired me
                            {this.renderPosts(this.props.showUser.inspirations).reverse()}
                        </Grid.Column>    
                    </Grid.Row>    
                </Grid>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return { 
      showUser: state.showUser,
      allUsers: state.allUsers,
      allPosts: state.allPosts, 
      user: state.user, 
      follows: state.follows, 
      userPosts: state.userPosts
    }
  }
  
const mapDispatchToProps = {
   selectUser, 
   selectPost,
   userLogout,
   fetchFollowsSuccess,
   fetchAllUsersSuccess, 
   addFollowingToUser, 
   deleteFollowingFromUser 
//    deleteFollow,
//    deleteUserPost, 
//    deleteUser, 
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowUser);