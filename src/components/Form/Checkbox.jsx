import React from 'react';
import PropTypes from 'prop-types';
import classes from './Form.module.scss';

export default function Checkbox({ form, name }) {
    const {
        register,
        formState: { errors },
    } = form;

    return (
        <>
            <label htmlFor="checkbox" className={classes.form__checkbox}>
                <input
                    {...register(name)}
                    type="checkbox"
                    id={name}
                    name="toggle"
                    className={classes.form__checkbox__input}
                />
                <span className={classes.form__checkbox__text}>
                    I agree to the processing of my personal information
                </span>
            </label>
            <div>
                {errors?.[name] && (
                    <p className={`${classes.errors__text} ${classes.errors__text_margin}`}>
                        {errors?.[name]?.message || 'Error'}
                    </p>
                )}
            </div>
        </>
    );
}

Checkbox.propTypes = {
    form: PropTypes.shape({
        register: PropTypes.func,
        formState: PropTypes.shape({
            errors: PropTypes.shape({
                toggle: PropTypes.shape({
                    type: PropTypes.string,
                    message: PropTypes.string,
                }),
            }),
        }),
    }),
    name: PropTypes.string,
};
