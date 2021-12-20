import { api } from "./api";

const authService = {
  login({ username, password }) {
    return api.call().post("/jwt-auth/v1/token", { username, password });
  },

  register({ username, password, email, nickname }) {
    return api.call().post("/wp/v2/users/register", {
      email,
      password,
      username,
      nickname,
    });
  },

  fetchMe(token) {
    return api.call().get("/wp/v2/users/me", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
};

export default authService;
