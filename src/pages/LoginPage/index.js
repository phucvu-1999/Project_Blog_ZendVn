import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

import "./login.css";
import { useIsAuthenticated } from "../../hooks/useIsAuthenticated";
import { validateLoginForm } from "../../helpers";
import Input from "../../components/shared/Input";
import Button from "../../components/shared/Button";
import { actLoginUserAsync } from "../../store/auth/actions";

function LoginPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [formDirty, setFormDirty] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
    username: {
      value: "",
      error: "",
    },
    password: {
      value: "",
      error: "",
    },
  });

  useIsAuthenticated();

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value.trim();

    const error = validateLoginForm({ value, name });

    setFormDirty(true);
    setFormData({
      ...formData,
      [name]: {
        value,
        error,
      },
    });
  };

  const checkFormIsValid = () => {
    if (!formDirty) {
      setFormData({
        username: {
          value: "",
          error: validateLoginForm({
            value: "",
            name: "username",
          }),
        },
        password: {
          value: "",
          error: validateLoginForm({
            value: "",
            name: "password",
          }),
        },
      });
      return false;
    }

    if (formData.username.error || formData.password.error) {
      return false;
    }

    return true;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const isValid = checkFormIsValid();

    if (!isValid) {
      console.log("Something wrong");
      return;
    }

    if (loading) {
      return;
    }

    setIsLoading(true);
    setFormError("");
    dispatch(
      actLoginUserAsync({
        username: formData.username.value,
        password: formData.password.value,
      })
    ).then((res) => {
      if (res.ok) {
        history.push("/");
      } else {
        setFormError(res.error);
        setIsLoading(false);
      }
    });

    setFormData({
      username: {
        value: "",
        error: "",
      },
      password: {
        value: "",
        error: "",
      },
    });
  };

  return (
    <main className="login">
      <div className="spacing" />
      <div className="tcl-container">
        <div className="tcl-row">
          <div className="tcl-col-12 tcl-col-sm-6 block-center">
            <h1 className="form-title text-center">????ng nh???p</h1>
            <div className="form-login-register">
              <form autoComplete="off" onSubmit={submitHandler}>
                <p className="form-login__error">{formError}</p>
                <Input
                  label="T??n ????ng nh???p"
                  placeholder="Nh???p t??n ????ng nh???p ..."
                  autoComplete="off"
                  name="username"
                  onChange={onChangeHandler}
                  value={formData.username.value}
                  error={formData.username.error}
                />

                <Input
                  type="password"
                  label="M???t kh???u"
                  placeholder="Nh???p m???t kh???u c???a b???n ..."
                  autoComplete="new-password"
                  name="password"
                  onChange={onChangeHandler}
                  value={formData.password.value}
                  error={formData.password.error}
                />

                <div className="d-flex tcl-jc-between tcl-ais-center">
                  <Button loading={loading} type="primary" size="large">
                    ????ng nh???p
                  </Button>
                  <Link to="/register">????ng k??</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="spacing" />
    </main>
  );
}

export default LoginPage;
