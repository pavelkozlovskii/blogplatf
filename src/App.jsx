import { Routes, Route } from 'react-router-dom';
import './App.css';
import { ConfigProvider } from 'antd';
import PageNotFound from './pages/PageNotFound';
import Layout from './components/Layout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ArticlesList from './components/ArticlesList';
import Article from './pages/Article';
import NewArticle from './pages/NewArticle';
import Profile from './pages/Profile';
import EditArticle from './pages/EditArticle';
import PrivateRoute from './hoc/PrivatePoute';
import { BASE_PATH, ARTICLES_SLUG, NEW_ARTICLE, PROFILE, ARTICLES_SLUG_EDIT, SIGN_UP, SIGN_IN, NO_PAGE } from './path';

function App() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    boxShadow: 'none',
                },
                components: {
                    Pagination: {
                        itemActiveBg: '#1890FF',
                        colorPrimary: 'white',
                        colorPrimaryHover: 'white',
                    },
                },
            }}
        >
            <Routes>
                <Route path={BASE_PATH} element={<Layout />}>
                    <Route index element={<ArticlesList />} />
                    <Route path={ARTICLES_SLUG} element={<Article />} />
                    <Route
                        path={PROFILE}
                        element={
                            <PrivateRoute>
                                <Profile />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path={NEW_ARTICLE}
                        element={
                            <PrivateRoute>
                                <NewArticle />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path={ARTICLES_SLUG_EDIT}
                        element={
                            <PrivateRoute>
                                <EditArticle />
                            </PrivateRoute>
                        }
                    />
                    <Route path={SIGN_UP} element={<SignUp />} />
                    <Route path={SIGN_IN} element={<SignIn />} />
                    <Route path={NO_PAGE} element={<PageNotFound />} />
                </Route>
            </Routes>
        </ConfigProvider>
    );
}

export default App;
