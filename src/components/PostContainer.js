import React from 'react'
import { connect } from 'react-redux'
import { Menu, Input, Segment, Grid, Dropdown} from 'semantic-ui-react'
import PostTile from "./PostTile.js"
import moment from 'moment'


class PostContainer extends React.Component {
  
  state = { 
    activeItem: 'All',
    searchQuery: '', 
    sortBy: 'Sort' 
  }
  
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
  handleSortClick = (e, { name }) => this.setState({ sortBy: name })
  
  handleSearchChange = e => this.setState({ searchQuery: e.target.value })

  renderPosts = (postsArray) => {
    return postsArray.map(postObj => {
      return <Segment style={{backgroundColor: 'white'}}><PostTile post={postObj}/></Segment>
    })
  }

  findPosts = (postsArray) => {
    switch(this.state.activeItem){
      case 'All':
        return postsArray
      case 'Inspired Me':
        const inspirationId = this.props.user.inspirations.map(postObj => postObj.id)
        return postsArray.filter(postObj => inspirationId.includes(postObj.id))
    }
  }

  tabDisplay = (postsArray) => {
    const Posts = this.findPosts(postsArray)
    console.log(Posts)
    if (this.state.sortBy === 'Sort'){
      return this.renderPosts(Posts)
    } else if (this.state.sortBy === 'Newest'){
      
      const newestPosts = Posts.sort((a, b) => b.created_at - a.created_at)
      return this.renderPosts(newestPosts)
    } else if (this.state.sortBy === 'Oldest'){
      const oldestPosts = Posts.sort((a, b) => b.created_at - a.created_at).reverse()
      return this.renderPosts(oldestPosts)
    } else if (this.state.sortBy === 'Inspired Most'){
      const mostInspiredPosts = Posts.sort((a, b) => b.posts.length - a.posts.length)
      return this.renderPosts(mostInspiredPosts)
    } else if (this.state.sortBy === 'Inspired Least'){
      const leastInspiredPosts = Posts.sort((a, b) => b.posts.length - a.posts.length).reverse()
      return this.renderPosts(leastInspiredPosts)
    }
  } 
  
  render() {
    const { activeItem } = this.state
    const searchedPosts = this.props.allPosts.filter(postObj => {
      const fullName = postObj.user.first_name + " " + postObj.user.last_name
      return (postObj.user.first_name.includes(this.state.searchQuery))||(postObj.user.last_name.includes(this.state.searchQuery))||(postObj.title.includes(this.state.searchQuery))||(fullName.includes(this.state.searchQuery)) 
    })
    return (
      <div>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='top'>
        <Grid.Column style={{ width: 900, marginTop: 50 }} >
        <Menu style={{backgroundColor: '#36454F'}}>
          <Menu.Item
            name='All'
            active={activeItem === 'All'}
            onClick={this.handleItemClick}
            style={this.state.activeItem === 'All' ? {color: '#FED700'} : {color:'white'}}
          />
          <Menu.Item
            name='Inspired Me'
            active={activeItem === 'Inspired Me'}
            onClick={this.handleItemClick}
            style={this.state.activeItem === 'Inspired Me' ? {color: '#FED700'}: {color:'white'}}
          />
          <Dropdown item text={this.state.sortBy} style={{color: 'white'}}>
            <Dropdown.Menu>
              <Dropdown.Item name='Newest' onClick={this.handleSortClick}>Newest</Dropdown.Item>
              <Dropdown.Item name='Oldest' onClick={this.handleSortClick}>Oldest</Dropdown.Item>
              <Dropdown.Item name='Inspired Most' onClick={this.handleSortClick}>Inspired Most</Dropdown.Item>
              <Dropdown.Item name='Inspired Least' onClick={this.handleSortClick}>Inspired Least</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Menu position='right'>
              <Input
                style={{marginRight: '15px', color:'white'}}
                transparent
                icon={{ name: 'search'}}
                placeholder='Search by Title / Artist...'
                value={this.state.searchQuery}
                onChange={this.handleSearchChange}
              />
          </Menu.Menu>
        </Menu>
          {this.tabDisplay(searchedPosts.reverse())}
        </Grid.Column>
      </Grid>
      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  return { 
    user: state.user, 
    allPosts: state.allPosts
  }
}

export default connect(mapStatetoProps, null)(PostContainer);