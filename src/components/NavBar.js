import React, { Component } from 'react'
import { Menu, Dropdown, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { userLogout } from '../actions/user'
import { postLogout } from '../actions/allPosts'
import { selectUser } from '../actions/showUser'
import muselogo from '../muse_logo.png'

class NavBar extends Component {
  
  handleClick = () => {
    this.props.userLogout()
    this.props.postLogout()
    localStorage.removeItem('app_token')
  }

  handleUserClick = () => {
    this.props.selectUser(this.props.user)
  }

  renderImage = () => {
   return this.props.user.image_url ? <Image src={this.props.user.image_url} circular size='mini' /> : <div>{this.props.user.username}</div>
  }

  renderMessages = () => {
    if (this.props.user.received_messages){
      const unreadMessages = this.props.user.received_messages.filter(messageObj => messageObj.read === false)
      return `Messages (${unreadMessages.length})`
    } else {
      return "Messages"
    }
  }

  render() {
    return (
      <div style={{backgroundColor: 'white'}}>
        <Menu pointing secondary>
          <Menu.Item onClick={() => this.props.selectUser(this.props.user)} style={{ paddingLeft: '20px' }}><Link to={`/home/showuser/${this.props.user.id}`}>{this.renderImage()}</Link></Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item ><Link to={`/home`}><Image src={muselogo} size='tiny' style={{ paddingBottom: '7px' }}/></Link></Menu.Item>
            <Dropdown style={{ marginTop: '20px', marginRight: '15px'}} >
              <Dropdown.Menu>
                <Link to='/home/messages'><Dropdown.Item>
                  {this.renderMessages()}
                  {/* Messages */}
                  </Dropdown.Item></Link>
                <Link to='/home/newpost'><Dropdown.Item>Post New Art</Dropdown.Item></Link>
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