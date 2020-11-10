const initialState = {}

const showPost = (state=initialState, action) => {
    switch(action.type){
        case "SELECT_POST":
            return action.activePost
        case "RESET_SHOW_POST":
            return {}
        case "ADD_SHOW_POST_COMMENT":
            state.comments = [...state.comments, action.comment]
            return state
        case "DELETE_SHOW_POST_COMMENT":
            const newCommentsArray = state.comments.filter(commentObj => {
                if (commentObj.id !== action.id){
                    return commentObj
                }
            })
            state.comments= newCommentsArray
            return state
        default:
            return state
    }
}
export default showPost