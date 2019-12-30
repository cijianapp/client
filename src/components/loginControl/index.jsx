import React, { useState } from "react";
import styles from "./styles.module.css";
import ReactModal from "react-modal";

import { LOGIN, NO_LOGIN, SET_TOKEN } from "../../redux/actions";
import { connect } from "react-redux";
import axios from "axios";
import { baseURL } from "../../utils/http";
import { Redirect } from "react-router-dom";

const mapStateToProps = state => ({
  login: state.auth.login
});

const mapDispatchToProps = dispatch => ({
  loginSubmit: loginParams => {
    axios
      .post(baseURL + "auth/login", loginParams)
      .then(function(response) {
        if (response.data.code === 200) {
          dispatch({
            type: SET_TOKEN,
            value: response.data.token
          });

          dispatch({
            type: LOGIN
          });
        }
      })
      .catch(function(errors) {
        console.log(errors);
      });
  },

  registerSubmit: registerParams => {
    axios
      .post(baseURL + "auth/register", registerParams)
      .then(function(response) {
        if (response.data.code === 200) {
          dispatch({
            type: SET_TOKEN,
            value: response.data.token
          });

          dispatch({
            type: LOGIN
          });
        }
      })
      .catch(function(errors) {
        if (errors.response.data.code === 401) {
          alert("该手机号已注册");
        }
      });
  },

  loginCompeleted: () => {
    dispatch({ type: NO_LOGIN });
  }
});

function LoginControl(props) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsernamme] = useState("");

  const [passwordAlert, setPasswordAlert] = useState(styles.notShow);

  const [telAlert1, setTelAlert1] = useState(styles.notShow);

  const [telAlert2, setTelAlert2] = useState(styles.notShow);

  const [passwordAlertColor, setPasswordAlertColor] = useState(styles.bold);
  const [telAlertColor, setTelAlertColor] = useState(styles.bold);

  ReactModal.setAppElement("#root");

  function openLoginModal() {
    setShowLoginModal(true);
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "17px";
  }

  function closeLoginModal() {
    setShowLoginModal(false);
    document.body.style.overflow = "unset";
    document.body.style.paddingRight = "0px";
  }

  function openRegisterModal() {
    setShowRegisterModal(true);
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "17px";
  }

  function closeRegisterModal() {
    setShowRegisterModal(false);
    document.body.style.overflow = "unset";
    document.body.style.paddingRight = "0px";
  }

  function toRegister() {
    closeLoginModal();
    openRegisterModal();
  }

  function toLogin() {
    closeRegisterModal();
    openLoginModal();
  }

  function login(e) {
    e.preventDefault();

    const loginParams = {
      tel: tel,
      password: password
    };

    props.loginSubmit(loginParams);
  }

  function register(e) {
    e.preventDefault();

    let registerFlag = true;

    if (!tel.match(new RegExp("[1]\\d{1}$"))) {
      setTelAlert1(styles.alertContent);
      setTelAlertColor([styles.bold, styles.alertColor].join(" "));
      registerFlag = false;
    } else {
      setTelAlert1(styles.notShow);
      setTelAlertColor(styles.bold);
    }

    if (!password.match(new RegExp("(?=.{6,})"))) {
      setPasswordAlert(styles.alertContent);
      setPasswordAlertColor([styles.bold, styles.alertColor].join(" "));
      registerFlag = false;
    } else {
      setPasswordAlert(styles.notShow);
      setPasswordAlertColor(styles.bold);
    }

    if (registerFlag) {
      const registerParams = {
        tel: tel,
        username: username,
        password: password
      };

      props.registerSubmit(registerParams);
    }
  }

  function verify(e) {
    const verifyParams = {
      tel: tel
    };

    axios
      .post(baseURL + "auth/verify", verifyParams)
      .then(function(response) {
        if (response.status === 200) {
          setTelAlert2(styles.notShow);
          setTelAlertColor(styles.bold);
        }
      })
      .catch(function(errors) {
        if (errors.response.status === 403) {
          setTelAlert2(styles.alertContent);
          setTelAlertColor([styles.bold, styles.alertColor].join(" "));
        }
      });
  }

  if (props.login === true) {
    props.loginCompeleted();

    return <Redirect push to="home"></Redirect>;
  }

  return (
    <div className={styles.loginButton}>
      <div onClick={openLoginModal}>进入此间</div>
      <ReactModal
        isOpen={showLoginModal}
        onRequestClose={closeLoginModal}
        className={styles.modalLogin}
        overlayClassName={styles.overlay}
      >
        <div className={styles.form}>
          <div className={styles.title}>欢迎回来！</div>
          <div className={styles.lead}>此间千面，全都是你！</div>
          <form className={styles.inputs} onSubmit={login}>
            <h5 className={styles.bold}>手机号</h5>
            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                name="username"
                type="tel"
                autoFocus={true}
                value={tel}
                onChange={e => {
                  setTel(e.target.value);
                }}
              ></input>
            </div>
            <h5 className={styles.bold}>密码</h5>
            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                type="password"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                }}
              ></input>
            </div>
            <h5 className={styles.link}>忘记密码?</h5>

            <button className={styles.loginBtn} type="submit">
              登入
            </button>

            <div className={styles.registBtn}>
              <h5>需要新的账号？</h5>
              <h5 className={styles.link} onClick={toRegister}>
                点击注册
              </h5>
            </div>
          </form>
        </div>
      </ReactModal>

      <ReactModal
        isOpen={showRegisterModal}
        onRequestClose={closeRegisterModal}
        className={styles.modalRegister}
        overlayClassName={styles.overlay}
      >
        <div className={styles.form}>
          <div className={styles.title}>注册成为新用户吧！</div>
          <form className={styles.inputs} onSubmit={register}>
            <h5 className={telAlertColor}>
              手机号
              <span className={telAlert1}>
                ---
                <span>请输入正确的手机号，海外用户暂停注册</span>
              </span>
              <span className={telAlert2}>
                ---
                <span>该手机号已被注册</span>
              </span>
            </h5>
            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                name="username"
                type="tel"
                autoFocus={true}
                value={tel}
                onChange={e => {
                  setTel(e.target.value);
                }}
              ></input>
            </div>
            <h5 className={styles.bold}>验证码</h5>
            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                placeholder="请输入4位验证码"
              ></input>
              <div className={styles.verifyCode} onClick={verify}>
                发送验证码
              </div>
            </div>

            <h5 className={styles.bold}>用户名</h5>
            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                name="name"
                type="text"
                autoFocus={true}
                value={username}
                autoComplete="off"
                onChange={e => {
                  setUsernamme(e.target.value);
                }}
              ></input>
            </div>

            <div className={styles.alert}>
              <h5 className={passwordAlertColor}>
                密码
                <span className={passwordAlert}>
                  ---
                  <span>密码必须在6位以上</span>
                </span>
              </h5>
            </div>

            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                type="password"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                }}
              ></input>
            </div>

            <button className={styles.loginBtn} type="submit">
              注册
            </button>

            <div className={styles.registBtn}>
              <h5>已经拥有账号了？</h5>
              <h5 className={styles.link} onClick={toLogin}>
                返回登陆
              </h5>
            </div>
          </form>
        </div>
      </ReactModal>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginControl);
