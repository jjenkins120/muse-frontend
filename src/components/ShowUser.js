import React from 'react'
import { connect } from 'react-redux'
import { Grid, Image, Segment, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { selectUser } from '../actions/showUser'
import { selectPost } from '../actions/showPost'


class ShowUser extends React.Component {



handleFollowClick = (id) => {
    const foundUser = this.props.allUsers.find(userObj => userObj.id === id)
    this.props.selectUser(foundUser)
}

handlePostClick = (id) => {
    const foundPost = this.props.allPosts.find(postObj => postObj.id === id)
    this.props.selectPost(foundPost)
}

// renderFollow = (follow) => {
//   return follow.map(followObj =>{
//       return <Segment onClick={() => this.handleFollowClick(followObj.id)}><Link to={`/home/showuser/${followObj.id}`}>{followObj.first_name}</Link></Segment>
//   })  
   
// }

renderPosts = (posts) => {
    return posts.map(postObj =>{
        return <Segment onClick={() => this.handlePostClick(postObj.id)}><Link to={`/home/showpost/${postObj.id}`}>{postObj.title}</Link></Segment>
 })
}

renderBtns = () => {
    if(this.props.showUser.id === this.props.user.id){
        return <div><Button>Edit My Profile</Button><Button>Delete My Profile</Button></div>
    } else {
        return <Button>Follow</Button>
    }
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
                        <br/>
                            Followers: {this.props.showUser.followers.length === 0 ? "0" : <Link to={ {pathname: `/home/showfollow/${this.props.showUser.id}`, state: {activeItem: 'Followers'} } } >{this.props.showUser.followers.length}</Link>}
                            {/* {this.renderFollow(this.props.showUser.followers)} */}
                            

                        <br/>
                            Following: {this.props.showUser.following.length === 0 ? "0" : <Link to={ {pathname: `/home/showfollow/${this.props.showUser.id}`, state: {activeItem: 'Following'} } } >{this.props.showUser.following.length}</Link>}
                            {/* {this.renderFollow(this.props.showUser.following)} */}
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
      user: state.user
    }
  }
  
const mapDispatchToProps = {
   selectUser, 
   selectPost
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowUser);