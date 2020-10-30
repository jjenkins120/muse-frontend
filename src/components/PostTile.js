import React from 'react'
import { connect } from 'react-redux'
import { Card, Image, Icon, Segment } from 'semantic-ui-react'

class PostTile extends React.Component {
    
    render(){
        return(
            <div>
                <Segment>
                    Media goes here
                </Segment>
                <Card>
                    <Card.Content>
                    <Card.Header>{this.props.post.title}</Card.Header>
                        <Card.Meta>Joined in 2016</Card.Meta>
                        <Card.Description>
                            By {this.props.post.user.first_name} {this.props.post.user.last_name}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                    <Icon name='like' />
                        {this.props.post.likes}
                    </Card.Content>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
      
    }
  }
  
const mapDispatchToProps = {
   
}

export default connect(mapStateToProps, mapDispatchToProps)(PostTile);