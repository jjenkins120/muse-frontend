const initialState = []

const allUsers = (state=initialState, action) => {
    switch(action.type){
        case "FETCH_ALL_USERS_SUCCESS":
            return action.users
        default:
            return state
    }
}
export default allUsers