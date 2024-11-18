import React from 'react';
import PropTypes from 'prop-types';
import classes from './Form.module.scss';

export default function Password({ form, name, title }) {
    const {
        register,
        formState: { errors },
    } = form;

    return (
        <label htmlFor="password" className={classes.form__label}>
            {title}
            <input
                {...register(name)}
                type="password"
                id={name}
                className={`${classes.form__label__input} ${errors?.[name] ? classes.form__label_top : classes.form__label_margin}`}
                placeholder={title}
            />
            <div>{errors?.[name] && <p className={classes.errors__text}>{errors?.[name]?.message || 'Error'}</p>}</div>
        </label>
    );
}

Password.propTypes = {
    form: PropTypes.shape({
        register: PropTypes.func.isRequired,
        formState: PropTypes.shape({
            errors: PropTypes.shape({
                password: PropTypes.shape({
                    type: PropTypes.string.isRequired,
                    message: PropTypes.string.isRequired,
                }),
            }),
        }),
    }),
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};
