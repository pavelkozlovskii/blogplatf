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
            tags: article?.tagList?.map((tag) => ({ number: tag })) || [{ number: '' }],
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
                tagList: data.tags.map((item) => item.number.trim()).filter(Boolean),
            },
        };

        try {
            if (!article.title) {
                await addNewArticle(response).unwrap();
            } else {
                await editArticle({ response, slug }).unwrap();
            }
            reset();
            navigate('/');
        } catch (err) {
            dispatch(toggleError(true));
            console.error('Error occurred: ', err);
        }
    };

    const { fields, append, remove } = useFieldArray({
        name: 'tags',
        control,
    });

    return (
        <section className={classes.newArticle}>
            {error && <Alert message={error} type="error" />}
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('title')} placeholder="Title" />
                {errors.title && <span>This field is required</span>}
                <input {...register('shortDescription')} placeholder="Short Description" />
                {errors.shortDescription && <span>This field is required</span>}
                <textarea {...register('text')} placeholder="Article Body" />
                {errors.text && <span>This field is required</span>}
                <div>
                    {fields.map((item, index) => (
                        <div key={item.id}>
                            <input {...register(`tags.${index}.number`)} placeholder="Tag" />
                            <button type="button" onClick={() => remove(index)}>
                                Remove
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={() => append({ number: '' })}>
                        Add Tag
                    </button>
                </div>
                <button type="submit">Send</button>
            </form>
        </section>
    );
}

NewArticle.propTypes = {
    article: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        body: PropTypes.string,
        tagList: PropTypes.arrayOf(PropTypes.string),
        slug: PropTypes.string,
    }),
};
