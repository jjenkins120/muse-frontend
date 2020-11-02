import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Image, Icon, Segment, Button } from 'semantic-ui-react'
import { selectUser } from '../actions/showUser'
import user from '../reducers/user'


class PostTile extends React.Component {
    
    
    
    
    render(){
        const followInstance = this.props.allUsers.find(userObj => userObj.id === this.props.follow.id)
        const followingIDArray = this.props.user.following.map(followingInt => followingInt.id)
        console.log(followingIDArray)

        return(
            <div>
                <Card onClick={() => this.props.selectUser(followInstance)}>
                <Link to={`/home/showuser/${followInstance.id}`}>
                    <Card.Content>
                    <Card.Header>{followInstance.first_name} {followInstance.last_name}</Card.Header>
                        {/* <Card.Meta>Joined in 2016</Card.Meta> */}
                        <Card.Description>
        
                        </Card.Description>
                    </Card.Content>
                </Link> 
                </Card>
                {followingIDArray.includes(followInstance.id) ? <Button>UnFollow</Button> : <Button>Follow</Button>}
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

export default connect(mapStateToProps, mapDispatchToProps)(PostTile);