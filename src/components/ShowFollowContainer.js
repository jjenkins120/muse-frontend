import React from 'react'
// import { fetchPostsSuccess } from '../actions/allPosts'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu, Input, Segment, Grid, Dropdown} from 'semantic-ui-react'
import FollowTile from "./FollowTile.js"

class ShowFollowContainer extends React.Component {
    
    state = { 
        activeItem: this.props.location.state.activeItem,
        searchQuery: '', 
        sortBy: 'Sort',
        // triggered: this.props.follow
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
    handleSortClick = (e, { name }) => this.setState({ sortBy: name })
    
    handleSearchChange = e => this.setState({ searchQuery: e.target.value })

    renderFollows = (followArray) => {
        return followArray.map(followObj => {
            return <Segment style={{backgroundColor: '#F0F8FF'}}><FollowTile follow={followObj}/></Segment>
        })
    }

//     findPosts = (postsArray) => {
//     switch(this.state.activeItem){
//       case 'All':
//         // PROVIDE A FUNCTION THAT FILTERS OUT POSTS THAT HAVE NOT INSPIRED THE USER
//         return postsArray
//       case 'Inspiring Works':
//         //PERHAPS RUN A FUNCTION THAT FILTERS OUT THE HAVE INSPIRED THE USER
//         const inspirationId = this.props.user.inspirations.map(postObj => postObj.id)
//         return this.props.allPosts.filter(postObj => inspirationId.includes(postObj.id))
//     }
//   }

  //ISSUE WITH NEWEST AND OLDEST NOT SORTING PROPERLY
  tabDisplay = (followArray) => {
    // const Follow = this.findPosts(postsArray)
    console.log(followArray)
    if (this.state.sortBy === 'Sort'){
      return this.renderFollows(followArray)
//     } else if (this.state.sortBy === 'Newest'){
//       const newestPosts = followArray.sort((a, b) => b.updated_at - a.updated_at).reverse()
//       return this.renderFollows(newestPosts)
//     } else if (this.state.sortBy === 'Oldest'){
//       const oldestPosts = followArray.sort((a, b) => b.updated_at - a.updated_at)
//       return this.renderFollows(oldestPosts)
    } else if (this.state.sortBy === 'Most Pieces'){
      const mostPosts = followArray.sort((a, b) => b.posts.length - a.posts.length)
      return this.renderFollows(mostPosts)
    } else if (this.state.sortBy === 'Fewest Pieces'){
      const leastPosts = followArray.sort((a, b) => b.posts.length - a.posts.length).reverse()
      return this.renderFollows(leastPosts)
    }
    } 

    render() {
        const { activeItem } = this.state
        const showFollowerArray = this.props.showUser.followers.map(followerObj => followerObj.id)
        const filteredFollowerArray = this.props.allUsers.filter(userObj => showFollowerArray.includes(userObj.id))
        const searchedFollowers = filteredFollowerArray.filter(followObj => {
            const fullName = followObj.first_name + " " + followObj.last_name
            return (followObj.first_name.includes(this.state.searchQuery))||(followObj.last_name.includes(this.state.searchQuery))||(fullName.includes(this.state.searchQuery)) 
        })
        const showFollowingArray = this.props.showUser.following.map(followerObj => followerObj.id)
        const filteredFollowingArray = this.props.allUsers.filter(userObj => showFollowingArray.includes(userObj.id))
        const searchedFollowing = filteredFollowingArray.filter(followObj => {
            const fullName = followObj.first_name + " " + followObj.last_name
            return (followObj.first_name.includes(this.state.searchQuery))||(followObj.last_name.includes(this.state.searchQuery))||(fullName.includes(this.state.searchQuery)) 
        })
        return (
            <div>
            <div>See {this.props.showUser.first_name}'s follows</div>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='top'>
            <Grid.Column style={{ maxWidth: 700, margin: 50 }} >
            <Menu attached='top' tabular>
                <Menu.Item
                name='Followers'
                active={activeItem === 'Followers'}
                onClick={this.handleItemClick}
                style={{backgroundColor: ''}}
                />
                <Menu.Item
                name='Following'
                active={activeItem === 'Following'}
                onClick={this.handleItemClick}
                style={{backgroundColor: ''}}
                />
                <Dropdown item text={this.state.sortBy}>
                <Dropdown.Menu>
                    {/* <Dropdown.Item name='Newest' onClick={this.handleSortClick}>Newest</Dropdown.Item>
                    <Dropdown.Item name='Oldest' onClick={this.handleSortClick}>Oldest</Dropdown.Item> */}
                    <Dropdown.Item name='Most Pieces' onClick={this.handleSortClick}>Most Pieces</Dropdown.Item>
                    <Dropdown.Item name='Fewest Pieces' onClick={this.handleSortClick}>Fewest Pieces</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
                <Menu.Menu position='right'>
                <Menu.Item>
                    <Input
                    transparent
                    icon={{ name: 'search', link: true }}
                    placeholder='Search by Name'
                    value={this.state.searchQuery}
                    onChange={this.handleSearchChange}
                    />
                </Menu.Item>
                </Menu.Menu>
            </Menu>
    
            <Segment attached='bottom'>
                { this.state.activeItem === 'Followers' ? this.tabDisplay(searchedFollowers) : this.tabDisplay(searchedFollowing)}
            </Segment>
            </Grid.Column>
            </Grid>
        </div>
        )
    }        
}

const mapStateToProps = (state) => {
    return { 
      showUser: state.showUser,
      allUsers: state.allUsers
    }
  }
  
const mapDispatchToProps = {
   
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowFollowContainer);
