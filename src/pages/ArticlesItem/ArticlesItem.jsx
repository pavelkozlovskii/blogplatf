import PropTypes from 'prop-types';
import { format } from 'date-fns';
import classes from './ArticlesItem.module.scss';
import { changeUserName } from '../../helpers/changeUserName';
import ArticleTitleBox from '../../components/ArticleTitleBox';
import imgProfile from '../../assets/imgProfile.png';

export default function ArticlesItem({ elem }) {
    const { createdAt, author } = elem;
    const { username, image } = author;
    const date = createdAt ? format(createdAt, 'MMMM dd, yyyy') : 'Дата неуказана';

    return (
        <section className={`${classes.article__header} ${classes.article__header_margin}`}>
            <ArticleTitleBox elem={elem} isArticle={false} />
            <div className={classes.user}>
                <div className={classes.user__content}>
                    <span className={classes.user__content__name}>{changeUserName(username)}</span>
                    <span className={classes.user__content__created}>{date}</span>
                </div>
                <img
                    src={image}
                    alt="автор"
                    onError={(e) => {
                        e.target.src = imgProfile;
                    }}
                    className={classes.user__img}
                />
            </div>
        </section>
    );
}

ArticlesItem.propTypes = {
    elem: PropTypes.shape({
        createdAt: PropTypes.string,
        author: PropTypes.shape({
            username: PropTypes.string,
            image: PropTypes.string,
        }),
    }),
};
