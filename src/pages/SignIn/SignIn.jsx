import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleInAccount } from '../../redusers/ArticlesListReduser';
import { shemaSignIn } from '../../components/Form/formSchema';
import classes from './SignIn.module.scss';
import Email from '../../components/Form/Email';
import Password from '../../components/Form/Password';
import { useGetExistingUserMutation } from '../../servises/authUserApi';
import { SIGN_UP } from '../../path';

export default function SignIn() {
    const [getExistingUser] = useGetExistingUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(shemaSignIn),
    });
    const { handleSubmit, reset, setError } = form;

    const onSubmit = async (data) => {
        const request = { user: { email: data.email, password: data.password } };
        await getExistingUser(request)
            .unwrap()
            .then((payload) => {
                localStorage.setItem('token', payload.user.token);
                dispatch(toggleInAccount(true));
                reset();
                navigate('/');
            })
            .catch((err) => {
                if (err.status === 422) {
                    ['email', 'password'].forEach((field) => {
                        setError(field, {
                            type: 'server',
                            message: 'email or password is invalid',
                        });
                    });
                }
                if (err.status >= 500) {
                    console.log('Это ошибка 500 - ', err);
                }
            });
    };

    return (
        <section className={classes.container}>
            <div className={`${classes.container__box} ${classes.container_height}`}>
                <span className={`${classes.container__box__title} ${classes.container__box_margin}`}>Sign In</span>
                <form action="" className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Email form={form} name="email" />
                    <Password form={form} name="password" title="Password" />
                    <button type="submit" className={classes.form__button}>
                        Login
                    </button>
                </form>
                <span className={classes.container__box__footer}>
                    Don`t have an account?
                    <Link to={SIGN_UP} className={classes.container__box__footer__link}>
                        Sign Up
                    </Link>
                </span>
            </div>
        </section>
    );
}
