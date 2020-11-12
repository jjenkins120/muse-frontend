import React from 'react'
import { connect } from 'react-redux'
import { Grid, Image, Segment, Header, Card, Icon } from 'semantic-ui-react'
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css"; 
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
            toaster.notify(`You are now following ${this.props.showUser.first_name} ${this.props.showUser.last_name}`)
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
            toaster.notify(`You are no longer following ${this.props.showUser.first_name} ${this.props.showUser.last_name}`)
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
            toaster.notify(`Your user profile has been deleted`)
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
            return <div><Link to={`/home/edituser/${this.props.user.id}`}><Card style={{left:'13%', backgroundColor:'#36454F', color:'white'}}>Edit My Profile</Card></Link><Card onClick={this.handleDelClick} style={{left:'13%', backgroundColor:'#36454F', color:'white', marginBottom:'10px'}}>Delete My Profile</Card></div>
        } else {
            return this.renderFollowBtns()
        }
    }

    renderFollowBtns = () => {
        const showingUser = this.props.allUsers.find(userObj => userObj.id === this.props.showUser.id)
        const isFollowing = showingUser.followers.find(followObj => followObj.id === this.props.user.id)
        return isFollowing ? <Card onClick={this.handleUnfollowClick} style={{left:'13%', backgroundColor:'#36454F', color:'white'}}>Unfollow</Card> : <Card onClick={this.handleFollowClick} style={{left:'13%', backgroundColor:'#36454F', color:'white'}}>Follow</Card>
    }

    renderFollowerInfo = () => {
        const followUser = this.props.allUsers.find(userObj => userObj.id === this.props.showUser.id)
       return <div>
        {followUser.followers.length === 0 ? <Segment style={{backgroundColor:'#36454F', color:'white'}}> Followers  |  0</Segment> : <Link to={ {pathname: `/home/showfollow/${followUser.id}`, state: {activeItem: 'Followers'} } } ><Segment style={{backgroundColor:'#36454F', color:'white', marginBottom: '10px'}}> Followers  |  {followUser.followers.length}</Segment></Link>}
                
        {followUser.following.length === 0 ? <Segment style={{backgroundColor:'#36454F', color:'white'}}> Following  |  0</Segment> : <Link to={ {pathname: `/home/showfollow/${followUser.id}`, state: {activeItem: 'Following'} } } ><Segment style={{backgroundColor:'#36454F', color:'white'}}> Following | {followUser.following.length}</Segment></Link>}
        </div>
    }

    render(){
        return (
            <div>
                <Grid columns={3}>
                    <Grid.Row>
                        <Grid.Column width={4}>
                        </Grid.Column>
                        <Grid.Column verticalAlign='center' style={{ paddingTop: '50px', paddingBottom:'50px'}} width={8}>
                            <Segment style={{ boxShadow:'1px 1px 1px black',}} textAlign='centered'>
                            <Grid columns={2} relaxed='very' style={{paddingTop:'25px', paddingBottom: '25px', margin: 'auto', display: 'flex', justifyContent: 'center'}}>
                            <Grid.Column style={{justifyContent: 'center'}}>
                                <Image src={this.props.showUser.image_url} size='medium' circular style={{left: '10%'}}/>
                                <Header style={{fontWeight: '', fontSize: '50px' }}>{this.props.showUser.first_name} {this.props.showUser.last_name}</Header>
                                {this.renderBtns()}
                                <div>
                                <Icon name='map marker alternate'/>{this.props.showUser.location}
                                <br/>
                                <Icon name='mail'/>{this.props.showUser.email}
                                </div>
                                <br/>
                                {this.renderFollowerInfo()}
                            </Grid.Column>
                            <Grid.Column style={{fontSize:'large', margin: 'auto', display: 'flex', justifyContent: 'center'}}>   
                                {this.props.showUser.bio}
                            </Grid.Column>     
                            </Grid> 
                            <div class="ui divider vertical"></div> 
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={4}>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid verticalAlign='center'>
                    <Grid.Row>
                        <Grid.Column width={7} >
                            <Segment>
                                <Header style={{fontWeight: '1', fontSize: '25px' }}>My Artwork</Header>
                            </Segment>
                            {this.renderPosts(this.props.showUser.posts).reverse()}
                        </Grid.Column>    
                        <Grid.Column width={7}>
                            <Segment>
                                <Header style={{fontWeight: '1', fontSize: '25px' }}>Artwork That Has Inspired Me</Header>
                            </Segment>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowUser);