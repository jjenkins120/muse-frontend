const initialState = []

const allUsers = (state=initialState, action) => {
    switch(action.type){
        case "FETCH_ALL_USERS_SUCCESS":
            return action.users

        //THIS IS PRESUMABLY INCORRECT BC OF ACTION ARGUMENTS    
        case "ADD_FOLLOWER_TO_OTHER_USER":
            const followerAdded = state.map(userObj => {
                if(userObj.id === action.payload.id){
                    userObj.followers = [...userObj.followers, action.payload.user]
                } else {
                    return userObj
                } 
            })
            return followerAdded
            // map through the state, find the correct user based on id, and add action.user to their followers
        // case "UPDATE_USER":
        //     return action.user
        // case "NEW_USER":
        //     return action.user
        default:
            return state
    }
}
export default allUsers