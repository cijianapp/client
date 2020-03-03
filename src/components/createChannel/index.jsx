import React, { useState } from "react";
import styles from "./styles.module.css";
import commonStyles from "../../utils/styles.module.css";
import ReactModal from "react-modal";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import Add24Px from "../../icons/Add24Px";
import Close24Px from "../../icons/Close24Px";
import { baseURL } from "../../utils/http";

import { USER_INFO } from "../../redux/actions";

const mapStateToProps = state => ({
  headerConfig: state.user.headerConfig
});

const mapDispatchToProps = dispatch => ({
  refresh: () => {
    dispatch({ type: USER_INFO, value: {} });
  }
});

function CreateChannel(props) {
  const [showModal, setShowModal] = useState(false);

  const [channleName, setChannelName] = useState("日常");

  function closeModal() {
    setShowModal(false);
  }

  function createChannel() {
    const postConfig = {
      ...props.headerConfig
    };

    const channelParams = {
      name: channleName,
      guildid: props.match.params.guildID,
      type: props.type
    };

    axios
      .post(baseURL + "api/channel", channelParams, postConfig)
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
    <div className={commonStyles.icon_container} data-tip="创建频道">
      <Add24Px
        className={commonStyles.icon_icon}
        onClick={e => setShowModal(true)}
      ></Add24Px>
      <ReactTooltip place="top" effect="solid" className={styles.toolTips} />

      <ReactModal
        isOpen={showModal}
        onRequestClose={closeModal}
        className={commonStyles.setting_modal}
        overlayClassName={commonStyles.setting_overlay}
      >
        <div className={commonStyles.setting_sidebar}>
          <div className={commonStyles.setting_sidebarNav}>
            <h4> {props.type === "post" ? "版面频道" : "聊天频道"}</h4>
          </div>
        </div>

        <div className={commonStyles.setting_content}>
          <div className={commonStyles.setting_contentMain}>
            <h3>概况</h3>
            <h4>频道名称</h4>
            <input
              className={commonStyles.input_normal}
              value={channleName}
              onChange={e => setChannelName(e.target.value)}
            ></input>

            <div className={styles.buttonContainer}>
              <button
                className={commonStyles.button_common_M}
                onClick={createChannel}
              >
                创建频道
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
  connect(mapStateToProps, mapDispatchToProps)(CreateChannel)
);
