export const selectPost = (postObj) => {
    return {
        type: 'SELECT_POST',
        activePost: postObj
    }
}

export const resetShowPost = () => {
    return {
        type: 'RESET_SHOW_POST',
    }
}

export const addShowPostComment = (comment) => {
    return {
        type: 'ADD_SHOW_POST_COMMENT',
        comment: comment
    }
}

export const deleteShowPostComment = (id) => {
    return {
        type: 'DELETE_SHOW_POST_COMMENT',
        id: id
    }
}