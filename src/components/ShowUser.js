import React from 'react'
import { connect } from 'react-redux'
import { Grid, Image, Segment, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { selectUser } from '../actions/showUser'
import { selectPost } from '../actions/showPost'
import { userLogout } from '../actions/user'
import { fetchFollowsSuccess } from '../actions/follows'
import { fetchAllUsersSuccess } from '../actions/allUsers'
import { addFollowingToUser } from '../actions/user'
import { deleteFollowingFromUser } from '../actions/user'
import showUser from '../reducers/showUser'
// import { deleteFollow } from '../actions/follows'
// import { deleteUserPost } from '../actions/userPosts'
// import { deleteUser } from '../actions/allUsers'


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
            // this.props.addFollowerToShowUser(this.props.user)
            this.props.addFollowingToUser(this.props.showUser)
            alert(`You are now following ${this.props.showUser.first_name} ${this.props.showUser.last_name}`)
            // this.props.addFollowerToOtherUser(this.props.user, this.props.showPost.user.id)

        })
        //update backend follows
        //send fetch for allUsers
        //send fetch for follows
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
            // this.props.addFollowerToShowUser(this.props.user)
            this.props.deleteFollowingFromUser(this.props.showUser.id)
            alert(`You are no longer following ${this.props.showUser.first_name} ${this.props.showUser.last_name}`)
            // this.props.addFollowerToOtherUser(this.props.user, this.props.showPost.user.id)

        })
        //update backend follows
        //send fetch for allUsers
        //send fetch for follows
        //update frontend showUser
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
            return <Segment onClick={() => this.handlePostClick(postObj.id)}><Link to={`/home/showpost/${postObj.id}`}>{postObj.title}</Link></Segment>
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
        Followers: {followUser.followers.length === 0 ? "0" : <Link to={ {pathname: `/home/showfollow/${followUser.id}`, state: {activeItem: 'Followers'} } } >{followUser.followers.length}</Link>}
        <br/>                    
        Following: {followUser.following.length === 0 ? "0" : <Link to={ {pathname: `/home/showfollow/${followUser.id}`, state: {activeItem: 'Following'} } } >{followUser.following.length}</Link>}
        </Segment>
    }

    render(){
        return (
            <div>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            {this.props.showUser.bio}
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Grid.Column width={5}>
                            <Image src={this.props.showUser.image_url} size='medium' circular />
                            </Grid.Column>
                            <Grid.Column width={5}>
                            <br/>
                            {this.props.showUser.first_name} {this.props.showUser.last_name}
                            <br/>
                            {this.props.showUser.location}
                            <br/>

                            {this.renderBtns()}
                            </Grid.Column>
                        </Grid.Column>
                        <Grid.Column width={3}>

                        {this.renderFollowerInfo()}
                        
                            
                            
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            My Artwork
                            {this.renderPosts(this.props.showUser.posts)}
                        </Grid.Column>    
                    </Grid.Row>    
                    <Grid.Row>
                        <Grid.Column>
                            Artwork that has inspired me
                            {this.renderPosts(this.props.showUser.inspirations)}
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