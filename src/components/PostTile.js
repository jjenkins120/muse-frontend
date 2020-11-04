import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Image, Icon, Segment } from 'semantic-ui-react'
import { selectPost } from '../actions/showPost'


class PostTile extends React.Component {
    
    render(){
        const postInstance = this.props.allPosts.find(postObj => postObj.id === this.props.post.id)
        return(
            <div>
                <Segment>
                    Media goes here
                </Segment>
                <Card onClick={() => this.props.selectPost(postInstance)}>
                <Link to={`/home/showpost/${postInstance.id}`}>
                    <Card.Content>
                    <Card.Header>{postInstance.title}</Card.Header>
                        {/* <Card.Meta>Joined in 2016</Card.Meta> */}
                        <Card.Description>
                            By {postInstance.user.first_name} {postInstance.user.last_name}
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
      allPosts: state.allPosts
    }
  }
  
  const mapDispatchToProps = {
    selectPost
  }

export default connect(mapStateToProps, mapDispatchToProps)(PostTile);