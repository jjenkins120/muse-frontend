export const selectUser = (user) => {
    return {
        type: 'SELECT_USER',
        showUser: user
    }
}

export const deleteShowUserPost = (id) => {
    return {
        type: 'DELETE_SHOW_USER_POST',
        id: id
    }
}



