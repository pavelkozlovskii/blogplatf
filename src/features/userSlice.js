import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';

const apiBase = 'https://blog-platform.kata.academy/api';

export const deleteUser = createAction('user/deleteUser', function deleteUserFromStorage() {
  localStorage.removeItem('user');
  return {};
});

export const editProfile = createAsyncThunk('user/editProfile', async (editingData, { rejectWithValue, getState }) => {
  try {
    const { user } = getState();

    const res = await fetch(`${apiBase}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.user.token}`,
      },
      body: JSON.stringify({
        user: editingData,
      }),
    });

    if (res.status === 422) {
      const bodyError = await res.json();

      throw new Error(createObjectErrorsOnJSON(bodyError));
    }

    if (!res.ok) {
      throw new Error(JSON.stringify({ editProfileError: 'Something went wrong' }));
    }

    const body = await res.json();

    localStorage.setItem('user', JSON.stringify(body.user));

    return body.user;
  } catch (error) {
    return rejectWithValue(JSON.parse(error.message));
  }
});

export const signUp = createAsyncThunk('user/signUp', async (registrationData, { rejectWithValue }) => {
  try {
    const res = await fetch(`${apiBase}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: registrationData,
      }),
    });

    if (res.status === 422) {
      const bodyError = await res.json();

      const errorsMessage = {};

      if (bodyError.errors.username) {
        errorsMessage.username = 'A user with this name already exists';
      }

      if (bodyError.errors.email) {
        errorsMessage.email = 'A user with this email already exists';
      }

      throw new Error(JSON.stringify(errorsMessage));
    }

    if (!res.ok) {
      throw new Error(JSON.stringify({ signUpError: 'Something went wrong' }));
    }

    const body = await res.json();

    localStorage.setItem('user', JSON.stringify(body.user));

    return body.user;
  } catch (error) {
    return rejectWithValue(JSON.parse(error.message));
  }
});

export const signIn = createAsyncThunk('user/signIn', async (loginData, { rejectWithValue }) => {
  try {
    const res = await fetch(`${apiBase}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: loginData,
      }),
    });

    if (res.status === 422) {
      throw new Error(JSON.stringify({ incorrectPasswordOrEmail: 'The email or password was entered incorrectly' }));
    }

    if (!res.ok) {
      throw new Error(JSON.stringify({ signInError: 'Something went wrong' }));
    }

    const body = await res.json();

    localStorage.setItem('user', JSON.stringify(body.user));

    return body.user;
  } catch (error) {
    return rejectWithValue(JSON.parse(error.message));
  }
});

const getInitialState = () => {
  const user = localStorage.getItem('user');

  if (user) {
    return {
      status: null,
      errors: {},
      user: JSON.parse(user),
    };
  }

  return {
    status: null,
    errors: {},
    user: {},
  };
};

const userSlice = createSlice({
  name: 'user',
  initialState: getInitialState(),
  reducers: {
    put: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.errors = {};
        state.status = 'loading';
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = 'rejected';
        state.errors = action.payload;
      })
      .addCase(signIn.pending, (state) => {
        state.errors = {};
        state.status = 'loading';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.errors = action.payload;
        action.status = 'rejected';
      })
      .addCase(deleteUser, (state) => {
        state.user = {};
      })
      .addCase(editProfile.pending, (state) => {
        state.status = 'loading';
        state.errors = {};
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.user = action.payload;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.status = 'rejected';
        state.errors = action.payload;
      });
  },
});

export const { put } = userSlice.actions;

export default userSlice.reducer;

const createObjectErrorsOnJSON = (errorObject) => {
  const errorsObject = {};

  if (errorObject.errors.username) {
    errorsObject.username = 'A user with this name already exists';
  }

  if (errorObject.errors.email) {
    errorsObject.email = 'A user with this email already exists';
  }

  return JSON.stringify(errorsObject);
};
