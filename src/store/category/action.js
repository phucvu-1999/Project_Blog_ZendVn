import categoryService from "../../services/category";
import { hashItemsHandler } from "../../helpers";

// ACTION_TYPE
export const ACT_FETCH_ALL_CATEGORIES = "ACT_FETCH_ALL_CATEGORIES";

// ACTION
export const actGetAllCategoriesSync = (hashCategoriesById) => {
  return {
    type: ACT_FETCH_ALL_CATEGORIES,
    payload: {
      hashCategoriesById,
    },
  };
};

//ACTION_ASYNC
export const actGetAllCategoriesAsync = () => {
  return async (dispatch) => {
    try {
      const response = await categoryService.getList();

      const categories = response.data;
      const hashCategoriesById = hashItemsHandler(categories);

      dispatch(actGetAllCategoriesSync(hashCategoriesById));
    } catch (err) {
      console.log(err.message);
    }
  };
};
