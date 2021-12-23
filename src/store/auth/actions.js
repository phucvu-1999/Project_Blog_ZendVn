import authService from "../../services/auth";
import { mappingUserData } from "../../helpers";
import { TOKEN } from "../../constants";
import { ERROR_MESSAGE } from "../../constants";

// ACTION TYPE
export const ACT_LOGIN_USER = "ACT_LOGIN_USER";
export const ACT_LOGIN_SUCCESS = "ACT_LOGIN_SUCCESS";
export const ACT_LOGOUT = "ACT_LOGOUT";
export const ACT_REGSTER = "ACT_REGSTER";
export const ACT_SET_TOKEN = "ACT_SET_TOKEN";

// ACTION
export const actLogOut = () => {
  return {
    type: ACT_LOGOUT,
  };
};

export const actSetToken = (token) => {
  return {
    type: ACT_SET_TOKEN,
    payload: {
      token,
    },
  };
};

export const actLoginSuccess = ({ user, token }) => {
  return {
    type: ACT_LOGIN_SUCCESS,
    payload: {
      token,
      user,
    },
  };
};

export const actRegister = (info) => {
  return {
    type: ACT_REGSTER,
    payload: {
      info,
    },
  };
};

// ACTION ASYNC
export const actFetchMeAsync = (token) => {
  if (token === undefined) {
    token = localStorage.getItem(TOKEN);
  }

  return async (dispatch) => {
    try {
      const response = await authService.fetchMe(token);
      const user = mappingUserData(response.data);

      dispatch(actLoginSuccess({ user, token }));

      return {
        ok: true,
        response,
      };
    } catch (err) {
      dispatch(actLogOut());
      return {
        ok: false,
        error: err.message,
      };
    }
  };
};

export const actLoginUserAsync = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const response = await authService.login({ username, password });

      const token = response.data.token;
      dispatch(actSetToken(token));
      const responseME = await dispatch(actFetchMeAsync(token));

      return {
        ok: responseME.ok,
        error: responseME.error,
        response: response.data,
      };
    } catch (err) {
      return {
        ok: false,
        error: "Username hoặc password không hợp lệ",
      };
    }
  };
};

export const actRegisterAsync = ({ username, password, email, nickname }) => {
  return async (dispatch) => {
    try {
      const response = await authService.register({
        username,
        password,
        email,
        nickname,
      });

      const responseLogin = await dispatch(
        actLoginUserAsync({ username, password })
      );

      if (responseLogin.ok) {
        return {
          ok: true,
          response,
        };
      }

      throw new Error("Something went wrong");
    } catch (err) {
      console.log("error: ", err);
      window.MY_ERROR = err;

      let errorMessage = "Something went wrong";

      if (err.response && err.response.data && err.response.data.code) {
        const errorCode = err.response.data.code;

        if (ERROR_MESSAGE[errorCode]) {
          errorMessage = ERROR_MESSAGE[errorCode];
        }
      }

      return {
        ok: false,
        error: errorMessage,
      };
    }
  };
};
