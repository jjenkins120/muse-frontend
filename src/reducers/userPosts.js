const initialState = []

const userPosts = (state=initialState, action) => {
    switch(action.type){
        case "DELETE_USER_POST":
            const updatedUserPosts = state.filter(userPostObj => {
                if (userPostObj.id !== action.id){
                    return userPostObj
                }
            })
            return updatedUserPosts

        case "FETCH_ALL_USER_POSTS_SUCCESS":  
            return action.userposts 
        default:
            return state
    }
}
export default userPosts