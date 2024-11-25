import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';
import { Redirect, useHistory, useRouteMatch } from 'react-router-dom';
import { Spin, Alert } from 'antd';

import { errorClear } from '../../features/articlesSlice';
import { creacteArticle, updateArticle, getArticle } from '../../features/articlesSlice';

import './FormOfArticle.scss';

const FormOfArticle = () => {
  const user = useSelector((state) => state.user);
  const articles = useSelector((state) => state.articles);
  const dispatch = useDispatch();

  const history = useHistory();
  const match = useRouteMatch();
  const { id } = match.params;


  let article = articles.list.filter((article) => article.slug === id)[0];
  const isArticle = !!article;
  article = article ? article : {};

  const defaultValues = id ? article.tagList : [{ text: '' }];

  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      tagList: defaultValues,
    },
  });
  const { fields, replace, append, remove } = useFieldArray({
    name: 'tagList',
    control,
  });

  useEffect(() => {
    if (isArticle) {
      let paramForReplace = article.tagList.map((tag) => ({ text: tag }));
      paramForReplace = paramForReplace.length > 0 ? paramForReplace : { text: '' };
      replace(paramForReplace);
    }
  }, [isArticle]);

  useEffect(() => {
    if (!isArticle && id) {
      dispatch(getArticle({ slug: id, apiToken: user.user.token }));
    }
  }, []);

  const onSubmit = (data) => {
    const arrayOfObjectTags = data.tagList.filter((tag) => !!tag.text);
    const arrayOfTags = arrayOfObjectTags.map((tag) => tag.text);
    const dataForCreatingOrUpdatingAnArticle = {
      body: data.body,
      description: data.description,
      tagList: arrayOfTags,
      title: data.title,
    };

    if (id) {
      const params = {
        slug: id,
        apiToken: user.user.token,
        dataForUpdatingAnArticle: dataForCreatingOrUpdatingAnArticle,
      };
      dispatch(updateArticle(params));
    } else {
      const params = {
        apiToken: user.user.token,
        dataForCreatingAnArticle: dataForCreatingOrUpdatingAnArticle,
      };
      dispatch(creacteArticle(params));
    }

    history.push('/');
  };

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

  if (!isArticle && id) {
    return (
      <div className="wrapper">
        <div className="spin">
          <Spin />
        </div>
      </div>
    );
  }


  if (!user.user.token) {
    return <Redirect to="/sign-in" />;
  }

  return (
    <div className="wrapper" onSubmit={handleSubmit(onSubmit)}>
      <form className="form-of-article">
        <h2 className="form-of-article__title">Create new article</h2>
        <p className="form-of-article__subtitle">Title</p>
        <input
          type="text"
          className="input form-of-article__input"
          defaultValue={id && article.title}
          {...register('title', { required: true,
            pattern: {
              value: /\S/,
            },
          })}
          placeholder="Title"

        />
        <p className="form-of-article__subtitle">Short description</p>
        <input
          type="text"
          className="input form-of-article__input"
          defaultValue={id && article.description}
          {...register('description', { required: true,
            pattern: {
              value: /\S/,
            },
          })}

          placeholder="Description"
        />
        <p className="form-of-article__subtitle">Text</p>
        <textarea
          className="input form-of-article__textarea"
          defaultValue={id && article.body}
          placeholder="Text"
          {...register('body', { required: true,
            pattern: {
              value: /\S/,
            },
          })}
        />
        <p className="form-of-article__subtitle form-of-article__subtitle--more-margin-bottom">Tags</p>
        {fields.map((field, index) => {
          return (
            <div className="form-of-article__tag-input-and-buttons" key={field.id}>
              <input type="text" {...register(`tagList.${index}.text`)} className="input form-of-article__tag-input" />
              {fields.length !== 1 && (
                <button type="button" onClick={() => remove(index)} className="transparent-button">
                  Delete
                </button>
              )}
              {fields.length - 1 === index && (
                <button type="button" onClick={() => append()} className="form-of-article__button transparent-button">
                  Add tag
                </button>
              )}
            </div>
          );
        })}

        <button className="form-of-article__button-send">Send</button>
      </form>
    </div>
  );
};

export default FormOfArticle;
