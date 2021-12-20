import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const useIsAuthenticated = () => {
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.Auth.token);

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated, history]);
};
