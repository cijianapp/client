import React, { useState, useRef, useEffect } from "react";
import styles from "./styles.module.css";
import commonStyles from "../../utils/styles.module.css";
import ReactModal from "react-modal";
import axios from "axios";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import Close24Px from "../../icons/Close24Px";
import { baseURL } from "../../utils/http";

import { USER_INFO } from "../../redux/actions";
import { ossURL } from "../../utils/http";

const mapStateToProps = state => ({
  headerConfig: state.user.headerConfig,
  info: state.user.info
});

const mapDispatchToProps = dispatch => ({
  refresh: () => {
    dispatch({ type: USER_INFO, value: {} });
  }
});

function GuildSetting(props) {
  let guild = {};

  if (Array.isArray(props.info.guild)) {
    props.info.guild.forEach(element => {
      if (element._id === props.match.params.guildID) {
        guild = element;
      }
    });
  }

  const [showModal, setShowModal] = useState(false);
  const [avatarStyle, setAvatarStyle] = useState({});
  const [coverStyle, setCoverStyle] = useState({});
  const [avatar, setAvatar] = useState("");
  const [cover, setCover] = useState("");
  const [guildName, setGuildName] = useState("");
  const [guildDescription, setGuildDescription] = useState("");
  const [avatarHintStyle, setAvatarHintStyle] = useState(styles.noAvatarHint);
  const [coverHintStyle, setCoverHintStyle] = useState(styles.noCoverHint);

  const avatarInput = useRef();
  const coverInput = useRef();

  useEffect(() => {
    setAvatarStyle({
      backgroundImage: "url(" + ossURL + guild.avatar + ")"
    });
    setCoverStyle({
      backgroundImage: "url(" + ossURL + guild.cover + ")"
    });
    setGuildName(guild.name);
    setGuildDescription(guild.description);
  }, [guild]);

  function handleFile(type) {
    try {
      let file;
      if (type === "avatar") {
        file = avatarInput.current.files[0];
      }

      if (type === "cover") {
        file = coverInput.current.files[0];
      }
      const reader = new FileReader();
      reader.onloadend = function() {
        console.log("RESULT", reader.result);
        if (type === "avatar") {
          setAvatar(reader.result);
          setAvatarStyle({ backgroundImage: "url(" + reader.result + ")" });
        }

        if (type === "cover") {
          setCover(reader.result);
          setCoverStyle({ backgroundImage: "url(" + reader.result + ")" });
        }
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error(error);
    }
  }

  function closeModal() {
    setShowModal(false);
  }

  function updateGuild() {
    const postConfig = {
      ...props.headerConfig
    };

    const updateGuildParams = {
      id: guild._id,
      name: guildName,
      avatar: avatar,
      cover: cover,
      description: guildDescription
    };

    axios
      .post(baseURL + "api/updateguild", updateGuildParams, postConfig)
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
    <div className={styles.container}>
      <div className={styles.item} onClick={e => setShowModal(true)}>
        {" "}
        <div className={styles.itemLabel}>社区设置</div>
      </div>
      <ReactModal
        isOpen={showModal}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <div className={styles.sidebar}>
          <div className={styles.sidebarNav}>
            <div className={styles.category}>
              <div className={styles.categoryName}>
                社区：
                {guild.name}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.contentMain}>
            <div className={commonStyles.text1}>概况</div>

            <div className={styles.guildInfo}>
              <div className={styles.avatarContainer}>
                <div
                  className={styles.avatar}
                  style={avatarStyle}
                  onMouseOver={e => {
                    setAvatarHintStyle(styles.avatarHint);
                  }}
                  onMouseOut={e => {
                    setAvatarHintStyle(styles.noAvatarHint);
                  }}
                >
                  <div className={avatarHintStyle}>
                    更改<br></br>头像
                  </div>
                  <input
                    className={styles.iconInput}
                    type="file"
                    accept=".jpg,.jpeg,.png,.gif"
                    ref={avatarInput}
                    onChange={e => {
                      handleFile("avatar");
                    }}
                  ></input>
                </div>

                {avatar === "" ? (
                  <div className={styles.size}>
                    <strong>最小尺寸：128x128</strong>
                  </div>
                ) : (
                  <button
                    className={styles.removeButton}
                    onClick={e => {
                      setAvatar("remove");
                      setAvatarStyle({});
                    }}
                  >
                    移除图标
                  </button>
                )}
              </div>
              <div className={styles.guildInfo1}>
                <div className={styles.inputContainer}>
                  <div className={commonStyles.text2}>社区名称</div>
                  <input
                    className={commonStyles.input1}
                    value={guildName}
                    onChange={e => setGuildName(e.target.value)}
                  ></input>
                </div>

                <div className={styles.inputContainer}>
                  <div className={commonStyles.text2}>社区简介</div>
                  <textarea
                    className={commonStyles.input3}
                    value={guildDescription}
                    onChange={e => setGuildDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className={styles.guildInfo}>
              <div className={styles.coverContainer}>
                <div
                  className={styles.cover}
                  style={coverStyle}
                  onMouseOver={e => {
                    setCoverHintStyle(styles.coverHint);
                  }}
                  onMouseOut={e => {
                    setCoverHintStyle(styles.noCoverHint);
                  }}
                >
                  <div className={coverHintStyle}>
                    更改<br></br>封面
                  </div>
                  <input
                    className={styles.iconInput}
                    type="file"
                    accept=".jpg,.jpeg,.png,.gif"
                    ref={coverInput}
                    onChange={e => {
                      handleFile("cover");
                    }}
                  ></input>
                </div>

                {cover === "" ? (
                  <div className={styles.size}>
                    <strong>最小尺寸：128x128</strong>
                  </div>
                ) : (
                  <button
                    className={styles.removeButton}
                    onClick={e => {
                      setCover("remove");
                      setCoverStyle({});
                    }}
                  >
                    移除封面
                  </button>
                )}
              </div>
              <div className={styles.guildInfo1}>
                <div className={styles.inputContainer}>
                  <div className={commonStyles.text2}>选择封面</div>
                </div>
              </div>
            </div>

            <div className={styles.buttonContainer}>
              <button className={commonStyles.button1} onClick={updateGuild}>
                更新信息
              </button>
            </div>
          </div>

          <div className={styles.contentClose}>
            <div
              className={styles.closeIcon}
              onClick={e => setShowModal(false)}
            >
              <Close24Px className={styles.icon}></Close24Px>
            </div>
            <div className={commonStyles.text2}>关闭</div>
          </div>
        </div>
      </ReactModal>
    </div>
  );
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GuildSetting)
);
