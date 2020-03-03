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
  info: state.user.info,
  explore_guild: state.user.explore_guild
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

    if (props.explore_guild._id === props.match.params.guildID) {
      guild = props.explore_guild;
    }
  }

  const [showModal, setShowModal] = useState(false);
  const [avatarStyle, setAvatarStyle] = useState({});
  const [coverStyle, setCoverStyle] = useState({});
  const [avatar, setAvatar] = useState("");
  const [cover, setCover] = useState("");
  const [guildName, setGuildName] = useState("");
  const [guildDescription, setGuildDescription] = useState("");
  const [avatarHintStyle, setAvatarHintStyle] = useState(
    commonStyles.uploadIcon_noIconHint
  );
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
  }, [guild.avatar, guild.cover, guild.description, guild.name]);

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
        className={commonStyles.setting_modal}
        overlayClassName={commonStyles.setting_overlay}
      >
        <div className={commonStyles.setting_sidebar}>
          <div className={commonStyles.setting_sidebarNav}>
            <h4>
              {" "}
              社区：
              {guild.name}
            </h4>
          </div>
        </div>

        <div className={commonStyles.setting_content}>
          <div className={commonStyles.setting_contentMain}>
            <h3>概况</h3>

            <div className={commonStyles.setting_guildInfo}>
              <div className={commonStyles.uploadIcon_iconContainer}>
                <div
                  className={commonStyles.uploadIcon_icon}
                  style={avatarStyle}
                  onMouseOver={e => {
                    setAvatarHintStyle(commonStyles.uploadIcon_iconHint);
                  }}
                  onMouseOut={e => {
                    setAvatarHintStyle(commonStyles.uploadIcon_noIconHint);
                  }}
                >
                  <div className={avatarHintStyle}>
                    更改<br></br>头像
                  </div>
                  <input
                    className={commonStyles.uploadIcon_iconInput}
                    type="file"
                    accept=".jpg,.jpeg,.png,.gif"
                    ref={avatarInput}
                    onChange={e => {
                      handleFile("avatar");
                    }}
                  ></input>
                </div>

                {avatar === "" ? (
                  <div className={commonStyles.uploadIcon_size}>
                    <strong>最小尺寸：128x128</strong>
                  </div>
                ) : (
                  <button
                    className={commonStyles.uploadIcon_removeButton}
                    onClick={e => {
                      setAvatar("remove");
                      setAvatarStyle({});
                    }}
                  >
                    移除图标
                  </button>
                )}
              </div>
              <div className={styles.guildInfoText}>
                <div className={styles.inputContainer}>
                  <h4>社区名称</h4>
                  <input
                    className={commonStyles.input_normal}
                    value={guildName}
                    onChange={e => setGuildName(e.target.value)}
                  ></input>
                </div>

                <div className={styles.inputContainer}>
                  <h4>社区简介</h4>
                  <textarea
                    className={commonStyles.input_textarea}
                    value={guildDescription}
                    onChange={e => setGuildDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className={commonStyles.setting_guildInfo}>
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
                    className={commonStyles.uploadIcon_iconInput}
                    type="file"
                    accept=".jpg,.jpeg,.png,.gif"
                    ref={coverInput}
                    onChange={e => {
                      handleFile("cover");
                    }}
                  ></input>
                </div>

                {cover === "" ? (
                  <div className={commonStyles.uploadIcon_size}>
                    <strong>最小尺寸：128x128</strong>
                  </div>
                ) : (
                  <button
                    className={commonStyles.uploadIcon_removeButton}
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
                  <h4>选择封面</h4>
                </div>
              </div>
            </div>

            <div className={styles.buttonContainer}>
              <button
                className={commonStyles.button_common_M}
                onClick={updateGuild}
              >
                更新信息
              </button>
            </div>
          </div>

          <div className={commonStyles.setting_contentClose}>
            <div
              className={commonStyles.setting_closeIcon}
              onClick={e => setShowModal(false)}
            >
              <Close24Px className={commonStyles.setting_icon}></Close24Px>
            </div>
            <div className={commonStyles.text12_normal}>关闭</div>
          </div>
        </div>
      </ReactModal>
    </div>
  );
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GuildSetting)
);
