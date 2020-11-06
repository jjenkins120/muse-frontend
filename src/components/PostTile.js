import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Image, Icon, Segment, Header } from 'semantic-ui-react'
import { selectPost } from '../actions/showPost'
import ReactPlayer from 'react-player'


class PostTile extends React.Component {
    
    renderMedia = (postInstance) => {
        if(postInstance.category === 'Video'){
            return <ReactPlayer url={postInstance.link_url} controls={true} width={500} style={{borderStyle: 'solid', borderColor: 'white', boxShadow: '2px 2px 2px gray'}}/>
        } else if (postInstance.category === 'Audio'){
            return <ReactPlayer url={postInstance.link_url} controls={false} width={500} height={150} config={{soundcloud: {options: { show_user: false, color: "FFD700", show_artwork: false}}}} style={{borderStyle: 'solid', borderColor: 'white', boxShadow: '2px 2px 2px gray'}}/>
        } else if (postInstance.category === 'Image'){
            return <Image src={postInstance.link_url} verticalAlign='centered'/>
        } else if (postInstance.category === 'Writing'){
            return "Writing goes here"
        } 
    }

    render(){
        const postInstance = this.props.allPosts.find(postObj => postObj.id === this.props.post.id)
        return(
            <div>
                <Segment vertical style={{ paddingLeft: '50px', paddingBottom: '30px'}}>
                    {this.renderMedia(postInstance)}
                </Segment>
                <Segment onClick={() => this.props.selectPost(postInstance)} vertical>
                    <Link to={`/home/showpost/${postInstance.id}`}>
                    <Header as='h2'>
                        <Image src={postInstance.user.image_url} circular/>
                        <Header.Content>
                        {postInstance.title} 
                        <Header.Subheader> by {postInstance.user.first_name} {postInstance.user.last_name}</Header.Subheader>
                        </Header.Content>
                    </Header>
                    </Link> 
                </Segment>
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