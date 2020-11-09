import React from 'react'
import { connect } from 'react-redux'
import { Segment, Image, Card, Icon, Button, Grid, Header, Divider} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { addFollowingToUser } from '../actions/user'
import { addInspirationToUser } from '../actions/user'
import { fetchPostsSuccess } from '../actions/allPosts'
import { fetchAllUsersSuccess } from '../actions/allUsers'
import { fetchAllUserPostsSuccess } from '../actions/userPosts'
import { fetchFollowsSuccess } from '../actions/follows'
import { deleteUsersPost } from '../actions/user'
import { deleteInspirationFromUser } from '../actions/user'
import PostTile from "./PostTile.js"
import { selectPost } from '../actions/showPost'
import { selectUser } from '../actions/showUser'
import ReactPlayer from 'react-player'
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css"; 


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
            toaster.notify(`You are now following ${this.props.showPost.user.first_name} ${this.props.showPost.user.last_name}`)
        })
    }

    followBtn = () => {
        const postUser = this.props.allUsers.find(userObj => userObj.id === this.props.showPost.user.id)
        const isFollowing = this.props.user.following.find(followObj => followObj.id === postUser.id)
        return isFollowing ? "Following" : <Card onClick={this.handleFollowClick} style={{ backgroundColor: '#36454F',color: 'white'}}>Follow</Card>
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
            toaster.notify('Your Post is deleted!')
            this.props.history.push('/home')
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
           return <div><div>Ready to submit your inspired Art?</div><br/><Link to={ {pathname: `/home/newinspiredpost`, state: {post_id: this.props.showPost.id} } } ><Card style={{ backgroundColor: '#36454F',color: 'white'}}>Submit my work</Card></Link><Card onClick={this.handleNoLongerInspiredClick} style={{ backgroundColor: '#36454F',color: 'white'}}>I'm no longer inspired</Card></div> 
        } else {
            return <Card onClick={this.feelingInspiredClick} style={{ backgroundColor: '#36454F',color: 'white'}}>Feeling Inspired?</Card>
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
            toaster.notify('This piece has been added to those that inspire you')
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
            toaster.notify('This piece has been removed from your inspirations')
        })
    }

    renderSeeProfileBtn = () => {
        const displayUser = this.props.allUsers.find(userObj => userObj.id === this.props.showPost.user.id)
        return <Card onClick={() => this.props.selectUser(displayUser)} style={{backgroundColor:'#36454F'}}><Link to={`/home/showuser/${displayUser.id}`} style={{color: 'white'}}>See Profile</Link></Card>
    }

    renderMedia = (postInstance) => {
        if(postInstance.category === 'Video'){
            return <ReactPlayer url={postInstance.link_url} controls={true} width={700} height={400} style={{marginLeft: '100px'}}/>
        } else if (postInstance.category === 'Audio'){
            return <ReactPlayer url={postInstance.link_url} controls={false} width={700} height={150} textAlign='center' style={{marginLeft: '100px'}}/>
        } else if (postInstance.category === 'Image'){
            return <Image src={postInstance.link_url} style={{marginLeft: '250px'}}/>
        } else if (postInstance.category === 'Writing'){
            return <a href={postInstance.link_url} target="_blank"><Card style={{backgroundColor:'#36454F', color:'white'}}>{postInstance.title}</Card></a>
        } 
    }

    render(){
        return(
            <div>
                <Grid textAlign='center' style={{ }} verticalAlign='top'>
                    <Grid.Row style={{marginTop: '50px', marginBottom: '25px'}}>
                        <Grid.Column width={4} >
                            <Card style={{marginLeft: '125px'}}>
                            <Image src={this.props.showPost.user.image_url} wrapped ui={false}/>
                            <Card.Content>
                                <Card.Description>Artist</Card.Description>
                                <Card.Header>{this.props.showPost.user.first_name} {this.props.showPost.user.last_name}</Card.Header>
                                <Card.Meta>{this.props.showPost.user.location}</Card.Meta>
                            </Card.Content>
                            <Card.Content extra>
                                {this.props.user.id !== this.props.showPost.user.id ? this.followBtn() : null}
                                {this.renderSeeProfileBtn()}
                            </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column width={8} verticalAlign='top'>
                            <Segment.Group>
                                <Segment>{this.renderMedia(this.props.showPost)}</Segment>
                                <Segment><Header>{this.props.showPost.title}</Header>{this.props.showPost.description}<br/>{this.props.showPost.user.id === this.props.user.id ? <Card onClick={() => this.handleDelClick(this.props.showPost.id)} style={{ backgroundColor: '#36454F',color: 'white', left:'34%'}}>Delete this Post</Card> : null }</Segment>
                                
                            </Segment.Group>
                        </Grid.Column>
                        <Grid.Column width={4} verticalAlign='top'>
                        <Card style={{marginLeft:'35px'}} >
                            <Card.Content extra>
                                {this.renderFeelingInspiredBtns()}
                            </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid verticalAlign='center'>
                    <Grid.Row>
                        <Grid.Column width={7} >
                            <Segment>
                                <Header style={{fontWeight: '1', fontSize: '25px' }}>This work was inspired by:</Header>
                            </Segment>
                            {this.renderInspiredBy()}
                        </Grid.Column>    
                        <Grid.Column width={7}>
                            <Segment>
                                <Header style={{fontWeight: '1', fontSize: '25px' }}>This work has inspired the following:</Header>
                            </Segment>
                            {this.renderPostsInspiredPosts()}
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
    deleteUsersPost,
    selectUser, 
    addFollowingToUser,
    addInspirationToUser,
    deleteInspirationFromUser,
    fetchPostsSuccess,
    fetchAllUsersSuccess,
    fetchAllUserPostsSuccess,
    fetchFollowsSuccess
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPost);