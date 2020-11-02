export const fetchAllUsersSuccess = (users) => {
    return {
        type: 'FETCH_ALL_USERS_SUCCESS',
        users: users
    }
}



// THESE ARE PRESUMABLY FORMATTED INCORRECTLY

export const deletePostInCertainUser = (user_id, post_id) => {
    return {
        type: 'DELETE_POST_IN_CERTAIN_USER',
        user_id: user_id,
        post_id: post_id 
    }
}



export const addFollowerToOtherUser = (user, id) => {
    return {
        type: 'ADD_FOLLOWER_TO_OTHER_USER',
        payload: {
            user: user, 
            id: id
        }
    }
}