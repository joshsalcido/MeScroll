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

export const thunkGetAllComments = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`)

    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetAllComments(data.comments));
        return data.posts;
    }
}

export const thunkCreateComment = (postId, comment) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}/newcomment`, {
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
// export const thunkDeletePost = (postId) => async (dispatch) => {
//     const response = await fetch(`/api/posts/${postId}`, {
//         method: "DELETE",
//     })

//     if (response.ok) {
//         const deletedPost = await response.json();
//         // console.log(data, "THUNK CREATE DATA")
//         dispatch(actionDeletePost(postId))
//         return deletedPost;
//     }
// }

// export const thunkUpdatePost = (post) => async (dispatch) => {
//     const response = await fetch(`/api/posts/${post.id}`, {
//         method: 'PUT',
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify(post),
//     })

//     if (response.ok) {
//         const data = await response.json();
//         dispatch(actionUpdatePost(data))
//         return data;
//     }
// }
