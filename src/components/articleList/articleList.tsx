import React from "react";

import Article from "../Article/article";
import { articleInterface } from "../../interfaces/article";
import classes from "./articleList.module.scss";
import { articleAPI } from "../../services/articleService";
import { Pagination } from "antd";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { setOffset } from "../../store/redcers/articleReducer";
import nextId from "react-id-generator";

const ArticleList: React.FC = () => {
  const { offset } = useTypedSelector((state) => state.articleReducer);
  const dispatch = useDispatch();
  const {
    data: articles,
    isLoading,
    error,
  } = articleAPI.useFetchAllArticlesQuery(
    {
      offset,
    },
    { pollingInterval: 1500 }
  );
  function handlePagination(current: number) {
    dispatch(setOffset(current * 5 - 5));
  }
  return (
    <div className={classes["article-wrapper"]}>
      {isLoading ? <h1>идет загрузка</h1> : null}
      {error && <h1>Произошла ошибка при загрузке</h1>}
      {articles &&
        articles?.articles.map((el: articleInterface) => (
          <Article key={nextId()} {...el} />
        ))}
      <Pagination
        className={classes.pagination}
        defaultCurrent={1}
        total={articles?.articlesCount}
        showSizeChanger={false}
        onChange={(current) => handlePagination(current)}
      />
    </div>
  );
};
export default ArticleList;
