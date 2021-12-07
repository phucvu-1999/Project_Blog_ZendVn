import { ACT_FETCH_ALL_CATEGORIES } from "./action";

const initialState = {
  hashCategoriesById: {},
};

function reducer(categoryState = initialState, action) {
  if (action.type === ACT_FETCH_ALL_CATEGORIES) {
    return {
      ...categoryState,
      hashCategoriesById: action.payload.hashCategoriesById,
    };
  }

  return categoryState;
}

export default reducer;
