import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { articlesApi } from '../servises/articlesApi';

import ArticlesListReduser from '../redusers/ArticlesListReduser';
// import { authUserApi } from '../servises/authUserApi';

const store = configureStore({
    reducer: {
        [articlesApi.reducerPath]: articlesApi.reducer,
        articles: ArticlesListReduser,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([articlesApi.middleware]),
});

setupListeners(store.dispatch);

export default store;
