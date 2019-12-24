import React, { useState } from "react";
import styles from "./styles.module.css";
import ReactModal from "react-modal";

import { LOGIN, NO_LOGIN } from "../../redux/actions";
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
          localStorage.setItem("token", response.data.token);

          dispatch({
            type: LOGIN
          });
        }
      })
      .catch(function(errors) {
        console.log(errors);
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

  const [passwordAlert, setPasswordAlert] = useState(
    [styles.setPasswordAlert, styles.notShow].join(" ")
  );

  const [telAlert, setTelAlert] = useState(
    [styles.setPasswordAlert, styles.notShow].join(" ")
  );

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

    if (!tel.match(new RegExp("[1]\\d{1}$"))) {
      setTelAlert(styles.alertContent);
      setTelAlertColor([styles.bold, styles.alertColor].join(" "));
    } else {
      setTelAlert([styles.setPasswordAlert, styles.notShow].join(" "));
      setTelAlertColor(styles.bold);
    }

    if (!password.match(new RegExp("(?=.{6,})"))) {
      setPasswordAlert(styles.alertContent);
      setPasswordAlertColor([styles.bold, styles.alertColor].join(" "));
    } else {
      setPasswordAlert([styles.setPasswordAlert, styles.notShow].join(" "));
      setPasswordAlertColor(styles.bold);
    }
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
            <div className={styles.input} value={tel}>
              <input
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
            <div className={styles.input}>
              <input
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
              <span className={telAlert}>
                ---
                <span>请输入正确的手机号，海外用户暂停注册</span>
              </span>
            </h5>
            <div className={styles.input}>
              <input
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
            <div className={styles.input}>
              <input placeholder="请输入4位验证码"></input>
              <div className={styles.verifyCode}>发送验证码</div>
            </div>

            <h5 className={styles.bold}>用户名</h5>
            <div className={styles.input}>
              <input></input>
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

            <div className={styles.input}>
              <input
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
