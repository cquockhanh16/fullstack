import React, { useCallback, useRef, useState } from "react";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import "./Auth.css";
import icon from "./images/img-01.png";
import Spinner from "../../shared/components/UIElements/Spinner";
import Modal from "../../shared/components/UIElements/Modal";

const Auth = (props) => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const cpasswordRef = useRef(null);
  const fileRef = useRef(null);
  const [switchLogin, setSwitchLogin] = useState(true);
  const navigate = useNavigate();
  const { sendRequest, isLoading, error, clearError, setError, statusCode } =
    useHttpClient();
  const sendData = useCallback(async () => {
    try {
      let username = usernameRef.current.value.trim();
      let password = passwordRef.current.value.trim();
      const passwordRegex =
        /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$@%&? "]).*$/;
      if (username.trim() === "" || username.length > 20) {
        throw new Error("Tài khoản không được để trống và tối đa 20 ký tự");
      }
      if (!passwordRegex.test(password)) {
        throw new Error(
          "Mật khẩu cần dài tối thiểu 8 ký tự và gồm ít nhất 1 ký tự in hoa, 1 số, 1 ký tự đặc biệt"
        );
      }
      if (switchLogin) {
        let body = JSON.stringify({
          username: username,
          password: password,
        });
        const res = await sendRequest(
          `http://localhost:2000/api/v1/login`,
          "POST",
          body,
          {
            "Content-Type": "application/json",
          }
        );
        if (statusCode >= 500) {
          navigate("/error");
          return;
        }
        if (res) {
          props.login(res.uid, res.is_admin);
          Cookies.set("token", res.token, { expires: 7 });
          Cookies.set("uid", res.uid, { expires: 7 });
          Cookies.set("isLogin", true, { expires: 7 });
          Cookies.set("isAdmin", res.is_admin, { expires: 7 });
          if (res.is_admin) {
            navigate("/admin");
            return;
          } else {
            navigate("/");
            return;
          }
        }
      } else {
        const file = fileRef.current.files[0];
        const cpassword = cpasswordRef.current.value;
        if (password !== cpassword) {
          throw new Error("Mật khẩu chưa trùng khớp");
        }
        if (!file) {
          throw new Error("Bạn cần chọn một file ảnh");
        }
        let formData = new FormData();
        formData.append("file", file);
        formData.append("username", username);
        formData.append("password", password);
        console.log(username, password, file);
        const res = await sendRequest(
          "http://localhost:2000/api/v1/resgister",
          "POST",
          formData
        );
        if (statusCode >= 500) {
          navigate("/error");
          return;
        }
      }
    } catch (error) {
      setError(error.message);
    }
  }, [sendRequest, props, switchLogin, navigate]);
  const authHandler = () => {
    sendData();
  };
  const switchMode = () => {
    setSwitchLogin((prev) => !prev);
  };
  return (
    <>
      {isLoading && <Spinner></Spinner>}
      {error && (
        <Modal
          onCancel={clearError}
          message={error}
          error
          title='Thông báo lỗi'
          action={
            <button className='btn btn-primary' onClick={clearError}>
              Đóng
            </button>
          }
        />
      )}
      <div className='auth'>
        <div className='container'>
          <div className='limiter'>
            <div className='container-login100'>
              <div className='wrap-login100'>
                <div className='login100-pic js-tilt' data-tilt>
                  <img src={icon} alt='IMG' />
                </div>

                <div className='login100-form validate-form'>
                  <span className='login100-form-title'>Member Login</span>

                  <div className='wrap-input100 validate-input'>
                    <input
                      className='input100'
                      type='text'
                      name='email'
                      placeholder='Tài khoản'
                      ref={usernameRef}
                    />
                    <span className='focus-input100'></span>
                  </div>

                  <div className='wrap-input100 validate-input'>
                    <input
                      className='input100'
                      type='password'
                      name='pass'
                      placeholder='Mật khẩu'
                      ref={passwordRef}
                    />
                    <span className='focus-input100'></span>
                  </div>
                  {!switchLogin && (
                    <>
                      <div className='wrap-input100 validate-input'>
                        <input
                          className='input100'
                          type='password'
                          name='pass'
                          placeholder='Xác nhận mật khẩu'
                          ref={cpasswordRef}
                        />
                        <span className='focus-input100'></span>
                      </div>
                      <div className='mt-3'>
                        Chọn ảnh: <input type='file' ref={fileRef} />
                      </div>
                    </>
                  )}

                  <div className='container-login100-form-btn'>
                    {switchLogin ? (
                      <button
                        className='login100-form-btn'
                        onClick={authHandler}>
                        Đăng nhập
                      </button>
                    ) : (
                      <button
                        className='login100-form-btn'
                        onClick={authHandler}>
                        Đăng ký
                      </button>
                    )}
                  </div>
                  <div
                    className='w-100 mt-4 btn btn-outline-success btn-lg'
                    onClick={switchMode}>
                    {switchLogin
                      ? "Chuyển sang ĐĂNG KÝ"
                      : "Chuyển sang ĐĂNG NHẬP"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  uid: state.uid,
  isLogin: state.isLogin,
});

const mapDispatchToProps = (dispatch) => ({
  login: (uid, isAdmin) =>
    dispatch({ type: "LOGIN", payload: { uid, isAdmin } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
