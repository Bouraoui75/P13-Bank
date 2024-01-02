import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const profileURL = 'http://localhost:3001/api/v1/user/profile';

/**
 * Method who call the API to load a user
 * This is an asynchronous action created using createAsyncThunk.
 * It performs an HTTP POST request to the API to load a user profile using the authentication token.
 * If the request succeeds, the user profile first and last names are extracted from the response and returned as the action result.
 * If the request fails, the error message from the response is returned using rejectWithValue.
 * The operator _ is used as a placeholder for the action payload parameter, which is not used in this case.
 */
export const loadUser = createAsyncThunk(
  'profile/loadUser',
  async (_, { rejectWithValue }) => {
    try {

      const token = localStorage.getItem('token');
      
      if(!token) return rejectWithValue('No token found');
      
      if (token) {
        const response = await axios.post(
          profileURL,
          {},
          // request header with token to get user profile data from DB trough API
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Get the data from the response to get the user profile
        const firstName = response.data.body.firstName;
        const lastName = response.data.body.lastName;

        return { firstName, lastName };
      }
    } catch (error) {
      const errorMsg = error.response.data.message;
      return rejectWithValue(errorMsg);
    }
  }
);

/**
 * Method who call the API to edit a user
 * This is an asynchronous action created using createAsyncThunk.
 * It performs an HTTP PUT request to the API to edit a user profile using the authentication token.
 * The new first and last names are extracted from the profile object passed as parameter.
 * If the request succeeds, the new first and last name values are extracted from the response and returned as the action result.
 * If the request fails, the error message from the response is returned using rejectWithValue.
 */
export const editName = createAsyncThunk(
  'profile/editName',
  async (profile, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');

      if(!token) return rejectWithValue('No token found');

      if (token) {
        const response = await axios.put(
          profileURL,
          {
            // request body with token to get user profile data from DB trough API
            firstName: profile.firstName,
            lastName: profile.lastName,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const firstName = response.data.body.firstName;
        const lastName = response.data.body.lastName;

        return {
          firstName,
          lastName
        };
      }
    } catch (error) {
      const errorMsg = error.response.data.message;
      return rejectWithValue(errorMsg);
    }
  }
);

/**
 * This is the initial state of the profile slice.
 * It includes the following properties: email, firstName, lastName, id, profileStatus, and profileUpdated.
 * profileStatus is initialized to the value of what return localStorage by getting the token item, indicating if the user profile has been loaded or not.
 * The other properties are initially set to empty or null values.
 */
const initialState = {
  email: '',
  firstName: '',
  lastName: '',
  id: '',
  profileStatus: !!localStorage.getItem('token'),
  profileUpdated: null,
};

/**
 * Create the slice for the profile
 * This is the profile slice created using createSlice.
 * It defines the slice name, initial state, and reducers (in this case, there are no reducers defined).
 */
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  
  /**
   * This is a section of profileSlice that handles asynchronous actions and their results.
   * When the loadUser action is running, profileStatus is set to 'pending'.
   * When the loadUser action is successfully completed, the new first and last name values are updated in the state and profileStatus is set to 'success'.
   * If the loadUser action is rejected, profileStatus is set to 'rejected'.
   */
  extraReducers: (builder) => {
    // When the loadUser Method result is PENDING
    builder.addCase(loadUser.pending, (state, action) => {
      return { ...state, profileStatus: 'pending' };
    });

    // When the loadUser Method result is FULLFILLED
    builder.addCase(loadUser.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          profileStatus: 'success',
        };
      } else return state;
    });

    // When the loadUser Method result is REJECTED
    builder.addCase(loadUser.rejected, (state, action) => {
      return {
        ...state,
        profileStatus: 'rejected',
      };
    });

    builder.addCase(editName.pending, (state, action) => {
      return { ...state, profileUpdated: 'pending' };
    });

    // When the editName Method result is FULLFILLED
    builder.addCase(editName.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          profileUpdated: 'success',
        };
      } else return state;
    });

    // When the editName Method result is REJECTED
    builder.addCase(editName.rejected, (state, action) => {
      return {
        ...state,
        profileUpdated: 'rejected',
      };
    });
  },
});

export default profileSlice.reducer;
