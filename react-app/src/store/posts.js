const GET_ALL_POSTS = 'post/getAllPosts';
const CREATE_POST = 'post/createPost';

//  ACTIONS
export const actionGetAllPosts = (posts) => {
    return {
        type: GET_ALL_POSTS,
        posts
    }
}

export const actionCreatePost = (post) => {
    return {
        CREATE_POST,
        post
    }
}

// THUNKS

export const thunkGetAllPosts = () => async (dispatch) => {
    const response = await fetch('api/posts/myfeed')

    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetAllPosts(data.posts));
        return data.posts;
    }
}

export const thunkCreatePost = (post) => async (dispatch) => {
    const respone = await fetch('api/posts/newpost', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(post),
    })

    if (respone.ok) {
        const data = await response.json();
        dispatch(actionCreatePost(data))
        return data;
    }
}


const initialState = {}

const postReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case GET_ALL_POSTS:
            newState = {};
            action.posts.forEach(post => {
                newState[post.id] = post
            });
            return newState;
        case CREATE_POST:
            newState[action.post.id] = action.post
            return newState
        default:
            return state;
    }
}

esport default postReducer
