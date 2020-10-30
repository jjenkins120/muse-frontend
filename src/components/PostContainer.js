import React from 'react'
import { fetchPostsSuccess } from '../actions/posts'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu, Input, Segment, Grid, Dropdown} from 'semantic-ui-react'
import PostTile from "./PostTile.js"


class PostContainer extends React.Component {
  
  state = { 
    activeItem: 'All',
    searchQuery: '', 
    sortBy: 'Sort' 
  }
  
  componentDidMount(){
    fetch('http://localhost:3000/posts')
      .then(resp => resp.json())
      .then(posts => {
          this.props.fetchPostsSuccess(posts)
      })
  }

  

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
  handleSortClick = (e, { name }) => this.setState({ sortBy: name })
  
  handleSearchChange = e => this.setState({ searchQuery: e.target.value })

  renderPosts = (postsArray) => {
    return postsArray.map(postObj => {
    return <Segment style={{backgroundColor: '#F0F8FF'}}><Link to={`/home/showpost/${postObj.id}`}><PostTile post={postObj}/></Link></Segment>
    })
  }
  
  findPosts = (postsArray) => {
    switch(this.state.activeItem){
      case 'All':
        // PROVIDE A FUNCTION THAT FILTERS OUT POSTS THAT HAVE NOT INSPIRED THE USER
        return postsArray
      case 'Inspiring Works':
        return this.props.user.inspirations
    }
  }

  //ISSUE WITH NEWEST AND OLDEST NOT SORTING PROPERLY
  tabDisplay = (postsArray) => {
    const posts = this.findPosts(postsArray)
    if (this.state.sortBy === 'Sort'){
      return this.renderPosts(posts)
    } else if (this.state.sortBy === 'Newest'){
      const newestPosts = posts.sort((a, b) => b.updated_at - a.updated_at).reverse()
      return this.renderPosts(newestPosts)
    } else if (this.state.sortBy === 'Oldest'){
      const oldestPosts = posts.sort((a, b) => b.updated_at - a.updated_at)
      return this.renderPosts(oldestPosts)
    } else if (this.state.sortBy === 'Most Liked'){
      const mostLikedPosts = posts.sort((a, b) => b.likes - a.likes)
      return this.renderPosts(mostLikedPosts)
    } else if (this.state.sortBy === 'Least Liked'){
      const leastLikedPosts = posts.sort((a, b) => b.likes - a.likes).reverse()
      return this.renderPosts(leastLikedPosts)
    }
  } 
  
  render() {
    const { activeItem } = this.state
    // *******NEEDS TO INCLUDE TAGS********
    const searchedPosts = this.props.posts.filter(postObj => {
      return (postObj.description.includes(this.state.searchQuery))||(postObj.title.includes(this.state.searchQuery)) 
    })
    return (
      <div>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='top'>
        <Grid.Column style={{ maxWidth: 700, margin: 50 }} >
        <Menu attached='top' tabular>
          <Menu.Item
            name='All'
            active={activeItem === 'All'}
            onClick={this.handleItemClick}
            style={{backgroundColor: ''}}
          />
          <Menu.Item
            name='Inspiring Works'
            active={activeItem === 'Inspiring Works'}
            onClick={this.handleItemClick}
            style={{backgroundColor: ''}}
          />
          <Dropdown item text={this.state.sortBy}>
            <Dropdown.Menu>
              <Dropdown.Item name='Newest' onClick={this.handleSortClick}>Newest</Dropdown.Item>
              <Dropdown.Item name='Oldest' onClick={this.handleSortClick}>Oldest</Dropdown.Item>
              <Dropdown.Item name='Most Liked' onClick={this.handleSortClick}>Most Liked</Dropdown.Item>
              <Dropdown.Item name='Least Liked' onClick={this.handleSortClick}>Least Liked</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input
                transparent
                icon={{ name: 'search', link: true }}
                placeholder='by Title, Content, or Tag'
                value={this.state.searchQuery}
                onChange={this.handleSearchChange}
              />
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        <Segment attached='bottom'>
          {this.tabDisplay(searchedPosts)}
        </Segment>
        </Grid.Column>
      </Grid>
      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  return { 
    user: state.user, 
    posts: state.posts
  }
}

const mapDispatchToProps = {
  fetchPostsSuccess
}

export default connect(mapStatetoProps, mapDispatchToProps)(PostContainer);