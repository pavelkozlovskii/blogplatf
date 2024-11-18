import React from 'react';
import PropTypes from 'prop-types';
import classes from './Form.module.scss';

export default function Email({ form, name }) {
    const {
        register,
        formState: { errors },
    } = form;

    return (
        <label htmlFor="email" className={classes.form__label}>
            Email adress
            <input
                {...register(name)}
                type="email"
                id={name}
                className={`${classes.form__label__input} ${errors?.[name] ? classes.form__label_top : classes.form__label_margin}`}
                placeholder="Email adress"
            />
            <div>{errors?.[name] && <p className={classes.errors__text}>{errors?.[name]?.message || 'Error'}</p>}</div>
        </label>
    );
}

Email.propTypes = {
    form: PropTypes.shape({
        register: PropTypes.func,
        formState: PropTypes.shape({
            errors: PropTypes.shape({
                email: PropTypes.shape({
                    type: PropTypes.string,
                    message: PropTypes.string,
                }),
            }),
        }),
    }),
    name: PropTypes.string,
};
