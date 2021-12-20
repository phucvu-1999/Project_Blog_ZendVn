import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import "./LoginPage/login.css";
import "./RegisterPage.css";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import { validateRegisterForm } from "../helpers";
import { actRegisterAsync } from "../store/auth/actions";
import { useIsAuthenticated } from "../hooks/useIsAuthenticated";

function RegisterPage() {
  const history = useHistory();
  const [formError, setFormError] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nickname: {
      value: "Tien Phuc",
      error: "",
      isTouched: false,
    },
    username: {
      value: "tienphuc 0701",
      error: "",
      isTouched: false,
    },
    email: {
      value: "test07@gmail.com",
      error: "",
      isTouched: false,
    },
    password: {
      value: "123456",
      error: "",
      isTouched: false,
    },
  });

  useIsAuthenticated();

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    const error = validateRegisterForm({ name, value });

    setFormData({
      ...formData,
      [name]: {
        value,
        error,
        isTouched: true,
      },
    });
  };

  const checkFormIsValid = () => {
    const newFormData = {};
    Object.keys(formData).forEach((key) => {
      const formValue = formData[key];

      if (formValue.isTouched === false) {
        newFormData[key] = {
          value: "",
          error: validateRegisterForm({ value: "", name: key }),
          isTouched: true,
        };
      } else {
        newFormData[key] = formData[key];
      }

      setFormData(newFormData);
    });

    if (
      newFormData.username.error ||
      newFormData.nickname.error ||
      newFormData.email.error ||
      newFormData.password.error
    )
      return false;

    return true;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const isValid = checkFormIsValid();

    if (!isValid & loading) {
      console.log("Please enter your information");
      return;
    }
    setLoading(true);
    setFormError("");

    dispatch(
      actRegisterAsync({
        username: formData.username.value,
        password: formData.password.value,
        email: formData.email.value,
        nickname: formData.nickname.value,
      })
    ).then((res) => {
      if (res.ok) {
        history.push("/");
        console.log(res);
      } else if (res.ok === false) {
        console.log(res);
        setFormError(res.error);
        setLoading(false);
      }
    });

    setFormData({
      username: {
        value: "",
        error: "",
        isTouched: true,
      },
      nickname: {
        value: "",
        error: "",
        isTouched: true,
      },
      email: {
        value: "",
        error: "",
        isTouched: true,
      },
      password: {
        value: "",
        error: "",
        isTouched: true,
      },
    });
  };

  return (
    <main className="login">
      <div className="spacing" />
      <div className="tcl-container">
        <div className="tcl-row">
          <div className="tcl-col-12 tcl-col-sm-6 block-center">
            <h1 className="form-title text-center">Đăng ký</h1>
            <div className="form-login-register">
              {formError && <p className="form-error__msg">{formError}</p>}
              <form autoComplete="off" onSubmit={submitHandler}>
                <p className="form-login__error">{formData.nickname.error}</p>
                <Input
                  label="Nickname"
                  placeholder="Nhập Nickname"
                  autoComplete="off"
                  name="nickname"
                  onChange={onChangeHandler}
                  value={formData.nickname.value}
                />

                <p className="form-login__error">{formData.username.error}</p>
                <Input
                  label="Tên đăng nhập"
                  placeholder="Nhập tên đăng nhập ..."
                  autoComplete="off"
                  name="username"
                  onChange={onChangeHandler}
                  value={formData.username.value}
                />

                <p className="form-login__error">{formData.email.error}</p>
                <Input
                  type="email"
                  label="Email"
                  placeholder="Nhập email của bạn ..."
                  autoComplete="off"
                  name="email"
                  onChange={onChangeHandler}
                  value={formData.email.value}
                />

                <p className="form-login__error">{formData.password.error}</p>
                <Input
                  type="password"
                  label="Mật khẩu"
                  placeholder="Nhập mật khẩu của bạn ..."
                  autoComplete="new-password"
                  name="password"
                  onChange={onChangeHandler}
                  value={formData.password.value}
                />

                <div className="d-flex tcl-jc-between tcl-ais-center">
                  <Button loading={loading} type="primary" size="large">
                    Đăng ký
                  </Button>
                  <Link to="/login">Bạn đã có tài khoản?</Link>
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

export default RegisterPage;
