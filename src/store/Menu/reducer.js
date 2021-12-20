import { ACT_GET_MENU } from "./action";

const initialState = {
  menu: [],
};

const reducer = (menuState = initialState, action) => {
  if (action.type === ACT_GET_MENU) {
    return {
      ...menuState,
      menu: action.payload.menu,
    };
  }

  return menuState;
};

export default reducer;
