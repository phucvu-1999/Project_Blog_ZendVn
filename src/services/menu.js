import { api } from "./api";

const menuService = {
  getMenu() {
    return api.call().get("/menus/v1/menus/main-menu-vi");
  },
};

export default menuService;
