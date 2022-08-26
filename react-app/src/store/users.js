
const UPDATE_PROFILE = 'user/updateProfile';

// ACTIONS
export const updateProfileAction = (user) => {
    return {
        type: UPDATE_PROFILE,
        user
    }
}

// THUNKS

export const updateProfileThunk = (formData) => async (dispatch) => {
    const response = await fetch(`/api/users/{userId}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(updateProfileAction(data))
        return data;
    }
}
