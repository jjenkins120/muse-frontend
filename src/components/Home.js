import React from 'react'
import { connect } from 'react-redux'
import { currentUser } from '../actions/user'
import { fetchPostsSuccess } from '../actions/allPosts'
import { fetchAllUsersSuccess } from '../actions/allUsers'
import { fetchAllUserPostsSuccess } from '../actions/userPosts'
import { fetchFollowsSuccess } from '../actions/follows'
import { fetchCommentsSuccess } from '../actions/comments'
import { Route, Switch } from 'react-router-dom'
import NavBar from "./NavBar.js"
import PostContainer from "./PostContainer.js"
import ShowPost from './ShowPost.js';
import NewPost from './NewPost.js';
import NewInspiredPost from './NewInspiredPost.js';
import ShowUser from './ShowUser.js';
import EditUser from './EditUser.js';
import ShowFollowContainer from './ShowFollowContainer.js'
import About from './About.js';

class Home extends React.Component {
    
  
    componentDidMount(){
      const token = localStorage.getItem('app_token')
      if (!token){
        this.props.history.push('/')
      } else {
  
        const reqObj = {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          },
        }
  
        fetch('http://localhost:3000/users/sessions/current_session', reqObj)
        .then(resp => resp.json())
        .then(data => {
            this.props.currentUser(data.user)
        })
      }
      fetch('http://localhost:3000/posts')
      .then(resp => resp.json())
      .then(allPosts => {
          this.props.fetchPostsSuccess(allPosts)
      })
      fetch('http://localhost:3000/users')
      .then(resp => resp.json())
      .then(users => {
        this.props.fetchAllUsersSuccess(users)
      })
      fetch('http://localhost:3000/user_posts')
      .then(resp => resp.json())
      .then(userPosts => {
        this.props.fetchAllUserPostsSuccess(userPosts)
      })
      fetch('http://localhost:3000/follows')
      .then(resp => resp.json())
      .then(follows => {
        this.props.fetchFollowsSuccess(follows)
      })
      fetch('http://localhost:3000/comments')
      .then(resp => resp.json())
      .then(comments => {
        this.props.fetchCommentsSuccess(comments)
      })
    }

    render(){
      return (
        <div>
            <NavBar/>
            <Switch>
              <Route exact path={'/home'} component={PostContainer}/>
              <Route exact path={'/home/showpost/:id'} component={ShowPost} />
              <Route exact path={'/home/newpost'} component={NewPost} />
              <Route exact path={'/home/newinspiredpost'} component={NewInspiredPost} />
              <Route exact path={'/home/showuser/:id'} component={ShowUser} />
              <Route exact path={'/home/edituser/:id'} component={EditUser} />
              <Route exact path={'/home/showfollow/:id'} component={ShowFollowContainer} />
              <Route exact path={'/home/about'} component={About} />
            </Switch>
        </div>
      );
    }
  }

  const mapDispatchToProps = {
    currentUser,
    fetchAllUsersSuccess,
    fetchPostsSuccess, 
    fetchAllUserPostsSuccess,
    fetchFollowsSuccess,
    fetchCommentsSuccess,
  }

  export default connect(null, mapDispatchToProps)(Home);