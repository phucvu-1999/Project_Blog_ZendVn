import menuService from "../../services/menu";
import { mappingMenu } from "../../helpers";

// action type
export const ACT_GET_MENU = "ACT_GET_MENU";

// action
export const actGetMenu = (menu) => {
  return {
    type: ACT_GET_MENU,
    payload: {
      menu,
    },
  };
};

// action async
export const actGetMenuAsync = () => {
  return async (dispatch) => {
    try {
      const response = await menuService.getMenu();

      const menu = response.data.items.map(mappingMenu);

      dispatch(actGetMenu(menu));
    } catch (err) {
      console.log(err);
    }
  };
};
