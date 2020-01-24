import React from "react";
import styles from "./styles.module.css";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import UserFriendsSolid from "../../Icons/UserFriendsSolid";

const mapStateToProps = state => ({
  info: state.user.info
});

function Title(props) {
  let name = "频道名";

  if (Array.isArray(props.info.guild)) {
    props.info.guild.forEach(guild => {
      if (guild._id === props.match.params.guildID) {
        guild.channel.forEach(channel => {
          if (channel._id === props.match.params.channelID) {
            name = channel.name;
          }
        });
      }
    });
  }

  return (
    <div className={styles.title}>
      <div className={styles.name}>{name}</div>
      <div>
        <div className={styles.iconContainer}>
          <UserFriendsSolid className={styles.icon}></UserFriendsSolid>
        </div>
      </div>
    </div>
  );
}

export default withRouter(connect(mapStateToProps)(Title));
