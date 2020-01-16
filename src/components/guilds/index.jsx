import React from "react";
import styles from "./styles.module.css";
import { connect } from "react-redux";

import Guild from "../guild";

const mapStateToProps = state => ({
  info: state.user.info
});

function Guilds(props) {
  const guildList = [];

  if (props.info.guild !== undefined) {
    props.info.guild.forEach(guild => {
      guildList.push(<Guild guild={guild} key={guild._id}></Guild>);
    });
  }

  return (
    <div className={styles.guildsList}>
      <Guild guild={{ _id: "home" }}></Guild>
      {guildList}
      <Guild guild={{ _id: "add" }}></Guild>
      <Guild guild={{ _id: "search" }}></Guild>
    </div>
  );
}

export default connect(mapStateToProps)(Guilds);
