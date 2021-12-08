import { useState } from "react";
import { Link } from "react-router-dom";

import "./login.css";
import Input from "../../components/shared/Input";
import Button from "../../components/shared/Button";

function LoginPage() {
  const [formData, setFormData] = useState({
    userName: {
      value: "",
      error: "",
    },
    password: {
      value: "",
      error: "",
    },
  });

  const userNameChangeHandler = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        userName: {
          value: e.target.value,
          error: "",
        },
      };
    });
  };

  const passwordChangeHandler = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        password: {
          value: e.target.value,
          error: "",
        },
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      formData.password.value < 6 &&
      formData.userName.value.trim().length < 8
    ) {
      setFormData((prevState) => {
        return {
          userName: {
            value: prevState.userName.value,
            error: "Invalid username",
          },
          password: {
            value: prevState.password.value,
            error: "Invalid password",
          },
        };
      });
      return;
    }

    if (formData.userName.value.trim().length < 8) {
      setFormData((prevState) => {
        return {
          ...prevState,
          userName: {
            value: prevState.userName.value,
            error: "Name must have at least 8 character",
          },
        };
      });
      return;
    } else if (formData.password.value.length < 6) {
      setFormData((prevState) => {
        return {
          ...prevState,
          password: {
            value: prevState.password.value,
            error: "Password must have at least 6 characters",
          },
        };
      });
      return;
    } else {
      console.log("Login accepted");
    }

    setFormData({
      userName: {
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
            <h1 className="form-title text-center">Đăng nhập</h1>
            <div className="form-login-register">
              <form onSubmit={submitHandler} autoComplete="off">
                <p>{formData.userName.error}</p>
                <Input
                  label="Tên đăng nhập"
                  placeholder="Nhập tên đăng nhập ..."
                  autoComplete="off"
                  value={formData.userName.value}
                  name="username"
                  onChange={userNameChangeHandler}
                />

                <p>{formData.password.error}</p>
                <Input
                  type="password"
                  label="Mật khẩu"
                  placeholder="Nhập mật khẩu của bạn ..."
                  autoComplete="new-password"
                  value={formData.password.value}
                  name="password"
                  onChange={passwordChangeHandler}
                />

                <div className="d-flex tcl-jc-between tcl-ais-center">
                  <Button type="primary" size="large">
                    Đăng nhập
                  </Button>
                  <Link to="/register">Đăng ký</Link>
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
