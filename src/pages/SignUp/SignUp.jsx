import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import classes from './SignUp.module.scss';
import { toggleInAccount, toggleSucces, toggleError } from '../../redusers/ArticlesListReduser';
import LabelUser from '../../components/Form/LabelUser';
import Email from '../../components/Form/Email';
import Password from '../../components/Form/Password';
import Checkbox from '../../components/Form/Checkbox';
import { schemaSighUp } from '../../components/Form/formSchema';
import { useRegisterUserMutation } from '../../servises/authUserApi';
import { SIGN_IN } from '../../path';

export default function SignUp() {
    const { succes, error } = useSelector((state) => state.articles);
    const dispatch = useDispatch();
    const [registerUser] = useRegisterUserMutation();
    const navigate = useNavigate();
    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(schemaSighUp),
    });

    const changeHeader = () => {
        setTimeout(() => {
            dispatch(toggleInAccount(true));
            dispatch(toggleSucces(false));
            navigate('/');
        }, 2000);
    };

    const { handleSubmit, reset, setError } = form;

    const onSubmit = async (data) => {
        const request = {
            user: { username: data.username, email: data.email, password: data.password },
        };
        await registerUser(request)
            .unwrap()
            .then((payload) => {
                localStorage.setItem('token', payload.user.token);
                dispatch(toggleSucces(true));
                changeHeader();
                reset();
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

    return (
        <section className={classes.container}>
            <section className={classes.succes}>
                {succes && (
                    <Alert message="Success!" type="success" description="Вы успешно прошли регистрацию!" showIcon />
                )}
            </section>
            <section className={classes.errors}>
                {error && (
                    <Alert
                        message="Error!"
                        type="error"
                        description="Что-то пошло не так, перегрузите страницу..."
                        showIcon
                    />
                )}
            </section>
            <div className={`${classes.container__box} ${classes.container_high}`}>
                <span className={`${classes.container__box__title} ${classes.container__box_margin}`}>
                    Create new account
                </span>
                <form action="" className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <LabelUser form={form} name="username" />
                    <Email form={form} name="email" />
                    <Password form={form} name="password" title="Password" />
                    <Password form={form} name="repeatPassword" title="Repeat Password" />
                    <Checkbox form={form} name="toggle" />
                    <button type="submit" className={classes.form__button}>
                        Create
                    </button>
                </form>
                <span className={classes.container__box__footer}>
                    Already have an account?
                    <Link to={SIGN_IN} className={classes.container__box__footer__link}>
                        Sign In
                    </Link>
                </span>
            </div>
        </section>
    );
}
