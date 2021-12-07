import { api } from "./api";

const postService = {
  getList(params) {
    return api.call().get("/wp/v2/posts", {
      params: {
        ...params,
        lang: "vie",
      },
    });
  },
  getArticlesLatest() {
    return postService.getList({ page: 2, per_page: 3 });
  },
  getArticlesPopular() {
    return postService.getList({ page: 2, per_page: 3, orderby: "post_views" });
  },
  getArticlesGenenral({ currentPage = 1, perPage = 2 } = {}) {
    return postService.getList({ page: currentPage, per_page: perPage });
  },
};

export default postService;
