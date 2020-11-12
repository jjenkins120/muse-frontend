const initialState = []

const follows = (state=initialState, action) => {
    switch(action.type){
        case "FETCH_FOLLOWS_SUCCESS":
            return action.follows
        default:
            return state
    }
}
export default follows