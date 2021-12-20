import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getLastestPostsAsync,
  getPopularPostsAsync,
  getPostsAsync,
} from "../store/post/actions";

import ArticleGeneral from "../components/ArticleGeneral";
import ArticleLatest from "../components/ArticleLatest";
import ArticlePopular from "../components/ArticlePopular";

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLastestPostsAsync());
    dispatch(getPopularPostsAsync());
    dispatch(getPostsAsync());
  }, [dispatch]);

  return (
    <>
      <ArticleLatest />
      <ArticlePopular />
      <ArticleGeneral />
    </>
  );
}

export default HomePage;
