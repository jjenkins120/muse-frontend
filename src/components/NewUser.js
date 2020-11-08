import React from 'react'
import { Form, Button, Grid } from 'semantic-ui-react' 
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { newUser, fetchUserSuccess } from '../actions/user'
import toaster from 'toasted-notes'
import "toasted-notes/src/styles.css"; 

class NewUser extends React.Component {
    
    state = {
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        email: '',
        bio: '',
        location: '',
        image_url: '',
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
            'Content-Type':'application/json'
          },
          body: JSON.stringify(this.state)
        }
        fetch(`http://localhost:3000/users`, reqObj)
        .then(resp => resp.json())
        .then(newUser => {
          this.props.newUser(newUser)
          this.getToken(this.state)  
        })   
    }

    getToken = (userInfo) => {
        const otherReqObj = {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(userInfo)
        }
        fetch('http://localhost:3000/users/sessions/login', otherReqObj)
        .then(resp => resp.json())
        .then(user => {
            localStorage.setItem('app_token', user.token)  
            this.props.fetchUserSuccess(user)
            this.props.history.push('/home')
           toaster.notify(`Thanks for signing up!`)
        })
    }

    render(){
      return (
        <div>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 800, margin: 50 }} >
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Input fluid name='username' placeholder='Username' value={this.state.username} onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input name='password' placeholder='Password' type='password' value={this.state.password} onChange={this.handleChange}/>
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
                        <Link to={`/`}><Button style={{ color: "white", fontVariant: 'small-caps'}}>Back</Button></Link>
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
    newUser, 
    fetchUserSuccess
  }

  export default connect(mapStateToProps, mapDispatchToProps)(NewUser);
  