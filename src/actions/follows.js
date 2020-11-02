export const fetchFollowsSuccess = (follows) => {
    return {
        type: 'FETCH_FOLLOWS_SUCCESS',
        follows: follows
    }
}