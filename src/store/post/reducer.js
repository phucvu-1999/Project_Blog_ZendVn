import { ACT_FETCH_POST_DETAIL, ACT_FETCH_RELATED_POSTS } from "./actions";

const initState = {
  articlesLatest: [],
  articlesPopular: [],
  articlePaging: {
    list: [],
    currentPage: 1,
  },
  postDetail: null,
  relatedPostsByAuthor: [],
};

function reducer(postState = initState, action) {
  if (action.type === "LATEST_POSTS") {
    return {
      ...postState,
      articlesLatest: action.payload,
    };
  }

  if (action.type === "POPULAR_POSTS") {
    return {
      ...postState,
      articlesPopular: action.payload,
    };
  }

  if (action.type === "ACT_GET_POSTS") {
    return {
      ...postState,
      articlePaging: {
        ...postState.articlePaging,
        list:
          action.payload.currentPage === 1
            ? action.payload.posts
            : postState.articlePaging.list.concat(action.payload.posts),
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
        total: action.payload.total,
      },
    };
  }

  if (action.type === ACT_FETCH_POST_DETAIL) {
    return {
      ...postState,
      postDetail: action.payload.post,
    };
  }

  if (action.type === ACT_FETCH_RELATED_POSTS) {
    return {
      ...postState,
      relatedPostsByAuthor: action.payload.posts,
    };
  }

  return postState;
}

export default reducer;
