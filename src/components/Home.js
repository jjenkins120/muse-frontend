import React from 'react'
import { connect } from 'react-redux'
import { currentUser } from '../actions/user'
import { Route, Switch } from 'react-router-dom'
import NavBar from "./NavBar.js"
import PostContainer from "./PostContainer.js"
import ShowPost from './ShowPost.js';
import NewPost from './NewPost.js';
import ShowUser from './ShowUser.js';
import EditUser from './EditUser.js';
import ShowFollowers from './ShowFollowers.js'
import ShowFollowing from './ShowFollowing.js'
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
    }

    render(){
      return (
        <div>
            <NavBar/>
            <Switch>
              <Route exact path={'/home'} component={PostContainer}/>
              <Route exact path={'/home/showpost/:id'} component={ShowPost} />
              <Route exact path={'/home/newpost'} component={NewPost} />
              <Route exact path={'/home/showuser/:id'} component={ShowUser} />
              <Route exact path={'/home/edituser/:id'} component={EditUser} />
              <Route exact path={'/home/showfollowing/:id'} component={ShowFollowing} />
              <Route exact path={'/home/showfollowers/:id'} component={ShowFollowers} />
              <Route exact path={'/home/about'} component={About} />
            </Switch>
        </div>
      );
    }
  }
  
  

  const mapDispatchToProps = {
    currentUser
  }

  export default connect(null, mapDispatchToProps)(Home);