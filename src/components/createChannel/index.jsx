import React, { useState } from "react";
import styles from "./styles.module.css";
import ReactModal from "react-modal";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import Add24Px from "../../Icons/Add24Px";
import Comment from "../../Icons/Comment";
import Close24Px from "../../Icons/Close24Px";
import { baseURL } from "../../utils/http";

const mapStateToProps = state => ({
  headerConfig: state.user.headerConfig
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
      type: "post"
    };

    axios
      .post(baseURL + "api/channel", channelParams, postConfig)
      .then(function(response) {
        if (response.data.code === 200) {
          setShowModal(false);
        }
      })
      .catch(function(errors) {
        console.log(errors);
      });
  }

  return (
    <div className={styles.iconContainer} data-tip="创建频道">
      <Add24Px
        className={styles.icon}
        onClick={e => setShowModal(true)}
      ></Add24Px>
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
              <div className={styles.categoryName}>
                <Comment className={styles.categoryNameIcon}></Comment>
                版面频道
              </div>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.contentMain}>
            <div className={styles.text1}>概况</div>
            <div className={styles.text2}>频道名称</div>
            <input
              className={styles.input1}
              value={channleName}
              onChange={e => setChannelName(e.target.value)}
            ></input>

            <div className={styles.buttonContainer}>
              <button className={styles.button1} onClick={createChannel}>
                创建频道
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
            <div className={styles.text2}>关闭</div>
          </div>
        </div>
      </ReactModal>
    </div>
  );
}

export default withRouter(connect(mapStateToProps)(CreateChannel));
