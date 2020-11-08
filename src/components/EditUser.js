import React from 'react'
import { Form, Button, Grid } from 'semantic-ui-react' 
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateUser } from '../actions/user'
import { fetchAllUsersSuccess } from '../actions/allUsers'
import { selectUser } from '../actions/showUser'
import toaster from 'toasted-notes'
import "toasted-notes/src/styles.css"; 


class EditUser extends React.Component {
    
    state = {
        id: this.props.user.id,
        username: this.props.user.username,
        password: '',
        first_name: this.props.user.first_name,
        last_name: this.props.user.last_name,
        email: this.props.user.email, 
        bio: this.props.user.bio,
        location: this.props.user.location, 
        image_url: this.props.user.image_url, 
        posts: this.props.user.posts,
        inspirations: this.props.user.inspirations,
        followers: this.props.user.followers,
        following: this.props.user.following,
      }


      sendNewAllUsersFetch = () => {
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
                method: 'PATCH',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(this.state)
            }
            console.log(this.state.id)
            console.log(this.state)
            fetch(`http://localhost:3000/users/${this.state.id}`, reqObj)
            .then(resp => resp.json())
            .then(updatedUser => {
                this.props.updateUser(updatedUser)
                this.sendNewAllUsersFetch()
                this.props.selectUser(updatedUser)
                this.props.history.push(`/home/showuser/${updatedUser.id}`)
                toaster.notify(`Your profile has been updated!`)
            })
        }
        
        render(){
            return (
                <div>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 600, margin: 50 }} >
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group widths='equal'>
                            <Form.Input fluid placeholder='Username' name='username' value={this.state.username} onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group widths='equal'>   
                            <Form.Input placeholder='Enter New Password' name='password' value={this.state.password} onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group widths='equal'>    
                            <Form.Input name='first_name' placeholder='First Name' value={this.state.first_name} onChange={this.handleChange}/>  
                            <Form.Input name='last_name' placeholder='Last Name' value={this.state.last_name} onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group widths='equal'>    
                            <Form.Input name='email' placeholder='Email' value={this.state.email} onChange={this.handleChange}/> 
                        </Form.Group>    
                        <Form.Group widths='equal'>    
                            <Form.TextArea name='bio' placeholder='Bio' value={this.state.bio} onChange={this.handleChange}/> 
                        </Form.Group>    
                        <Form.Group widths='equal'>    
                            <Form.Input name='location' placeholder='Location' value={this.state.location} onChange={this.handleChange}/> 
                        </Form.Group>    
                        <Form.Group widths='equal'>    
                            <Form.Input name='image_url' placeholder='Profile Image URL' value={this.state.image_url} onChange={this.handleChange}/> 
                        </Form.Group>    
                        <Button.Group style={{ margin: 20 }}>
                            <Form.Button style={{backgroundColor: '#FDD000', color: 'white', fontVariant: 'small-caps'}}>Submit</Form.Button>
                        <Button.Or />
                            <Link to={`/home/showuser/${this.props.user.id}`}><Button style={{ color: "white", fontVariant: 'small-caps'}}>Profile</Button></Link>
                        </Button.Group>    
                    </Form>
                </Grid.Column>
            </Grid>
        </div>
      );
    }
}


const mapStateToProps = (state) => {
    return { 
        user: state.user
    }
  }
  
  const mapDispatchToProps = {
    selectUser,
    updateUser,
    fetchAllUsersSuccess
  }

  export default connect(mapStateToProps, mapDispatchToProps)(EditUser);