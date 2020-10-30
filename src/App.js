import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Home from './components/Home.js';
import Login from './components/Login.js';
import NewUser from './components/NewUser.js'
import Error from './components/Error.js';
// import ShowPost from './components/ShowPost.js';
// import NewPost from './components/NewPost.js';
// import ShowUser from './components/ShowUser.js';
// import EditUser from './components/EditUser.js';
// import ShowFollowers from './components/ShowFollowers.js'
// import ShowFollowing from './components/ShowFollowing.js'
// import About from './components/About.js';

class App extends React.Component {

  render(){
    return (
      <div>
      <Switch>
        <Route exact path={'/'} component={Login} />
        <Route path={'/home'} component={Home} />
        <Route path={'/newuser'} component={NewUser} />
        {/* <Route path={'/showpost'} component={ShowPost} />
        <Route path={'/newpost'} component={NewPost} />
        <Route path={'/showuser'} component={ShowUser} />
        <Route path={'/edituser'} component={EditUser} />
        <Route path={'/showfollowing'} component={ShowFollowing} />
        <Route path={'/showfollowers'} component={ShowFollowers} />
        <Route path={'/about'} component={About} /> */}
        <Route path={'*'} component={Error} />
      </Switch> 
    </div>
    );
  }
}

export default App;
