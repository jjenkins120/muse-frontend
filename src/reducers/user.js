const initialState = {}

const user = (state=initialState, action) => {
    switch(action.type){
        case "FETCH_USER_SUCCESS":
            return action.user
        case 'CURRENT_USER':
            return action.user
        case "USER_LOGOUT":
            return {}
        case "ADD_FOLLOWING_TO_USER":
            state.following = [...state.following, action.user]
            return state
        case "DELETE_FOLLOWING_FROM_USER":
            const filteredFollowers = state.following.filter(followObj => {
                return followObj.id !== action.id
                })
            state.following = filteredFollowers
            return state
        case "ADD_INSPIRATION_TO_USER":
            state.inspirations = [...state.inspirations, action.post]
            return state
        case "DELETE_INSPIRATION_FROM_USER":
            const updatedInspirations = state.inspirations.filter(inspObj => {
                return inspObj.id !== action.id 
            })
            state.inspirations = updatedInspirations
            return state
        case "NEW_USER":
            return action.user
        case "UPDATE_USER":
            return action.user
        case "DELETE_USERS_POST":
            const filteredPosts = state.posts.filter(postObj => postObj.id !== action.id)
            state.posts = filteredPosts
            return state
        case "ADD_POST_TO_USER":
            state.posts = [...state.posts, action.post]
            return state
        default:
            return state
    }
}
export default user