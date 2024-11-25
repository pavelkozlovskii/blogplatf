import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';
import Markdown from 'react-markdown';
import { Spin, Alert } from 'antd';

import { getArticle, errorClear } from '../../features/articlesSlice';
import DescriptionArticle from '../DescriptionArticle';

import './Article.scss';

const Article = () => {
  const user = useSelector((state) => state.user);
  const articles = useSelector((state) => state.articles);
  const dispatch = useDispatch();

  const history = useHistory();
  const matches = useRouteMatch();
  const { id } = matches.params;

  const article = articles.list.filter((article) => article.slug === id);

  useEffect(() => {
    if (!article[0] && articles.status !== 'rejected') {
      dispatch(getArticle({ slug: id, apiToken: user.user.token }));
    }
  }, [article]);

  if (articles.status === 'rejected') {
    return (
      <div className="error-message">
        <Alert
          message="Error"
          onClose={(e) => {
            e.preventDefault();
            dispatch(errorClear());
            history.replace('/');
          }}
          description={articles.error}
          type="error"
          showIcon
          closable
        />
      </div>
    );
  }

  if (article[0] === undefined) {
    return (
      <div className="wrapper">
        <div className="spin">
          <Spin />
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <article className="article">
        <DescriptionArticle
          isInsideArticle
          title={article[0].title}
          arrayOfTags={article[0].tagList}
          slug={article[0].slug}
          description={article[0].description}
          author={article[0].author}
          favorited={article[0].favorited}
          dataOfUpdate={article[0].updatedAt}
          favoritesCount={article[0].favoritesCount}
        />
        <div className="article__body">
          <div className="article__body-texts">
            <Markdown>{article[0].body}</Markdown>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Article;
