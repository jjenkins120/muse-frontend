const initialState = []

const allPosts = (state=initialState, action) => {
    switch(action.type){
        case "FETCH_POSTS_SUCCESS":
            return [...action.allPosts]
        case "POST_LOGOUT":
            return []

        // THIS IS PRESUMABLY INCORRECT BC OF ACTION MULITPLE ARGUMENTS    
        case "ADD_INSPIRED_USER_TO_POST":
            //map over the posts based on id and add the user to its inspired_users
            const inspiredUserAdded = state.map(postObj => {
                if(postObj.id === action.payload.id){
                    postObj.inspired_users = [...postObj.inspired_users, action.payload.user]
                } else {
                    return postObj
                } 
            })
            return inspiredUserAdded
        case "ADD_POST":
            return [...state, action.post]
        case "DELETE_POST":
            const updatedPosts = state.filter(postObj => {
                if (postObj.id !== action.id){
                    return postObj
                }
            })
            return updatedPosts
        // case "ADD_LIKE":
        //     const notesWithAddedLikes = state.map(noteObj => {
        //         if (noteObj.id === action.id){
        //             return {...noteObj, likes: noteObj.likes + 1}
        //         } else {
        //             return noteObj
        //         }
        //     })
        //     return notesWithAddedLikes
        default:
            return state
    }
}
export default allPosts