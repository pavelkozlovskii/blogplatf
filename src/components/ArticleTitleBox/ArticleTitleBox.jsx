import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classes from './ArticleTitleBox.module.scss';
import { useAddFavoriteMutation, useDeletFavoriteMutation } from '../../servises/articlesApi';
import { buildArticle } from '../../path';

export default function ArticleTitleBox({ elem, isArticle = true, allDescription = false }) {
    const inAccount = useSelector((state) => state.articles.inAccount);
    const [addFavorite] = useAddFavoriteMutation();
    const [deletFavorite] = useDeletFavoriteMutation();
    const { slug, title, favoritesCount, tagList, description, favorited } = elem;

    const toggleFavorite = () => {
        if (!inAccount) return;
        if (!favorited) {
            addFavorite(slug);
        } else {
            deletFavorite(slug);
        }
    };

    return (
        <div className={classes.cap}>
            <div className={classes.cap__box}>
                {isArticle ? (
                    <span className={classes.cap__box__title}>{title}</span>
                ) : (
                    <Link to={buildArticle(slug)} className={classes.cap__box__title}>
                        {title}
                    </Link>
                )}
                <button
                    type="button"
                    className={`${classes.cap__box__btn} ${!favorited ? classes.cap__box__unfavorites : classes.cap__box__favorites}`}
                    onClick={toggleFavorite}
                >
                    {favoritesCount}
                </button>
            </div>
            <div className={classes.cap__tags}>
                {tagList.length
                    ? tagList.map((item) => {
                          return (
                              <span key={uuidv4()} className={classes.cap__tags__tag}>
                                  {item}
                              </span>
                          );
                      })
                    : 'без тегов'}
            </div>
            <div className={classes.cap__description}>
                {allDescription ? description : description.split(' ').slice(0, 50).join(' ')}
            </div>
        </div>
    );
}

ArticleTitleBox.propTypes = {
    elem: PropTypes.shape({
        slug: PropTypes.string,
        title: PropTypes.string,
        favoritesCount: PropTypes.number,
        tagList: PropTypes.arrayOf(PropTypes.string),
        description: PropTypes.string,
        createdAt: PropTypes.string,
        favorited: PropTypes.bool,
    }),
    isArticle: PropTypes.bool,
    allDescription: PropTypes.bool,
};
