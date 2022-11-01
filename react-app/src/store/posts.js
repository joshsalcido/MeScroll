const GET_ALL_POSTS = 'post/getAllPosts';
const CREATE_POST = 'post/createPost';
const DELETE_POST = 'post/deletePost';
const UPDATE_POST = 'post/updatePost';
const CREATE_LIKE = 'post/createLike';

//  ACTIONS
export const actionGetAllPosts = (posts) => {
    return {
        type: GET_ALL_POSTS,
        posts
    }
}
export const actionCreatePost = (post) => {
    return {
        type: CREATE_POST,
        post
    }
}
export const actionDeletePost = (postId) => {
    return {
        type: DELETE_POST,
        postId
    }
}

export const actionUpdatePost = (post) => {
    return {
        type: UPDATE_POST,
        post
    }
}

export const actionCreateLike = (post) => {
    return {
        type: CREATE_LIKE,
        post
    }
}

// THUNKS

export const thunkGetAllPosts = () => async (dispatch) => {
    const response = await fetch('/api/posts/myfeed')

    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetAllPosts(data.posts));
        return data.posts;
    }
}

export const thunkCreatePost = (formData) => async (dispatch) => {
    const response = await fetch('/api/posts/newpost', {
        method: "POST",
        body: formData,
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(actionCreatePost(data))
        return data;
    }
}
export const thunkDeletePost = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
    })

    if (response.ok) {
        const deletedPost = await response.json();
        dispatch(actionDeletePost(postId))
        return deletedPost;
    }
}

export const thunkUpdatePost = (post) => async (dispatch) => {
    const response = await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(post),
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(actionUpdatePost(data))
        return data;
    }
}

export const thunkCreateLike = (post) => async (dispatch) => {
    const response = await fetch(`/api/posts/${post.id}/like`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(post),
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(actionCreateLike(data))
    }
}


const postReducer = (state = {}, action) => {
    let newState = {...state}
    switch (action.type) {
        case GET_ALL_POSTS:
            action.posts.forEach(post => {
                newState[post.id] = post
            });
            return newState;
        case CREATE_POST:
            newState[action.post.id] = action.post
            return newState
        case DELETE_POST:
            delete newState[action.postId]
            return newState
        case UPDATE_POST:
            newState[action.post.id] = action.post
            return newState
        case CREATE_LIKE:
            newState[action.post.id] = action.post
            return newState
        default:
            return state;
    }
}

export default postReducer
