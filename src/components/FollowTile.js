import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Image, Icon, Segment, Button, Header } from 'semantic-ui-react'
import { selectUser } from '../actions/showUser'


class FollowTile extends React.Component {
    

    renderFollowInfo = (followInst) => {
      return this.props.user.id !== followInst.id ? this.displayFollowing(followInst) : null
    }

    displayFollowing = (followInst) => {
        const followingIDArray = this.props.user.following.map(followingInt => followingInt.id)
        return followingIDArray.includes(followInst.id) ? "You are following" : "You are not following"
    }
    
    render(){
        const followInstance = this.props.allUsers.find(userObj => userObj.id === this.props.follow.id)
        return(
            <div>
                <Segment onClick={() => this.props.selectUser(followInstance)}>
                <Link to={`/home/showuser/${followInstance.id}`}>
                    <Card.Content>
                        <Card.Description>
                    <Header as='h2'>
                        <Image src={followInstance.image_url} circular size='medium'/>
                        <Header.Content>
                        {followInstance.first_name} {followInstance.last_name}
                        </Header.Content>
                    </Header>
                        </Card.Description>
                    </Card.Content>
                </Link> 
                </Segment>
                <div>
                {this.props.showUser.id !== this.props.user.id ? this.renderFollowInfo(followInstance) : null}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
      allUsers: state.allUsers,
      user: state.user,
      showUser: state.showUser
    }
  }
  
  const mapDispatchToProps = {
    selectUser
  }

export default connect(mapStateToProps, mapDispatchToProps)(FollowTile);