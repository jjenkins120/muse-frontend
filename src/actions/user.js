export const fetchUserSuccess = (user) => {
    return {
        type: 'FETCH_USER_SUCCESS', 
        user: user
    }
}

export const currentUser  = (user) => {
    return {
      type: 'CURRENT_USER',
      user: user
    }
}

export const userLogout = () => {
    return {
        type: 'USER_LOGOUT'
    }
}


export const newUser = (user) => {
    return {
        type: 'NEW_USER',
        user: user
    }
}

export const updateUser = (user) => {
    return {
        type: 'UPDATE_USER',
        user: user
    }
}

export const addPostToUser = (post) => {
    return {
        type: 'ADD_POST_TO_USER',
        post: post
    }
}


export const deleteUsersPost = (id) => {
    return {
        type: 'DELETE_USERS_POST',
        id: id
    }
}

export const addInspirationToUser = (post) => {
    return {
        type: 'ADD_INSPIRATION_TO_USER',
        post: post
    }
}

export const deleteInspirationFromUser = (id) => {
    return {
        type: 'DELETE_INSPIRATION_FROM_USER',
        id: id
    }
}

export const addFollowingToUser = (user) => {
    return {
        type: 'ADD_FOLLOWING_TO_USER',
        user: user
    }
}

export const deleteFollowingFromUser = (id) => {
    return {
        type: 'DELETE_FOLLOWING_FROM_USER',
        id: id
    }
}