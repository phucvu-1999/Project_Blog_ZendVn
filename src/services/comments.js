import { api } from "./api";

const commentService = {
  getListComment({
    currentPage = 1,
    perPage = 2,
    postId,
    parentId,
    ...restParams
  } = {}) {
    return api.call().get("/wp/v2/comments", {
      params: {
        page: currentPage,
        per_page: perPage,
        post: postId,
        parent: parentId,
        lang: "vi",
        order: "asc",
        ...restParams,
      },
    });
  },

  createOne({ authorId, postId, content, parentId }) {
    return api.callWithToken().post("/wp/v2/comments", {
      author: authorId,
      post: postId,
      content,
      parent: parentId,
    });
  },
};

export default commentService;
