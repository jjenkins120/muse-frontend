import React from 'react'
import { Form, Grid, Button, Dropdown, Segment, Image } from 'semantic-ui-react'
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPost } from '../actions/allPosts'
import { addPostToUser } from '../actions/user'
import { fetchAllUsersSuccess } from '../actions/allUsers'
import { fetchPostsSuccess } from '../actions/allPosts'
import { fetchAllUserPostsSuccess } from '../actions/userPosts'
import { deleteInspirationFromUser } from '../actions/user'
import PostTile from './PostTile.js'
import toaster from 'toasted-notes'
import "toasted-notes/src/styles.css"; 

class NewInspiredPost extends React.Component {

    state = {
        title:'', 
        description:'',
        link_url: '',
        post_id: this.props.showPost.id,
        user_id: this.props.user.id,
        likes: 0,
        category: null,
    }

    sendNewPostFetch = () => {
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
        fetch('http://localhost:3000/users')
        .then(resp => resp.json())
        .then(users => {
            this.props.fetchAllUsersSuccess(users)
        })
    }

    handleChange = (e) => {
        this.setState({
        [e.target.name]: e.target.value 
      }) 
    }
    
    handleMenuClick = (e) => {
        this.setState({
            inspiredBy: e.target.text,
            post_id: e.target.id,
        })
    }

    handleCatChange = (event) => {
        console.log(event)
        this.setState({
          category: event.target.innerText
        })
    }

    handleSubmit = (e) => {
      e.preventDefault()
      const reqObj = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(this.state)
      } 
      fetch('http://localhost:3000/posts', reqObj)
      .then(resp => resp.json())
      .then(newPost => {
        this.props.addPostToUser(newPost)
      })
      const userPostToDelete = this.props.userPosts.find(userPostObj => {
      return userPostObj.user_id === this.props.user.id && userPostObj.post_id === this.props.showPost.id  
    })
      const delreqObj = {
          method: 'DELETE'
      }
      fetch(`http://localhost:3000/user_posts/${userPostToDelete.id}`, delreqObj)
      .then(resp => resp.json())
      .then(() => {
        this.sendNewPostFetch()
        this.props.deleteInspirationFromUser(this.props.showPost.id)
        toaster.notify('New post added! Note: the inspired piece has been removed from your inspirations')
        this.props.history.push('/home')
      })
    }
  
    renderPostTile = () => {
        const renderPost = this.props.allPosts.find(postObj => postObj.id === this.props.showPost.id)
        return <Segment style={{backgroundColor: 'white', width: '800px'}}> This submission is inspired by <PostTile post={renderPost}/></Segment>
    }

    renderMedia = (link_url) => {
        if(this.state.category === 'Video'){
            return <ReactPlayer url={link_url} controls={true} width={700} height={400} style={{borderStyle: 'solid', borderColor: 'white', marginLeft: '35px'}}/>
        } else if (this.state.category === 'Audio'){
            return <ReactPlayer url={link_url} controls={false} width={700} height={150} config={{soundcloud: {options: { show_user: false, color: "FFD700", show_artwork: false}}}} style={{borderStyle: 'solid', borderColor: 'white', marginLeft: '35px'}}/>
        } else if (this.state.category === 'Image'){
            return <Image src={link_url} verticalAlign='centered'/>
        } else if (this.state.category === 'Writing'){
            return "Writing goes here"
        } 
      }
      
      renderMenuTile = () => {
        if (this.state.link_url !== '' && this.state.category !== null){
          return this.renderMedia(this.state.link_url)
        } else {
          return null
        }
      }
  
      renderOtherMenu = () => {
        if (this.state.link_url !== '' && this.state.category !== null){
          return <div><br/><Form.Group widths='equal'><Form.Input fluid placeholder='Title' name='title' onChange={this.handleChange}/></Form.Group><Form.Group widths='equal'><Form.TextArea  placeholder='Description...' name='description' onChange={this.handleChange}/></Form.Group></div>
        } else {
          return null
        }
      }

    render(){
        const { value } = this.state
        const catOptions = [
            {key: 'Audio', text: 'Audio', value: 'Audio'},
            {key: 'Video', text: 'Video', value: 'Video'},
            {key: 'Image', text: 'Image', value: 'Image'},
            {key: 'Writing', text: 'Writing', value: 'Writing'}
          ]
        return (
          <div>
              <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 800, margin: 50 }} >
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Input fluid placeholder='Link Url' name='link_url' onChange={this.handleChange}/>
                    </Form.Group>
                    <Dropdown placeholder='Category' fluid selection options={catOptions} onChange={(event)=> this.handleCatChange(event)}/>
                        <br/>
                        {this.renderMenuTile()}
                        {this.renderOtherMenu()}
                    <Form.Group inline>
                        {this.renderPostTile()}    
                    </Form.Group>
                    <Button.Group style={{ margin: 20 }}>
                        <Form.Button style={{backgroundColor: '#FDD000', color: 'white', fontVariant: 'small-caps'}}>Submit</Form.Button>
                    <Button.Or />
                        <Link to={`/home/showpost/${this.props.showPost.id}`}><Button style={{ color: "white", fontVariant: 'small-caps'}}>Cancel</Button></Link>
                    </Button.Group>  
                  </Form>
                </Grid.Column>
              </Grid >
          </div>
        );
    }
}    

    const mapStateToProps = (state) => {
        return { 
        user: state.user, 
        allPosts: state.allPosts,
        allUsers: state.allUsers,
        userPosts: state.userPosts,
        showPost: state.showPost
        }
    }
  
    const mapDispatchToProps = {
        addPost, 
        addPostToUser, 
        fetchAllUsersSuccess,
        fetchPostsSuccess,
        fetchAllUserPostsSuccess, 
        deleteInspirationFromUser
    }

export default connect(mapStateToProps, mapDispatchToProps)(NewInspiredPost);