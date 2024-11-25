import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { Alert } from 'antd';

import { errorClear } from '../../features/articlesSlice';
import { deleteArticle, favoriteArticle, unfavoriteArticle } from '../../features/articlesSlice';
import Person from '../Person';

import './DescriptionArticle.scss';

const DescriptionArticle = ({
  isInsideArticle = false,
  title,
  slug,
  arrayOfTags = [],
  description,
  favorited,
  author,
  dataOfUpdate,
  favoritesCount,
}) => {
  const user = useSelector((state) => state.user);
  const articles = useSelector((state) => state.articles);
  const dispatch = useDispatch();

  const history = useHistory();
  const match = useRouteMatch();
  const { id } = match.params;

  const [isVisibleNotification, setIsVisibleNotification] = useState(false);

  const tagsList = Array.isArray(arrayOfTags) ? arrayOfTags : [];
  const hasTitle = title.trim().length > 0;

  const handleClick = (event) => {
    event.preventDefault();

    if (event.target.className === 'description-article__button' && user.user.token) {
      const slugForParams = id ? id : slug;
      dispatch(favoriteArticle({ apiToken: user.user.token, slug: slugForParams }));
    }

    if (event.target.className === 'description-article__button-favorite' && user.user.token) {
      const slugForParams = id ? id : slug;
      dispatch(unfavoriteArticle({ apiToken: user.user.token, slug: slugForParams }));
    }
  };

  return (
    <React.Fragment>
      <section
        className={isInsideArticle ? 'description-article description-article--height-auto' : 'description-article'}
      >
        <div className="description-article__description">
          <div
            className={
              tagsList.length === 0
                ? 'description-article__title-and-like-block description-article__title-and-like-block--without-margin'
                : 'description-article__title-and-like-block'
            }
          >
            {hasTitle && (
              <h2
                className={
                  isInsideArticle
                    ? 'description-article__title description-article__title--without-ellipsis'
                    : 'description-article__title'
                }
              >
                {title}
              </h2>
            )}
            <div
              className={
                isInsideArticle
                  ? 'description-article__like-block description-article__like-block--margin'
                  : 'description-article__like-block'
              }
            >
              <button
                type="button"
                className={favorited ? 'description-article__button-favorite' : 'description-article__button'}
                onClick={(event) => handleClick(event)}
              ></button>
              <p className="description-article__like-count">{favoritesCount}</p>
            </div>
          </div>
          {tagsList.length > 0 && (
            <div
              className={
                isInsideArticle
                  ? 'description-article__tag-list description-article__tag-list--without-ellipsis'
                  : 'description-article__tag-list'
              }
            >
              {tagsList.map((tag) => {
                return (
                  <div
                    key={nanoid()}
                    className={
                      isInsideArticle
                        ? 'description-article__tag-container description-article__tag-container--height-auto'
                        : 'description-article__tag-container'
                    }
                  >
                    <p
                      className={
                        isInsideArticle
                          ? 'description-article__tag description-article__tag--without-ellipsis'
                          : 'description-article__tag'
                      }
                    >
                      {tag}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
          <p className={isInsideArticle ? 'description-article__text-inside-article' : 'description-article__text'}>
            {description}
          </p>
        </div>
        <div className="description-article__author-info-and-buttons">
          <Person author={author} dataOfUpdate={dataOfUpdate} />
          {user.user.username === author.username && isInsideArticle && (
            <div className="description-article__button-edit-and-delete">
              <button
                type="button"
                className="transparent-button description-article__delete-button"
                onClick={() => setIsVisibleNotification(true)}
              >
                Delete
              </button>
              <button
                type="button"
                className="transparent-button description-article__edit-button"
                onClick={() => history.push(`/articles/${id}/edit`)}
              >
                Edit
              </button>
              {isVisibleNotification && (
                <div className="description-article__notification-delete-of-article">
                  <p className="description-article__notification-delete-of-article-text">
                    Are you sure to delete this article?
                  </p>
                  <div className="description-article__notification-delete-of-article-buttons">
                    <button
                      type="button"
                      className="description-article__button-no"
                      onClick={() => setIsVisibleNotification(false)}
                    >
                      No
                    </button>
                    <button
                      type="button"
                      className="description-article__button-yes"
                      onClick={() => {
                        dispatch(deleteArticle({ apiToken: user.user.token, slug: id }));
                        history.replace('/');
                      }}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      {articles.status === 'rejected' && (
        <div className="error-message">
          <Alert
            message="Error"
            onClose={(e) => {
              e.preventDefault();
              dispatch(errorClear());
            }}
            description={articles.error}
            type="error"
            showIcon
            closable
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default DescriptionArticle;
