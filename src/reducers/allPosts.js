const initialState = []

const allPosts = (state=initialState, action) => {
    switch(action.type){
        case "FETCH_POSTS_SUCCESS":
            return [...action.allPosts]
        case "POST_LOGOUT":
            return []
        case "ADD_POST":
            return [...state, action.post]
        case "DELETE_POST":
            const updatedPosts = state.filter(postObj => {
                if (postObj.id !== action.id){
                    return postObj
                }
            })
            return updatedPosts
        default:
            return state
    }
}
export default allPosts