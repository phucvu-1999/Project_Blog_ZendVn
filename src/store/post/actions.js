import postService from "../../services/post";
import { mappingData } from "../../helpers";
// Action Types
export const LATEST_POSTS = "LATEST_POSTS";
export const POPULAR_POSTS = "POPULAR_POSTS";
export const GENERAL_POSTS = "GENERAL_POSTS";

// Action
export const getLastestPostsSync = (posts) => {
  return {
    type: LATEST_POSTS,
    payload: posts,
  };
};

export const getPopularPostsSync = (posts) => {
  return {
    type: POPULAR_POSTS,
    payload: posts,
  };
};

export const getGeneralPostsSync = ({
  posts,
  currentPage,
  totalPages,
  total,
}) => {
  return {
    type: GENERAL_POSTS,
    payload: {
      posts,
      currentPage,
      totalPages,
      total,
    },
  };
};

// Action Async
export function getLastestPostsAsync() {
  return async (dispatch) => {
    try {
      const posts = await postService.getArticlesLatest();
      dispatch(getLastestPostsSync(posts.data.map(mappingData)));
    } catch (err) {
      console.log(err.message);
    }
  };
}

export function getPopularPostsAsync() {
  return async (dispatch) => {
    try {
      const posts = await postService.getArticlesPopular();

      dispatch(getPopularPostsSync(posts.data.map(mappingData)));
    } catch (err) {
      console.log(err.message);
    }
  };
}

export function getGeneralPostsAsync({ currentPage = 1, perPage = 2 } = {}) {
  return async (dispatch) => {
    try {
      const response = await postService.getArticlesGenenral({
        perPage,
        currentPage,
      });

      const totalPages = +response.headers["x-wp-totalpages"];
      const total = +response.headers["x-wp-total"];

      const posts = response.data.map(mappingData);

      dispatch(getGeneralPostsSync({ posts, currentPage, totalPages, total }));
    } catch (err) {
      console.log(err.message);
    }
  };
}
