const initialState = []

const follows = (state=initialState, action) => {
    switch(action.type){
        case "FETCH_FOLLOWS_SUCCESS":
            return action.follows
        // case "DELETE_NOTE":
        //     const updatedNotes = state.filter(noteObj => {
        //         if (noteObj.id !== action.id){
        //             return noteObj
        //         }
        //     })
        //     return updatedNotes
        // case "ADD_NOTE":
        //     return [...state,action.note]
        default:
            return state
    }
}
export default follows