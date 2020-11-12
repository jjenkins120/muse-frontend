import React from 'react'
import { Form, Grid, Header, Message, Segment, Image} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUserSuccess } from '../actions/user'
import muselogosharing from '../muse_logo_sharing.png'


class Login extends React.Component {

  state = {
    username: '',
    password: '',
    error: null,
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
    fetch('http://localhost:3000/users/sessions/login', reqObj)
    .then(resp => resp.json())
    .then(user => {
      if (user.error){
        this.setState ({
          error: user.error 
        })
      } else {
        localStorage.setItem('app_token', user.token)
        console.log(user)  
        this.props.fetchUserSuccess(user)
        this.props.history.push('/home')
      }
    })
  }

  render(){
    return(
      <div>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header>
                <Image src={muselogosharing} style={{ width: '350px', marginLeft: '20px' }}/>
            </Header>
            { this.state.error && <h3 style={{ color: 'red'}}>{this.state.error}</h3> }
            <Form size='large' onSubmit={this.handleSubmit}>
              <Segment>
                <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' name='username' onChange={this.handleChange}/>
                <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' name='password' type='password' onChange={this.handleChange}/>
                <Form.Button fluid size='large' style={{fontVariant: 'small-caps', backgroundColor: '#FABF00'}}> Login </Form.Button>
              </Segment>
            </Form>
            <Message>
              New to us? <Link to='/newuser'style={{color:'#DC9B66'}}> Sign up</Link>.
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

  const mapDispatchToProps = {
    fetchUserSuccess
  }

  export default connect(null, mapDispatchToProps)(Login);