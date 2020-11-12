export const fetchPostsSuccess = (allPosts) => {
    return {
        type: 'FETCH_POSTS_SUCCESS', 
        allPosts: allPosts
    }
}

export const postLogout = () => {
    return {
        type: 'POST_LOGOUT',
    }
}


export const addPost = (post) => {
    return {
        type: 'ADD_POST',
        post: post
    }
}


export const deletePost = (id) => {
    return {
        type: 'DELETE_POST',
        id: id
    }
}


