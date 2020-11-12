import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu, Input, Segment, Grid, Dropdown, Header} from 'semantic-ui-react'
import FollowTile from "./FollowTile.js"

class ShowFollowContainer extends React.Component {
    
    state = { 
        activeItem: this.props.location.state.activeItem,
        searchQuery: '', 
        sortBy: 'Sort',
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
    handleSortClick = (e, { name }) => this.setState({ sortBy: name })
    
    handleSearchChange = e => this.setState({ searchQuery: e.target.value })

    renderFollows = (followArray) => {
        return followArray.map(followObj => {
            return <Segment style={{backgroundColor: '#EBAE34'}}><FollowTile follow={followObj}/></Segment>
        })
    }

    tabDisplay = (followArray) => {
        if (this.state.sortBy === 'Sort'){
        return this.renderFollows(followArray)
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
        const theShowUser = this.props.allUsers.find(userObj => userObj.id === this.props.showUser.id)
        const showFollowerArray = theShowUser.followers.map(followerObj => followerObj.id)
        const filteredFollowerArray = this.props.allUsers.filter(userObj => showFollowerArray.includes(userObj.id))
        const searchedFollowers = filteredFollowerArray.filter(followObj => {
            const fullName = followObj.first_name + " " + followObj.last_name
            return (followObj.first_name.includes(this.state.searchQuery))||(followObj.last_name.includes(this.state.searchQuery))||(fullName.includes(this.state.searchQuery)) 
        })
        const showFollowingArray = theShowUser.following.map(followerObj => followerObj.id)
        const filteredFollowingArray = this.props.allUsers.filter(userObj => showFollowingArray.includes(userObj.id))
        const searchedFollowing = filteredFollowingArray.filter(followObj => {
            const fullName = followObj.first_name + " " + followObj.last_name
            return (followObj.first_name.includes(this.state.searchQuery))||(followObj.last_name.includes(this.state.searchQuery))||(fullName.includes(this.state.searchQuery)) 
        })
        return (
            <div>
            <div></div>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='top'>
            <Grid.Column style={{ maxWidth: 700, margin: 50 }} >
            <Link to={`/home/showuser/${this.props.showUser.id}`}><Segment><Header style={{fontSize:'50px', color: 'black'}}>{this.props.showUser.first_name} {this.props.showUser.last_name}</Header></Segment></Link>
            <Menu  style={{ color:'white', backgroundColor: '#36454F', marginTop: '5%'}}>
                <Menu.Item
                name='Followers'
                active={activeItem === 'Followers'}
                onClick={this.handleItemClick}
                style={this.state.activeItem === 'Followers' ? {color: '#FED700'} : {color:'white'}}
                />
                <Menu.Item
                name='Following'
                active={activeItem === 'Following'}
                onClick={this.handleItemClick}
                style={this.state.activeItem === 'Following' ? {color: '#FED700'} : {color:'white'}}
                />
                <Dropdown item text={this.state.sortBy} style={{color: 'white'}}>
                <Dropdown.Menu>
                    <Dropdown.Item name='Most Pieces' onClick={this.handleSortClick}>Most Pieces</Dropdown.Item>
                    <Dropdown.Item name='Fewest Pieces' onClick={this.handleSortClick}>Fewest Pieces</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
                <Menu.Menu position='right'>
                    <Input
                    style={{marginRight: '15px', color:'white'}}
                    transparent
                    icon={{ name: 'search', link: true }}
                    placeholder='Search by Name'
                    value={this.state.searchQuery}
                    onChange={this.handleSearchChange}
                    />
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
