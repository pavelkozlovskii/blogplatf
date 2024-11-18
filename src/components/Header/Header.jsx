import { useNavigate, NavLink, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Header.module.scss';
import { useGetCurrentUserQuery } from '../../servises/authUserApi';
import imgProfile from '../../assets/imgProfile.png';
import { toggleInAccount } from '../../redusers/ArticlesListReduser';
import { NEW_ARTICLE, PROFILE, SIGN_IN, SIGN_UP } from '../../path';

export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const inAccount = useSelector((state) => state.articles.inAccount);
    const { data } = useGetCurrentUserQuery(undefined, {
        skip: !inAccount,
        refetchOnMountOrArgChange: true,
    });
    const storage = localStorage.getItem('token');
    useEffect(() => {
        if (storage) {
            dispatch(toggleInAccount(true));
        }
    }, [storage, dispatch]);

    return (
        <header className={classes.header}>
            <div className={classes.header__head}>
                <button type="button" className={classes.header__head__title} onClick={() => navigate('/')}>
                    Realworld Blog
                </button>
            </div>
            <div className={classes.header__links}>
                {inAccount ? (
                    <>
                        <Link
                            to={NEW_ARTICLE}
                            className={`${classes.header__links__link} ${classes.header__links_create}`}
                        >
                            Create article
                        </Link>
                        <Link
                            to={PROFILE}
                            className={`${classes.header__links__link} ${classes.header__links_profile}`}
                        >
                            {data?.username}
                        </Link>
                        <Link to={PROFILE} className={classes.header__image}>
                            <img
                                src={data?.image}
                                alt="profile"
                                onError={(e) => {
                                    e.target.src = imgProfile;
                                }}
                                className={classes.header__image__item}
                            />
                        </Link>
                        <button
                            type="button"
                            className={classes.header__logout}
                            onClick={() => {
                                localStorage.removeItem('token');
                                dispatch(toggleInAccount(false));
                                navigate('/');
                            }}
                        >
                            Log Out
                        </button>
                    </>
                ) : (
                    <>
                        <NavLink
                            to={SIGN_IN}
                            className={`${classes.header__links__link} ${classes.header__links_sign}`}
                        >
                            Sign In
                        </NavLink>
                        <NavLink
                            to={SIGN_UP}
                            className={`${classes.header__links__link} ${classes.header__links_sign}`}
                        >
                            Sign Up
                        </NavLink>
                    </>
                )}
            </div>
        </header>
    );
}
