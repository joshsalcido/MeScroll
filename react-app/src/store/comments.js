const GET_ALL_COMMENTS = 'comment/getAllComments'
const CREATE_COMMENT = 'comment/createComment'
const DELETE_COMMENT = 'comment/deleteComment'
const UPDATE_COMMENT = 'comment/updateComment'

// ACTIONS
export const actionGetAllComments = (comments) => {
    return {
        type: GET_ALL_COMMENTS,
        comments
    }
}
export const actionCreateComment = (comment) => {
    return {
        type: CREATE_COMMENT,
        comment
    }
}
export const actionDeleteComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        commentId
    }
}

export const actionUpdateComment = (comment) => {
    return {
        type: UPDATE_COMMENT,
        comment
    }
}

// THUNKS

export const thunkGetAllComments = () => async (dispatch) => {
    const response = await fetch(`/api/comments/`)

    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetAllComments(data.comments));
        return data.posts;
    }
}

export const thunkCreateComment = (postId, comment) => async (dispatch) => {
    const response = await fetch(`/api/comments/${postId}/new`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(comment),
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(actionCreateComment(data))
        return data;
    }
}

export const thunkDeleteComment = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
    })

    if (response.ok) {
        const deletedComment = await response.json();
        dispatch(actionDeleteComment(commentId))
        return deletedComment;
    }
}

export const thunkUpdateComment = (comment) => async (dispatch) => {
    const commentId = comment.id

    const response = await fetch(`/api/comments/${commentId}/edit`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(comment),
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(actionUpdateComment(data))
        return data;
    }
}

const commentReducer = (state = {}, action) => {
    let newState = {...state}
    switch (action.type) {
        case GET_ALL_COMMENTS:
            action.comments.forEach(comment => {
                newState[comment.id] = comment
            });
            return newState;
        case CREATE_COMMENT:
            newState[action.comment.id] = action.comment
            return newState;
        case DELETE_COMMENT:
            delete newState[action.commentId]
            return newState
        case UPDATE_COMMENT:
            newState[action.comment.id] = action.comment
            return newState
        default:
            return state;
    }
}


export default commentReducer
