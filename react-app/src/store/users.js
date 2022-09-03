
const UPDATE_PROFILE = 'user/updateProfile';
const GET_USER = 'user/getUser'

// ACTIONS
export const updateProfileAction = (user) => {
    return {
        type: UPDATE_PROFILE,
        user
    }
}

export const getUserInfo = (user) => {
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
