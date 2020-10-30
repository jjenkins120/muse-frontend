import React, { Component } from 'react'
import { Menu, Dropdown, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { userLogout } from '../actions/user'
import { postLogout } from '../actions/posts'

class NavBar extends Component {
  
  handleClick = () => {
    this.props.userLogout()
    this.props.postLogout()
    localStorage.removeItem('app_token')
  }

  render() {
    return (
      <div style={{backgroundColor: ''}}>
        <Menu pointing secondary>
        <Link to={`/home/showuser/${this.props.user.id}`}><Menu.Item>{this.props.user.username}</Menu.Item></Link>
          <Menu.Menu position='right'>
            <Dropdown item text='Options'>
              <Dropdown.Menu>
                <Link to='/home'><Dropdown.Item>Wall</Dropdown.Item></Link>
                <Link to='/home/newpost'><Dropdown.Item>Post New Art</Dropdown.Item></Link>
                {/* <Link to={`/showuser/${this.props.user.id}`}><Dropdown.Item>My Profile</Dropdown.Item></Link> */}
                <Link to={`/home/edituser/${this.props.user.id}`}><Dropdown.Item>Edit My Profile</Dropdown.Item></Link>
                <Link to='/'><Dropdown.Item onClick={this.handleClick}>Logout</Dropdown.Item></Link>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu>
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
  userLogout,
  postLogout
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);