import React, { useState, useRef } from "react";
import styles from "./styles.module.css";
import commonStyles from "../../utils/styles.module.css";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { baseURL } from "../../utils/http";
import { ADD_CLOSE, USER_INFO, TO_LOGIN } from "../../redux/actions";

const mapStateToProps = state => ({
  login: state.auth.login,
  token: state.user.token,
  headerConfig: state.user.headerConfig
});

const mapDispatchToProps = dispatch => ({
  addModalClose: () => {
    dispatch({ type: ADD_CLOSE });
  },
  refresh: () => {
    dispatch({ type: USER_INFO, value: {} });
  },
  toLogin: ifLogin => {
    dispatch({ type: TO_LOGIN, value: ifLogin });
  }
});

function Add(props) {
  const [destination, setdestination] = useState("add");
  const [name, setName] = useState("");
  const [joinLink, setJoinLink] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [icon, setIcon] = useState("");
  const [hintStyle, setHintstyle] = useState(
    commonStyles.uploadIcon_noIconHint
  );
  const [iconStyle, setIconStyle] = useState({ backgroundImage: "" });
  const [redirect, setRedirect] = useState("");
  const [nameAlert, setNameAlert] = useState(styles.notShow);
  const [nameAlertColor, setNameAlertColor] = useState(styles.label);

  const fileInput = useRef();

  function toCreate() {
    if (!props.login) {
      props.toLogin(true);
    } else {
      setdestination("create");
    }
  }

  function toJoin() {
    if (!props.login) {
      props.toLogin(true);
    } else {
      setdestination("join");
    }
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

  function guildSubmit(e) {
    e.preventDefault();

    if (name === "") {
      setNameAlert(styles.alertContent);
      setNameAlertColor([styles.label, styles.alertColor].join(" "));
    } else {
      setNameAlert(styles.notShow);
      setNameAlertColor(styles.label);
    }

    let privacyStr = "open";

    if (privacy === true) {
      privacyStr = "privacy";
    }

    const guildParams = { name: name, privacy: privacyStr, icon: icon };

    axios
      .post(baseURL + "api/guild", guildParams, props.headerConfig)
      .then(function(response) {
        if (response.data.code === 200) {
          props.refresh();
          setRedirect("/" + response.data.guild + "/" + response.data.channel);
          props.addModalClose();
        }
      })
      .catch(function(errors) {
        console.log(errors);
      });
  }

  function joinSubmit(e) {
    e.preventDefault();

    const joinParams = { guild: joinLink };

    axios
      .post(baseURL + "api/join", joinParams, props.headerConfig)
      .then(function(response) {
        if (response.data.code === 200) {
          setRedirect(response.data.guild);

          props.refresh();
          props.addModalClose();
        }
      })
      .catch(function(errors) {
        console.log(errors);
      });
  }

  if (redirect !== "") {
    return <Redirect to={redirect}></Redirect>;
  }

  if (destination === "add") {
    return (
      <div className={styles.slideBody}>
        <h2 className={styles.title_create}>下一个社区是？</h2>
        <div className={styles.actions}>
          <div className={styles.action} onClick={toCreate}>
            <div
              className={[styles.actionHeader, styles.createColor].join(" ")}
            >
              创建
            </div>
            <div className={styles.actionBody}>
              创建新的服务器并邀请小伙伴加入。免费的噢！
            </div>
            <div className={styles.actionIconCreate}></div>

            <button className={commonStyles.button_common_L}>创建新社区</button>
          </div>

          <div className={styles.action} onClick={toJoin}>
            <div className={[styles.actionHeader, styles.joinColor].join(" ")}>
              加入
            </div>
            <div className={styles.actionBody}>
              输入邀请并加入您小伙伴的社区。
            </div>
            <div className={styles.actionIconJoin}></div>

            <button className={commonStyles.button_green_L}>加入新社区</button>
          </div>
        </div>
      </div>
    );
  }

  if (destination === "create") {
    return (
      <div className={styles.slideBody}>
        <h2 className={styles.title_create}>创建新的社区</h2>
        <div className={styles.lead}>
          好消息！您即将在<strong>此间</strong>创建新的社区,快来体验与朋友
          <strong>全新</strong>的交流方式!
        </div>
        <form onSubmit={guildSubmit}>
          <div className={styles.createMain}>
            <div className={styles.inputContainer}>
              <h4 className={nameAlertColor}>
                社区名称
                <span className={nameAlert}>
                  ---
                  <span>社区名不能为空</span>
                </span>
              </h4>
              <input
                className={styles.input}
                placeholder="输入社区名称"
                value={name}
                onChange={e => {
                  setName(e.target.value);
                }}
              ></input>

              <h4>社区可见范围</h4>
              <div className={styles.privacy}>
                {privacy ? (
                  <button
                    onClick={e => {
                      e.preventDefault();
                      setPrivacy(false);
                    }}
                    className={styles.privacyButton}
                  >
                    任何人可见
                  </button>
                ) : (
                  <button
                    onClick={e => {
                      e.preventDefault();
                      setPrivacy(false);
                    }}
                    className={[
                      styles.privacyButton,
                      styles.privacySelceted
                    ].join(" ")}
                  >
                    任何人可见
                  </button>
                )}

                {privacy ? (
                  <button
                    onClick={e => {
                      e.preventDefault();
                      setPrivacy(true);
                    }}
                    className={[
                      styles.privacyButton,
                      styles.privacySelceted
                    ].join(" ")}
                  >
                    仅邀请可见
                  </button>
                ) : (
                  <button
                    onClick={e => {
                      e.preventDefault();
                      setPrivacy(true);
                    }}
                    className={styles.privacyButton}
                  >
                    仅邀请可见
                  </button>
                )}
              </div>
              <div className={styles.alertMessage}>
                您创建新社区即代表您同意了<strong>此间</strong>的社区守则。
              </div>
            </div>

            <div className={commonStyles.uploadIcon_iconContainer}>
              <div
                className={commonStyles.uploadIcon_icon}
                style={iconStyle}
                onMouseOver={e => {
                  setHintstyle(commonStyles.uploadIcon_iconHint);
                }}
                onMouseOut={e => {
                  setHintstyle(commonStyles.uploadIcon_noIconHint);
                }}
              >
                {icon === "" ? (
                  <div className={commonStyles.uploadIcon_guildName}>
                    {" "}
                    {name.substr(0, 3)}
                  </div>
                ) : (
                  <div></div>
                )}
                <div className={hintStyle}>
                  更改<br></br>图标
                </div>
                <input
                  className={commonStyles.uploadIcon_iconInput}
                  type="file"
                  accept=".jpg,.jpeg,.png,.gif"
                  ref={fileInput}
                  onChange={e => {
                    handleFile();
                  }}
                ></input>
              </div>

              {icon === "" ? (
                <div className={commonStyles.uploadIcon_size}>
                  <strong>最小尺寸：128x128</strong>
                </div>
              ) : (
                <button
                  className={commonStyles.uploadIcon_removeButton}
                  onClick={e => {
                    setIcon("");
                    setIconStyle({});
                  }}
                >
                  移除图标
                </button>
              )}
            </div>
          </div>
          <div className={styles.footer}>
            <div className={styles.buttonContainer}>
              <button
                className={commonStyles.button_common_M}
                onClick={() => {
                  setdestination("add");
                }}
              >
                返回
              </button>
            </div>
            <div className={styles.buttonContainer}>
              <button className={commonStyles.button_common_M} type="submit">
                创建
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  if (destination === "join") {
    return (
      <div className={styles.slideBody}>
        <h2 className={styles.title_join}>加入新的社区</h2>
        <div className={styles.lead}>
          什么？准备好加入<strong>新社区</strong>
          了吗,赶快输入邀请链接。邀请大概长这样：
        </div>

        <form onSubmit={joinSubmit}>
          <div className={styles.createMain}>
            <div className={styles.inviteContainer}>
              <h4>邀请链接</h4>
              <input
                className={styles.input}
                placeholder="输入邀请链接"
                value={joinLink}
                onChange={e => {
                  setJoinLink(e.target.value);
                }}
              ></input>
            </div>
          </div>

          <div className={styles.footer}>
            <div className={styles.buttonContainer}>
              {" "}
              <button
                className={commonStyles.button_green_M}
                onClick={() => {
                  setdestination("add");
                }}
              >
                返回
              </button>
            </div>
            <div className={styles.buttonContainer}>
              <button className={commonStyles.button_green_M} type="submit">
                加入
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Add);
