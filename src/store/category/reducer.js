import { ACT_FETCH_ALL_CATEGORIES } from "./action";

const initialState = {
  hashCategoriesById: {},
  isFetched: false,
};

function reducer(categoryState = initialState, action) {
  if (action.type === ACT_FETCH_ALL_CATEGORIES) {
    return {
      ...categoryState,
      hashCategoriesById: action.payload.hashCategoriesById,
      isFetched: true,
    };
  }

  return categoryState;
}

export default reducer;
