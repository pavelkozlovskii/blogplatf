import React from 'react';
import PropTypes from 'prop-types';
import classes from './Form.module.scss';

export default function LabelUser({ form, name }) {
    const {
        register,
        formState: { errors },
    } = form;

    return (
        <label htmlFor="username" className={classes.form__label}>
            Username
            <input
                {...register(name)}
                id="username"
                className={`${classes.form__label__input} ${errors?.[name] ? classes.form__label_top : classes.form__label_margin}`}
                placeholder="Username"
            />
            <div>{errors?.[name] && <p className={classes.errors__text}>{errors?.[name]?.message || 'Error'}</p>}</div>
        </label>
    );
}

LabelUser.propTypes = {
    form: PropTypes.shape({
        register: PropTypes.func,
        formState: PropTypes.shape({
            errors: PropTypes.shape({
                username: PropTypes.shape({
                    type: PropTypes.string,
                    message: PropTypes.string,
                }),
            }),
        }),
    }),
    name: PropTypes.string,
};
