export const BASE_PATH = '/';
export const ARTICLES_SLUG = 'articles/:slug';
export const NEW_ARTICLE = 'new-article';
export const PROFILE = 'profile';
export const ARTICLES_SLUG_EDIT = 'articles/:slug/edit';
export const SIGN_UP = '/sign-up';
export const SIGN_IN = '/sign-in';
export const NO_PAGE = '*';

export const buildArticleEdit = (slug) => `/articles/${slug}/edit`;
export const buildArticle = (slug) => `/articles/${slug}`;
