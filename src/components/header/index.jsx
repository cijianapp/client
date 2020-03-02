import React from "react";
import styles from "./styles.module.css";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import LoginControl from "../loginControl";

const mapStateToProps = state => ({
  info: state.user.info
});

function Header(props) {
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
      <LoginControl></LoginControl>
    </div>
  );
}

export default withRouter(connect(mapStateToProps)(Header));
