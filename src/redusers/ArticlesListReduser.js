import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentPage: 1,
    inAccount: false,
    succes: false,
    error: false,
};

const ArticlesListReduser = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        toggleCurrentPage: (state, { payload }) => {
            state.currentPage = payload;
        },
        toggleInAccount: (state, { payload }) => {
            state.inAccount = payload;
        },
        toggleSucces: (state, { payload }) => {
            state.succes = payload;
        },
        toggleError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { toggleCurrentPage, toggleInAccount, toggleSucces, toggleError } = ArticlesListReduser.actions;
export default ArticlesListReduser.reducer;
