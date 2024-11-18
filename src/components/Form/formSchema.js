import * as yup from 'yup';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const schemaSighUp = yup.object().shape({
    username: yup
        .string()
        .min(3, 'Длина имени должна быть больше 3 символов')
        .max(20, 'Длина имени должна быть менее 20 символов')
        .required('Поле обязательно к заполнению'),
    email: yup
        .string()
        .email('Email не валидный')
        .required('Поле обязательно к заполнению')
        .matches(emailRegex, 'Email address не валидный'),
    password: yup
        .string()
        .min(6, 'Длина пароли должна быть менее 6 символов')
        .max(40, 'Длина пароли должна быть менее 40 символов')
        .required('Поле обязательно к заполнению'),
    repeatPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Пароль должен совпадать')
        .required('Поле обязательно к заполнению'),
    toggle: yup.boolean().oneOf([true], 'Согласие на обработку обязателно!'),
});

export const shemaSignIn = yup.object().shape({
    email: yup
        .string()
        .email('Email не валидный')
        .required('Поле обязательно к заполнению')
        .matches(emailRegex, 'Email не валидный'),
    password: yup.string().required('Поле обязательно к заполнению'),
});

export const shemaNewArticle = yup.object().shape({
    title: yup.string().required('Поле обязательно к заполнению'),
    shortDescription: yup.string().required('Поле обязательно к заполнению'),
    text: yup.string().required('Поле обязательно к заполнению'),
});

export const shemaProfile = yup.object().shape({
    username: yup
        .string()
        .min(3, 'Длина имени должна быть больше 3 символов')
        .max(20, 'Длина имени должна быть менее 20 символов')
        .required('Поле обязательно к заполнению'),
    email: yup
        .string()
        .email('Email не валидный')
        .required('Поле обязательно к заполнению')
        .matches(emailRegex, 'Email не валидный'),
    newPassword: yup
        .string()
        .min(6, 'Длина пароли должна быть менее 6 символов')
        .max(40, 'Длина пароли должна быть менее 40 символов')
        .required('Поле обязательно к заполнению'),
    urlAvatar: yup
        .string()
        .url('URL не корректен')
        .matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'URL не корректен',
        )
        .required('Please enter website'),
});
