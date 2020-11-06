import React, { Component } from 'react'
import { Menu, Dropdown, Icon, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { userLogout } from '../actions/user'
import { postLogout } from '../actions/allPosts'
import { selectUser } from '../actions/showUser'

class NavBar extends Component {
  
  handleClick = () => {
    this.props.userLogout()
    this.props.postLogout()
    localStorage.removeItem('app_token')
  }

  handleUserClick = () => {
    this.props.selectUser(this.props.user)
  }

  render() {
    return (
      <div style={{backgroundColor: ''}}>
        <Menu pointing secondary>
        <Menu.Item onClick={() => this.props.selectUser(this.props.user)}><Link to={`/home/showuser/${this.props.user.id}`}><Image src={this.props.user.image_url} circular size='mini'/></Link></Menu.Item>
        <Menu.Item ><Link to={`/home`}>Logo</Link></Menu.Item>
          <Menu.Menu position='right'>
            <Dropdown item style={{ marginBottom: '8px'}}>
              <Dropdown.Menu>
                <Link to='/home'><Dropdown.Item>Wall</Dropdown.Item></Link>
                <Link to='/home/newpost'><Dropdown.Item>Post New Art</Dropdown.Item></Link>
                {/* <Link to={`/home/showuser/${this.props.user.id}`}><Dropdown.Item>My Profile</Dropdown.Item></Link> */}
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
    posts: state.allPosts,
    user: state.user
  }
}

const mapDispatchToProps = {
  userLogout,
  postLogout, 
  selectUser
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);