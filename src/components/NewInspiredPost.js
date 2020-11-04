import React from 'react'
import { Form, Grid, Button, Dropdown, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPost } from '../actions/allPosts'
import { addPostToUser } from '../actions/user'
import { fetchAllUsersSuccess } from '../actions/allUsers'
import { fetchPostsSuccess } from '../actions/allPosts'
import { fetchAllUserPostsSuccess } from '../actions/userPosts'
import { deleteInspirationFromUser } from '../actions/user'
import PostTile from './PostTile.js'

const options = [
    { key: 'v', text: 'Video', value: 'video' },
    { key: 'a', text: 'Audio', value: 'audio' },
    { key: 'i', text: 'Image', value: 'image', name:'category'},
  ]

class NewInspiredPost extends React.Component {
    state = {
        title:'', 
        description:'',
        link_url: '',
        post_id: this.props.showPost.id,
        user_id: this.props.user.id,
        likes: 0,
        category: '',
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
        alert('New post added! Note: the inspired piece has been removed from your inspirations')
        this.props.history.push('/home')
      })
    }
  
    renderPostTile = () => {
        const renderPost = this.props.allPosts.find(postObj => postObj.id === this.props.showPost.id)
        return <Segment style={{backgroundColor: '#F0F8FF'}}><PostTile post={renderPost}/></Segment>
    }

    handleMenuClick = (e) => {
        this.setState({
            inspiredBy: e.target.text,
            post_id: e.target.id,
        })
    }

    render(){
        const { value } = this.state
        return (
          <div>
              <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 600, margin: 50 }} >
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Link Url' placeholder='Link Url' name='link_url' onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group widths='equal'>    
                        <Form.Input fluid label='Title' placeholder='Title' name='title' onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group widths='equal'>    
                        <Form.TextArea label='Description' placeholder='Write your description here...' name='description' onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Select fluid label='Category' options={options} placeholder='Category'/>
                    </Form.Group>
                    <Form.Group inline>
                        This submission is inspired by:
                        {this.renderPostTile()}    
                    </Form.Group>
                        {/* {this.state.value === 'yes' ? this.renderDropDown() : null } */}
                    <Button.Group>
                      <Form.Button primary>Submit</Form.Button>
                      <Button.Or />
                      <Link to={`/home/showpost/${this.props.showPost.id}`}><Button style={{ color: "white"}}>Cancel</Button></Link>
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