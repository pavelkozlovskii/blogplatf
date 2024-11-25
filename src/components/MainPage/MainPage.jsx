import React from 'react';
import { Pagination, ConfigProvider, Alert } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';

import { getArticles, errorClear } from '../../features/articlesSlice';
import ListOfDescriptionArticle from '../ListOfDescriptionArticle';

import './MainPage.scss';

const MainPage = () => {
  const user = useSelector((state) => state.user);
  const articles = useSelector((state) => state.articles);
  const dispatch = useDispatch();

  const history = useHistory();
  const matches = useRouteMatch();
  const { pathParam } = matches.params;
  let numberPage = pathParam ? pathParam : 1;

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

  return (
    <div className="main-page">
      <ListOfDescriptionArticle />
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              itemBg: 'rgba(0, 0, 0, 0)',
              lineWidth: 0,
              colorPrimaryHover: 'white',
              colorPrimary: 'white',
              itemActiveBg: '#1890FF',
            },
          },
        }}
      >
        <Pagination
          align="center"
          pageSize={20}
          onChange={(number) => {
            dispatch(getArticles({ skip: number * 20 - 20, apiToken: user.user.token }));
            history.push(`/page/${number}`);
          }}
          current={numberPage}
          showSizeChanger={false}
          total={articles.articlesCount}
        />
      </ConfigProvider>
    </div>
  );
};

export default MainPage;
