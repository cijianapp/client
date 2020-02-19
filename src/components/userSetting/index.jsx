import React, { useState, useRef } from "react";
import styles from "./styles.module.css";
import commonStyles from "../../utils/styles.module.css";
import ReactModal from "react-modal";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import Setting from "../../icons/Setting";
import Close24Px from "../../icons/Close24Px";
import { baseURL } from "../../utils/http";

import { ossURL } from "../../utils/http";

import { USER_INFO } from "../../redux/actions";

const mapStateToProps = state => ({
  headerConfig: state.user.headerConfig,
  info: state.user.info
});

const mapDispatchToProps = dispatch => ({
  refresh: () => {
    dispatch({ type: USER_INFO, value: {} });
  }
});

function UserSetting(props) {
  const [showModal, setShowModal] = useState(false);
  const [icon, setIcon] = useState("");
  const [hintStyle, setHintstyle] = useState(styles.noIconHint);
  const [iconStyle, setIconStyle] = useState({
    backgroundImage: "url(" + ossURL + props.info.avatar + ")"
  });

  const [username, setUsername] = useState(props.info.username);

  const fileInput = useRef();

  function closeModal() {
    setShowModal(false);
  }

  function handleFile() {
    try {
      const file = fileInput.current.files[0];
      const reader = new FileReader();
      reader.onloadend = function() {
        console.log("RESULT", reader.result);
        setIcon(reader.result);
        setIconStyle({ backgroundImage: "url(" + reader.result + ")" });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error(error);
    }
  }

  function updateUser() {
    const postConfig = {
      ...props.headerConfig
    };

    const updateUserParams = {
      username: username,
      icon: icon
    };

    axios
      .post(baseURL + "api/updateuser", updateUserParams, postConfig)
      .then(function(response) {
        if (response.data.code === 200) {
          setShowModal(false);
          props.refresh();
        }
      })
      .catch(function(errors) {
        console.log(errors);
      });
  }

  return (
    <div className={styles.iconContainer} data-tip="用户设置">
      <Setting
        className={styles.icon}
        onClick={e => setShowModal(true)}
      ></Setting>
      <ReactTooltip place="top" effect="solid" className={styles.toolTips} />

      <ReactModal
        isOpen={showModal}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <div className={styles.sidebar}>
          <div className={styles.sidebarNav}>
            <div className={styles.category}>
              <div className={commonStyles.text2}>用户设置</div>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.contentMain}>
            <div className={commonStyles.text1}>我的账号</div>

            <div className={styles.userInfo}>
              <div className={styles.avatarContainer}>
                <div
                  className={styles.avatar}
                  style={iconStyle}
                  onMouseOver={e => {
                    setHintstyle(styles.iconHint);
                  }}
                  onMouseOut={e => {
                    setHintstyle(styles.noIconHint);
                  }}
                >
                  <div className={hintStyle}>
                    更改<br></br>头像
                  </div>
                  <input
                    className={styles.iconInput}
                    type="file"
                    accept=".jpg,.jpeg,.png,.gif"
                    ref={fileInput}
                    onChange={e => {
                      handleFile();
                    }}
                  ></input>
                </div>

                {icon === "" ? (
                  <div className={styles.size}>
                    <strong>最小尺寸：128x128</strong>
                  </div>
                ) : (
                  <button
                    className={styles.removeButton}
                    onClick={e => {
                      setIcon("remove");
                      setIconStyle({});
                    }}
                  >
                    移除图标
                  </button>
                )}
              </div>
              <div className={styles.userInfo1}>
                <div className={styles.userInfo2}>
                  <div className={styles.text2}>用户名称</div>
                  <input
                    className={styles.input1}
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  ></input>
                </div>

                <div className={styles.userInfo2}>
                  <div className={styles.text2}>当前密码</div>
                  <input className={styles.input1}></input>
                </div>
                <div className={styles.buttonContainer}>
                  <button className={styles.button1} onClick={updateUser}>
                    更新信息
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.contentClose}>
            <div
              className={styles.closeIcon}
              onClick={e => setShowModal(false)}
            >
              <Close24Px className={styles.icon2}></Close24Px>
            </div>
            <div className={styles.text2}>关闭</div>
          </div>
        </div>
      </ReactModal>
    </div>
  );
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserSetting)
);
