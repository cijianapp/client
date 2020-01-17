import React from "react";
import styles from "./styles.module.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import KeyboardArrowDown24Px from "../../Icons/KeyboardArrowDown24Px";
import CreateChannel from "../createChannel";

const mapStateToProps = state => ({
  info: state.user.info
});

function Channels(props) {
  const channelList = [];

  if (Array.isArray(props.info.guild)) {
    props.info.guild.forEach(guild => {
      if (guild._id === props.match.params.guildID) {
        guild.channel.forEach(channel => {
          channelList.push(<div>{channel.name}</div>);
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
        <CreateChannel></CreateChannel>
      </div>
      {channelList}
    </div>
  );
}

export default withRouter(connect(mapStateToProps)(Channels));
