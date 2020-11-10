const initialState = []

const comments = (state=initialState, action) => {
    switch(action.type){
        case "FETCH_COMMENTS_SUCCESS":  
        return action.comments
        default:
            return state
        case "DELETE_COMMENT":
            const updatedComments = state.filter(commentObj => {
                if (commentObj.id !== action.id){
                    return commentObj
                }
            })
            return updatedComments
    }
}
export default comments