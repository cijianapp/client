import React from "react";
import styles from "./styles.module.css";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import KeyboardArrowDown24Px from "../../icons/KeyboardArrowDown24Px";
import CreateChannel from "../createChannel";

const mapStateToProps = state => ({
  info: state.user.info
});

function Channels(props) {
  const postList = [];
  const chatList = [];

  if (Array.isArray(props.info.guild)) {
    props.info.guild.forEach(guild => {
      if (guild._id === props.match.params.guildID) {
        guild.channel.forEach(channel => {
          let channelStyle = styles.channel;
          if (channel._id === props.match.params.channelID) {
            channelStyle = styles.channelSelected;
          }

          if(channel.type==="post"){
            postList.push(
              <Link
                to={"/" + guild._id + "/" + channel._id+ "/post"}
                key={channel._id}
                className={styles.link}
              >
                <div className={channelStyle}>
                  <div className={styles.channelName}>{channel.name}</div>
                </div>
              </Link>
            );
          }

          if(channel.type==="chat"){
            chatList.push(
              <Link
                to={"/" + guild._id + "/" + channel._id+ "/chat"}
                key={channel._id}
                className={styles.link}
              >
                <div className={channelStyle}>
                  <div className={styles.channelName}>{channel.name}</div>
                </div>
              </Link>
            );
          }


        });
      }
    });
  }

  return (
    <div className={styles.channels}>
      <div className={styles.category}>
        <div className={styles.categoryName}>
          <KeyboardArrowDown24Px
            className={styles.categoryNameIcon}
          ></KeyboardArrowDown24Px>
          版面频道
        </div>
        <CreateChannel type={"post"}></CreateChannel>
      </div>

      {postList}

      <div className={styles.category}>
        <div className={styles.categoryName}>
          <KeyboardArrowDown24Px
            className={styles.categoryNameIcon}
          ></KeyboardArrowDown24Px>
          聊天频道
        </div>
        <CreateChannel type={"chat"}></CreateChannel>
      </div>

      {chatList}

    </div>
  );
}

export default withRouter(connect(mapStateToProps)(Channels));
