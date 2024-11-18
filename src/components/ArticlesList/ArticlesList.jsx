import { useDispatch, useSelector } from 'react-redux';
import { Alert, Pagination } from 'antd';
import { PuffLoader } from 'react-spinners';
import classes from './ArticlesList.module.scss';
import { useGetArticlesQuery } from '../../servises/articlesApi';
import { toggleCurrentPage } from '../../redusers/ArticlesListReduser';
import ArticlesItem from '../../pages/ArticlesItem';

export default function ArticlesList() {
    const dispatch = useDispatch();
    const { currentPage } = useSelector((state) => state.articles);
    const { data, isLoading, isError } = useGetArticlesQuery({ currentPage });

    if (isLoading) {
        return (
            <div className={classes.loader}>
                <PuffLoader color="#52c4a1" size={150} />
            </div>
        );
    }

    if (isError) {
        return (
            <Alert message="Error!" description="Что-то пошло не так, перегрузите страницу..." type="error" showIcon />
        );
    }

    return (
        <>
            <main className={classes.posts__list}>
                {data?.articles.map((elem) => {
                    return <ArticlesItem elem={elem} key={elem.updatedAt} />;
                })}
            </main>
            <div className={classes.posts__list__pagination}>
                <Pagination
                    showSizeChanger={false}
                    defaultCurrent={currentPage}
                    total={data?.articlesCount}
                    pageSize={5}
                    hideOnSinglePage
                    responsive
                    onChange={(page) => dispatch(toggleCurrentPage(page))}
                />
            </div>
        </>
    );
}
