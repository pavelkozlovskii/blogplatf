// import React from 'react';
import classes from './PageNotFound.module.scss';

export default function PageNotFound() {
    return (
        <div className={classes.not__found}>
            <span className={classes.not__found__error}>...Ошибка 404</span>
            <span className={classes.not__found__text}>Ой, запрашиваемая страница не найдена</span>
        </div>
    );
}
