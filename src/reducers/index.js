import { combineReducers } from 'redux'
import user from './user'
import follows from './follows'
import allPosts from './allPosts'
import showPost from './showPost'
import allUsers from './allUsers'
import showUser from './showUser'
import userPosts from './userPosts'
import comments from './comments'

export default combineReducers({
  user,
  allPosts,
  follows,
  showPost, 
  allUsers,
  showUser, 
  userPosts, 
  comments
})