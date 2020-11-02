const initialState = {}

const showUser = (state=initialState, action) => {
    switch(action.type){
        case "SELECT_USER":
            return action.showUser
        case "'DELETE_SHOW_USER_POST'":
            const updatedPosts = state.posts.filter(postObj => {
                if (postObj.id !== action.id){
                    return postObj
                }
            })
            return {...state, [state.posts]: updatedPosts}
        default:
            return state
    }
}
export default showUser