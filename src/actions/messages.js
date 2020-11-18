export const fetchMessagesSuccess = (messages) => {
    return {
        type: 'FETCH_MESSAGES_SUCCESS',
        messages: messages
    }
}