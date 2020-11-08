import React from 'react'
import { Form, Grid, Button, Dropdown, Segment, Image } from 'semantic-ui-react'
import PostTile from './PostTile'
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPost } from '../actions/allPosts'
import { addPostToUser } from '../actions/user'
import { fetchAllUsersSuccess } from '../actions/allUsers'
import { fetchPostsSuccess } from '../actions/allPosts'
import toaster from 'toasted-notes'
import "toasted-notes/src/styles.css"; 

class NewPost extends React.Component {
  state = {
    title:'', 
    description:'',
    link_url: '',
    post_id: null,
    user_id: this.props.user.id,
    likes: 0,
    category: null,
    value: 'no',
  }
  
    sendNewPostFetch = () => {
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
    
    handleCatChange = (event) => {
      this.setState({
        category: event.target.innerText
      }) 
    }
    
    handleBtnChange = (e, { value }) => this.setState({ value, post_id: null })
    
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
        this.sendNewPostFetch()
        this.props.addPostToUser(newPost)
        toaster.notify('New post added!')
        this.props.history.push('/home')
      })
    }
    
    handleMenuChange = (event) => {
      console.log(event)
      this.setState({
        post_id: parseInt(event.target.id),
      })
    }

    renderDropDown = (postsInfo) => {
      console.log(postsInfo)
      return <Dropdown placeholder='Which One?' fluid search selection options={postsInfo} onChange={(event) => this.handleMenuChange(event)}/>
    }
    
    renderPostTile = (id) => {
      const postToRender = this.props.allPosts.find(postObj => postObj.id === id)
        if (postToRender){
      return <Segment><PostTile post={postToRender}/></Segment>
      } else {
        return null
      }
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
        return <div><Form.Group widths='equal'><Form.Input fluid placeholder='Title' name='title' onChange={this.handleChange}/></Form.Group><Form.Group widths='equal'><Form.TextArea  placeholder='Description...' name='description' onChange={this.handleChange}/></Form.Group></div>
      } else {
        return null
      }
    }

    render(){
      const allPostObjs = this.props.allPosts.map(postObj => {
        return {key: postObj.id, text: `${postObj.title} by ${postObj.user.first_name} ${postObj.user.last_name}`, value: postObj.title , id: postObj.id}
      })
      const catOptions = [
        {key: 'Audio', text: 'Audio', value: 'Audio'},
        {key: 'Video', text: 'Video', value: 'Video'},
        {key: 'Image', text: 'Image', value: 'Image'},
        {key: 'Writing', text: 'Writing', value: 'Writing'}
      ]
      const { value, visible } = this.state
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
                    <br/>
                    {this.renderOtherMenu()}
                    <br/>
                    <Form.Group inline>
                        <label style={{color:'white'}}>Is this inspired by another piece?</label>
                        <Form.Radio
                            label='Yes'
                            value='yes'
                            checked={value === 'yes'}
                            onChange={this.handleBtnChange}
                        />
                        <Form.Radio
                            label='No'
                            value='no'
                            checked={value === 'no'}
                            onChange={this.handleBtnChange}
                        />
                        </Form.Group>
                        {this.state.value === 'yes' ? this.renderDropDown(allPostObjs): null }
                        {this.state.post_id !== null && this.state.value === 'yes' ? this.renderPostTile(this.state.post_id): null }
                    <Button.Group>
                      <br/>
                      <Form.Button style={{backgroundColor: '#FDD000', color: 'white', fontVariant: 'small-caps'}}>Submit</Form.Button>
                      <Button.Or />
                      <Link to={`/home`}><Button style={{ color: "white", fontVariant: 'small-caps'}}>Home</Button></Link>
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
        allUsers: state.allUsers
        }
    }
  
    const mapDispatchToProps = {
        addPost, 
        addPostToUser, 
        fetchAllUsersSuccess,
        fetchPostsSuccess,
    }

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);