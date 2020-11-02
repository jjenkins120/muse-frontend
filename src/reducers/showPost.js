const initialState = {}

const showPost = (state=initialState, action) => {
    switch(action.type){
        case "SELECT_POST":
            return action.activePost
        default:
            return state
    }
}
export default showPost