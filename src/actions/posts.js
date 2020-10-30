export const fetchPostsSuccess = (posts) => {
    return {
        type: 'FETCH_POSTS_SUCCESS', 
        posts: posts
    }
}

export const postLogout = () => {
    return {
        type: 'POST_LOGOUT',
    }
}

// export const deleteNote = (id) => {
//     return {
//         type: 'DELETE_NOTE',
//         id: id
//     }
// }

// export const addNote = (note) => {
//     return {
//         type: 'ADD_NOTE',
//         note: note
//     }
// }

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