import PropTypes from 'prop-types';
import { useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { shemaNewArticle } from '../../components/Form/formSchema';
import { useAddNewArticleMutation, useEditArticleMutation } from '../../servises/articlesApi';
import { toggleError } from '../../redusers/ArticlesListReduser';
import classes from './NewArticle.module.scss';

export default function NewArticle({ article = {} }) {
    const { slug } = article;
    const navigate = useNavigate();
    const error = useSelector((state) => state.articles.error);
    const dispatch = useDispatch();
    const [addNewArticle] = useAddNewArticleMutation();
    const [editArticle] = useEditArticleMutation();
    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(shemaNewArticle),
        defaultValues: {
            title: article?.title || '',
            shortDescription: article?.description || '',
            text: article?.body || '',
            tags: [...(article?.tagList?.map((tag) => ({ number: tag })) || []), { number: '' }] || [{ number: '' }],
        },
    });
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = form;

    const onSubmit = async (data) => {
        const response = {
            article: {
                title: data.title,
                description: data.shortDescription,
                body: data.text,
                tagList: data.tags.reduce((acc, item) => {
                    if (item.number.trim().length) {
                        acc.push(item.number);
                    }
                    return acc;
                }, []),
            },
        };

        if (!article.title) {
            await addNewArticle(response)
                .unwrap()
                .then(() => {
                    reset();
                    navigate('/');
                })
                .catch((err) => {
                    dispatch(toggleError(true));
                    console.log('это err - ', err);
                });
        } else {
            await editArticle({ response, slug })
                .unwrap()
                .then(() => {
                    reset();
                    navigate('/');
                })
                .catch((err) => {
                    console.log('это err - ', err);
                    dispatch(toggleError(true));
                });
        }
    };

    const { fields, append, remove } = useFieldArray({
        name: 'tags',
        control,
    });

    return (
        <section className={classes.newArticle}>
            {error && (
                <section className={classes.errors}>
                    <Alert
                        message="Error!"
                        type="error"
                        description="Что-то пошло не так, перегрузите страницу..."
                        showIcon
                    />
                </section>
            )}
            <span className={classes.newArticle__title}>{article.title ? 'Edit title' : 'Create new article'}</span>
            <form className={classes.newArticle__form} onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="title" className={classes.newArticle__label}>
                    Title
                    <input
                        {...register('title')}
                        type="text"
                        id="title"
                        className={`${classes.newArticle__input} ${errors?.title ? classes.newArticle__input_error : classes.newArticle__input_margin}`}
                        placeholder="Title"
                    />
                    <div>
                        {errors?.title && <p className={classes.errors__text}>{errors?.title?.message || 'Error'}</p>}
                    </div>
                </label>
                <label htmlFor="description" className={classes.newArticle__label}>
                    Short description
                    <input
                        {...register('shortDescription')}
                        type="text"
                        id="description"
                        className={`${classes.newArticle__input} ${errors?.title ? classes.newArticle__input_error : classes.newArticle__input_margin}`}
                        placeholder="Title"
                    />
                    <div>
                        {errors?.shortDescription && (
                            <p className={classes.errors__text}>{errors?.shortDescription?.message || 'Error'}</p>
                        )}
                    </div>
                </label>
                <label htmlFor="textarea" className={classes.newArticle__labelTitle}>
                    Text
                    <textarea
                        {...register('text')}
                        id="textarea"
                        className={`${classes.newArticle__textarea} ${errors?.text ? classes.newArticle__textarea_error : classes.newArticle__textarea_margin}`}
                        placeholder="Text"
                    />
                    <div>
                        {errors?.text && <p className={classes.errors__text}>{errors?.text?.message || 'Error'}</p>}
                    </div>
                </label>
                <div className={classes.tags}>
                    <div className={classes.tags__box}>
                        <label htmlFor={`tags.${[0]}.number`} className={classes.tags__label}>
                            Tags
                            {fields.map((field, index) => {
                                return (
                                    <div className={classes.tags__item} key={field.id}>
                                        <input
                                            type="text"
                                            id={`tags.${index}.number`}
                                            {...register(`tags.${index}.number`)}
                                            className={classes.tags__input}
                                        />
                                        <button
                                            type="button"
                                            className={classes.tags__btnDel}
                                            onClick={() => {
                                                if (field.id === fields.slice(-1)[0].id) return;
                                                remove(index);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                );
                            })}
                        </label>
                    </div>
                    <div className={classes.tags__btnBox}>
                        <button type="button" onClick={() => append()} className={classes.tags__btnAdd}>
                            Add tag
                        </button>
                    </div>
                </div>
                <button type="submit" className={classes.newArticle__submit}>
                    Send
                </button>
            </form>
        </section>
    );
}

NewArticle.propTypes = {
    article: PropTypes.shape({
        title: PropTypes.string,
    }),
};
