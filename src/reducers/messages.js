const initialState = []

const messages = (state=initialState, action) => {
    switch(action.type){
        case "FETCH_MESSAGES_SUCCESS":
            return action.messages
        default:
            return state
    }
}
export default messages