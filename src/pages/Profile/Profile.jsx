import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Profile.module.scss';
import LabelUser from '../../components/Form/LabelUser';
import Email from '../../components/Form/Email';
import { shemaProfile } from '../../components/Form/formSchema';
import Password from '../../components/Form/Password';
import { useGetCurrentUserQuery, useUpdateUserMutation } from '../../servises/authUserApi';
import { toggleError, toggleSucces } from '../../redusers/ArticlesListReduser';

export default function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const succes = useSelector((state) => state.articles.succes);
    const error = useSelector((state) => state.articles.error);
    const { data } = useGetCurrentUserQuery();
    const [updateUser, { isSuccess }] = useUpdateUserMutation();
    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(shemaProfile),
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
        setError,
    } = form;

    const changeHeader = () => {
        setTimeout(() => {
            console.log(succes);
            console.log(isSuccess);
            dispatch(toggleSucces(false));
            navigate('/');
        }, 1000);
    };

    const onSubmit = async (param) => {
        const request = {
            username: param.username,
            email: param.email,
            password: param.newPassword,
            image: param.urlAvatar,
        };

        await updateUser({ user: request })
            .unwrap()
            .then(() => {
                dispatch(toggleSucces(true));
                console.log(isSuccess);
                changeHeader();
            })
            .catch((err) => {
                if (err.status === 422) {
                    Object.keys(err.data.errors).forEach((field) => {
                        setError(field, {
                            type: 'server',
                            message: `${field} is already taken!`,
                        });
                    });
                }
                if (err.status >= 500) {
                    dispatch(toggleError(true));
                }
            });
    };

    useEffect(() => {
        if (data?.username) form.setValue('username', data.username);
        if (data?.email) form.setValue('email', data.email);
        if (data?.password) form.setValue('urlAvatar', data.password);
    }, [data?.username, data?.email, data?.password, form]);

    return (
        <section className={classes.profile}>
            {succes && (
                <section className={classes.succes}>
                    <Alert message="Success!" type="success" description="Вы успешно изменили профиль!" showIcon />
                </section>
            )}
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
            <span className={classes.profile__title}>Edit Profile</span>
            <form className={classes.form}>
                <LabelUser form={form} name="username" />
                <Email form={form} name="email" />
                <Password form={form} name="newPassword" title="New Password" />
                <label htmlFor="password" className={classes.form__label}>
                    Avatar image(url)
                    <input
                        {...register('urlAvatar')}
                        type="text"
                        id="urlAvatar"
                        className={`${classes.form__label__input} ${errors?.urlAvatar ? classes.form__label_top : classes.form__label_margin}`}
                        placeholder="Avatar image"
                    />
                    <div>
                        {errors?.urlAvatar && (
                            <p className={classes.errors__text}>{errors?.urlAvatar?.message || 'Error'}</p>
                        )}
                    </div>
                </label>
                <button
                    type="submit"
                    className={`${classes.form__button} ${classes.form__button_margin}`}
                    onClick={handleSubmit(onSubmit)}
                >
                    Save
                </button>
            </form>
        </section>
    );
}
