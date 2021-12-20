import { ACT_FETCH_ALL_TAGS } from "./action";

const initialState = {
  tags: {},
};

const reducer = (tagsState = initialState, action) => {
  if (action.type === ACT_FETCH_ALL_TAGS) {
    return {
      ...tagsState,
      tags: action.payload.tags,
    };
  }

  return tagsState;
};

export default reducer;
