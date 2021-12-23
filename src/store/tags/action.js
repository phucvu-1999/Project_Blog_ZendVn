import { hashItemsHandler } from "../../helpers";
import tagsService from "../../services/tags";

// Action Type
export const ACT_FETCH_ALL_TAGS = "ACT_FETCH_ALL_TAGS";

// aAction
export const actFetchAllTags = (tags) => {
  return {
    type: ACT_FETCH_ALL_TAGS,
    payload: {
      tags,
    },
  };
};

// Action Async
export const actFetchAllTagsAsync = () => {
  return async (dispatch) => {
    try {
      const response = await tagsService.getList();
      const tags = hashItemsHandler(response.data);

      dispatch(actFetchAllTags(tags));

      return {
        ok: true,
      };
    } catch (err) {
      console.log("Tag Errors", err.message);
      return {
        ok: false,
      };
    }
  };
};
