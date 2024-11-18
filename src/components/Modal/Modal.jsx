// import React from 'react'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDeletArticleMutation } from '../../servises/articlesApi';
import classes from './Modal.module.scss';

export default function Modal({ slug, handleChangeShowModal }) {
    const navigate = useNavigate();
    const [deletArticle] = useDeletArticleMutation();
    const handleDeletAticle = async () => {
        await deletArticle(slug)
            .then(() => {
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className={classes.modal}>
            <div className={classes.modal__textBox}>
                <div className={classes.modal__icon} />
                <div className={classes.modal__text}>Are you sure to delete this article?</div>
            </div>
            <div className={classes.modal__btns}>
                <button
                    type="button"
                    className={classes.modal__btnNodelete}
                    onClick={() => handleChangeShowModal(false)}
                >
                    No
                </button>
                <button type="button" className={classes.modal__btnDelete} onClick={handleDeletAticle}>
                    Yes
                </button>
            </div>
        </div>
    );
}

Modal.propTypes = {
    handleChangeShowModal: PropTypes.func,
    slug: PropTypes.string,
};
