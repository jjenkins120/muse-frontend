import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Image, Icon, Segment } from 'semantic-ui-react'
import { selectUser } from '../actions/showUser'


class PostTile extends React.Component {
    
    
    
    
    render(){
        const followInstance = this.props.allUsers.find(userObj => userObj.id === this.props.follow.id)
        console.log(followInstance)
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
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
      allUsers: state.allUsers
    }
  }
  
  const mapDispatchToProps = {
    selectUser
  }

export default connect(mapStateToProps, mapDispatchToProps)(PostTile);