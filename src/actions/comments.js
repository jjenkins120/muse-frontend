
export const fetchCommentsSuccess = (comments) => {
    return {
        type: 'FETCH_COMMENTS_SUCCESS',
        comments: comments
    }
}

export const deleteUserPost = (id) => {
    return {
        type: 'DELETE_COMMENT', 
        id: id
    }
}