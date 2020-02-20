import React from "react";
import styles from "./styles.module.css";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Menu24Px from "../../icons/Menu24Px";
import Avatar from "../avatar";
import Channels from "../channels";
import UserSetting from "../userSetting";
import GuildSetting from "../guildSetting";

const mapStateToProps = state => ({
  info: state.user.info,
  explore_guild: state.user.explore_guild
});

function SideBar(props) {
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

  return (
    <div className={styles.sideBar}>
      <div
        className={styles.guild}
        data-tip
        data-for="guildName"
        data-event="click"
      >
        <div className={styles.guildName}>{guild.name}</div>

        <div className={styles.iconContainer}>
          <Menu24Px className={styles.icon}></Menu24Px>
        </div>
      </div>

      <ReactTooltip
        place="bottom"
        effect="solid"
        id="guildName"
        globalEventOff="click"
        eventOff="dbclick"
        className={styles.guildMenu}
        clickable={true}
      >
        <GuildSetting></GuildSetting>
        <div
          className={styles.item}
          onClick={e => {
            alert(2222222222);
          }}
        >
          <div className={styles.itemLabel}>邀请其他人</div>
        </div>

        <div className={styles.item}>
          <div className={styles.itemLabel}>邀请其他人</div>
        </div>
      </ReactTooltip>

      <Channels></Channels>

      <div className={styles.user}>
        <div className={styles.userInfo}>
          <Avatar url={props.info.avatar}></Avatar>
          <div className={styles.username}>{props.info.username}</div>
        </div>

        <UserSetting></UserSetting>
      </div>
    </div>
  );
}

export default withRouter(connect(mapStateToProps)(SideBar));
