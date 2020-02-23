import React from "react";
import styles from "./styles.module.css";
import { connect } from "react-redux";

import Guild from "../guild";

const mapStateToProps = state => ({
  info: state.user.info
});

function Guilds(props) {
  const guildList = [];

  if (Array.isArray(props.info.guild)) {
    props.info.guild.forEach(guild => {
      guildList.push(<Guild guild={guild} key={guild._id}></Guild>);
    });
  }

  return (
    <div className={styles.guildList}>
      <Guild guild={{ _id: "home" }}></Guild>
      {guildList}
      <Guild guild={{ _id: "add" }}></Guild>
      <Guild guild={{ _id: "explore" }}></Guild>
    </div>
  );
}

export default connect(mapStateToProps)(Guilds);
