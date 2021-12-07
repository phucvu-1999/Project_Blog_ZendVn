const initState = {
  articlesLatest: [],
  articlesPopular: [],
  articlePaging: {
    list: [],
    currentPage: 1,
  },
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

  if (action.type === "GENERAL_POSTS") {
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

  return postState;
}

export default reducer;
