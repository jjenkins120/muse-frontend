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
        case "ADD_INSPIRATION_TO_USER":
            state.inspirations = [...state.inspirations, action.post]
            return state
        case "NEW_USER":
            return action.user
        case "UPDATE_USER":
            return action.user
        default:
            return state
    }
}
export default user