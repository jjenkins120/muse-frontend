const initialState = {}

const showPost = (state=initialState, action) => {
    switch(action.type){
        case "SELECT_POST":
            return action.activePost
        case "RESET_SHOW_POST":
            return {}
        default:
            return state
    }
}
export default showPost