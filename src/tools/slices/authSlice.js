import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const loginURL = 'http://localhost:3001/api/v1/user/login';

// This is the initial state of the auth slice.
// It includes the authentication token, the login status, the login error, and an indication if the user has been loaded from local storage.
const initialState = {
    token: localStorage.getItem('token'),
    loginStatus: '',
    loginError: '',
    userLoaded: !!localStorage.getItem('token'),
};

/**
 * Method who call the API to login a user
 * This is an asynchronous action created using createAsyncThunk.
 * It performs an HTTP POST request to the API to login a user using the provided information (email and password).
 * If the request succeeds, the authentication token is extracted from the response, stored in local storage, and returned as the action result.
 * If the request fails, the error message from the response is returned using rejectWithValue.
 */
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (user, { rejectWithValue }) => {
        try {
            const response = await axios.post(loginURL, {
                email: user.email,
                password: user.password,
            });

            const token = response.data.body.token;

            if (!token) return rejectWithValue('No token found');

            localStorage.setItem('token', token);

            return token;

        } catch (error) {

            const errorMsg = error.response.data.message;

            return rejectWithValue(errorMsg);
        }
    }
);

/**
 * This is the auth slice created using createSlice.
 * It defines the slice name, the initial state, and the reducers.
 * The logoutUser reducer handles the user logout by removing the authentication token from local storage and resetting the other state values.
 */
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser(state, action) {
            localStorage.removeItem('token');
            return {
                ...state,
                token: '',
                loginStatus: '',
                loginError: '',
            };
        },
    },

    /**
     * This is a section of authSlice that handles the asynchronous actions and their results.
     * When the loginUser action is running, the login status is set to 'pending'.
     * When the loginUser action is successfully completed, the authentication token is updated in the state and the login status is set to 'success'. Also, the userLoaded flag is set to true.
     * If the loginUser action is rejected, the login status is set to 'rejected' and the login error is updated with the returned error message.
     */
    extraReducers: (builder) => {
        // When the loginUser Method result is PENDING (from redux toolkit documentation)
        builder.addCase(loginUser.pending, (state, action) => {
            return {
                ...state,
                loginStatus: 'pending'
            };
        });
        // When loginUser function result is FULLFILLED (from redux toolkit documentation)
        builder.addCase(loginUser.fulfilled, (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    token: action.payload,
                    loginStatus: 'success',
                    userLoaded: true,
                };
            } else return state;
        });
        // When loginUser function result is REJECTED (from redux toolkit documentation)
        builder.addCase(loginUser.rejected, (state, action) => {
            return {
                ...state,
                loginStatus: 'rejected',
                loginError: action.payload,
            };
        });
    },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
