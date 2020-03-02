import React from "react";
import styles from "./styles.module.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Guild from "../guild";
import { EXPLORE_GUILD } from "../../redux/actions";

const mapStateToProps = state => ({
  info: state.user.info,
  explore_guild: state.user.explore_guild
});

const mapDispatchToProps = dispatch => ({
  setExplore: guild => {
    dispatch({ type: EXPLORE_GUILD, value: guild });
  }
});

function Guilds(props) {
  let guildList = [];

  if (props.explore_guild.hasOwnProperty("_id")) {
    let newGuild = true;

    if (Array.isArray(props.info.guild)) {
      props.info.guild.forEach(guild => {
        if (guild._id === props.explore_guild._id) {
          newGuild = false;
          props.setExplore({});
        }
      });
    }

    if (newGuild) {
      if (props.location.pathname.includes(props.explore_guild._id)) {
        guildList.push(
          <Guild
            guild={props.explore_guild}
            key={props.explore_guild._id}
          ></Guild>
        );
      }
    }
  }

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Guilds));
