import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const apiBase = 'https://blog-platform.kata.academy/api';

export const unfavoriteArticle = createAsyncThunk(
  'articles/unfavoriteArticle',
  async ({ apiToken, slug }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${apiBase}/articles/${slug}/favorite`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      });

      if (!res.ok) {
        throw new Error('Something went wrong');
      }

      const body = await res.json();

      return body;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const favoriteArticle = createAsyncThunk(
  'articles/favoriteArticle',
  async ({ apiToken, slug }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${apiBase}/articles/${slug}/favorite`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      });

      if (!res.ok) {
        throw new Error('Something went wrong');
      }

      const body = await res.json();

      return body;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateArticle = createAsyncThunk(
  'articles/updateArticle',
  async ({ apiToken, slug, dataForUpdatingAnArticle }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${apiBase}/articles/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiToken}`,
        },
        body: JSON.stringify({
          article: dataForUpdatingAnArticle,
        }),
      });

      if (!res.ok) {
        throw new Error('Something went wrong');
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const creacteArticle = createAsyncThunk(
  'articles/createArticle',
  async ({ apiToken, dataForCreatingAnArticle }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${apiBase}/articles/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiToken}`,
        },
        body: JSON.stringify({
          article: dataForCreatingAnArticle,
        }),
      });

      if (!res.ok) {
        throw new Error('Something went wrong');
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteArticle = createAsyncThunk(
  'articles/deleteArticle',
  async ({ apiToken, slug }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${apiBase}/articles/${slug}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      });

      if (!res.ok) {
        throw new Error('Something went wrong');
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getArticle = createAsyncThunk('articles/getArticle', async ({ slug, apiToken }, { rejectWithValue }) => {
  try {
    const res = await fetch(`${apiBase}/articles/${slug}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });

    if (!res.ok) {
      throw new Error('Something went wrong');
    }

    const body = await res.json();

    return body;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const getArticles = createAsyncThunk('articles/getArticles', async ({ skip, apiToken }, { rejectWithValue }) => {
  try {
    const res = await fetch(`${apiBase}/articles?offset=${skip}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });

    if (!res.ok) {
      throw new Error('Something went wrong');
    }

    const body = await res.json();

    return body;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const initialState = {
  list: [],
  isReRenderListOfDescription: false,
  status: null,
  error: null,
  articlesCount: 0,
};

const articles = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    changeStateReRender: (state, action) => {
      state.isReRenderListOfDescription = action.payload;
    },
    errorClear: (state) => {
      state.error = null;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(favoriteArticle.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.list = state.list.map((article) => {
          const item = article.slug === action.payload.article.slug;
          return item ? action.payload.article : article;
        });
      })
      .addCase(favoriteArticle.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })

      .addCase(unfavoriteArticle.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.list = state.list.map((article) => {
          const item = article.slug === action.payload.article.slug;
          return item ? action.payload.article : article;
        });
      })
      .addCase(unfavoriteArticle.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })

      .addCase(updateArticle.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(updateArticle.fulfilled, (state) => {
        state.status = 'resolved';
        state.isReRenderListOfDescription = true;
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })

      .addCase(creacteArticle.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(creacteArticle.fulfilled, (state) => {
        state.status = 'resolved';
        state.isReRenderListOfDescription = true;
      })
      .addCase(creacteArticle.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })

      .addCase(deleteArticle.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteArticle.fulfilled, (state) => {
        state.status = 'resolved';
        state.error = null;
        state.isReRenderListOfDescription = true;
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })

      .addCase(getArticles.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.list = action.payload.articles;
        state.articlesCount = action.payload.articlesCount;
      })
      .addCase(getArticles.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })

      .addCase(getArticle.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(getArticle.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.list = [action.payload.article];
        // state.articlesCount = null;
      })
      .addCase(getArticle.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
  },
});

export const { changeStateReRender, errorClear } = articles.actions;

export default articles.reducer;
