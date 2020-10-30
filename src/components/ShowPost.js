import React from 'react'
import { connect } from 'react-redux'
import { Segment, Image, Card, Icon, Button, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { addFollowToUser } from '../actions/user'
import PostTile from "./PostTile.js"

class ShowPost extends React.Component {
    
    state = {
            // Input info from setState
            id:'', 
            title: '',
            description: '',
            link_url: '',
            post_user: '',
            created_at: '',
            updated_at: '',
            likes: '',
            post: '',
            posts: [],
            category:'', 
            isFollowing: true
        }

    
    componentDidMount(){
        this.post()
    }

    post = () => {
        const paramsId = parseInt(this.props.match.params.id)
        const postToShow = this.props.posts.find(postObj => {
            if(postObj.id === paramsId){
                return postObj
            }
        })

        this.setState({
            id: postToShow.id,
            title: postToShow.title,
            description: postToShow.description,
            link_url: postToShow.link_url,
            post_user: postToShow.user,
            created_at: postToShow.created_at,
            updated_at: postToShow.updated_at,
            likes: postToShow.likes,
            post: postToShow.post,
            posts: postToShow.posts,
            category: postToShow.category, 
        })
    } 
    
    handleFollowClick = () => {
        console.log('handle follow click')
        const newFollow = {
            follower_id: this.props.user.id,
            following_id: this.state.post_user.id
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
            this.props.addFollowToUser(this.state.post_user)
        })
        this.setState({
            isFollowing: !this.state.isFollowing
        })
    }

    handleUnfollowClick = () => {
        console.log('handle UNfollow click')
        // send a delete request to follows in the backend 
    }

    followBtn = () => {
        const isFollowing = this.props.user.following.find(followObj => followObj.id === this.state.post_user.id)
        return isFollowing ? <Button onClick={this.handleUnfollowClick}>Unfollow</Button> : <Button onClick={this.handleFollowClick}>Follow</Button>
    }

    renderPostsInspiredPosts = () => {
        const postArray = this.state.posts.map(postObj => postObj.id)
        const postToDisplay = this.props.posts.filter(postObj => {
           return postArray.includes(postObj.id) 
        })
        return postToDisplay.map(postObj => {
            return <Segment><Link to={`/home/showpost/${postObj.id}`}><PostTile post={postObj}/></Link></Segment>
        })
    }

    render(){
        return(
            <div>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Card>
                            <Image src={this.state.post_user.image_url} wrapped ui={false}/>
                            <Card.Content>
                            <Card.Header>{this.state.post_user.first_name} {this.state.post_user.last_name}</Card.Header>
                            <Card.Meta>{this.state.post_user.location}</Card.Meta>
                            <Card.Description>
                                    {this.state.post_user.bio}
                            </Card.Description>
                            </Card.Content>
                            
                            <Card.Content extra>
                                {this.followBtn()}
                                <Link to={`/home/showuser/${this.state.post_user.id}`}><Button>See Profile</Button></Link>
                            </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column width={10}>
                        <Segment.Group>
                            <Segment>{this.state.title}</Segment>
                            <Segment.Group>
                                <Segment>Nested Top</Segment>
                            </Segment.Group>
                            <Segment.Group>
                                <Segment>Top</Segment>
                            </Segment.Group>
                            {this.state.post ? <Segment> Inspired By: <Link>{this.state.post}</Link></Segment> : null}
                            {this.renderPostsInspiredPosts()}
                            {/* create boolean function that if there are no inspire works, displays a message that says yet to inspire, otherwise tile all of the works it has inspired */}
                        </Segment.Group>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Image src='/images/wireframe/image.png' />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
      posts: state.posts,
      user: state.user
    }
  }
  
const mapDispatchToProps = {
   addFollowToUser 
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPost);