import { TOKEN } from "../../constants";
import { ACT_LOGIN_SUCCESS, ACT_LOGOUT } from "./actions";

const initState = {
  currentUser: null,
  token: localStorage.getItem(TOKEN),
};

function reducer(authState = initState, action) {
  if (action.type === ACT_LOGIN_SUCCESS) {
    localStorage.setItem("Access Token", action.payload.token);
    return {
      ...authState,
      token: action.payload.token,
      currentUser: action.payload.user,
    };
  }

  if (action.type === ACT_LOGOUT) {
    localStorage.removeItem(TOKEN);
    return {
      token: "",
      currentUser: null,
    };
  }

  return authState;
}

export default reducer;
