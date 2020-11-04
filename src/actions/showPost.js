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