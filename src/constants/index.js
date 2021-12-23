export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const DATE_TEMPLATE = "DD/MM/YYYY";
export const DATE_TEMPLATE_FULL = "DD/MM/YYYY HH:mm:ss";
export const DEFAULT_AVATAR =
  "https://i.pinimg.com/736x/49/68/ae/4968aebbcaf258bc025e61d6b5b74bed.jpg";
export const TOKEN = "Access Token";

export const ERROR_MESSAGE = {
  existing_user_login: "Tên đăng nhập đã tồn tại",
  existing_user_email: "Email đã tồn tại",
  rest_user_invalid_password: "Mật khẩu không hợp lệ",
  rest_user_invalid_username: "Username không hợp lệ",
  rest_user_invalid_email: "Email không hợp lệ",
  password_length: "Password phải có ít nhất 6 kí tự",

  //FE Error:
  email_required: "Email không được rỗng",
  password_required: "Password không được rỗng",
  username_required: "Username không được rỗng",
};
