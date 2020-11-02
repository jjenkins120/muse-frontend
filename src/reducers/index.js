import { combineReducers } from 'redux'
import user from './user'
import follows from './follows'
import tags from './tags'
import allPosts from './allPosts'
import showPost from './showPost'
import allUsers from './allUsers'
import showUser from './showUser'
import userPosts from './userPosts'

export default combineReducers({
  user,
  allPosts,
  follows,
  tags,
  showPost, 
  allUsers,
  showUser, 
  userPosts
})