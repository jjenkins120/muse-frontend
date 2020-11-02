export const selectPost = (postObj) => {
    return {
        type: 'SELECT_POST',
        activePost: postObj
    }
}