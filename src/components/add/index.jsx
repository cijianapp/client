import React, { useState, useRef } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { baseURL } from "../../utils/http";
import { ADD_CLOSE, USER_INFO } from "../../redux/actions";

const mapStateToProps = state => ({
  token: state.user.token,
  headerConfig: state.user.headerConfig
});

const mapDispatchToProps = dispatch => ({
  addModalClose: () => {
    dispatch({ type: ADD_CLOSE });
  },
  refresh: () => {
    dispatch({ type: USER_INFO, value: {} });
  }
});

function Add(props) {
  const [destination, setdestination] = useState("add");
  const [name, setName] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [icon, setIcon] = useState("");
  const [hintStyle, setHintstyle] = useState(styles.noIconHint);
  const [iconStyle, setIconStyle] = useState({ backgroundImage: "ss" });
  const [redirect, setRedirect] = useState("");
  const [nameAlert, setNameAlert] = useState(styles.notShow);
  const [nameAlertColor, setNameAlertColor] = useState(styles.label);

  const fileInput = useRef();

  function toCreate() {
    setdestination("create");
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
          props.addModalClose();
          props.refresh();
          setRedirect(response.data.guild);
        }
      })
      .catch(function(errors) {
        console.log(errors);
      });
  }

  if (redirect !== "") {
    return <Redirect push to={redirect}></Redirect>;
  }

  if (destination === "add") {
    return (
      <div className={styles.slideBody}>
        <div className={styles.title}>下一个社群是？</div>
        <div className={styles.actions}>
          <div className={styles.action}>
            <div
              className={[styles.actionHeader, styles.createColor].join(" ")}
            >
              创建
            </div>
            <div className={styles.actionBody}>
              创建新的服务器并邀请小伙伴加入。免费的噢！
            </div>
            <div className={styles.actionIconCreate}></div>

            <button className={styles.actionButtonCreate} onClick={toCreate}>
              创建新社群
            </button>
          </div>

          <div className={styles.action}>
            <div className={[styles.actionHeader, styles.joinColor].join(" ")}>
              加入
            </div>
            <div className={styles.actionBody}>
              输入邀请并加入您小伙伴的社区。
            </div>
            <div className={styles.actionIconJoin}></div>

            <button className={styles.actionButtonJoin}>加入新社群</button>
          </div>
        </div>
      </div>
    );
  }

  if (destination === "create") {
    return (
      <div className={styles.addBody}>
        <div className={styles.title}>创建新的社群</div>
        <p className={styles.p}>
          好消息！您即将在<strong>此间</strong>创建新的社群,快来体验与朋友
          <strong>全新</strong>的交流方式!
        </p>
        <form onSubmit={guildSubmit}>
          <div className={styles.createMain}>
            <div className={styles.inputs}>
              <div className={nameAlertColor}>
                社群名称
                <span className={nameAlert}>
                  ---
                  <span>社群名不能为空</span>
                </span>
              </div>
              <input
                className={styles.input}
                placeholder="输入社群名称"
                value={name}
                onChange={e => {
                  setName(e.target.value);
                }}
              ></input>
              <div className={styles.label}>社群可见范围</div>
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
                您创建新社群即代表您同意了<strong>此间</strong>的社群守则。
              </div>
            </div>

            <div className={styles.iconContainer}>
              <div
                className={styles.icon}
                style={iconStyle}
                onMouseOver={e => {
                  setHintstyle(styles.iconHint);
                }}
                onMouseOut={e => {
                  setHintstyle(styles.noIconHint);
                }}
              >
                <div className={hintStyle}>
                  更改<br></br>图标
                </div>
                <input
                  className={styles.iconInput}
                  type="file"
                  accept=".jpg,.jpeg,.png,.gif"
                  ref={fileInput}
                  onChange={() => {
                    handleFile();
                  }}
                ></input>
              </div>

              <div className={styles.size}>
                <strong>最小尺寸：128x128</strong>
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            <button
              className={styles.button}
              onClick={() => {
                setdestination("add");
              }}
            >
              返回
            </button>
            <button className={styles.button} type="submit">
              创建
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Add);
