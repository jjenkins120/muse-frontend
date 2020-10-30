import { combineReducers } from 'redux'
import user from './user'
import follows from './follows'
import tags from './tags'
import posts from './posts'

export default combineReducers({
  user,
  posts,
  follows,
  tags,
})