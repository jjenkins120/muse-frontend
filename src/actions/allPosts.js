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

//THIS IS PRESUMABLY INCORRECT BC OF FORMATTING FOR MULTIPLE ARGUMENTS

export const addInspiredUserToPost = (user, id) => {
    return {
        type: 'ADD_INSPIRED_USER_TO_POST',
        payload: {
            user: user,
            id: id
        }
    }
}

// export const updateNote = (note) => {
//     return {
//         type: 'UPDATE_NOTE',
//         note: note
//     }
// }


// export const addLike = (id) => {
//     return {
//         type: 'ADD_LIKE',
//         id: id
//     }
// }

// export const changeFavorite = (id) => {
//     return {
//         type: 'CHANGE_FAVORITE',
//         id: id
//     }
// }