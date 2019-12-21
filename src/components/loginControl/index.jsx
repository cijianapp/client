import React, { useState } from "react";
import styles from "./styles.module.css";
import ReactModal from "react-modal";

function LoginControl() {
  const [showModal, setShowModal] = useState(false);

  function handleOpenModal() {
    setShowModal(true);
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "17px";
  }

  function handleCloseModal() {
    setShowModal(false);
    document.body.style.overflow = "unset";
    document.body.style.paddingRight = "0px";
  }

  return (
    <div className={styles.loginButton}>
      <div onClick={handleOpenModal}>登录</div>
      <ReactModal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <form className={styles.form}>
          <div className={styles.title}>欢迎回来！</div>
          <div className={styles.lead}>此间千面，全都是你！</div>
          <div className={styles.inputs}>
            <h5>手机号</h5>
            <div className={styles.input}>
              <input></input>
            </div>
            <h5>密码</h5>
            <div className={styles.input}>
              <input></input>
            </div>
            <h5 className={styles.link}>忘记密码?</h5>
            <button className={styles.loginBtn}>登入</button>

            <div className={styles.registBtn}>
              <h5>需要新的账号？</h5>
              <h5 className={styles.link}>点击注册</h5>
            </div>
          </div>
        </form>
      </ReactModal>
    </div>
  );
}

export default LoginControl;
