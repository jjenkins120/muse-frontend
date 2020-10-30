const initialState = []

const posts = (state=initialState, action) => {
    switch(action.type){
        case "FETCH_POSTS_SUCCESS":
            return [...action.posts]
        case "POST_LOGOUT":
            return []
        // case "DELETE_NOTE":
        //     const updatedNotes = state.filter(noteObj => {
        //         if (noteObj.id !== action.id){
        //             return noteObj
        //         }
        //     })
        //     return updatedNotes
        // case "ADD_NOTE":
        //     return [...state,action.note]
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
export default posts