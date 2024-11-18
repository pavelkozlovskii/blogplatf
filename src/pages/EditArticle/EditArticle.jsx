// import React from 'react'

import { useParams } from 'react-router-dom';
import { useGetArticleItemQuery } from '../../servises/articlesApi';
import NewArticle from '../NewArticle';

export default function EditArticle() {
    const { slug } = useParams();
    const { data } = useGetArticleItemQuery(slug);

    return <NewArticle article={data ? data.article : {}} />;
}
