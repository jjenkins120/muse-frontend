export const deleteUserPost = (id) => {
    return {
        type: 'DELETE_USER_POST', 
        id: id
    }
}

export const fetchAllUserPostsSuccess = (userposts) => {
    return {
        type: 'FETCH_ALL_USER_POSTS_SUCCESS',
        userposts: userposts
    }
}