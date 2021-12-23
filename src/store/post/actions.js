import postService from "../../services/post";
import { mappingData, mappingPostDetailData } from "../../helpers";
import { actFetchCommentsAsync } from "../comments/action";
// Action Types
export const LATEST_POSTS = "LATEST_POSTS";
export const POPULAR_POSTS = "POPULAR_POSTS";
export const ACT_GET_POSTS = "ACT_GET_POSTS";
export const ACT_FETCH_POST_DETAIL = "ACT_FETCH_POST_DETAIL";
export const ACT_FETCH_RELATED_POSTS = "ACT_FETCH_RELATED_POSTS";
export const ACT_INCREASE_COMMENT_COUNT = "ACT_INCREASE_COMMENT_COUNT";

// Action
export const actIncreaseCommentCount = () => {
  return {
    type: ACT_INCREASE_COMMENT_COUNT,
  };
};

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

export const getPosts = ({ posts, currentPage, totalPages, total }) => {
  return {
    type: ACT_GET_POSTS,
    payload: {
      posts,
      currentPage,
      totalPages,
      total,
    },
  };
};

export const actFetchPostsDetail = (post) => {
  return { type: ACT_FETCH_POST_DETAIL, payload: { post } };
};

export const actFetchRelatedPosts = (posts) => {
  return {
    type: ACT_FETCH_RELATED_POSTS,
    payload: {
      posts,
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

export function getPostsAsync({
  currentPage = 1,
  perPage = 2,
  ...restParams
} = {}) {
  return async (dispatch) => {
    try {
      const response = await postService.getArticles({
        perPage,
        currentPage,
        ...restParams,
      });

      const totalPages = +response.headers["x-wp-totalpages"];
      const total = +response.headers["x-wp-total"];

      const posts = response.data.map(mappingData);

      dispatch(getPosts({ posts, currentPage, totalPages, total }));

      return {
        ok: true,
      };
    } catch (err) {
      console.log(err.message);
      return {
        ok: false,
        error: err.message,
      };
    }
  };
}

export const actFetchPostsDetailAsync = (slug) => {
  return async (dispatch) => {
    try {
      const response = await postService.getDetail(slug);
      const post = response.data[0];

      if (!post) {
        throw new Error("Post Not Found");
      }

      const postId = post.id;
      const authorId = post.author;

      dispatch(actFetchPostsDetail(mappingPostDetailData(post)));
      dispatch(actFetchCommentsAsync({ postId }));
      dispatch(actFetRelatedPostsAsync({ authorId, postId }));

      return {
        ok: true,
      };
    } catch (err) {
      console.log(err.message);
      return {
        ok: false,
      };
    }
  };
};

export const actFetRelatedPostsAsync = ({ authorId, postId }) => {
  return async (dispatch) => {
    try {
      const response = await postService.getList({
        author: authorId,
        exclude: postId,
        per_page: 3,
      });

      const posts = response.data;
      dispatch(actFetchRelatedPosts(posts.map(mappingPostDetailData)));
    } catch (err) {
      console.log(err.message);
    }
  };
};
