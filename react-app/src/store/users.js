
const UPDATE_PROFILE = 'user/updateProfile';
const GET_USER = 'user/getUser'

// ACTIONS
export const updateProfileAction = (user) => {
    return {
        type: UPDATE_PROFILE,
        user
    }
}

export const getUserInfoAction = (user) => {
    return {
        type: GET_USER,
        user
    }
}

// THUNKS

export const updateProfileThunk = (formData, userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        body: formData
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(updateProfileAction(data))
        return data;
    }
}

export const getUserInfoThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}`)

    if (response.ok) {
        const data = await response.json();
        dispatch(getUserInfoAction(data));
        return data;
    }
}


// REDUCER

const userReducer = (state = {}, action) => {
    let newState = {...state}
    switch (action.type) {
        case GET_USER:
            // newState = {};
            // console.log(action, "action GET USER")
            newState['user'] = action.user
            return newState;
        case UPDATE_PROFILE:
            // console.log(newState, "UPDATe Profile NEW STATE")
            // console.log(action, "action UPDATE USER")
            // newState[action.post.id] = action.post
            newState['user'] = action.user
            return newState
        default:
            return state;
    }
}

export default userReducer
